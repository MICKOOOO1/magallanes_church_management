-- Supabase database schema for Church Management System
-- Run this file in Supabase SQL editor or via psql to create the needed tables.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Timestamp trigger utility
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Core user tables
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  first_name text,
  middle_name text,
  last_name text,
  extension_name text,
  dob date,
  age int,
  sex text CHECK (sex IN ('male', 'female')),
  purok text,
  barangay text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY,
  email text NOT NULL UNIQUE,
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  extension_name text,
  dob date,
  age int,
  sex text CHECK (sex IN ('male', 'female')),
  contact_number text,
  purok text,
  barangay text,
  is_active boolean NOT NULL DEFAULT true,
  email_verified boolean NOT NULL DEFAULT false,
  phone_verified boolean NOT NULL DEFAULT false,
  profile_image_url text,
  bio text,
  preferences jsonb NOT NULL DEFAULT '{}'::jsonb,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'priest', 'staff', 'member')),
  permissions text[] NOT NULL DEFAULT ARRAY[]::text[],
  last_login timestamptz,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER user_profiles_set_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Booking tables
CREATE TABLE IF NOT EXISTS public.wedding_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  bride_first_name text NOT NULL,
  bride_middle_name text,
  bride_last_name text NOT NULL,
  bride_dob date,
  bride_age int,
  bride_sex text NOT NULL DEFAULT 'female' CHECK (bride_sex = 'female'),
  bride_purok text,
  bride_barangay text,
  bride_contact text,
  bride_email text,
  groom_first_name text NOT NULL,
  groom_middle_name text,
  groom_last_name text NOT NULL,
  groom_dob date,
  groom_age int,
  groom_sex text NOT NULL DEFAULT 'male' CHECK (groom_sex = 'male'),
  groom_purok text,
  groom_barangay text,
  groom_contact text,
  groom_email text,
  wedding_date date NOT NULL,
  wedding_time time NOT NULL,
  venue text,
  priest_name text,
  wedding_type text NOT NULL CHECK (wedding_type IN ('regular', 'covenant', 'mixed')),
  requirements_met boolean NOT NULL DEFAULT false,
  seminar_completed boolean NOT NULL DEFAULT false,
  baptismal_cert_submitted boolean NOT NULL DEFAULT false,
  confirmation_cert_submitted boolean NOT NULL DEFAULT false,
  birth_cert_submitted boolean NOT NULL DEFAULT false,
  cenomar_submitted boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER wedding_bookings_set_updated_at
BEFORE UPDATE ON public.wedding_bookings
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.baptism_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  child_first_name text NOT NULL,
  child_middle_name text,
  child_last_name text NOT NULL,
  child_dob date NOT NULL,
  child_age int,
  child_sex text NOT NULL CHECK (child_sex IN ('male', 'female')),
  child_birth_place text,
  father_first_name text,
  father_middle_name text,
  father_last_name text,
  father_contact text,
  father_email text,
  mother_first_name text,
  mother_middle_name text,
  mother_last_name text,
  mother_contact text,
  mother_email text,
  godfather_first_name text,
  godfather_middle_name text,
  godfather_last_name text,
  godfather_contact text,
  godmother_first_name text,
  godmother_middle_name text,
  godmother_last_name text,
  godmother_contact text,
  baptism_date date NOT NULL,
  baptism_time time NOT NULL,
  venue text,
  priest_name text,
  requirements_met boolean NOT NULL DEFAULT false,
  birth_cert_submitted boolean NOT NULL DEFAULT false,
  parent_marriage_cert_submitted boolean NOT NULL DEFAULT false,
  godparent_confirmation_cert_submitted boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER baptism_bookings_set_updated_at
BEFORE UPDATE ON public.baptism_bookings
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.funeral_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  deceased_first_name text NOT NULL,
  deceased_middle_name text,
  deceased_last_name text NOT NULL,
  deceased_dob date,
  deceased_age int,
  deceased_sex text NOT NULL CHECK (deceased_sex IN ('male', 'female')),
  date_of_death date NOT NULL,
  cause_of_death text,
  death_place text,
  informant_first_name text NOT NULL,
  informant_middle_name text,
  informant_last_name text NOT NULL,
  informant_contact text NOT NULL,
  informant_email text,
  informant_relationship text,
  funeral_date date NOT NULL,
  funeral_time time NOT NULL,
  venue text,
  priest_name text,
  burial_place text,
  requirements_met boolean NOT NULL DEFAULT false,
  death_cert_submitted boolean NOT NULL DEFAULT false,
  burial_permit_submitted boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER funeral_bookings_set_updated_at
BEFORE UPDATE ON public.funeral_bookings
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.confession_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  penitent_first_name text NOT NULL,
  penitent_middle_name text,
  penitent_last_name text NOT NULL,
  penitent_dob date,
  penitent_age int,
  penitent_sex text NOT NULL CHECK (penitent_sex IN ('male', 'female')),
  penitent_contact text,
  penitent_email text,
  penitent_purok text,
  penitent_barangay text,
  confession_date date NOT NULL,
  confession_time time NOT NULL,
  venue text,
  priest_name text,
  confession_type text NOT NULL CHECK (confession_type IN ('regular', 'first_time', 'special')),
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER confession_bookings_set_updated_at
BEFORE UPDATE ON public.confession_bookings
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Certificate booking operations
CREATE TABLE IF NOT EXISTS public.certificate_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  requester_first_name text NOT NULL,
  requester_middle_name text,
  requester_last_name text NOT NULL,
  requester_contact text NOT NULL,
  requester_email text,
  certificate_type text NOT NULL CHECK (certificate_type IN ('baptismal', 'confirmation', 'marriage', 'death', 'burial')),
  purpose text NOT NULL,
  number_of_copies int NOT NULL DEFAULT 1,
  date_needed date,
  pickup_method text CHECK (pickup_method IN ('pickup', 'mail', 'email')),
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER certificate_bookings_set_updated_at
BEFORE UPDATE ON public.certificate_bookings
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Useful views
CREATE OR REPLACE VIEW public.user_directory AS
SELECT
  id,
  email,
  CONCAT(first_name, ' ', COALESCE(middle_name || ' ', ''), last_name) AS full_name,
  first_name,
  last_name,
  barangay,
  purok,
  role,
  is_active,
  created_at
FROM public.user_profiles;

CREATE OR REPLACE VIEW public.user_statistics AS
SELECT
  COUNT(*) FILTER (WHERE TRUE) AS total_users,
  COUNT(*) FILTER (WHERE is_active) AS active_users,
  COUNT(*) FILTER (WHERE email_verified) AS verified_users,
  COUNT(*) FILTER (WHERE role = 'admin') AS admins,
  COUNT(*) FILTER (WHERE role = 'priest') AS priests,
  COUNT(*) FILTER (WHERE role = 'staff') AS staff,
  COUNT(*) FILTER (WHERE role = 'member') AS members,
  COUNT(*) FILTER (WHERE sex = 'male') AS male_users,
  COUNT(*) FILTER (WHERE sex = 'female') AS female_users,
  COALESCE(ROUND(AVG(age)::numeric, 2), 0) AS average_age,
  COALESCE(string_agg(DISTINCT barangay, ', ' ORDER BY barangay), '') AS covered_barangays
FROM public.user_profiles;
