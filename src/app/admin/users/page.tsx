'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AdminGuard from '../../../components/AdminGuard';
import { userProfileService, adminService } from '../../../services/user-profiles';
import { UserProfile, USER_ROLES } from '../../../types/user-profiles';

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const userList = await adminService.getAllUsers();
      setUsers(userList);
    } catch (error) {
      console.error('Error loading users:', error);
      setErrorMessage('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      setSuccessMessage('User role updated successfully');
      loadUsers(); // Reload users to reflect changes
      setShowRoleModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating role:', error);
      setErrorMessage('Failed to update user role');
    }
  };

  const handleStatusToggle = async (userId: string, isActive: boolean) => {
    try {
      await adminService.toggleUserStatus(userId, isActive);
      setSuccessMessage(`User ${isActive ? 'activated' : 'deactivated'} successfully`);
      loadUsers();
    } catch (error) {
      console.error('Error toggling status:', error);
      setErrorMessage('Failed to update user status');
    }
  };

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
    tableContainer: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
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
      padding: '16px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb'
    },
    tableCell: {
      padding: '16px',
      fontSize: '14px',
      color: '#374151',
      borderBottom: '1px solid #f3f4f6'
    },
    roleBadge: {
      padding: '4px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block'
    },
    roleAdmin: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    rolePriest: {
      backgroundColor: '#ddd6fe',
      color: '#5b21b6'
    },
    roleStaff: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    roleMember: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block'
    },
    statusActive: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusInactive: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
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
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '32px',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 24px 0'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '14px',
      color: '#374151'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '24px'
    },
    button: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    buttonPrimary: {
      backgroundColor: '#dc2626',
      color: '#fff'
    },
    buttonSecondary: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    message: {
      padding: '12px 16px',
      borderRadius: '6px',
      marginBottom: '16px',
      fontSize: '14px'
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
    }
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case USER_ROLES.ADMIN: return styles.roleAdmin;
      case USER_ROLES.PRIEST: return styles.rolePriest;
      case USER_ROLES.STAFF: return styles.roleStaff;
      case USER_ROLES.MEMBER: return styles.roleMember;
      default: return styles.roleMember;
    }
  };

  const getStatusBadgeStyle = (isActive: boolean) => {
    return isActive ? styles.statusActive : styles.statusInactive;
  };

  if (loading) {
    return (
      <AdminGuard>
        <div style={styles.container}>
          <Navbar />
          <div style={styles.mainContent}>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              Loading users...
            </div>
          </div>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div style={styles.container}>
        <Navbar />
        
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <h1 style={styles.title}>User Management</h1>
            <p style={styles.subtitle}>Manage user roles and permissions</p>
          </div>

          {successMessage && (
            <div style={{ ...styles.message, ...styles.messageSuccess }}>
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div style={{ ...styles.message, ...styles.messageError }}>
              {errorMessage}
            </div>
          )}

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>User</th>
                  <th style={styles.tableHeader}>Email</th>
                  <th style={styles.tableHeader}>Role</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Location</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={styles.tableCell}>
                      {user.first_name} {user.last_name}
                    </td>
                    <td style={styles.tableCell}>{user.email}</td>
                    <td style={styles.tableCell}>
                      <span style={{ ...styles.roleBadge, ...getRoleBadgeStyle(user.role) }}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{ ...styles.statusBadge, ...getStatusBadgeStyle(user.is_active) }}>
                        {user.is_active ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      {user.purok}, {user.barangay}
                    </td>
                    <td style={styles.tableCell}>
                      <button
                        style={styles.actionButton}
                        onClick={() => {
                          setSelectedUser(user);
                          setShowRoleModal(true);
                        }}
                      >
                        Change Role
                      </button>
                      <button
                        style={{
                          ...styles.actionButton,
                          ...(user.is_active ? styles.actionButtonPrimary : {})
                        }}
                        onClick={() => handleStatusToggle(user.id, !user.is_active)}
                      >
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Change User Role</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>User</label>
              <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
                {selectedUser.first_name} {selectedUser.last_name} ({selectedUser.email})
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>New Role</label>
              <select
                style={styles.select}
                defaultValue={selectedUser.role}
                onChange={(e) => {
                  if (selectedUser) {
                    setSelectedUser({ ...selectedUser, role: e.target.value as any });
                  }
                }}
              >
                <option value={USER_ROLES.MEMBER}>Member</option>
                <option value={USER_ROLES.STAFF}>Staff</option>
                <option value={USER_ROLES.PRIEST}>Priest</option>
                <option value={USER_ROLES.ADMIN}>Admin</option>
              </select>
            </div>

            <div style={styles.buttonGroup}>
              <button
                style={{ ...styles.button, ...styles.buttonSecondary }}
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                }}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonPrimary }}
                onClick={() => handleRoleChange(selectedUser.id, selectedUser.role)}
              >
                Update Role
              </button>
            </div>
            </div>
          </div>
        )}
    </AdminGuard>
  );
}
