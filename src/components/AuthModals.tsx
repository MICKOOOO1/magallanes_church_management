  'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalsProps {
  showLoginModal: boolean;
  showSignupModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
}

export default function AuthModals({ 
  showLoginModal, 
  showSignupModal, 
  setShowLoginModal, 
  setShowSignupModal 
}: AuthModalsProps) {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Login state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginTouched, setLoginTouched] = useState({ email: false, password: false });
  const [loginErrors, setLoginErrors] = useState({ email: '', password: '' });
  
  // Signup state
  const [signupData, setSignupData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    extensionName: '',
    dob: '',
    age: '',
    sex: '',
    email: '',
    purok: '',
    barangay: '',
    password: '',
    confirmPassword: ''
  });
  const [signupTouched, setSignupTouched] = useState({
    firstName: false,
    middleName: false,
    lastName: false,
    extensionName: false,
    dob: false,
    age: false,
    sex: false,
    email: false,
    purok: false,
    barangay: false,
    password: false,
    confirmPassword: false
  });
  const [signupErrors, setSignupErrors] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    extensionName: '',
    dob: '',
    age: '',
    sex: '',
    email: '',
    purok: '',
    barangay: '',
    password: '',
    confirmPassword: ''
  });

  // Validation function for single field (returns error string)
  const validateField = useCallback((name: string, value: string, formData: any, isSignup = false): string => {
    let error = '';

    if (isSignup) {
      switch (name) {
    case 'firstName':
    case 'lastName':
      if (!value.trim()) error = 'This field is required';
      else if (value.trim().length < 2) error = 'Minimum 2 characters';
      else {
        const nameRegex = /^[a-zA-Z\s\-'.]+$/;
        if (!nameRegex.test(value.trim())) error = 'No numbers allowed';
        // Check if first letter of each word is capitalized
        const words = value.trim().split(/\s+/);
        const hasCapitalizationError = words.some(word => word.charAt(0) !== word.charAt(0).toUpperCase());
        if (hasCapitalizationError) error = 'First letter of each word must be capitalized';
      }
      break;
    case 'middleName':
    case 'extensionName':
      if (value.trim() && value.trim().length < 2) error = 'Minimum 2 characters';
      else if (value.trim()) {
        const nameRegex = /^[a-zA-Z\s\-'.]+$/;
        if (!nameRegex.test(value.trim())) error = 'No numbers allowed';
        // Check if first letter of each word is capitalized
        const words = value.trim().split(/\s+/);
        const hasCapitalizationError = words.some(word => word.charAt(0) !== word.charAt(0).toUpperCase());
        if (hasCapitalizationError) error = 'First letter of each word must be capitalized';
      }
      break;
    case 'purok':
    case 'barangay':
      if (!value.trim()) error = 'This field is required';
      else if (value.trim().length < 2) error = 'Minimum 2 characters';
      else {
        // Check if first letter of each word is capitalized
        const words = value.trim().split(/\s+/);
        const hasCapitalizationError = words.some(word => word.charAt(0) !== word.charAt(0).toUpperCase());
        if (hasCapitalizationError) error = 'First letter of each word must be capitalized';
      }
      break;
        case 'dob':
          if (!value) error = 'Date of birth is required';
          else {
            const today = new Date();
            const birthDate = new Date(value);
            if (birthDate > today) error = 'Date cannot be in the future';
          }
          break;
        case 'age':
          if (!value) error = 'Age is required';
          else {
            const age = parseInt(value);
            if (isNaN(age) || age <= 0 || age > 150) error = 'Age must be between 1-150';
          }
          break;
        case 'sex':
          if (!value || value === '') error = 'Please select your sex';
          break;
        case 'email':
          if (!value.trim()) error = 'Email is required';
          else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) error = 'Invalid email format';
          }
          break;
        case 'password':
          if (!value) error = 'Password is required';
          else if (value.length < 8) error = 'Password must be at least 8 characters';
          break;
        case 'confirmPassword':
          if (!value) error = 'Please confirm your password';
          else if (value !== formData.password) error = 'Passwords do not match';
          break;
        default:
          break;
      }
    } else {
      // Login
      if (name === 'email') {
        if (!value.trim()) error = 'Email is required';
      } else if (name === 'password') {
        if (!value) error = 'Password is required';
      }
    }
    return error;
  }, []);

  // Live validation handlers
  const handleLoginChange = useCallback((name: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoginData(prev => {
      const newData = { ...prev, [name]: value };
      const error = validateField(name, value, newData, false);
      setLoginErrors(prevErrors => ({ ...prevErrors, [name]: error }));
      return newData;
    });
    setLoginTouched(prev => ({ ...prev, [name]: true }));
  }, [validateField]);

  const handleLoginBlur = useCallback((name: 'email' | 'password') => (e: React.FocusEvent<HTMLInputElement>) => {
    setLoginTouched(prev => ({ ...prev, [name]: true }));
    const value = loginData[name as keyof typeof loginData] as string;
    const error = validateField(name, value, loginData, false);
    setLoginErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  }, [validateField, loginData]);

  const handleSignupChange = useCallback((name: keyof typeof signupData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setSignupData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-calculate age when date of birth changes
      if (name === 'dob' && value) {
        const birthDate = new Date(value);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
        
        newData.age = calculatedAge.toString();
      }
      
      const error = validateField(name as string, value, newData, true);
      setSignupErrors(prevErrors => ({ ...prevErrors, [name as string]: error }));
      return newData;
    });
    setSignupTouched(prev => ({ ...prev, [name]: true }));
  }, [validateField]);

  const handleSignupBlur = useCallback((name: keyof typeof signupData) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSignupTouched(prev => ({ ...prev, [name]: true }));
    const value = signupData[name];
    const error = validateField(name as string, value as string, signupData, true);
    setSignupErrors(prevErrors => ({ ...prevErrors, [name as string]: error }));
  }, [validateField, signupData]);

  const styles = {
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },

    modal: {
      background: '#fff',
      borderRadius: 12,
      padding: 0,
      maxWidth: 400,
      width: '90%',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },

    signupModal: {
      background: '#fff',
      borderRadius: 12,
      padding: 0,
      maxWidth: 1000,
      width: '90%',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },

    modalHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '24px 24px 20px',
      borderBottom: '1px solid #e5e7eb',
      position: 'relative' as const,
    },

    modalTitle: {
      fontSize: 20,
      fontWeight: 700,
      color: '#111827',
      margin: 0,
    },

    modalClose: {
      background: 'none',
      border: 'none',
      fontSize: 24,
      color: '#6b7280',
      cursor: 'pointer',
      padding: 0,
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      transition: 'background-color 0.2s',
      position: 'absolute' as const,
      top: 16,
      right: 16,
      zIndex: 1,
    },

    modalBody: {
      padding: '24px',
    },

    modalInput: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: 8,
      fontSize: 14,
      marginBottom: 4,
      outline: 'none',
      boxSizing: 'border-box' as const,
      transition: 'border-color 0.2s ease',
    },
    modalInputError: {
      borderColor: '#ef4444 !important',
      backgroundColor: '#fff5f5',
    },
    modalInputSuccess: {
      borderColor: '#10b981 !important',
      backgroundColor: '#f0fdf4',
    },
    helperText: {
      fontSize: 12,
      marginTop: 2,
      marginBottom: 8,
      padding: 0,
    },
    helperTextError: {
      color: '#ef4444',
    },
    helperTextSuccess: {
      color: '#10b981',
    },

    modalButton: {
      width: '100%',
      background: `linear-gradient(135deg, ${loading ? '#9ca3af' : '#3b82f6'} 0%, ${loading ? '#6b7280' : '#2563eb'} 100%)`,
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '14px 16px',
      fontSize: 16,
      fontWeight: 600,
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      marginBottom: 8,
    },
    errorMessage: {
      color: '#ef4444',
      fontSize: 14,
      marginBottom: 16,
      padding: '8px 12px',
      background: '#fee2e2',
      borderRadius: 6,
      borderLeft: '3px solid #ef4444',
    },

    modalHeaderContent: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      textAlign: 'center' as const,
      flex: 1,
    },

    modalIcon: {
      width: 60,
      height: 60,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 16,
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    },

    modalSubtitle: {
      fontSize: 14,
      color: '#6b7280',
      margin: '8px 0 0 0',
      fontWeight: 400,
    },

    inputGroup: {
      marginBottom: 0,
    },

    inputLabel: {
      display: 'block',
      fontSize: 14,
      fontWeight: 600,
      color: '#374151',
      marginBottom: 0,
      padding: 0,
    },

    modalOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },

    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      color: '#6b7280',
      cursor: 'pointer',
      margin: 0,
      padding: 0,
    },

    checkbox: {
      marginRight: 8,
      width: 16,
      height: 16,
      cursor: 'pointer',
    },

    forgotPassword: {
      color: '#3b82f6',
      textDecoration: 'none',
      fontSize: 14,
      fontWeight: 500,
      transition: 'color 0.2s',
    },

    modalFooter: {
      textAlign: 'center' as const,
      paddingTop: 16,
      borderTop: '1px solid #e5e7eb',
    },

    modalFooterText: {
      margin: 0,
      padding: 0,
      fontSize: 14,
      color: '#6b7280',
    },

    linkButton: {
      background: 'none',
      border: 'none',
      color: '#3b82f6',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'underline',
      transition: 'color 0.2s',
    },
  };

  return (
    <>
      {/* Login Modal */}
      {showLoginModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div style={styles.modalHeaderContent}>
                <h2 style={styles.modalTitle}>Welcome Back</h2>
                <p style={styles.modalSubtitle}>Sign in to your account</p>
              </div>
              <button onClick={() => setShowLoginModal(false)} style={styles.modalClose}>×</button>
            </div>
            <div style={styles.modalBody}>
              {error && <div style={styles.errorMessage}>{error}</div>}
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  style={{...styles.modalInput, ...(loginErrors.email && { ...styles.modalInputError }), ...(loginData.email && !loginErrors.email && loginTouched.email && { ...styles.modalInputSuccess })}}
                  value={loginData.email}
                  onChange={handleLoginChange('email')}
                  onBlur={handleLoginBlur('email')}
                  disabled={loading}
                />
                {loginTouched.email && loginErrors.email && (
                  <div style={{...styles.helperText, ...styles.helperTextError}}>{loginErrors.email}</div>
                )}
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  style={{...styles.modalInput, ...(loginErrors.password && { ...styles.modalInputError }), ...(loginData.password && !loginErrors.password && loginTouched.password && { ...styles.modalInputSuccess })}}
                  value={loginData.password}
                  onChange={handleLoginChange('password')}
                  onBlur={handleLoginBlur('password')}
                  disabled={loading}
                />
                {loginTouched.password && loginErrors.password && (
                  <div style={{...styles.helperText, ...styles.helperTextError}}>{loginErrors.password}</div>
                )}
              </div>
              <div style={{ marginBottom: 12 }}>
                <a href="#" style={styles.forgotPassword} onClick={(e) => e.preventDefault()}>Forgot password?</a>
              </div>
              <button 
                onClick={async () => {
                  setLoading(true);
                  setError('');
                  if (loginData.email && loginData.password && !loginErrors.email && !loginErrors.password) {
                    try {
                      const response = await fetch('/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          email: loginData.email,
                          password: loginData.password,
                        }),
                      });
                      
const result = await response.json();
                      
                      if (!response.ok) {
                        if (result.error?.includes('Invalid login credentials')) {
                          setError('Invalid email or password. Please try again.');
                        } else if (result.error?.includes('User')) {
                          setError('User not found. Please check your email or sign up.');
                        } else {
                          setError(result.error || 'Login failed');
                        }
                      } else {
                        // After successful login, set the session in the Supabase client
                        // This ensures the Navbar receives the auth state update
                        if (result.data?.session) {
                          const { access_token, refresh_token } = result.data.session;
                          await supabase.auth.setSession({
                            access_token,
                            refresh_token,
                          });
                        }
                        // Refresh auth context to update navbar
                        await refreshUser();
                        setShowLoginModal(false);
                        router.push('/userdashboard');
                      }
                    } catch (err: any) {
                      setError('Unable to connect to server. Please try again later.');
                    }
                  }
                  setLoading(false);
                }}
                style={styles.modalButton}
                disabled={loading || !!loginErrors.email || !!loginErrors.password}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              <div style={styles.modalFooter}>
                <p style={styles.modalFooterText}>
                  Don't have an account? 
                  <button 
                    onClick={() => {setShowLoginModal(false); setShowSignupModal(true);}} 
                    style={styles.linkButton}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.signupModal}>
            <div style={styles.modalHeader}>
              <div style={styles.modalHeaderContent}>
                <h2 style={styles.modalTitle}>Create Account</h2>
                <p style={styles.modalSubtitle}>Join our church community</p>
              </div>
              <button onClick={() => setShowSignupModal(false)} style={styles.modalClose}>×</button>
            </div>
            <div style={styles.modalBody}>
              {error && <div style={styles.errorMessage}>{error}</div>}
              
              {/* Personal Information */}
              <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Personal Information</h4>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.inputLabel}>First Name <span style={{color: '#ef4444'}}>*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter your first name" 
                      style={{...styles.modalInput, ...(signupErrors.firstName && { ...styles.modalInputError }), ...(signupData.firstName && !signupErrors.firstName && signupTouched.firstName && { ...styles.modalInputSuccess })}}
                      value={signupData.firstName}
                      onChange={handleSignupChange('firstName')}
                      onBlur={handleSignupBlur('firstName')}
                      disabled={loading}
                    />
                    {signupTouched.firstName && signupErrors.firstName && (
                      <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.firstName}</div>
                    )}
                  </div>
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.inputLabel}>Middle Name <span style={{color: '#10b981'}}>(optional)</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter your middle name" 
                      style={{...styles.modalInput, ...(signupErrors.middleName && { ...styles.modalInputError }), ...(signupData.middleName && !signupErrors.middleName && signupTouched.middleName && { ...styles.modalInputSuccess })}}
                      value={signupData.middleName}
                      onChange={handleSignupChange('middleName')}
                      onBlur={handleSignupBlur('middleName')}
                      disabled={loading}
                    />
                    {signupTouched.middleName && signupErrors.middleName && (
                      <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.middleName}</div>
                    )}
                  </div>
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.inputLabel}>Last Name <span style={{color: '#ef4444'}}>*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter your last name" 
                      style={{...styles.modalInput, ...(signupErrors.lastName && { ...styles.modalInputError }), ...(signupData.lastName && !signupErrors.lastName && signupTouched.lastName && { ...styles.modalInputSuccess })}}
                      value={signupData.lastName}
                      onChange={handleSignupChange('lastName')}
                      onBlur={handleSignupBlur('lastName')}
                      disabled={loading}
                    />
                    {signupTouched.lastName && signupErrors.lastName && (
                      <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.lastName}</div>
                    )}
                  </div>
                  <div style={{ ...styles.inputGroup, flex: 1 }}>
                    <label style={styles.inputLabel}>Extension Name <span style={{color: '#10b981'}}>(optional)</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter your extension name" 
                      style={{...styles.modalInput, ...(signupErrors.extensionName && { ...styles.modalInputError }), ...(signupData.extensionName && !signupErrors.extensionName && signupTouched.extensionName && { ...styles.modalInputSuccess })}}
                      value={signupData.extensionName}
                      onChange={handleSignupChange('extensionName')}
                      onBlur={handleSignupBlur('extensionName')}
                      disabled={loading}
                    />
                    {signupTouched.extensionName && signupErrors.extensionName && (
                      <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.extensionName}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Date of Birth, Age, Sex, Email */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.inputLabel}>Date of Birth <span style={{color: '#ef4444'}}>*</span></label>
                  <input 
                    type="date" 
                    style={{...styles.modalInput, ...(signupErrors.dob && { ...styles.modalInputError }), ...(signupData.dob && !signupErrors.dob && signupTouched.dob && { ...styles.modalInputSuccess })}}
                    value={signupData.dob}
                    onChange={handleSignupChange('dob' as keyof typeof signupData)}
                    onBlur={handleSignupBlur('dob' as keyof typeof signupData)}
                    disabled={loading}
                  />
                  {signupTouched.dob && signupErrors.dob && (
                    <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.dob}</div>
                  )}
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.inputLabel}>Age <span style={{color: '#ef4444'}}>*</span></label>
                  <input 
                    type="number" 
                    placeholder="Auto-calculated" 
                    style={{...styles.modalInput, ...(signupErrors.age && { ...styles.modalInputError }), ...(signupData.age && !signupErrors.age && signupTouched.age && { ...styles.modalInputSuccess }), backgroundColor: '#f3f4f6'}}
                    value={signupData.age}
                    onChange={handleSignupChange('age' as keyof typeof signupData)}
                    onBlur={handleSignupBlur('age' as keyof typeof signupData)}
                    disabled={loading}
                    readOnly
                  />
                  {signupTouched.age && signupErrors.age && (
                    <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.age}</div>
                  )}
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.inputLabel}>Sex <span style={{color: '#ef4444'}}>*</span></label>
                  <select 
                    style={{...styles.modalInput, ...(signupErrors.sex && { ...styles.modalInputError }), ...(signupData.sex && !signupErrors.sex && signupTouched.sex && { ...styles.modalInputSuccess })}}
                    value={signupData.sex}
                    onChange={handleSignupChange('sex' as keyof typeof signupData)}
                    onBlur={handleSignupBlur('sex' as keyof typeof signupData)}
                    disabled={loading}
                  >
                    <option value="">--Select--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {signupTouched.sex && signupErrors.sex && (
                    <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.sex}</div>
                  )}
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.inputLabel}>Email Address <span style={{color: '#ef4444'}}>*</span></label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    style={{...styles.modalInput, ...(signupErrors.email && { ...styles.modalInputError }), ...(signupData.email && !signupErrors.email && signupTouched.email && { ...styles.modalInputSuccess })}}
                    value={signupData.email}
                    onChange={handleSignupChange('email' as keyof typeof signupData)}
                    onBlur={handleSignupBlur('email' as keyof typeof signupData)}
                    disabled={loading}
                  />
                  {signupTouched.email && signupErrors.email && (
                    <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.email}</div>
                  )}
                </div>
              </div>

              {/* Address and Password */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.inputLabel}>Purok/Street <span style={{color: '#ef4444'}}>*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter your purok/street" 
                    style={{...styles.modalInput, ...(signupErrors.purok && { ...styles.modalInputError }), ...(signupData.purok && !signupErrors.purok && signupTouched.purok && { ...styles.modalInputSuccess })}}
                    value={signupData.purok}
                    onChange={handleSignupChange('purok' as keyof typeof signupData)}
                    onBlur={handleSignupBlur('purok' as keyof typeof signupData)}
                    disabled={loading}
                  />
                  {signupTouched.purok && signupErrors.purok && (
                    <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.purok}</div>
                  )}
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.inputLabel}>Barangay <span style={{color: '#ef4444'}}>*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter your barangay" 
                    style={{...styles.modalInput, ...(signupErrors.barangay && { ...styles.modalInputError }), ...(signupData.barangay && !signupErrors.barangay && signupTouched.barangay && { ...styles.modalInputSuccess })}}
                    value={signupData.barangay}
                    onChange={handleSignupChange('barangay' as keyof typeof signupData)}
                    onBlur={handleSignupBlur('barangay' as keyof typeof signupData)}
                    disabled={loading}
                  />
                  {signupTouched.barangay && signupErrors.barangay && (
                    <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.barangay}</div>
                  )}
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.inputLabel}>Password <span style={{color: '#ef4444'}}>*</span></label>
                  <input 
                    type="password" 
                    placeholder="Create a password" 
                    style={{...styles.modalInput, ...(signupErrors.password && { ...styles.modalInputError }), ...(signupData.password && !signupErrors.password && signupTouched.password && { ...styles.modalInputSuccess })}}
                    value={signupData.password}
                    onChange={handleSignupChange('password' as keyof typeof signupData)}
                    onBlur={handleSignupBlur('password' as keyof typeof signupData)}
                    disabled={loading}
                  />
                  {signupTouched.password && signupErrors.password && (
                    <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.password}</div>
                  )}
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.inputLabel}>Confirm Password <span style={{color: '#ef4444'}}>*</span></label>
                  <input 
                    type="password" 
                    placeholder="Confirm your password" 
                    style={{...styles.modalInput, ...(signupErrors.confirmPassword && { ...styles.modalInputError }), ...(signupData.confirmPassword && !signupErrors.confirmPassword && signupTouched.confirmPassword && { ...styles.modalInputSuccess })}}
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange('confirmPassword' as keyof typeof signupData)}
                    onBlur={handleSignupBlur('confirmPassword' as keyof typeof signupData)}
                    disabled={loading}
                  />
                  {signupTouched.confirmPassword && signupErrors.confirmPassword && (
                    <div style={{...styles.helperText, ...styles.helperTextError}}>{signupErrors.confirmPassword}</div>
                  )}
                  {signupTouched.confirmPassword && !signupErrors.confirmPassword && signupData.confirmPassword && (
                    <div style={{...styles.helperText, ...styles.helperTextSuccess}}>Matches!</div>
                  )}
                </div>
              </div>
<button 
                onClick={async () => {
                    // Check if form is valid
                    const hasErrors = Object.values(signupErrors).some(err => err);
                    if (hasErrors) {
                      setError('Please fix the errors below');
                      return;
                    }
                    setLoading(true);
                    setError('');
                    if (signupData.email && signupData.password && signupData.confirmPassword) {
                      if (signupData.password !== signupData.confirmPassword) {
                        setError('Passwords do not match');
                        setLoading(false);
                        return;
                      }
                      
                      try {
                        const response = await fetch('/api/auth/signup', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            email: signupData.email,
                            password: signupData.password,
                            firstName: signupData.firstName,
                            middleName: signupData.middleName,
                            lastName: signupData.lastName,
                            extensionName: signupData.extensionName,
                            dob: signupData.dob,
                            age: signupData.age,
                            sex: signupData.sex,
                            purok: signupData.purok,
                            barangay: signupData.barangay,
                          }),
                        });

                        const result = await response.json();
                        console.log('Signup result:', result);
                        
                        if (!response.ok) {
                          const detailMessage = result.details?.message || result.details?.hint || result.details?.details;
                          setError(detailMessage ? `${result.error}: ${detailMessage}` : result.error || 'Signup failed');
                        } else {
                          // Check if email confirmation is required
                          if (result.data?.user?.confirmation_sent_at) {
                            setError('Please check your email to confirm your account.');
                          } else {
                            // Refresh auth context to update navbar
                            await refreshUser();
                            setShowSignupModal(false);
                            router.push('/userdashboard');
                          }
                        }
                      } catch (err: any) {
                        setError('Unable to connect to server. Please try again later.');
                      }
                    }
                    setLoading(false);
                  }}
                  style={styles.modalButton}
                  disabled={loading || Object.values(signupErrors).some(Boolean)}
                >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              <div style={styles.modalFooter}>
                <p style={styles.modalFooterText}>
                  Already have an account? 
                  <button 
                    onClick={() => {setShowSignupModal(false); setShowLoginModal(true);}} 
                    style={styles.linkButton}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
