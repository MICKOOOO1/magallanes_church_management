import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { USER_ROLES } from '@/types/user-profiles';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
}

export async function POST(request: NextRequest) {
  try {
    // Create Supabase client with service role key (server-side only)
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Check if service key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log('Warning: Using hardcoded service key (development only)');
    }

    console.log('Creating admin account via API...');

    // Check if admin user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('user_profiles')
      .select('id, email, role')
      .eq('email', 'admin')
      .maybeSingle();

    if (checkError) {
      console.error('Error checking existing user:', checkError);
    }

    let userId: string;

    if (existingUsers) {
      // Admin profile already exists, update role to admin
      console.log('Admin profile exists, updating...');
      userId = existingUsers.id;

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
          ],
          is_active: true,
          email_verified: true
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating admin role:', updateError);
        return NextResponse.json(
          { error: 'Failed to update admin role', details: updateError },
          { status: 500 }
        );
      }

      console.log('Admin profile updated successfully');
      return NextResponse.json({ 
        success: true, 
        message: 'Admin account already exists and has been updated',
        credentials: {
          email: 'admin',
          password: 'admin1231233'
        }
      });
    }

    // Create auth user using admin API
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
      return NextResponse.json(
        { error: authError.message, details: authError },
        { status: 400 }
      );
    }

    if (!authData.user) {
      console.error('No user created');
      return NextResponse.json(
        { error: 'Failed to create auth user' },
        { status: 500 }
      );
    }

    userId = authData.user.id;
    console.log('Auth user created:', userId);

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
      return NextResponse.json(
        { error: profileError.message, details: profileError },
        { status: 500 }
      );
    }

    console.log('Admin profile created successfully:', profileData);
    console.log('Admin account created successfully!');
    console.log('Email: admin');
    console.log('Password: admin1231233');
    console.log('Role: admin');

    return NextResponse.json({ 
      success: true, 
      message: 'Admin account created successfully',
      credentials: {
        email: 'admin',
        password: 'admin1231233'
      }
    });

  } catch (error: any) {
    console.error('Admin creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error', stack: error.stack },
      { status: 500 }
    );
  }
}
