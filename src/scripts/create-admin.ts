import { createClient } from '@supabase/supabase-js';
import { USER_ROLES } from '../types/user-profiles';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminAccount() {
  try {
    console.log('Creating admin account...');

    // Create the auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin',
      password: 'admin1231233',
      email_confirm: true,
      user_metadata: {
        first_name: 'System',
        last_name: 'Administrator',
        role: USER_ROLES.ADMIN
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return;
    }

    if (!authData.user) {
      console.error('No user created');
      return;
    }

    console.log('Auth user created:', authData.user.id);

    // Create the user profile with admin role
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
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
      return;
    }

    console.log('Admin profile created successfully:', profileData);
    console.log('Admin account created successfully!');
    console.log('Email: admin');
    console.log('Password: admin1231233');
    console.log('Role: admin');

  } catch (error) {
    console.error('Error creating admin account:', error);
  }
}

// Run the script
createAdminAccount();
