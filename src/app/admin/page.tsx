'use client'

import React, { useState } from 'react';
import Footer from '../../components/Footer';
import AdminGuard from '../../components/AdminGuard';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // Mock data for demonstration
  const stats = {
    totalBookings: 156,
    upcomingEvents: 8,
    activeMembers: 1247,
    revenue: 45670
  };

  const recentBookings = [
    { id: 1, name: 'John & Mary Smith', service: 'Wedding', date: '2024-05-15', time: '2:00 PM', status: 'confirmed' },
    { id: 2, name: 'Baby Johnson', service: 'Baptism', date: '2024-05-18', time: '10:00 AM', status: 'pending' },
    { id: 3, name: 'Robert Williams', service: 'Funeral', date: '2024-05-20', time: '11:00 AM', status: 'confirmed' },
    { id: 4, name: 'Sarah Davis', service: 'Certificate', date: '2024-05-22', time: '9:00 AM', status: 'processing' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Sunday Mass', date: '2024-05-12', time: '9:00 AM', attendees: 245 },
    { id: 2, title: 'Bible Study', date: '2024-05-14', time: '7:00 PM', attendees: 45 },
    { id: 3, title: 'Community Meeting', date: '2024-05-16', time: '6:00 PM', attendees: 78 },
    { id: 4, title: 'Youth Group', date: '2024-05-17', time: '5:00 PM', attendees: 32 }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Arial, sans-serif'
    },
    mainContent: {
      padding: '80px 20px 20px',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '32px'
    },
    title: {
      fontSize: '32px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: 0
    },
    timeFilter: {
      display: 'flex',
      gap: '8px',
      marginBottom: '32px'
    },
    timeButton: {
      padding: '8px 16px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      backgroundColor: '#fff',
      color: '#6b7280',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease'
    },
    timeButtonActive: {
      backgroundColor: '#dc2626',
      color: '#fff',
      borderColor: '#dc2626'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    statValue: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '32px'
    },
    sectionCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    },
    sectionHeader: {
      padding: '20px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    tableContainer: {
      padding: '20px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const
    },
    tableHeader: {
      textAlign: 'left' as const,
      fontSize: '12px',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase' as const,
      paddingBottom: '12px',
      borderBottom: '1px solid #e5e7eb'
    },
    tableCell: {
      padding: '12px 0',
      fontSize: '14px',
      color: '#374151',
      borderBottom: '1px solid #f3f4f6'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block'
    },
    statusConfirmed: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusPending: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    statusProcessing: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    actionButton: {
      padding: '6px 12px',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      backgroundColor: '#fff',
      color: '#374151',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginRight: '8px'
    },
    actionButtonPrimary: {
      backgroundColor: '#dc2626',
      color: '#fff',
      borderColor: '#dc2626'
    },
    quickActions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '32px'
    },
    quickActionCard: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      textAlign: 'center' as const,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    quickActionIcon: {
      fontSize: '24px',
      marginBottom: '12px'
    },
    quickActionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 4px 0'
    },
    quickActionDescription: {
      fontSize: '12px',
      color: '#6b7280',
      margin: 0
    }
  };

  return (
    <AdminGuard>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>Manage your church operations and view analytics</p>
        </div>

        {/* Time Range Filter */}
        <div style={styles.timeFilter}>
          {['day', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              style={{
                ...styles.timeButton,
                ...(selectedTimeRange === range ? styles.timeButtonActive : {})
              }}
              onClick={() => setSelectedTimeRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Overview */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.totalBookings}</div>
            <div style={styles.statLabel}>Total Bookings</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.upcomingEvents}</div>
            <div style={styles.statLabel}>Upcoming Events</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.activeMembers}</div>
            <div style={styles.statLabel}>Active Members</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>${stats.revenue.toLocaleString()}</div>
            <div style={styles.statLabel}>Revenue</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.quickActions}>
          <div style={styles.quickActionCard} onClick={() => window.location.href = '/admin/users'}>
            <div style={styles.quickActionIcon}>�</div>
            <div style={styles.quickActionTitle}>User Management</div>
            <div style={styles.quickActionDescription}>Manage user roles and permissions</div>
          </div>
          <div style={styles.quickActionCard}>
            <div style={styles.quickActionIcon}>�</div>
            <div style={styles.quickActionTitle}>New Booking</div>
            <div style={styles.quickActionDescription}>Create a new booking</div>
          </div>
          <div style={styles.quickActionCard}>
            <div style={styles.quickActionIcon}>📊</div>
            <div style={styles.quickActionTitle}>Reports</div>
            <div style={styles.quickActionDescription}>View detailed reports</div>
          </div>
          <div style={styles.quickActionCard}>
            <div style={styles.quickActionIcon}>⚙️</div>
            <div style={styles.quickActionTitle}>Settings</div>
            <div style={styles.quickActionDescription}>System settings</div>
          </div>
        </div>

        {/* Recent Bookings and Upcoming Events */}
        <div style={styles.contentGrid}>
          {/* Recent Bookings */}
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Recent Bookings</h2>
            </div>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Service</th>
                    <th style={styles.tableHeader}>Date</th>
                    <th style={styles.tableHeader}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td style={styles.tableCell}>{booking.name}</td>
                      <td style={styles.tableCell}>{booking.service}</td>
                      <td style={styles.tableCell}>{booking.date}</td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.statusBadge,
                          ...(booking.status === 'confirmed' ? styles.statusConfirmed :
                            booking.status === 'pending' ? styles.statusPending :
                            styles.statusProcessing)
                        }}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Events */}
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Upcoming Events</h2>
            </div>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Event</th>
                    <th style={styles.tableHeader}>Date</th>
                    <th style={styles.tableHeader}>Time</th>
                    <th style={styles.tableHeader}>Attendees</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingEvents.map((event) => (
                    <tr key={event.id}>
                      <td style={styles.tableCell}>{event.title}</td>
                      <td style={styles.tableCell}>{event.date}</td>
                      <td style={styles.tableCell}>{event.time}</td>
                      <td style={styles.tableCell}>{event.attendees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
        <Footer />
    </AdminGuard>
  );
}
