// User Profile Types for Church Management

export interface UserProfile {
  id: string;
  email: string;
  
  // Personal Information
  first_name: string;
  middle_name?: string;
  last_name: string;
  extension_name?: string;
  dob: string;
  age: number;
  sex: 'male' | 'female';
  
  // Contact Information
  contact_number?: string;
  
  // Location Information
  purok: string;
  barangay: string;
  
  // Account Information
  is_active: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  
  // Profile Settings
  profile_image_url?: string;
  bio?: string;
  preferences: Record<string, any>;
  
  // Role and Permissions
  role: 'admin' | 'priest' | 'staff' | 'member';
  permissions: string[];
  
  // Timestamps
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface UserStatistics {
  total_users: number;
  active_users: number;
  verified_users: number;
  admins: number;
  priests: number;
  staff: number;
  members: number;
  male_users: number;
  female_users: number;
  average_age: number;
  covered_barangays: string;
}

export interface UserDirectory {
  id: string;
  email: string;
  full_name: string;
  first_name: string;
  last_name: string;
  barangay: string;
  purok: string;
  role: 'admin' | 'priest' | 'staff' | 'member';
  is_active: boolean;
  created_at: string;
}

export interface CreateUserProfileData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  extension_name?: string;
  dob: string;
  age: number;
  sex: 'male' | 'female';
  purok: string;
  barangay: string;
  contact_number?: string;
}

export interface UpdateUserProfileData {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  extension_name?: string;
  dob?: string;
  age?: number;
  sex?: 'male' | 'female';
  purok?: string;
  barangay?: string;
  contact_number?: string;
  profile_image_url?: string;
  bio?: string;
  preferences?: Record<string, any>;
}

export interface UserPreferences {
  email_notifications: boolean;
  sms_notifications: boolean;
  language: string;
  timezone: string;
  privacy_settings: {
    show_email: boolean;
    show_phone: boolean;
    show_location: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
}

// User roles and permissions
export const USER_ROLES = {
  ADMIN: 'admin',
  PRIEST: 'priest',
  STAFF: 'staff',
  MEMBER: 'member'
} as const;

export const USER_PERMISSIONS = {
  // General permissions
  VIEW_OWN_PROFILE: 'view_own_profile',
  EDIT_OWN_PROFILE: 'edit_own_profile',
  
  // Admin permissions
  VIEW_ALL_PROFILES: 'view_all_profiles',
  EDIT_ALL_PROFILES: 'edit_all_profiles',
  MANAGE_ROLES: 'manage_roles',
  VIEW_STATISTICS: 'view_statistics',
  
  // Priest permissions
  VIEW_BOOKINGS: 'view_bookings',
  MANAGE_BOOKINGS: 'manage_bookings',
  
  // Staff permissions
  VIEW_EVENTS: 'view_events',
  MANAGE_EVENTS: 'manage_events'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
export type UserPermission = typeof USER_PERMISSIONS[keyof typeof USER_PERMISSIONS];
