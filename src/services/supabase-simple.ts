import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User operations
export const userService = {
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async createUserProfile(user: any) {
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    if (authError || !authUser) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('users')
      .insert({
        id: authUser.id,
        email: authUser.email!,
        ...user
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Wedding booking operations
export const weddingService = {
  async getWeddingBookings(userId: string) {
    const { data, error } = await supabase
      .from('wedding_bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createWeddingBooking(booking: any) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('wedding_bookings')
      .insert({
        user_id: user.id,
        ...booking
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateWeddingBooking(bookingId: string, updates: any) {
    const { data, error } = await supabase
      .from('wedding_bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteWeddingBooking(bookingId: string) {
    const { error } = await supabase
      .from('wedding_bookings')
      .delete()
      .eq('id', bookingId);
    
    if (error) throw error;
  }
};

// Baptism booking operations
export const baptismService = {
  async getBaptismBookings(userId: string) {
    const { data, error } = await supabase
      .from('baptism_bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createBaptismBooking(booking: any) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('baptism_bookings')
      .insert({
        user_id: user.id,
        ...booking
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateBaptismBooking(bookingId: string, updates: any) {
    const { data, error } = await supabase
      .from('baptism_bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteBaptismBooking(bookingId: string) {
    const { error } = await supabase
      .from('baptism_bookings')
      .delete()
      .eq('id', bookingId);
    
    if (error) throw error;
  }
};

// Funeral booking operations
export const funeralService = {
  async getFuneralBookings(userId: string) {
    const { data, error } = await supabase
      .from('funeral_bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createFuneralBooking(booking: any) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('funeral_bookings')
      .insert({
        user_id: user.id,
        ...booking
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateFuneralBooking(bookingId: string, updates: any) {
    const { data, error } = await supabase
      .from('funeral_bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteFuneralBooking(bookingId: string) {
    const { error } = await supabase
      .from('funeral_bookings')
      .delete()
      .eq('id', bookingId);
    
    if (error) throw error;
  }
};

// Confession booking operations
export const confessionService = {
  async getConfessionBookings(userId: string) {
    const { data, error } = await supabase
      .from('confession_bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createConfessionBooking(booking: any) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('confession_bookings')
      .insert({
        user_id: user.id,
        ...booking
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateConfessionBooking(bookingId: string, updates: any) {
    const { data, error } = await supabase
      .from('confession_bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteConfessionBooking(bookingId: string) {
    const { error } = await supabase
      .from('confession_bookings')
      .delete()
      .eq('id', bookingId);
    
    if (error) throw error;
  }
};

// Get all bookings for a user
export const bookingService = {
  async getAllBookings(userId: string) {
    const [weddings, baptisms, funerals, confessions] = await Promise.all([
      weddingService.getWeddingBookings(userId),
      baptismService.getBaptismBookings(userId),
      funeralService.getFuneralBookings(userId),
      confessionService.getConfessionBookings(userId)
    ]);

    return {
      weddings,
      baptisms,
      funerals,
      confessions
    };
  }
};
