import { supabase } from '../lib/supabase';
import { USER_ROLES } from '../types/user-profiles';

export async function createAdminAccount() {
  try {
    console.log('Creating admin account...');

    // First, try to sign up the admin user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: 'admin',
      password: 'admin1231233',
      options: {
        data: {
          first_name: 'System',
          last_name: 'Administrator'
        }
      }
    });

    if (signUpError && signUpError.message !== 'User already registered') {
      console.error('Error creating auth user:', signUpError);
      return false;
    }

    // If user already exists, try to get the existing user
    let userId = signUpData.user?.id;
    
    if (!userId) {
      // Try to sign in to get the user ID
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'admin',
        password: 'admin1231233'
      });

      if (signInError) {
        console.error('Admin account may not exist yet:', signInError);
        return false;
      }

      userId = signInData.user?.id;
    }

    if (!userId) {
      console.error('Could not get user ID');
      return false;
    }

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (existingProfile) {
      console.log('Admin profile already exists');
      // Update to ensure it has admin role
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          role: USER_ROLES.ADMIN,
          permissions: [
            'view_own_profile',
            'edit_own_profile',
            'view_all_profiles',
            'edit_all_profiles',
            'manage_roles',
            'view_statistics',
            'view_bookings',
            'manage_bookings',
            'view_events',
            'manage_events'
          ]
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating admin role:', updateError);
        return false;
      }

      console.log('Admin profile updated successfully');
      return true;
    }

    // Create the user profile with admin role
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: userId,
        email: 'admin',
        first_name: 'System',
        last_name: 'Administrator',
        middle_name: '',
        extension_name: '',
        dob: '1990-01-01',
        age: 34,
        sex: 'male',
        purok: 'System',
        barangay: 'System',
        is_active: true,
        email_verified: true,
        phone_verified: false,
        role: USER_ROLES.ADMIN,
        permissions: [
          'view_own_profile',
          'edit_own_profile',
          'view_all_profiles',
          'edit_all_profiles',
          'manage_roles',
          'view_statistics',
          'view_bookings',
          'manage_bookings',
          'view_events',
          'manage_events'
        ],
        preferences: {
          email_notifications: true,
          sms_notifications: false,
          language: 'en',
          timezone: 'Asia/Manila',
          privacy_settings: {
            show_email: false,
            show_phone: false,
            show_location: false
          },
          theme: 'light'
        }
      })
      .select()
      .single();

    if (profileError) {
      console.error('Error creating user profile:', profileError);
      return false;
    }

    console.log('Admin profile created successfully:', profileData);
    console.log('Admin account created successfully!');
    console.log('Email: admin');
    console.log('Password: admin1231233');
    console.log('Role: admin');

    return true;

  } catch (error) {
    console.error('Error creating admin account:', error);
    return false;
  }
}
