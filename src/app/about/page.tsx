'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AuthModals from '../../components/AuthModals';

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showVisionText, setShowVisionText] = useState(false);
  const [showIntroductionText, setShowIntroductionText] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div style={styles.page}>
      <Navbar 
        showLoginModal={showLoginModal}
        showSignupModal={showSignupModal}
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />

      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <div style={styles.heroBadge}>About Us</div>
          <h2 style={{
            fontSize: 50,
            fontWeight: 1000,
            color: '#fff',
            textShadow: '0 3px 6px rgba(0,0,0,0.3)',
            letterSpacing: 1,
            marginBottom: 16
          }}>A Community of Faith, Hope and Love</h2>
          <h2 style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#fff',
            textShadow: '0 3px 6px rgba(0,0,0,0.3)',
            letterSpacing: 1,
            fontFamily: 'serif',
            fontStyle: 'italic',
            marginBottom: 16
          }}>Pray together, live with love! Believe together, grow in faith!</h2>
        </div>
      </section>

      <section style={styles.mainSection}>
        <div style={styles.mainContainer}>
          <div style={styles.contentGrid}>
            <div style={styles.leftContent}>
              <div style={styles.imageStack}>
                <div style={styles.imageCard}>
                  <img src="/images/altar server.jpg" alt="Community Service" style={styles.mainImage} />
                  <div style={styles.imageOverlay}>
                    <span style={styles.imageText}>Serve Together</span>
                  </div>
                </div>
                <div style={styles.imageCard}>
                  <img src="/images/asher.jpg" alt="Community Fellowship" style={styles.mainImage} />
                  <div style={styles.imageOverlay}>
                    <span style={styles.imageText}>Grow Together</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={styles.rightContent}>
              <h2 style={{
                    ...styles.contentTitle, 
                    color: '#eab749',
                    fontSize: 20,
                    fontFamily: 'Georgia, serif',
                    fontWeight: 600,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: 16
                  }}>ABOUT OUR PARISH</h2>
              <h2 style={{
                    ...styles.contentTitle,
                    color: '#1E3A6F',
                    fontSize: 21,
                    fontFamily: 'Georgia, serif',
                    fontWeight: 600,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: 16
                  }}>WELCOMING COMMUNITY ROOTED IN FAITH</h2>
              <p style={{
                    ...styles.contentSubtitle,
                    color: '#1E3A6F',
                    fontSize: 15,
                    fontFamily: 'Georgia, serif',
                    textTransform: 'uppercase',
                    marginBottom: 32
                  }}>WHERE CONNECTION, GROWTH, AND SUPPORT ENRICH EVERY JOURNEY</p>
              
              <div style={{display: 'flex', gap: 40, marginBottom: 32, justifyContent: 'center'}}>
                <div style={styles.introductionBadge}
                     onClick={() => {
                       setActiveSection('introduction');
                       setShowVisionText(false);
                       setShowIntroductionText(true);
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.backgroundColor = '#102B4E';
                       e.currentTarget.style.color = '#fff';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.backgroundColor = 'transparent';
                       e.currentTarget.style.color = '#000';
                     }}>
                  INTRODUCTION
                </div>

                <div style={styles.parishHistoryBadge}
                     onClick={() => {
                       setActiveSection('vision');
                       setShowVisionText(true);
                       setShowIntroductionText(false);
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.backgroundColor = '#102B4E';
                       e.currentTarget.style.color = '#fff';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.backgroundColor = 'transparent';
                       e.currentTarget.style.color = '#000';
                     }}>
                  PARISH HISTORY
                </div>
              </div>
              
              {showIntroductionText && (
                <div style={{...styles.contentText, marginTop: 24, marginBottom: 24}}>
                  <p style={{
                    ...styles.paragraph,
                    color: '#000',
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    lineHeight: 1.6,
                    textTransform: 'none'
                  }}>
                   Nuestra Señora Del Rosario Parish Magallanes is a Catholic community rooted in faith, devotion, and service. Guided by our love for Christ and under the patronage of the Blessed Virgin Mary, we strive to be a welcoming parish where everyone can grow spiritually and find a sense of belonging.
                    </p>
                    <p style={{
                     ...styles.paragraph,
                     color: '#000',
                     fontSize: 16,
                     fontFamily: 'Poppins',
                     lineHeight: 1.6,
                     textTransform: 'none'
                   }}>
                    Located in Magallanes, Agusan del Norte, our parish serves as a center of worship and unity, bringing together families and individuals through the celebration of the Holy Mass, sacraments, and various ministries. We are committed to living out the gospel by serving others and strengthening our community in faith, hope, and love.
                   </p>
                </div>
              )}

              {showVisionText && (
                <div style={{...styles.contentText, marginTop: 24, marginBottom: 24}}>
                  <p style={{
                    ...styles.paragraph,
                    color: '#000',
                    fontSize: 16,
                    fontFamily: 'Merriweather',
                    lineHeight: 1.6,
                    textTransform: 'none'
                  }}>
                   Nuestra Señora del Rosario Parish, under the Roman Catholic Diocese of Butuan, was established in 1965 in the Municipality of Magallanes, Province of Agusan del Sur. From its beginnings as a humble place of worship serving a small but devoted community, the parish has grown into a vibrant center of Catholic life in the area. </p>
                    <p style={{
                     ...styles.paragraph,
                     color: '#000',
                     fontSize: 16,
                     fontFamily: 'Merriweather',
                     lineHeight: 1.6,
                     textTransform: 'none'
                   }}>
                     The parish&apos;s deep devotion to Nuestra Señora del Rosario continues to inspire its mission of faith, unity, and service. Each year, this devotion is joyfully expressed during the Parish Fiesta, celebrated every third Saturday of October, bringing together parishioners and visitors in thanksgiving, prayer, and community celebration.
                    </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      
      <section style={styles.pastorSection}>
        <div style={styles.pastorContainer}>
          <div style={styles.pastorHeader}>
            <h2 style={{...styles.pastorTitle, fontFamily: 'Poppins'}}>Meet Our Priest</h2>
            <p style={{...styles.pastorSubtitle, fontFamily: 'Poppins'}}>Dedicated servants guiding our faith community</p>
          </div>
          <div style={styles.pastorGrid}>
            <div style={styles.pastorCard}>
              <img src="/images/Fr. Cepida.jpg" alt="Pastor" style={styles.pastorImage} />
              <div style={styles.pastorInfo}>
                <h3 style={{...styles.pastorName, fontFamily: 'Poppins'}}>Rev. Fr. Jun Cepida</h3>
                <p style={{...styles.pastorRole, fontFamily: 'Poppins'}}>Senior Pastor</p>
                <p style={{...styles.pastorBio, fontFamily: 'Poppins'}}>Leading our community with wisdom, compassion, and spiritual guidance</p>
              </div>
            </div>
            <div style={styles.pastorCard}>
              <img src="/images/Fr. Mamart.jpg" alt="Pastor" style={styles.pastorImage} />
              <div style={styles.pastorInfo}>
                <h3 style={{...styles.pastorName, fontFamily: 'Poppins'}}>Rev. Fr. Mart James C. Presillas</h3>
                <p style={{...styles.pastorRole, fontFamily: 'Poppins'}}>Associate Pastor</p>
                <p style={{...styles.pastorBio, fontFamily: 'Poppins'}}>Supporting our spiritual growth and community outreach programs</p>
              </div>
            </div>
            <div style={styles.pastorCard}>
              <img src="/images/Fr. Dirk.jpg" alt="Pastor" style={styles.pastorImage} />
              <div style={styles.pastorInfo}>
                <h3 style={{...styles.pastorName, fontFamily: 'Poppins'}}>Rev. Fr. Alfonso Dirk Sanchez</h3>
                <p style={{...styles.pastorRole, fontFamily: 'Poppins'}}>Deacon</p>
                <p style={{...styles.pastorBio, fontFamily: 'Poppins'}}>Serving our community through pastoral care and spiritual support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <AuthModals 
        showLoginModal={showLoginModal}
        showSignupModal={showSignupModal}
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#ffffff',
    color: '#111827',
  },

  heroSection: {
    padding: '140px 20px 80px',
    background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/images/mary2.png")',
    backgroundSize: 'cover',
    backgroundPosition: '10% center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    textAlign: 'center' as const,
    minHeight: '481px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },

  heroContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px',
  },

  heroBadge: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: 25,
    fontSize: 15,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 24,
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },

  mainSection: {
    padding: '90px 20px',
    background: '#F5F7FA',
  },

  mainContainer: {
    maxWidth: 1200,
    margin: '0 auto',
  },

  contentGrid: {
    display: 'flex',
    gap: 70,
    alignItems: 'flex-start',
  },

  leftContent: {
    flex: 1,
  },

  rightContent: {
    flex: 1,
  },

  imageStack: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 20,
  },

  imageCard: {
    position: 'relative' as const,
    borderRadius: 15,
    overflow: 'hidden' as const,
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    transition: 'transform 0.3s ease',
  },

  mainImage: {
    width: '100%',
    height: 220,
    objectFit: 'cover' as const,
  },

  imageOverlay: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
    padding: '30px 20px 20px',
    opacity: 1,
  },

  imageText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 700,
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  },

  introductionBadge: {
    display: 'inline-block',
    background: 'transparent',
    color: '#000',
    padding: '6px 20px',
    borderRadius: 2,
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid #102B4E',
  },

  parishHistoryBadge: {
    display: 'inline-block',
    background: 'transparent',
    color: '#000',
    padding: '6px 20px',
    borderRadius: 2,
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid #102B4E',
  },

  contentTitle: {
    fontSize: 30,
    fontWeight: 600,
    color: '#1E3A6F',
    marginBottom: 16,
    lineHeight: 1.9,
  },

  contentSubtitle: {
    fontSize: 19,
    color: '#000',
    marginBottom: 24,
    fontWeight: 500,
  },

  contentText: {
    color: '#000',
    padding: '24px 0',
  },

  paragraph: {
    fontSize: 16,
    color: '#000',
    lineHeight: 1.8,
    marginBottom: 24,
  },

  pastorSection: {
    padding: '70px 10px',
    background: '#E3F3FB',
  },

  pastorContainer: {
    maxWidth: 1200,
    margin: '0 auto',
  },

  pastorHeader: {
    textAlign: 'center' as const,
    marginBottom: 60,
  },

  pastorTitle: {
    fontSize: 35,
    fontWeight: 700,
    color: '#1E3A6F',
    marginBottom: 16,
  },

  pastorSubtitle: {
    fontSize: 18,
    color: '#000',
    maxWidth: 500,
    margin: '0 auto',
  },

  pastorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 40,
  },

  pastorCard: {
    background: '#FFF8F0',
    borderRadius: 15,
    overflow: 'hidden' as const,
    boxShadow: '0 100px 30px rgba(0,0,0,0.1)',
    border: '1px solid rgba(59, 130, 246, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },

  pastorImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover' as const,
  },

  pastorInfo: {
    padding: '20px',
  },

  pastorName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1e40af',
    marginBottom: 8,
  },

  pastorRole: {
    fontSize: 14,
    color: '#eab749',
    fontWeight: 600,
    marginBottom: 16,
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },

  pastorBio: {
    fontSize: 15,
    color: '#000',
    lineHeight: 1.6,
  },
};
