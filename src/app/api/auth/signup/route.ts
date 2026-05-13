import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY.');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, middleName, lastName, extensionName, dob, age, sex, purok, barangay } = body;
    const allowedSexValues = ['male', 'female'];

    console.log('Signup request received:', { email, firstName, lastName, dob, age, sex, purok, barangay });

    const validationErrors: Record<string, string> = {};

    if (!email || typeof email !== 'string' || !email.trim()) {
      validationErrors.email = 'Email is required';
    }
    if (!password || typeof password !== 'string' || password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters';
    }
    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
      validationErrors.firstName = 'First name is required';
    }
    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
      validationErrors.lastName = 'Last name is required';
    }
    if (!dob || typeof dob !== 'string' || Number.isNaN(new Date(dob).valueOf())) {
      validationErrors.dob = 'Valid date of birth is required';
    }
    const ageNumber = age !== undefined && age !== null ? Number(age) : NaN;
    if (Number.isNaN(ageNumber) || ageNumber <= 0 || ageNumber > 150) {
      validationErrors.age = 'Valid age is required';
    }
    const sexNormalized = typeof sex === 'string' ? sex.toLowerCase().trim() : '';
    if (!allowedSexValues.includes(sexNormalized)) {
      validationErrors.sex = 'Sex must be either male or female';
    }
    if (!purok || typeof purok !== 'string' || !purok.trim()) {
      validationErrors.purok = 'Purok/street is required';
    }
    if (!barangay || typeof barangay !== 'string' || !barangay.trim()) {
      validationErrors.barangay = 'Barangay is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { error: 'Invalid signup data', validationErrors },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const fullName = `${firstName || ''} ${lastName || ''}`.trim();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });
    
    console.log('Supabase response:', { data, error });
    
    if (error) {
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 400 }
      );
    }

    // If signup successful, create user profile
    if (data.user) {
      try {
        console.log('Creating user profile with data:', {
          id: data.user.id,
          email: data.user.email || email,
          firstName,
          lastName,
          middleName,
          extensionName,
          dob,
          age,
          sex,
          purok,
          barangay
        });

        const profileData = {
          id: data.user.id,
          email: data.user.email || email,
          first_name: firstName.trim(),
          middle_name: middleName ? middleName.trim() : null,
          last_name: lastName.trim(),
          extension_name: extensionName ? extensionName.trim() : null,
          dob: new Date(dob).toISOString().split('T')[0],
          age: Number(age),
          sex: sexNormalized,
          purok: purok.trim(),
          barangay: barangay.trim()
        };

        const { data: profileResult, error: profileError } = await supabaseAdmin
          .from('user_profiles')
          .insert(profileData)
          .select()
          .single();

        if (profileError) {
          console.error('❌ Profile creation failed:', {
            error: profileError,
            details: profileError.details,
            hint: profileError.hint,
            code: profileError.code,
            message: profileError.message
          });
          
          const errorMessage = profileError.message
            ? `Database error saving user profile: ${profileError.message}`
            : 'Database error saving user profile';

          return NextResponse.json(
            {
              error: errorMessage,
              details: {
                message: profileError.message,
                details: profileError.details,
                hint: profileError.hint,
                code: profileError.code,
              },
              attemptedProfileData: profileData,
            },
            { status: 500 }
          );
        }

        console.log('✅ User profile created successfully:', profileResult);
        
      } catch (profileErr: any) {
        console.error('❌ Unexpected error creating profile:', profileErr);
        return NextResponse.json(
          { 
            error: 'Unexpected error creating user profile', 
            details: profileErr?.message || 'Unknown error' 
          },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      data 
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error', stack: error.stack },
      { status: 500 }
    );
  }
}
