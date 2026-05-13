'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModals from '../components/AuthModals';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeUntilNextMass, setTimeUntilNextMass] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextMassInfo, setNextMassInfo] = useState({ day: '', time: '', dateTime: new Date() });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const schedule = [
    { day: 'Sunday', time: '5:30 AM, 7:00 AM, 9:00 AM, 4:00 PM, 6:00 PM' },
    { day: 'Monday', time: '6:00 AM' },
    { day: 'Tuesday', time: '6:00 AM' },
    { day: 'Wednesday', time: '6:00 PM' },
    { day: 'Thursday', time: '6:00 AM' },
    { day: 'Friday', time: '6:00 PM' },
    { day: 'Saturday', time: '5:30 AM, 7:00 AM, 9:00 AM, 4:00 PM, 6:00 PM' },
  ];

  // Calculate next mass time
  const getNextMass = () => {
    const now = new Date();
    const currentDay = now.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < 7; i++) {
      const checkDay = (currentDay + i) % 7;
      const dayName = days[checkDay];
      const daySchedule = schedule.find(s => s.day === dayName);
      
      if (daySchedule) {
        const times = daySchedule.time.split(', ');
        for (const timeStr of times) {
          const [time, period] = timeStr.split(' ');
          const [hours, minutes] = time.split(':').map(Number);
          const massHours = period === 'PM' && hours !== 12 ? hours + 12 : (period === 'AM' && hours === 12 ? 0 : hours);
          
          const massDate = new Date(now);
          massDate.setDate(now.getDate() + i);
          massDate.setHours(massHours, minutes, 0, 0);
          
          if (massDate > now) {
            return { day: dayName, time: timeStr, dateTime: massDate };
          }
        }
      }
    }
    
    return { day: 'Sunday', time: '5:30 AM', dateTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) };
  };

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const nextMass = getNextMass();
      setNextMassInfo({ day: nextMass.day, time: nextMass.time, dateTime: nextMass.dateTime });
      
      const now = new Date();
      const diff = nextMass.dateTime.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeUntilNextMass({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={styles.page}>
      {/* Navigation */}
      <Navbar 
        showLoginModal={showLoginModal}
        showSignupModal={showSignupModal}
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <div style={styles.welcomeText}>Welcome to</div>
            <h1 style={styles.heroTitle}>Our Lady of the Rosary Parish</h1>
            <p style={styles.heroDescription}>Magallanes, Agusan del Norte</p>
            <button onClick={() => setShowLoginModal(true)} style={styles.heroButtonPrimary}>Book Now</button>
          </div>
        </div>
      </section>

      
      {/* Community of Faith Section */}
      <section style={styles.communitySection}>
        <div style={styles.communityContainer}>
          <div style={styles.communityImages}>
            <img src="/images/Nuestra landing page 2.jpg" alt="Church Interior" style={styles.communityImage} />
            <img src="/images/Nuestra landing page 3.jpg" alt="Church Community" style={styles.communityImage} />
          </div>
          <div style={styles.communityContent}>
            <h2 style={{...styles.communityTitle, fontFamily: 'Georgia, serif'}}>Serving God and Community in Faith</h2>
            <p style={{...styles.communityDescription, fontFamily: 'Poppins'}}>
             Our Lady of the Rosary Parish is a welcoming Catholic community in Magallanes, Agusan del Norte. We are dedicated to worship, service, and spiritual growth, bringing people together to live out the Gospel in everyday life.</p>
            <p style={{...styles.communityDescription, fontFamily: 'Poppins'}}>
              Through the Holy Mass, sacraments, and parish activities, we support one another in faith and invite everyone to be part of our journey with Christ.
            </p>
          </div>
        </div>
      </section>

      
      {/* Footer */}
      <Footer />

      {/* Auth Modals */}
      <AuthModals 
        showLoginModal={showLoginModal}
        showSignupModal={showSignupModal}
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#ffffff',
    color: '#111827',
  },

  // Navigation
  navbar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },

  navContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px',
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
    left: 20,
  },

  logo: {
    height: 50,
    width: 'auto',
  },

  brandText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#111827',
    marginLeft: 12,
  },

  navLink: {
    textDecoration: 'none',
    color: '#111827',
    fontWeight: 500,
    fontSize: 16,
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  },

  navMenu: {
    display: 'flex',
    gap: 32,
    alignItems: 'center',
    position: 'absolute' as const,
    right: 20,
  },

  navCenter: {
    display: 'flex',
    gap: 32,
    alignItems: 'center',
  },

  navToggle: {
    display: 'none',
    flexDirection: 'column' as const,
    gap: 4,
    cursor: 'pointer',
  },

  toggleIcon: {
    width: 25,
    height: 2,
    background: '#111827',
    transition: 'all 0.3s ease',
  },

  navButton: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    color: '#111827',
    border: '1px solid #d1d5db',
  },

  navButtonPrimary: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    color: '#fff',
    background: '#3b82f6',
    border: '1px solid #3b82f6',
  },

  // Hero Section
  heroSection: {
    padding: '200px 50px 70px',
    background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/mary2.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    textAlign: 'center' as const,
    position: 'relative' as const,
    overflow: 'hidden',
  },

  heroContainer: {
    maxWidth: 1300,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    gap: 60,
  },

  heroContent: {
    flex: 1,
    textAlign: 'left' as const,
  },

  heroBadge: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: 25,
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 24,
  },

  welcomeText: {
    fontSize: 30,
    fontWeight: 400,
    color: '#FFD700',
    fontFamily: 'Georgia, serif',
    marginBottom: 10,
    lineHeight: 1.2,
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
    letterSpacing: '1px',
    fontStyle: 'italic',
  },

  heroTitle: {
    fontSize: 50,
    fontWeight: 700,
    color: '#fff',
    fontFamily: 'Times New Roman, serif',
    marginBottom: 20,
    lineHeight: 1.1,
    textShadow: '0 4px 8px rgba(0,0,0,0.5)',
    letterSpacing: '2px',
    fontStyle: 'italic',
  },

  heroSubtitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 40,
    fontWeight: 400,
    letterSpacing: 0.5,
  },

  heroHeading2: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 600,
    letterSpacing: 0.5,
  },

  heroDescription: {
    fontSize: 15,
    color: '#FFF',
    marginBottom: 30,
    maxWidth: 500,
    lineHeight: 1.2,
    fontFamily: 'Times New Roman, serif',
    fontWeight: 600,
    textShadow: '0 3px 6px rgba(0,0,0,0.5)',
    letterSpacing: '1.5px',
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },

  heroButtons: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 20,
    alignItems: 'center',
  },

  heroButtonPrimary: {
    display: 'inline-block',
    background: '#1E3A6F',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    lineHeight: 1.6,
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif',
  },

  heroButtonSecondary: {
    display: 'inline-block',
    background: 'transparent',
    color: '#fff',
    padding: '16px 32px',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    textDecoration: 'none',
    border: '2px solid #fff',
    transition: 'all 0.3s ease',
  },

  // Mass Section
  massSection: {
    padding: '50px 20px',
    background: '#F5F8FD',
  },

  massContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
    background: '#FFFFFF',
    padding: '40px',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },

  massHeader: {
    textAlign: 'left' as const,
  },

  massLeftSection: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: 20,
    alignItems: 'center',
  },

  dateDisplay: {
    background: '#1E3A6F',
    color: '#fff',
    padding: '20px',
    borderRadius: 6,
    textAlign: 'center' as const,
    minWidth: 90,
    minHeight: 90,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateDay: {
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 1,
    fontFamily: 'Poppins, sans-serif',
  },

  dateMonth: {
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontFamily: 'Inter, sans-serif',
  },

  massBadge: {
    display: 'inline-block',
    background: '#2563EB',
    color: '#fff',
    padding: '5px 12px',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
    fontFamily: 'Inter, sans-serif',
  },

  massTitle: {
    fontSize: 26,
    fontWeight: 600,
    color: '#1E3A6F',
    marginBottom: 4,
    fontFamily: 'Poppins, sans-serif',
  },

  massSubtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 2,
    fontFamily: 'Inter, sans-serif',
  },

  massLocation: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 0,
    fontFamily: 'Inter, sans-serif',
  },

  allMassButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    background: '#1E3A6F',
    color: '#fff',
    padding: '11px 19px',
    borderRadius: 6,
    fontSize: 16,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    marginTop: '20px',
    fontFamily: 'Inter, sans-serif',
  },

  EventsButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    background: '#1E3A6F',
    color: '#fff',
    padding: '11px 14px',
    borderRadius: 5,
    fontSize: 15,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    marginTop: '20px',
  },

  countdownDisplay: {
    display: 'flex',
    justifyContent: 'center',
    gap: 15,
    flexWrap: 'wrap' as const,
    alignItems: 'center',
  },

  countdownSeparator: {
    fontSize: 18,
    fontWeight: 200,
    color: '#1E3A6F',
    margin: '0 4px',
  },

  countdownUnit: {
    background: 'transparent',
    borderRadius: 0,
    padding: '30',
    boxShadow: 'none',
    minWidth: 'auto',
    textAlign: 'center' as const,
  },

  countdownValue: {
    fontSize: 28,
    fontWeight: 600,
    color: '#1E3A6F',
    marginBottom: 6,
    fontFamily: 'Poppins, sans-serif',
    letterSpacing: 0,
  },

  countdownLabel: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontFamily: 'Inter, sans-serif',
  },

  // Community of Faith Section
  communitySection: {
    padding: '60px 20px',
    background: '#F5F8FD',
  },

  communityContainer: {
    maxWidth: 1300,
    margin: '0 auto',
    display: 'flex',
    gap: 60,
    alignItems: 'center',
  },

  communityImages: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 25,
  },

  communityImage: {
    width: '90%',
    height: 200,
    objectFit: 'cover' as const,
    borderRadius: 12,
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },

  communityContent: {
    flex: 1,
    padding: '20px 0',
  },

  communityTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: '#1E3A6F',
    marginBottom: 40,
    lineHeight: 1.2,
    fontFamily: 'Poppins, sans-serif',
  },

  communityDescription: {
    fontSize: 19,
    fontWeight: 500,
    color: '#000',
    lineHeight: 2,
    marginBottom: 30,
    fontFamily: 'Inter, sans-serif',
  },

  aboutButton: {
    display: 'inline-block',
    background: '#1E3A6F',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    lineHeight: 1.6,
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif',
  },

  // Events Section
  eventsSection: {
    padding: '80px 20px',
    background: `#B9D9F7`,
  },

  eventsContainer: {
    maxWidth: 1200,
    margin: '0 auto',
  },

  eventsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },

  eventsTitle: {
    fontSize: 35,
    fontWeight: 800,
    color: '#1E3A6F',
    marginBottom: 16,
  },

  eventsSubtitle: {
    fontSize: 20,
    color: '#000',
    maxWidth: 500,
    margin: '0 auto',
  },

  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 40,
  },

  eventCard: {
    background: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },

  eventImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover' as const,
  },

  eventContent: {
    padding: '20px',
  },

  eventTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1e40af',
    marginBottom: 8,
  },

  eventDate: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: 600,
    marginBottom: 12,
  },

  eventDescription: {
    fontSize: 15,
    color: '#000',
    lineHeight: 1.6,
  },

  // About Section
  aboutSection: {
    padding: '80px 20px',
    background: '#000',
  },

  aboutContainer: {
    maxWidth: 1200,
    margin: '0 auto',
  },

  aboutContent: {
    display: 'flex',
    gap: 60,
    alignItems: 'center',
  },

  aboutText: {
    flex: 1,
  },

  aboutTitle: {
    fontSize: 32,
    fontWeight: 700,
    fontFamily: 'Poppins',
    color: '#1e40af',
    marginBottom: 24,
  },

  aboutDescription: {
    fontSize: 16,
    color: '#000',
    lineHeight: 1.8,
    marginBottom: 24,
  },

  aboutImage: {
    flex: 1,
  },

  aboutImg: {
    width: '100%',
    height: 400,
    objectFit: 'cover' as const,
    borderRadius: 16,
  },

  // Footer
  footer: {
    background: '#8DC2EA',
    color: '#000',
    padding: '60px 20px 20px',
  },

  footerContainer: {
    maxWidth: 1200,
    margin: '0 auto',
  },

  footerContent: {
    display: 'flex',
    gap: 60,
    marginBottom: 40,
  },

  footerBrand: {
    flex: 1,
  },

  footerLogo: {
    height: 40,
    width: 'auto',
    marginBottom: 16,
  },

  footerTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
  },

  footerDescription: {
    fontSize: 14,
    color: '#000',
    lineHeight: 1.6,
  },

  footerLinks: {
    display: 'flex',
    gap: 60,
  },

  footerLinkGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  },

  footerLinkTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
  },

  footerLink: {
    color: '#000',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'color 0.3s ease',
  },

  footerBottom: {
    borderTop: '1px solid #000',
    paddingTop: 20,
    textAlign: 'center' as const,
  },

  footerCopyright: {
    fontSize: 12,
    color: '#000',
  },

  // Modal Styles
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
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 16,
    outline: 'none',
    boxSizing: 'border-box' as const,
  },

  modalButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '14px 16px',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    marginBottom: 8,
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
    marginBottom: 8,
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

  // Responsive Design
  '@media (max-width: 1024px)': {
    heroSection: {
      padding: '120px 0 80px',
      backgroundAttachment: 'scroll',
    },
    
    heroContainer: {
      padding: '0 20px',
      textAlign: 'center' as const,
    },
    
    communityContainer: {
      padding: '0 40px',
    },
    
    eventsContainer: {
      padding: '0 40px',
    },
    
    pastorContainer: {
      padding: '0 40px',
    },
    
    footerContainer: {
      padding: '0 40px',
    },
  },

  '@media (max-width: 768px)': {
    heroSection: {
      padding: '100px 0 60px',
      backgroundAttachment: 'scroll',
      backgroundPosition: 'center center',
    },
    
    heroContainer: {
      padding: '0 20px',
      textAlign: 'center' as const,
    },
    
    heroBadge: {
      fontSize: 12,
      padding: '8px 20px',
      marginBottom: 20,
    },
    
    heroTitle: {
      fontSize: 36,
      lineHeight: 1.2,
      marginBottom: 20,
    },
    
    heroSubtitle: {
      fontSize: 18,
      marginBottom: 30,
    },
    
    heroHeading2: {
      fontSize: 24,
      marginBottom: 16,
    },
    
    heroDescription: {
      fontSize: 16,
      marginBottom: 24,
      maxWidth: '100%',
    },
    
    heroButtons: {
      flexDirection: 'column' as const,
      gap: 16,
      alignItems: 'center',
    },
    
    heroButtonPrimary: {
      padding: '14px 28px',
      fontSize: 15,
    },
    
    heroButtonSecondary: {
      padding: '14px 28px',
      fontSize: 15,
    },
    
    joinButton: {
      width: '100%',
      maxWidth: 300,
    },
    
    secondaryButton: {
      width: '100%',
      maxWidth: 300,
    },
    
    massSection: {
      padding: '60px 20px',
    },
    
    massContainer: {
      flexDirection: 'column' as const,
      gap: 40,
      textAlign: 'center' as const,
    },
    
    massHeader: {
      textAlign: 'center' as const,
    },
    
    massTitle: {
      fontSize: 24,
      marginBottom: 12,
    },
    
    massSubtitle: {
      fontSize: 14,
      marginBottom: 24,
    },
    
    massImage: {
      order: -1,
      marginBottom: 30,
    },
    
    countdownDisplay: {
      flexWrap: 'wrap' as const,
      gap: 16,
      justifyContent: 'center',
    },
    
    countdownUnit: {
      minWidth: 80,
      padding: '16px 12px',
    },
    
    allEventsButton: {
      width: '100%',
      maxWidth: 200,
      textAlign: 'center' as const,
      justifyContent: 'center',
    },
    
    communitySection: {
      padding: '60px 0',
    },
    
    communityContainer: {
      padding: '0 20px',
    },
    
    communityImages: {
      flexDirection: 'column' as const,
    },
    
    communityImage: {
      width: '100%',
      height: 200,
    },
    
    eventsSection: {
      padding: '60px 0',
    },
    
    eventsContainer: {
      padding: '0 20px',
    },
    
    eventsGrid: {
      gridTemplateColumns: '1fr',
      gap: 24,
    },
    
    eventCard: {
      flexDirection: 'column' as const,
    },
    
    eventImage: {
      width: '100%',
      height: 200,
    },
    
    pastorSection: {
      padding: '60px 0',
    },
    
    pastorContainer: {
      padding: '0 20px',
    },
    
    pastorContent: {
      flexDirection: 'column' as const,
      textAlign: 'center' as const,
    },
    
    pastorImage: {
      width: 150,
      height: 150,
      marginBottom: 24,
    },
    
    pastorTitle: {
      fontSize: 24,
    },
    
    pastorSubtitle: {
      fontSize: 14,
    },
    
    footer: {
      padding: '40px 0 20px',
    },
    
    footerContainer: {
      padding: '0 20px',
    },
    
    footerContent: {
      flexDirection: 'column' as const,
      gap: 40,
    },
    
    footerBrand: {
      flex: 'none',
    },
    
    footerLinks: {
      flexDirection: 'column' as const,
      gap: 40,
    },
    
    footerBottom: {
      marginTop: 40,
    },
  },

  '@media (max-width: 480px)': {
    heroSection: {
      padding: '80px 0 40px',
      backgroundAttachment: 'scroll',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    },
    
    heroContainer: {
      padding: '0 16px',
    },
    
    heroBadge: {
      fontSize: 11,
      padding: '6px 16px',
      marginBottom: 16,
    },
    
    heroTitle: {
      fontSize: 28,
      lineHeight: 1.3,
      marginBottom: 16,
    },
    
    heroSubtitle: {
      fontSize: 16,
      marginBottom: 24,
    },
    
    heroHeading2: {
      fontSize: 20,
      marginBottom: 12,
    },
    
    heroDescription: {
      fontSize: 14,
      marginBottom: 20,
    },
    
    heroButtons: {
      gap: 12,
    },
    
    heroButtonPrimary: {
      padding: '12px 24px',
      fontSize: 14,
    },
    
    heroButtonSecondary: {
      padding: '12px 24px',
      fontSize: 14,
    },
    
    massSection: {
      padding: '40px 16px',
    },
    
    massContainer: {
      gap: 30,
    },
    
    massTitle: {
      fontSize: 20,
      marginBottom: 10,
    },
    
    massSubtitle: {
      fontSize: 13,
      marginBottom: 20,
    },
    
    massImage: {
      marginBottom: 20,
    },
    
    countdownDisplay: {
      gap: 12,
    },
    
    countdownUnit: {
      minWidth: 60,
      padding: '12px 8px',
    },
    
    countdownValue: {
      fontSize: 20,
    },
    
    countdownLabel: {
      fontSize: 10,
    },
    
    allEventsButton: {
      padding: '12px 20px',
      fontSize: 13,
    },
    
    communitySection: {
      padding: '40px 16px',
    },
    
    communityContainer: {
      padding: '0 16px',
    },
    
    communityTitle: {
      fontSize: 20,
    },
    
    communitySubtitle: {
      fontSize: 14,
    },
    
    eventsSection: {
      padding: '40px 16px',
    },
    
    eventsContainer: {
      padding: '0 16px',
    },
    
    eventsTitle: {
      fontSize: 20,
    },
    
    eventsSubtitle: {
      fontSize: 14,
    },
    
    eventsGrid: {
      gridTemplateColumns: '1fr',
      gap: 16,
    },
    
    eventCard: {
      padding: '16px',
    },
    
    pastorSection: {
      padding: '40px 16px',
    },
    
    pastorContainer: {
      padding: '0 16px',
    },
    
    pastorTitle: {
      fontSize: 18,
    },
    
    pastorSubtitle: {
      fontSize: 12,
    },
    
    pastorImage: {
      height: 200,
      marginBottom: 20,
    },
    
    pastorContent: {
      textAlign: 'center' as const,
    },
    
    footer: {
      padding: '30px 16px 15px',
    },
    
    footerContainer: {
      padding: '0 16px',
    },
    
    footerCopyright: {
      fontSize: 10,
    },
  },
};
