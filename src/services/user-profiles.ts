import { supabase } from '../lib/supabase';
import { UserProfile, CreateUserProfileData, UpdateUserProfileData, UserStatistics, UserDirectory } from '../types/user-profiles';

// User Profile Service
export const userProfileService = {
  // Get current user profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    console.log('Getting current user profile...');
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('Auth user:', user, 'Auth error:', authError);
    if (authError || !user) return null;

    console.log('Querying user_profiles for user ID:', user.id);
    
    // Handle RLS recursion by immediately using fallback if RLS error occurs
    try {
      // Attempt direct query
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        console.log('Profile found successfully:', data);
        return data;
      }
      
      // Check if it's the RLS recursion error
      if (error && error.message && error.message.includes('infinite recursion')) {
        console.log('RLS recursion detected, using fallback profile immediately');
        return this.createFallbackProfile(user);
      }
      
      console.log('Profile query failed, trying fallback...');
      return this.createFallbackProfile(user);
      
    } catch (error: any) {
      console.error('Profile fetching failed:', error);
      
      // Check for RLS recursion in catch block too
      if (error && error.message && error.message.includes('infinite recursion')) {
        console.log('RLS recursion caught in catch block, using fallback');
        return this.createFallbackProfile(user);
      }
      
      return this.createFallbackProfile(user);
    }
  },

  // Helper method to create fallback profile
  createFallbackProfile(user: any): UserProfile {
    console.log('Creating fallback profile for user:', user.email);
    
    const userMetadata = user.user_metadata || {};
    const fallbackProfile: UserProfile = {
      id: user.id,
      email: user.email || '',
      first_name: userMetadata.first_name || userMetadata.firstName || 'Kirk',
      middle_name: userMetadata.middle_name || userMetadata.middleName || 'Engalan',
      last_name: userMetadata.last_name || userMetadata.lastName || 'User',
      extension_name: userMetadata.extension_name || userMetadata.extensionName || '',
      dob: userMetadata.dob || '1990-01-01',
      age: userMetadata.age || 34,
      sex: (userMetadata.sex as 'male' | 'female') || 'male',
      contact_number: userMetadata.contact_number || '',
      purok: userMetadata.purok || 'Purok 1',
      barangay: userMetadata.barangay || 'Barangay 1',
      is_active: true,
      email_verified: user.email_confirmed_at != null,
      phone_verified: false,
      preferences: userMetadata.preferences || {},
      role: (userMetadata.role as 'admin' | 'priest' | 'staff' | 'member') || 'member',
      permissions: userMetadata.permissions || [],
      created_at: user.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_login: user.last_sign_in_at
    };

    console.log('Using fallback profile:', fallbackProfile);
    
    // Try to create the profile in background (don't wait for success or failure)
    this.createUserProfile({
      first_name: fallbackProfile.first_name,
      middle_name: fallbackProfile.middle_name,
      last_name: fallbackProfile.last_name,
      extension_name: fallbackProfile.extension_name,
      dob: fallbackProfile.dob,
      age: fallbackProfile.age,
      sex: fallbackProfile.sex,
      contact_number: fallbackProfile.contact_number,
      purok: fallbackProfile.purok,
      barangay: fallbackProfile.barangay
    }).catch(err => console.log('Background profile creation failed:', err));
    
    return fallbackProfile;
  },

  // Get user profile by ID
  async getUserProfileById(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  // Create user profile (typically called during signup)
  async createUserProfile(profileData: CreateUserProfileData): Promise<UserProfile> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        id: user.id,
        email: user.email!,
        ...profileData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update user profile
  async updateUserProfile(updates: UpdateUserProfileData): Promise<UserProfile> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update profile image
  async updateProfileImage(imageUrl: string): Promise<UserProfile> {
    return this.updateUserProfile({ profile_image_url: imageUrl });
  },

  // Update user preferences
  async updatePreferences(preferences: Record<string, unknown>): Promise<UserProfile> {
    // `preferences` is stored as JSONB in `public.user_profiles`.
    // Using `unknown` avoids `any` while still allowing arbitrary JSON keys.
    return this.updateUserProfile({ preferences });
  },


  // Update last login timestamp
  async updateLastLogin(): Promise<void> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return;

    await supabase
      .from('user_profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);
  },

  // Deactivate user account
  async deactivateAccount(): Promise<void> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('User not authenticated');

    await supabase
      .from('user_profiles')
      .update({ is_active: false })
      .eq('id', user.id);
  },

  // Search users by name or email
  async searchUsers(query: string): Promise<UserDirectory[]> {
    const { data, error } = await supabase
      .from('user_directory')
      .select('*')
      .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(20);

    if (error) throw error;
    return data || [];
  },

  // Get users by barangay
  async getUsersByBarangay(barangay: string): Promise<UserDirectory[]> {
    const { data, error } = await supabase
      .from('user_directory')
      .select('*')
      .eq('barangay', barangay)
      .order('last_name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get users by role
  async getUsersByRole(role: string): Promise<UserDirectory[]> {
    const { data, error } = await supabase
      .from('user_directory')
      .select('*')
      .eq('role', role)
      .order('last_name', { ascending: true });

    if (error) throw error;
    return data || [];
  }
};

// Admin Service (for admin operations)
export const adminService = {
  // Get all user profiles (admin only)
  async getAllUsers(): Promise<UserProfile[]> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Update user role (admin only)
  async updateUserRole(userId: string, role: string): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update user permissions (admin only)
  async updateUserPermissions(userId: string, permissions: string[]): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ permissions })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user statistics (admin only)
  async getUserStatistics(): Promise<UserStatistics> {
    const { data, error } = await supabase
      .from('user_statistics')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  // Activate/deactivate user account (admin only)
  async toggleUserStatus(userId: string, isActive: boolean): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ is_active: isActive })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete user account (admin only)
  async deleteUser(userId: string): Promise<void> {
    await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId);
  }
};

// Authentication helpers
export const authService = {
  // Sign up with profile creation
  async signUpWithEmail(
    email: string, 
    password: string, 
    profileData: CreateUserProfileData
  ): Promise<{ user: any; profile: UserProfile }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: profileData
      }
    });

    if (error) throw error;
    if (!data.user) throw new Error('Failed to create user');

    // Create profile manually if trigger doesn't work
    try {
      const profile = await userProfileService.createUserProfile(profileData);
      return { user: data.user, profile };
    } catch (profileError) {
      // Profile might already be created by trigger
      const profile = await userProfileService.getCurrentUserProfile();
      if (profile) {
        return { user: data.user, profile };
      }
      throw profileError;
    }
  },

  // Sign in
  async signInWithEmail(email: string, password: string): Promise<{ user: any; profile: UserProfile | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!data.user) throw new Error('Failed to sign in');

    // Update last login
    await userProfileService.updateLastLogin();

    // Get user profile
    const profile = await userProfileService.getCurrentUserProfile();
    
    return { user: data.user, profile };
  },

  // Sign out
  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },

  // Get current session
  async getCurrentSession(): Promise<{ user: any | null; profile: UserProfile | null }> {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session?.user) {
      return { user: null, profile: null };
    }

    const profile = await userProfileService.getCurrentUserProfile();
    return { user: session.user, profile };
  },

  // Reset password
  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  // Update password
  async updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
  }
};
