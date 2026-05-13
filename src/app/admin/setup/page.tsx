'use client';

import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function AdminSetup() {
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Arial, sans-serif'
    },
    mainContent: {
      padding: '80px 20px 20px',
      maxWidth: '800px',
      margin: '0 auto'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '32px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    },
    title: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 16px 0'
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: '0 0 32px 0',
      lineHeight: '1.5'
    },
    button: {
      padding: '16px 32px',
      backgroundColor: '#dc2626',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '100%'
    },
    buttonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    },
    message: {
      marginTop: '16px',
      padding: '12px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      lineHeight: '1.5'
    },
    messageSuccess: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      border: '1px solid #a7f3d0'
    },
    messageError: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fca5a5'
    },
    messageInfo: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      border: '1px solid #bfdbfe'
    },
    credentials: {
      backgroundColor: '#f3f4f6',
      padding: '16px',
      borderRadius: '6px',
      marginTop: '16px',
      fontSize: '14px',
      fontFamily: 'monospace',
      border: '1px solid #e5e7eb'
    }
  };

  const handleCreateAdmin = async () => {
    setIsCreating(true);
    setMessage('Creating admin account...');
    setMessageType('info');

    try {
      const response = await fetch('/api/admin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setMessage(result.message + ' You can now sign in with the credentials below.');
        setMessageType('success');
      } else {
        setMessage(result.error || 'Failed to create admin account. Please check the console for details.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setMessageType('error');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.mainContent}>
        <div style={styles.card}>
          <h1 style={styles.title}>Admin Account Setup</h1>
          <p style={styles.subtitle}>
            This page will create the default administrator account for your church management system.
            This account will have full administrative privileges.
          </p>

          <button
            onClick={handleCreateAdmin}
            disabled={isCreating}
            style={{
              ...styles.button,
              ...(isCreating ? styles.buttonDisabled : {})
            }}
          >
            {isCreating ? 'Creating Admin Account...' : 'Create Admin Account'}
          </button>

          {message && (
            <div style={{
              ...styles.message,
              ...(messageType === 'success' ? styles.messageSuccess :
               messageType === 'error' ? styles.messageError :
               styles.messageInfo)
            }}>
              {message}
            </div>
          )}

          {messageType === 'success' && (
            <div style={styles.credentials}>
              <strong>Admin Credentials:</strong><br/>
              Email: admin<br/>
              Password: admin1231233<br/>
              <br/>
              <strong>Important:</strong> Please change the password after first login for security.
            </div>
          )}

          <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '6px', border: '1px solid #fcd34d' }}>
            <strong>⚠️ Security Notice:</strong><br/>
            This setup page creates an admin account with default credentials. 
            Make sure to:<br/>
            • Change the default password after first login<br/>
            • Remove this setup page after use<br/>
            • Keep admin credentials secure
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
