// Database types for Church Management System

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'email' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'email' | 'created_at' | 'updated_at'>>;
      };
      wedding_bookings: {
        Row: WeddingBooking;
        Insert: Omit<WeddingBooking, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<WeddingBooking, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
      baptism_bookings: {
        Row: BaptismBooking;
        Insert: Omit<BaptismBooking, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BaptismBooking, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
      funeral_bookings: {
        Row: FuneralBooking;
        Insert: Omit<FuneralBooking, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FuneralBooking, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
      confession_bookings: {
        Row: ConfessionBooking;
        Insert: Omit<ConfessionBooking, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ConfessionBooking, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  extension_name?: string;
  dob?: string;
  age?: number;
  sex?: 'male' | 'female';
  purok?: string;
  barangay?: string;
  created_at: string;
  updated_at: string;
}

export interface WeddingBooking {
  id: string;
  user_id: string;
  bride_first_name: string;
  bride_middle_name?: string;
  bride_last_name: string;
  bride_dob?: string;
  bride_age?: number;
  bride_sex: 'female';
  bride_purok?: string;
  bride_barangay?: string;
  bride_contact?: string;
  bride_email?: string;
  
  groom_first_name: string;
  groom_middle_name?: string;
  groom_last_name: string;
  groom_dob?: string;
  groom_age?: number;
  groom_sex: 'male';
  groom_purok?: string;
  groom_barangay?: string;
  groom_contact?: string;
  groom_email?: string;
  
  wedding_date: string;
  wedding_time: string;
  venue?: string;
  priest_name?: string;
  wedding_type: 'regular' | 'covenant' | 'mixed';
  
  requirements_met: boolean;
  seminar_completed: boolean;
  baptismal_cert_submitted: boolean;
  confirmation_cert_submitted: boolean;
  birth_cert_submitted: boolean;
  cenomar_submitted: boolean;
  
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BaptismBooking {
  id: string;
  user_id: string;
  
  child_first_name: string;
  child_middle_name?: string;
  child_last_name: string;
  child_dob: string;
  child_age?: number;
  child_sex: 'male' | 'female';
  child_birth_place?: string;
  
  father_first_name?: string;
  father_middle_name?: string;
  father_last_name?: string;
  father_contact?: string;
  father_email?: string;
  
  mother_first_name?: string;
  mother_middle_name?: string;
  mother_last_name?: string;
  mother_contact?: string;
  mother_email?: string;
  
  godfather_first_name?: string;
  godfather_middle_name?: string;
  godfather_last_name?: string;
  godfather_contact?: string;
  
  godmother_first_name?: string;
  godmother_middle_name?: string;
  godmother_last_name?: string;
  godmother_contact?: string;
  
  baptism_date: string;
  baptism_time: string;
  venue?: string;
  priest_name?: string;
  
  requirements_met: boolean;
  birth_cert_submitted: boolean;
  parent_marriage_cert_submitted: boolean;
  godparent_confirmation_cert_submitted: boolean;
  
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface FuneralBooking {
  id: string;
  user_id: string;
  
  deceased_first_name: string;
  deceased_middle_name?: string;
  deceased_last_name: string;
  deceased_dob?: string;
  deceased_age?: number;
  deceased_sex: 'male' | 'female';
  date_of_death: string;
  cause_of_death?: string;
  death_place?: string;
  
  informant_first_name: string;
  informant_middle_name?: string;
  informant_last_name: string;
  informant_contact?: string;
  informant_email?: string;
  informant_relationship?: string;
  
  funeral_date: string;
  funeral_time: string;
  venue?: string;
  priest_name?: string;
  burial_place?: string;
  
  requirements_met: boolean;
  death_cert_submitted: boolean;
  burial_permit_submitted: boolean;
  
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ConfessionBooking {
  id: string;
  user_id: string;
  
  penitent_first_name: string;
  penitent_middle_name?: string;
  penitent_last_name: string;
  penitent_dob?: string;
  penitent_age?: number;
  penitent_sex: 'male' | 'female';
  penitent_contact?: string;
  penitent_email?: string;
  penitent_purok?: string;
  penitent_barangay?: string;
  
  confession_date: string;
  confession_time: string;
  venue?: string;
  priest_name?: string;
  confession_type: 'regular' | 'first_time' | 'special';
  
  notes?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

// Database table names
export const DB_TABLES = {
  USERS: 'users',
  WEDDING_BOOKINGS: 'wedding_bookings',
  BAPTISM_BOOKINGS: 'baptism_bookings',
  FUNERAL_BOOKINGS: 'funeral_bookings',
  CONFESSION_BOOKINGS: 'confession_bookings',
} as const;
