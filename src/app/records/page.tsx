'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';

export default function Records() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<any>({
    weddings: [],
    baptisms: [],
    funerals: [],
    confessions: [],
    certificates: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user bookings from database
  useEffect(() => {
    if (!user?.id) return;
    
    let cancelled = false;
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const { bookingService } = await import('../../services/supabase');
        const data = await bookingService.getAllBookings(user.id);
        if (!cancelled) {
          setBookings(data);
          setError(null);
        }
      } catch (err: any) {
        if (!cancelled) {
          console.error('Failed to fetch bookings:', err);
          setError(err.message || 'Failed to load bookings');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBookings();
    return () => { cancelled = true; };
  }, [user]);

  // Combine all bookings into a single array for display
  const allBookings: any[] = [
    ...bookings.weddings.map((b: any) => ({...b, type: 'wedding', date: b.wedding_date, time: b.wedding_time})),
    ...bookings.baptisms.map((b: any) => ({...b, type: 'baptism', date: b.baptism_date, time: b.baptism_time})),
    ...bookings.funerals.map((b: any) => ({...b, type: 'funeral', date: b.funeral_date, time: b.funeral_time})),
    ...bookings.confessions.map((b: any) => ({...b, type: 'confession', date: b.confession_date, time: b.confession_time})),
    ...bookings.certificates.map((b: any) => ({
      ...b,
      type: 'certificate',
      date: b.date_needed || b.created_at,
      // certificate_bookings has date (date_needed) but no time column
      time: null
    }))
  ].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const certificateRecords: any[] = bookings.certificates;


  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Arial, sans-serif'
    },
    mainContent: {
      padding: '80px 20px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '40px'
    },
    title: {
      fontSize: '32px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    tabsContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '32px',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '4px'
    },
    tab: {
      padding: '12px 24px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px 8px 0 0',
      fontSize: '16px',
      fontWeight: '500',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    activeTab: {
      backgroundColor: '#fff',
      color: '#dc2626',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    recordsContainer: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '24px',
      margin: 0
    },
    recordsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px'
    },
    recordCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      transition: 'all 0.2s ease',
      position: 'relative' as const,
      minHeight: '180px'
    },
    recordCardHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    recordIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontSize: '20px'
    },
    weddingIcon: {
      backgroundColor: '#fef3c7',
      color: '#d97706'
    },
    baptismIcon: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    funeralIcon: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    confessionIcon: {
      backgroundColor: '#ede9fe',
      color: '#6b21a8'
    },
    certificateIcon: {
      backgroundColor: '#dcfce7',
      color: '#15803d'
    },
    recordContent: {
      flex: 1,
      marginLeft: '16px'
    },
    recordType: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 8px 0',
      lineHeight: '1.3'
    },
    recordDetails: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '4px'
    },
    recordDateTime: {
      fontSize: '14px',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    recordLocation: {
      fontSize: '13px',
      color: '#9ca3af',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      position: 'absolute' as const,
      top: '20px',
      right: '20px'
    },
    statusPending: {
      backgroundColor: '#fef3c7',
      color: '#d97706'
    },
    statusApproved: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    statusCompleted: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    statusCancelled: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    deliveryMethod: {
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '500',
      marginLeft: '8px'
    },
    deliverySoftCopy: {
      backgroundColor: '#f0f9ff',
      color: '#0369a1'
    },
    deliveryHardCopy: {
      backgroundColor: '#f5f5f4',
      color: '#374151'
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Records</h1>
        </div>

        {/* Tabs */}
        <div style={styles.tabsContainer}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'bookings' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
        </div>

        {/* Records Content */}
        <div style={styles.recordsContainer}>
          {activeTab === 'bookings' && (
            <div>
              <h2 style={styles.sectionTitle}>Booking Records</h2>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    border: '4px solid #e5e7eb',
                    borderTopColor: '#1d4ed8',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 16px'
                  }}></div>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading your bookings...</p>
                </div>
              ) : error ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: '#fee2e2',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <span style={{ fontSize: '24px', color: '#dc2626' }}>!</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#dc2626', marginBottom: '8px' }}>
                    Failed to Load Bookings
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>{error}</p>
                </div>
              ) : allBookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ 
                    fontSize: '48px', 
                    marginBottom: '16px',
                    opacity: 0.3
                  }}>📅</div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#1f2937', 
                    marginBottom: '8px' 
                  }}>
                    No Bookings Yet
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    marginBottom: '24px'
                  }}>
                    You haven't made any sacrament bookings yet. Start by booking your first sacrament!
                  </p>

                </div>
              ) : (
                <div style={styles.recordsGrid}>
                  {allBookings.map((record: any) => (
                    <div key={`${record.type}-${record.id}`} style={styles.recordCard}>
                      <div style={{
                        ...styles.statusBadge,
                        ...(record.status === 'approved' ? styles.statusApproved : 
                         record.status === 'pending' ? styles.statusPending : 
                         record.status === 'completed' ? styles.statusCompleted :
                         record.status === 'cancelled' ? styles.statusCancelled :
                         styles.statusPending)
                      }}>
                        {record.status}
                      </div>
                      
                      <div style={styles.recordCardHeader}>
                        <div style={{
                          ...styles.recordIcon,
                          ...(record.type === 'wedding' ? styles.weddingIcon :
                           record.type === 'baptism' ? styles.baptismIcon :
                           record.type === 'funeral' ? styles.funeralIcon :
                           record.type === 'confession' ? styles.confessionIcon :
                           record.type === 'certificate' ? styles.certificateIcon :
                           styles.weddingIcon)
                        }}>
                          {record.type === 'wedding' ? '💑' :
                           record.type === 'baptism' ? '👶' :
                           record.type === 'funeral' ? '⚰️' :
                           record.type === 'confession' ? '🙏' :
                           record.type === 'certificate' ? '📜' :
                           '📅'}
                        </div>
                        
                        <div style={styles.recordContent}>
                          <div style={styles.recordType}>
                            {record.type === 'wedding' ? `Wedding - ${record.bride_first_name} & ${record.groom_first_name}` :
                             record.type === 'baptism' ? `Baptism - ${record.child_first_name}` :
                             record.type === 'funeral' ? `Funeral - ${record.deceased_first_name}` :
                             record.type === 'confession' ? `Confession - ${record.penitent_first_name}` :
                             record.type === 'certificate' ? `Certificate - ${record.certificate_type}` :
                             record.type}
                          </div>
                          
                          <div style={styles.recordDetails}>
                            <div style={styles.recordDateTime}>
                              📅 {new Date(record.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            {record.time && (
                              <div style={styles.recordDateTime}>
                                ⏰ {record.time}
                              </div>
                            )}
                            {record.type === 'certificate' && (
                              <div style={styles.recordDateTime}>
                                📋 Purpose: {record.purpose}
                              </div>
                            )}
                            <div style={styles.recordLocation}>
                              📍 Our Lady of the Rosary Parish, Magallanes
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div>
              <h2 style={styles.sectionTitle}>Certificate Requests</h2>
              {certificateRecords.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ 
                    fontSize: '48px', 
                    marginBottom: '16px',
                    opacity: 0.3
                  }}>📄</div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#1f2937', 
                    marginBottom: '8px' 
                  }}>
                    No Certificate Requests Yet
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    marginBottom: '24px'
                  }}>
                    You haven't requested any certificates yet. Certificate requests will appear here once you make them.
                  </p>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '8px',
                    border: '1px solid #dbeafe',
                    textAlign: 'left',
                    maxWidth: '500px',
                    margin: '0 auto'
                  }}>
                    <h4 style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#1e40af', 
                      marginBottom: '8px',
                      margin: '0 0 8px 0'
                    }}>
                      Available Certificates:
                    </h4>
                    <ul style={{ 
                      fontSize: '13px', 
                      color: '#64748b', 
                      margin: 0,
                      paddingLeft: '20px',
                      lineHeight: '1.5'
                    }}>
                      <li>Baptism Certificate</li>
                      <li>Marriage Certificate</li>
                      <li>Death Certificate</li>
                      <li>Confirmation Certificate</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div style={styles.recordsGrid}>
                  {certificateRecords.map((record: any) => (
                    <div key={record.id} style={styles.recordCard}>
                      <div style={{
                        ...styles.statusBadge,
                        ...(record.status === 'completed' ? styles.statusCompleted :
                         record.status === 'processing' ? styles.statusPending :
                         record.status === 'approved' ? styles.statusApproved :
                         styles.statusPending)
                      }}>
                        {record.status}
                      </div>
                      
                      <div style={styles.recordCardHeader}>
                        <div style={{
                          ...styles.recordIcon,
                          ...(record.type.includes('Baptism') ? styles.baptismIcon :
                           record.type.includes('Marriage') ? styles.weddingIcon :
                           record.type.includes('Death') ? styles.funeralIcon :
                           styles.baptismIcon)
                        }}>
                          📄
                        </div>
                        
                        <div style={styles.recordContent}>
                          <div style={styles.recordType}>
                            {record.certificate_type || record.type}
                          </div>

                          
                          <div style={styles.recordDetails}>
                            <div style={styles.recordDateTime}>
                              📅 {new Date(record.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>

                          <div style={styles.recordLocation}>
                              📍 Status: {record.status}
                              {record.pickup_method && (

                                <div style={{
                                  ...styles.deliveryMethod,
                                  ...(record.pickup_method === 'mail' || record.pickup_method === 'email'
                                    ? styles.deliverySoftCopy
                                    : styles.deliveryHardCopy)
                                }}>
                                  {record.pickup_method}

                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
