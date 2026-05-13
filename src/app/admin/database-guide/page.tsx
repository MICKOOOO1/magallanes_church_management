'use client'

import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AdminGuard from '../../../components/AdminGuard';

export default function DatabaseGuide() {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Arial, sans-serif'
    },
    mainContent: {
      padding: '80px 20px 20px',
      maxWidth: '1000px',
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
    section: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '32px',
      marginBottom: '24px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 16px 0'
    },
    codeBlock: {
      backgroundColor: '#1f2937',
      color: '#f3f4f6',
      padding: '20px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '14px',
      overflow: 'auto',
      margin: '16px 0'
    },
    sqlKeyword: {
      color: '#f472b6'
    },
    sqlString: {
      color: '#86efac'
    },
    sqlComment: {
      color: '#6b7280',
      fontStyle: 'italic'
    },
    warning: {
      backgroundColor: '#fef3c7',
      border: '1px solid #fcd34d',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0'
    },
    warningTitle: {
      color: '#92400e',
      fontWeight: '600',
      margin: '0 0 8px 0'
    },
    warningText: {
      color: '#92400e',
      margin: 0
    },
    note: {
      backgroundColor: '#dbeafe',
      border: '1px solid #bfdbfe',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0'
    },
    noteTitle: {
      color: '#1e40af',
      fontWeight: '600',
      margin: '0 0 8px 0'
    },
    noteText: {
      color: '#1e40af',
      margin: 0
    },
    list: {
      margin: '16px 0',
      paddingLeft: '20px'
    },
    listItem: {
      marginBottom: '8px',
      color: '#374151'
    }
  };

  return (
    <AdminGuard>
      <div style={styles.container}>
        <Navbar />
        
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <h1 style={styles.title}>Database Role Management Guide</h1>
            <p style={styles.subtitle}>Manual SQL queries for managing user roles in the database</p>
          </div>

          {/* View Current Roles */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📋 View Current User Roles</h2>
            <p>See all users and their current roles:</p>
            <div style={styles.codeBlock}>
              <div><span style={styles.sqlKeyword}>SELECT</span> id, email, first_name, last_name, role, is_active, created_at</div>
              <div><span style={styles.sqlKeyword}>FROM</span> user_profiles</div>
              <div><span style={styles.sqlKeyword}>ORDER BY</span> created_at <span style={styles.sqlKeyword}>DESC</span>;</div>
            </div>
          </div>

          {/* Assign Admin Role */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🔐 Assign Admin Role</h2>
            <p>Make a user an administrator:</p>
            <div style={styles.codeBlock}>
              <div><span style={styles.sqlComment}>-- Replace 'user-email@example.com' with the actual email</span></div>
              <div><span style={styles.sqlKeyword}>UPDATE</span> user_profiles</div>
              <div><span style={styles.sqlKeyword}>SET</span> role = <span style={styles.sqlString}>'admin'</span>,</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;permissions = <span style={styles.sqlString}>'["view_own_profile","edit_own_profile","view_all_profiles","edit_all_profiles","manage_roles","view_statistics","view_bookings","manage_bookings","view_events","manage_events"]'</span></div>
              <div><span style={styles.sqlKeyword}>WHERE</span> email = <span style={styles.sqlString}>'user-email@example.com'</span>;</div>
            </div>
          </div>

          {/* Assign Member Role */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>👥 Assign Member Role</h2>
            <p>Make a user a regular member:</p>
            <div style={styles.codeBlock}>
              <div><span style={styles.sqlComment}>-- Replace 'user-email@example.com' with the actual email</span></div>
              <div><span style={styles.sqlKeyword}>UPDATE</span> user_profiles</div>
              <div><span style={styles.sqlKeyword}>SET</span> role = <span style={styles.sqlString}>'member'</span>,</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;permissions = <span style={styles.sqlString}>'["view_own_profile","edit_own_profile"]'</span></div>
              <div><span style={styles.sqlKeyword}>WHERE</span> email = <span style={styles.sqlString}>'user-email@example.com'</span>;</div>
            </div>
          </div>

          {/* Available Roles */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🎭 Available Roles</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}><strong>admin</strong> - Full system access, can manage all users and settings</li>
              <li style={styles.listItem}><strong>priest</strong> - Can view and manage bookings and sacraments</li>
              <li style={styles.listItem}><strong>staff</strong> - Can view and manage events and basic operations</li>
              <li style={styles.listItem}><strong>member</strong> - Regular church member with basic profile access</li>
            </ul>
          </div>

          <div style={styles.warning}>
            <div style={styles.warningTitle}>⚠️ Important Security Notes</div>
            <div style={styles.warningText}>
              Always backup your database before making direct changes. Be careful when assigning admin roles - only give admin access to trusted users.
            </div>
          </div>

          <div style={styles.note}>
            <div style={styles.noteTitle}>💡 Pro Tip</div>
            <div style={styles.noteText}>
              You can also use the User Management interface at /admin/users for a more user-friendly way to manage roles without writing SQL queries.
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
