'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import AuthModals from '../../components/AuthModals';
import Footer from '../../components/Footer';

export default function MassPage() {
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
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
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

  return (
    <div style={styles.page}>
      {/* Navigation */}
      <Navbar 
        showLoginModal={showLoginModal}
        showSignupModal={showSignupModal}
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />

      <section style={styles.schedule}>
          
          <div style={styles.scheduleHeader}>
            <h3 style={{...styles.scheduleTitle, fontFamily: 'Georgia, serif'}}>Mass Schedule</h3>
            <p style={{...styles.scheduleSubtitle, fontFamily: 'Poppins'}}>Join us for worship and spiritual nourishment throughout the week</p>
          </div>
          <div style={styles.scheduleGrid}>
            {schedule.map((s) => (
              <div key={s.day} style={styles.scheduleCard}>
                <div style={styles.scheduleDay}>{s.day}</div>
                <div style={styles.scheduleTime}>{s.time}</div>
              </div>
            ))}
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
    minHeight: '50vh',
    background: 'linear-gradient(180deg, #F5F8FD, #E9EEF6)',
    color: '#111827',
  },

  // Navigation
  navbar: {
    position: 'fixed',
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

  navLink: {
    textDecoration: 'none',
    color: '#111827',
    fontWeight: 500,
    fontSize: 16,
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  },

  navButton: {
    background: 'transparent',
    color: '#111827',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    padding: '8px 16px',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  navButtonPrimary: {
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '8px 16px',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  navMenu: {
    display: 'flex',
    gap: 32,
    alignItems: 'center',
    position: 'absolute' as const,
    right: 20,
  },

  brandText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#111827',
    marginLeft: 12,
  },

  navCenter: {
    display: 'flex',
    gap: 32,
    alignItems: 'center',
  },

  navToggle: {
    display: 'none',
    flexDirection: 'column',
    gap: 4,
    cursor: 'pointer',
  },

  toggleIcon: {
    width: 25,
    height: 2,
    background: '#111827',
    transition: 'all 0.3s ease',
  },

  schedule: {
    padding: '100px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },

  countdownSection: {
    background: '#1E3A6F',
    borderRadius: '12px',
    padding: '40px',
    marginBottom: '40px',
    textAlign: 'center' as const,
  },

  countdownHeader: {
    marginBottom: '30px',
  },

  countdownTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '10px',
  },

  countdownSubtitle: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.8)',
  },

  countdownDisplay: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap' as const,
  },

  countdownUnit: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    minWidth: '80px',
    textAlign: 'center' as const,
  },

  countdownValue: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: '5px',
    fontFamily: 'Arial, sans-serif',
  },

  countdownLabel: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },

  countdownSeparator: {
    fontSize: '36px',
    fontWeight: '200',
    color: 'rgba(255, 255, 255, 0.5)',
    alignSelf: 'center' as const,
  },

  scheduleHeader: {
    textAlign: 'center' as const,
    marginBottom: 50,
  },

  scheduleBadge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#fff',
    padding: '8px 20px',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 15,
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
  },

  scheduleTitle: {
    fontSize: 36,
    marginBottom: 12,
    color: '#1E3A6F',
    fontWeight: 600,
    fontFamily: 'Poppins, sans-serif',
    borderBottom: '2px solid #F4C430',
    paddingBottom: 8,
    display: 'inline-block',
  },

  scheduleSubtitle: {
    fontSize: 19,
    color: '#000',
    maxWidth: 700,
    margin: '0 auto',
    lineHeight: 1.6,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
  },

  scheduleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
  },

  scheduleCard: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: '20px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    width: '320px',
    height: '140px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },

  scheduleDay: {
    fontWeight: 600,
    color: '#1E3A6F',
    fontSize: 18,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'Poppins, sans-serif',
    borderBottom: '2px solid #F4C430',
    paddingBottom: 4,
    width: 'fit-content',
  },

  scheduleTime: {
    color: '#000',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: 'Inter, sans-serif',
  },

  timerSection: {
    marginTop: 20,
    padding: '20px 20px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    borderRadius: 20,
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
  },

  timerContainer: {
    maxWidth: 800,
    margin: '0 auto',
    textAlign: 'center',
  },

  timerHeader: {
    marginBottom: 20,
  },

  timerBadge: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    padding: '6px 16px',
    borderRadius: 30,
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },

  timerTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: '#fff',
    marginBottom: 8,
  },

  timerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 0,
  },

  timerDisplay: {
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
    flexWrap: 'wrap',
  },

  timerUnit: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: 12,
    padding: '16px',
    minWidth: 100,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },

  timerValue: {
    fontSize: 32,
    fontWeight: 800,
    color: '#fff',
    marginBottom: 6,
    lineHeight: 1,
  },

  timerLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
    scheduleContainer: {
      padding: '0 40px',
    },
    
    footerContainer: {
      padding: '0 40px',
    },
  },

  '@media (max-width: 768px)': {
    page: {
      paddingTop: '76px',
    },
    
    schedule: {
      padding: '60px 0',
    },
    
    scheduleContainer: {
      padding: '0 20px',
    },
    
    scheduleHeader: {
      textAlign: 'center' as const,
    },
    
    scheduleTitle: {
      fontSize: 32,
    },
    
    scheduleSubtitle: {
      fontSize: 16,
    },
    
    scheduleGrid: {
      gridTemplateColumns: '1fr',
      gap: 16,
    },
    
    scheduleCard: {
      padding: '24px 20px',
    },
    
    scheduleDay: {
      fontSize: 18,
    },
    
    scheduleTime: {
      fontSize: 14,
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
    },
    
    schedule: {
      marginTop: 80,
      padding: '0 12px 30px',
    },
    
    scheduleHeader: {
      marginBottom: 30,
    },
    
    scheduleTitle: {
      fontSize: 28,
    },
    
    scheduleSubtitle: {
      fontSize: 14,
    },
    
    scheduleGrid: {
      gap: 12,
    },
    
    scheduleCard: {
      padding: '20px 16px',
    },
    
    scheduleDay: {
      fontSize: 16,
    },
    
    scheduleTime: {
      fontSize: 13,
    },
    
    },
};
