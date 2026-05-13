'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  showLoginModal?: boolean;
  showSignupModal?: boolean;
  setShowLoginModal?: (show: boolean) => void;
  setShowSignupModal?: (show: boolean) => void;
}

export default function Navbar({ 
  showLoginModal = false, 
  showSignupModal = false, 
  setShowLoginModal = () => {}, 
  setShowSignupModal = () => {} 
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string>('');
  const { user } = useAuth();


  // Get current path to show active page
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.navbar-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const styles = {
    navbar: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      background: '#102B4E',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    },

    navContainer: {
      maxWidth: 1400,
      margin: '0 auto',
      padding: '0 10px 0 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 76,
      position: 'relative' as const,
    },

    navBrand: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute' as const,
      left: 0,
    },

    logo: {
      height: 50,
      width: 'auto',
    },

    brandText: {
      fontSize: 15,
      fontWeight: 600,
      color: '#FFF',
      marginLeft: 5,
      display: 'flex',
      alignItems: 'center',
    },

    navLink: {
      textDecoration: 'none',
      color: '#FFF',
      fontSize: 15,
      fontWeight: 600,
      transition: 'color 0.3s ease',
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '8px 16px',
      borderRadius: 8,
    },

    navLinkHover: {
      color: '#FFD700',
      borderBottom: '2px solid #FFD700',
      background: 'transparent',
    },

    navLinkActive: {
      color: '#FFD700',
      borderBottom: '2px solid #FFD700',
      background: 'transparent',
    },

    aboutUsActive: {
      color: '#FFD700',
      borderBottom: '2px solid #FFD700',
      background: 'transparent',
    },

    navCenter: {
      display: 'flex',
      gap: 16,
      alignItems: 'center',
    },

    navButton: {
      background: 'transparent',
      color: '#FFF',
      border: '2px solid #FFF',
      borderRadius: 6,
      padding: '10px 20px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },

    navButtonPrimary: {
      background: '#3b82f6',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '10px 20px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },

    navMenu: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      position: 'absolute' as const,
      right: 20,
    },

    profileIconButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'transparent',
      borderRadius: 8,
      padding: '8px 12px',
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      color: '#fff',
    },

    profileIcon: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      backgroundColor: '#3b82f6',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 600,
    },

    navToggle: {
      display: 'none',
      flexDirection: 'column' as const,
      gap: 4,
      cursor: 'pointer',
      padding: '8px',
      borderRadius: 4,
      transition: 'background-color 0.3s ease',
      zIndex: 1001,
      position: 'relative' as const,
    },

    toggleIcon: {
      width: 25,
      height: 2,
      background: '#111827',
      transition: 'all 0.3s ease',
    },

    // Mobile menu styles
    mobileMenu: {
      display: 'none',
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },

    mobileMenuOpen: {
      display: 'block',
    },

    mobileNavCenter: {
      display: 'flex',
      flexDirection: 'column' as const,
      padding: '20px',
      gap: 0,
    },

    mobileNavLink: {
      display: 'block',
      padding: '12px 16px',
      textDecoration: 'none',
      color: '#111827',
      fontWeight: 500,
      fontSize: 16,
      transition: 'background-color 0.3s ease',
      borderRadius: 8,
      marginBottom: '8px',
    },

    mobileNavLinkActive: {
      background: 'rgba(59, 130, 246, 0.1)',
      color: '#3b82f6',
      fontWeight: 600,
    },

    mobileNavMenu: {
      display: 'flex',
      flexDirection: 'column' as const,
      padding: '0 20px 20px',
      gap: '12px',
    },

    mobileNavButton: {
      background: '#3b82f6',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '12px 16px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
    },

    mobileNavButtonPrimary: {
      background: '#3b82f6',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '12px 16px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
    },

    // Responsive breakpoints
    '@media (max-width: 1024px)': {
      navContainer: {
        padding: '0 16px',
      },
      
      navCenter: {
        display: 'none',
      },
      
      navMenu: {
        display: 'none',
      },
      
      navToggle: {
        display: 'flex',
        position: 'absolute' as const,
        right: 20,
      },
      
      navBrand: {
        left: 16,
      },
      
      logo: {
        height: 40,
      },
      
      brandText: {
        fontSize: 16,
      },
    },

    '@media (max-width: 480px)': {
      navContainer: {
        height: 64,
        padding: '0 12px',
      },
      
      logo: {
        height: 36,
      },
      
      brandText: {
        fontSize: 14,
        marginLeft: 8,
      },
      
      navToggle: {
        right: 16,
        display: 'flex !important',
        visibility: 'visible !important',
      },
      
      navCenter: {
        display: 'none !important',
      },
      
      navMenu: {
        display: 'none !important',
      },
    },

    '@media (max-width: 414px)': {
      navContainer: {
        padding: '0 10px',
      },
      
      logo: {
        height: 32,
      },
      
      brandText: {
        fontSize: 13,
        marginLeft: 6,
      },
      
      navToggle: {
        padding: '6px',
      },
      
      toggleIcon: {
        width: 20,
        height: 2,
      },
    },

    '@media (max-width: 375px)': {
      navContainer: {
        height: 60,
        padding: '0 8px',
      },
      
      logo: {
        height: 28,
      },
      
      brandText: {
        fontSize: 12,
        marginLeft: 4,
      },
      
      navToggle: {
        right: 12,
        padding: '4px',
        display: 'flex !important',
        visibility: 'visible !important',
      },
      
      toggleIcon: {
        width: 18,
        height: 1.5,
      },
      
      mobileNavCenter: {
        padding: '16px',
      },
      
      mobileNavLink: {
        padding: '10px 12px',
        fontSize: 14,
      },
    },
  };

  return (
    <nav style={styles.navbar}>
      <div className="navbar-container" style={styles.navContainer}>
        <div style={styles.navBrand}>
          <Link href="/" style={styles.navLink}>
            <img src="/images/logo church.png" alt="Church Logo" style={styles.logo} />
            <span style={styles.brandText}>Church Management</span>
          </Link>
        </div>
        
        <div style={styles.navCenter}>
          {user ? (
            // User is logged in - show dashboard navigation
            <>
              <Link 
                href="/userdashboard" 
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === 'dashboard' ? styles.navLinkHover : {}),
                  ...(activePath === '/userdashboard' ? styles.navLinkActive : {})
                }}
                onMouseEnter={() => setHoveredLink('dashboard')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Dashboard
              </Link>
              <Link 
                href="/bookings" 
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === 'bookings' ? styles.navLinkHover : {}),
                  ...(activePath === '/bookings' ? styles.navLinkActive : {})
                }}
                onMouseEnter={() => setHoveredLink('bookings')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Booking

              </Link>
              <Link 
                href="/records" 
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === 'records' ? styles.navLinkHover : {}),
                  ...(activePath === '/records' ? styles.navLinkActive : {})
                }}
                onMouseEnter={() => setHoveredLink('records')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Records
              </Link>

            </>
          ) : (
            // User is not logged in - show main navigation
            <>
              <Link 
                href="/" 
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === 'home' ? styles.navLinkHover : {}),
                  ...(activePath === '/' ? styles.navLinkActive : {})
                }}
                onMouseEnter={() => setHoveredLink('home')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === 'about' ? styles.navLinkHover : {}),
                  ...(activePath === '/about' ? styles.aboutUsActive : {})
                }}
                onMouseEnter={() => setHoveredLink('about')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                About Us
              </Link>
              <Link 
                href="/mass" 
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === 'mass' ? styles.navLinkHover : {}),
                  ...(activePath === '/mass' ? styles.navLinkActive : {})
                }}
                onMouseEnter={() => setHoveredLink('mass')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Mass Schedule
              </Link>
              <Link 
                href="/events" 
                style={{
                  ...styles.navLink, 
                  ...(hoveredLink === 'events' ? styles.navLinkHover : {}),
                  ...(activePath === '/events' ? styles.navLinkActive : {})
                }}
                onMouseEnter={() => setHoveredLink('events')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Events
              </Link>
            </>
          )}
        </div>
        
        <div style={styles.navMenu}>
          {user ? (
            // User is logged in - show profile and settings icons
            <>
              <Link 
                href="/userdashboard?section=profile" 
                style={styles.profileIconButton}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: 16 }}></span>
                  <span>Profile</span>
                </div>
              </Link>
                            <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = '/';
                }}
                style={styles.navButton}
              >
                Logout
              </button>
                          </>
          ) : (
            // User is not logged in - show login
            <>
              <button 
                onClick={() => setShowLoginModal(true)} 
                style={styles.navButton}
              >
                Sign In
              </button>
            </>
          )}
        </div>

        <div style={styles.navToggle} onClick={toggleMenu}>
          <span style={styles.toggleIcon}></span>
          <span style={styles.toggleIcon}></span>
          <span style={styles.toggleIcon}></span>
        </div>

        {/* Mobile Menu */}
        <div style={{
          ...styles.mobileMenu,
          ...(isMenuOpen ? styles.mobileMenuOpen : {})
        }}>
          <div style={styles.mobileNavCenter}>
            {user ? (
              // User is logged in - show dashboard navigation
              <>
                <Link 
                  href="/userdashboard" 
                  style={{
                    ...styles.mobileNavLink,
                    ...(activePath === '/userdashboard' ? styles.mobileNavLinkActive : {})
                  }} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/bookings" 
                  style={{
                    ...styles.mobileNavLink,
                    ...(activePath === '/bookings' ? styles.mobileNavLinkActive : {})
                  }} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Booking

                </Link>
                <Link 
                  href="/records" 
                  style={{
                    ...styles.mobileNavLink,
                    ...(activePath === '/records' ? styles.mobileNavLinkActive : {})
                  }} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Records
                </Link>

              </>
            ) : (
              // User is not logged in - no center navigation
              <></>
            )}
          </div>
          <div style={styles.mobileNavMenu}>
            {user ? (
              // User is logged in - show user menu
              <>
                <Link 
                  href="/userdashboard?section=profile" 
                  style={{
                    ...styles.mobileNavLink,
                    ...(activePath === '/userdashboard' && window.location.search.includes('section=profile') ? styles.mobileNavLinkActive : {})
                  }} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: 16 }}></span>
                    <span>Profile</span>
                  </div>
                </Link>
                <Link 
                  href="/userdashboard?section=settings" 
                  style={{
                    ...styles.mobileNavLink,
                    ...(activePath === '/userdashboard' && window.location.search.includes('section=settings') ? styles.mobileNavLinkActive : {})
                  }} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: 16 }}></span>
                    <span>Settings</span>
                  </div>
                </Link>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setIsMenuOpen(false);
                    window.location.href = '/';
                  }}
                  style={styles.mobileNavLink}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: 16 }}></span>
                    <span>Logout</span>
                  </div>
                </button>
                              </>
            ) : (
              // User is not logged in - show login
              <>
                <button 
                  onClick={() => {setShowLoginModal(true); setIsMenuOpen(false);}} 
                  style={styles.mobileNavButton}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
