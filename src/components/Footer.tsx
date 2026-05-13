import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const styles = {
    footer: {
      background: 'linear-gradient(135deg, #0F2A4A, #2F5FA8)',
      color: '#F5F5F4',
      padding: '20px 20px 5px',
      marginTop: 0,
    },

    footerContainer: {
      maxWidth: 1200,
      margin: '0 auto',
    },

    footerContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 40,
      marginBottom: 30,
      alignItems: 'start',
    },

    footerBrand: {
      flex: 1,
    },

    footerHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 6,
    },

    footerLogo: {
      height: 30,
      width: 'auto',
    },

    footerTitle: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 8,
      color: '#F5F5F4',
      fontFamily: 'Poppins, sans-serif',
      textAlign: 'left' as const,
    },

    footerDescription: {
      fontSize: 13,
      color: '#D6D3D1',
      marginBottom: 12,
      fontFamily: 'Inter, sans-serif',
      lineHeight: 1.4,
      maxWidth: '280px',
      textAlign: 'left' as const,
    },

    socialIcons: {
      display: 'flex',
      gap: 8,
      marginTop: 8,
    },

    socialIcon: {
      width: 32,
      height: 32,
      background: 'rgba(244, 196, 48, 0.1)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#F4C430',
      fontSize: 16,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(244, 196, 48, 0.3)',
    },

    footerLinks: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 8,
    },


    footerLinkGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 4,
    },

    footerLinkTitle: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 8,
      color: '#F5F5F4',
      fontFamily: 'Poppins, sans-serif',
      borderBottom: '2px solid #F4C430',
      paddingBottom: 2,
      display: 'inline-block',
    },

    footerLink: {
      color: '#D6D3D1',
      textDecoration: 'none',
      fontSize: 13,
      transition: 'color 0.3s ease',
      cursor: 'pointer' as const,
      fontFamily: 'Inter, sans-serif',
      marginBottom: 4,
      lineHeight: 1.3,
    },

    footerBottom: {
      borderTop: '1px solid rgba(255, 255, 255, 0.15)',
      paddingTop: 5,
      textAlign: 'center' as const,
    },

    footerCopyright: {
      fontSize: 11,
      color: '#A8A29E',
      fontFamily: 'Inter, sans-serif',
    },


    // Responsive styles
    '@media (max-width: 768px)': {
      footer: {
        padding: '30px 15px 15px',
      },
      footerContent: {
        gridTemplateColumns: '1fr',
        gap: 20,
      },
      footerBrand: {
        textAlign: 'center',
      },
      footerTitle: {
        textAlign: 'center',
      },
      footerDescription: {
        textAlign: 'center',
        maxWidth: '100%',
      },
      socialIcons: {
        justifyContent: 'center',
      },
      footerLinks: {
        textAlign: 'center',
      },
      footerBottom: {
        marginTop: 20,
      },
    },

    '@media (max-width: 480px)': {
      footer: {
        padding: '20px 15px 10px',
      },

      footerTitle: {
        fontSize: 14,
      },

      footerCopyright: {
        fontSize: 10,
      },
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <div style={styles.footerHeader}>
              <img src="/images/logo church.png" alt="Church Logo" style={styles.footerLogo} />
              <h3 style={styles.footerTitle}>Our Lady of the Rosary Parish</h3>
            </div>
            <p style={styles.footerDescription}>A community of faith, hope, and love. We are dedicated to worship, service, and spiritual growth.</p>
            <div style={styles.socialIcons}>
              <div style={styles.socialIcon}>f</div>
              <div style={styles.socialIcon}>t</div>
              <div style={styles.socialIcon}>in</div>
            </div>
          </div>
          <div style={styles.footerLinks}>
            <div style={styles.footerLinkGroup}>
              <h4 style={styles.footerLinkTitle}>Contact</h4>
              <p style={styles.footerLink}>Purok-4, Barangay Poblacion</p>
              <p style={styles.footerLink}>Magallanes, Agusan del Norte</p>
              <p style={styles.footerLink}>09919417157</p>
              <p style={styles.footerLink}>nsdrparish56@gmail.com</p>
            </div>
          </div>
          <div style={styles.footerLinks}>
            <div style={styles.footerLinkGroup}>
              <h4 style={styles.footerLinkTitle}>Working Time</h4>
              <p style={styles.footerLink}>Monday - Friday</p>
              <p style={styles.footerLink}>8:00 AM - 5:00 PM</p>
              <p style={styles.footerLink}>Saturday</p>
              <p style={styles.footerLink}>9:00 AM - 12:00 PM</p>
              <p style={styles.footerLink}>Sunday</p>
              <p style={styles.footerLink}>Mass Schedule</p>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerCopyright}>&copy; 2024 Our Lady of the Rosary Parish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
