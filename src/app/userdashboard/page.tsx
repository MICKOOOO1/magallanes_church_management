'use client';

import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { User, Lock, Bell, Shield, List } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';


type Section = 'overview' | 'profile' | 'settings';

function UserDashboardContent() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const searchParams = useSearchParams();

  const activeSection = useMemo<Section>(() => {
    const raw = searchParams.get('section');
    const section = (raw ?? 'overview') as Section;
    if (section === 'overview' || section === 'profile' || section === 'settings') return section;
    return 'overview';
  }, [searchParams]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [loading, user, router]);

  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [profileForm, setProfileForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    extension_name: '',
    dob: '',
    sex: '' as '' | 'male' | 'female',
    purok: '',
    barangay: '',
    contact_number: '',
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaveError, setProfileSaveError] = useState<string | null>(null);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  const [activeNavSection, setActiveNavSection] = useState('personal');
  
  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingReminders, setBookingReminders] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);
  const [notificationSaving, setNotificationSaving] = useState(false);
  
  // Privacy settings state
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [dataSharing, setDataSharing] = useState(false);
  const [privacySaving, setPrivacySaving] = useState(false);

  // Bookings state
  const [bookings, setBookings] = useState<{
    weddings: any[];
    baptisms: any[];
    funerals: any[];
    confessions: any[];
  }>({ weddings: [], baptisms: [], funerals: [], confessions: [] });
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setProfileLoading(true);
        const { userProfileService } = await import('../../services/user-profiles');
        console.log('Loading profile for user:', user?.id);
        const p = await userProfileService.getCurrentUserProfile();
        console.log('Profile data received:', p);
        if (!cancelled) {
          setProfile(p);
          const userMeta = (user as Record<string, any>)?.user_metadata ?? {};
          console.log('User metadata:', userMeta);
          if (p) {
            console.log('Setting form with profile data:', p);
            setProfileForm({
              first_name: p.first_name || userMeta.first_name || '',
              middle_name: p.middle_name || userMeta.middle_name || '',
              last_name: p.last_name || userMeta.last_name || '',
              extension_name: p.extension_name || userMeta.extension_name || '',
              dob: p.dob || userMeta.dob || '',
              sex: p.sex || userMeta.sex || '',
              purok: p.purok || userMeta.purok || '',
              barangay: p.barangay || userMeta.barangay || '',
              contact_number: (p as any).contact_number || userMeta.contact_number || '',
            });
            const prefs = p.preferences as Record<string, any> | undefined;
            if (prefs) {
              setEmailNotifications(prefs.email_notifications ?? true);
              setBookingReminders(prefs.booking_reminders ?? true);
              setSystemUpdates(prefs.system_updates ?? false);
            }
          } else {
            console.log('No profile found, using metadata only');
            setProfileForm({
              first_name: userMeta.first_name || '',
              middle_name: userMeta.middle_name || '',
              last_name: userMeta.last_name || '',
              extension_name: userMeta.extension_name || '',
              dob: userMeta.dob || '',
              sex: userMeta.sex || '',
              purok: userMeta.purok || '',
              barangay: userMeta.barangay || '',
              contact_number: userMeta.contact_number || '',
            });
          }
        }
      } catch (e: any) {
        console.error('Error loading profile:', e);
        if (!cancelled) setProfileError(e?.message ?? 'Failed to load profile');
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Fetch bookings from database
  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    const loadBookings = async () => {
      try {
        setBookingsLoading(true);
        const { bookingService } = await import('../../services/supabase');
        const data = await bookingService.getAllBookings(user.id);
        if (!cancelled) setBookings(data);
      } catch (e: any) {
        console.error('Failed to load bookings:', e);
      } finally {
        if (!cancelled) setBookingsLoading(false);
      }
    };
    loadBookings();
    return () => { cancelled = true; };
  }, [user]);

  const menuItems = useMemo(
    () => [
      { id: 'overview' as const, label: 'Dashboard' },
      { id: 'profile' as const, label: 'My Profile' },
    ],
    []
  );

  const styles: Record<string, React.CSSProperties> = {
    dashboard: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      overflowX: 'hidden' as const,
    },
    mainContent: {
      padding: '0px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '35px',
      paddingBottom: '0px',
      borderBottom: '1px solid #e5e7eb',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 90,
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0,
      textAlign: 'center' as const,
    },

    // Quick section
    quickCardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 20,
      marginBottom: 25,
    },
    quickCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 24,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      textAlign: 'center' as const,
    },
    quickCardTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: '#1f2937',
      marginTop: 12,
    },
    quickCardMeta: {
      fontSize: 13,
      fontWeight: 400,
      color: '#6b7280',
      marginTop: 6,
    },

    userSummaryCard: {
      marginBottom: 22,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 18,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      maxWidth: 900,
    },
    userSummaryTitle: {
      fontSize: 18,
      fontWeight: 700,
      color: '#1f2937',
      margin: 0,
    },
    userSummaryText: {
      fontSize: 14,
      color: '#374151',
      margin: '8px 0 0 0',
      lineHeight: 1.5,
      wordBreak: 'break-word' as const,
    },

    // Landing hero section
    heroSection: {
      padding: '200px 50px 70px',
      background:
        "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/mary2.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      textAlign: 'center' as const,
      position: 'relative' as const,
      overflow: 'hidden',
    },

    heroContainer: {
      maxWidth: '1300px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 20px',
      gap: '60px',
    },

    heroContent: {
      width: '90%',
      textAlign: 'left' as const,
    },

    welcomeText: {
      fontSize: 30,
      fontWeight: 400,
      color: '#FFD700',
      fontFamily: 'Georgia, serif',
      marginBottom: 10,
      lineHeight: 1.2,
      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
      letterSpacing: 1,
      fontStyle: 'italic',
    },

    heroTitle: {
      fontSize: 50,
      fontWeight: 700,
      color: '#fff',
      fontFamily: 'Times New Roman, serif',
      marginBottom: 20,
      lineHeight: 1.1,
      textShadow: '0 4px 8px rgba(0,0,0,0.5)',
      letterSpacing: 2,
      fontStyle: 'italic',
    },

    heroDescription: {
      fontSize: 15,
      color: '#FFF',
      marginBottom: 30,
      maxWidth: 500,
      lineHeight: 1.2,
      fontFamily: 'Times New Roman, serif',
      fontWeight: 600,
      textShadow: '0 3px 6px rgba(0,0,0,0.5)',
      letterSpacing: 1.5,
      fontStyle: 'italic',
      textTransform: 'uppercase',
    },

    communitySection: {
      padding: '60px 20px',
      background: '#F5F8FD',
    },
    communityContainer: {
      maxWidth: '1300px',
      margin: '0 auto',
      display: 'flex',
      gap: '60px',
      alignItems: 'center',
    },
    communityImages: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '25px',
    },
    communityImage: {
      width: '90%',
      height: 200,
      objectFit: 'cover' as const,
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    },
    communityContent: {
      flex: 1,
      padding: '20px 0',
    },
    communityTitle: {
      fontSize: 32,
      fontWeight: 800,
      color: '#1E3A6F',
      marginBottom: 40,
      lineHeight: 1.2,
      fontFamily: 'Poppins, sans-serif',
    },
    communityDescription: {
      fontSize: 19,
      fontWeight: 500,
      color: '#000',
      lineHeight: 2,
      marginBottom: 30,
      fontFamily: 'Inter, sans-serif',
    },

    sectionCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: '2px 40px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      maxWidth: 900,
      margin: '0 auto',
    },

    // Profile / Settings UI primitives
    headerTopRow: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: 22,
    },
    subTitle: {
      marginTop: 6,
      color: '#6b7280',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.4,
    },

    twoColLayout: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: 20,
      alignItems: 'start',
    },

    sidebar: {
      border: '1px solid #e5e7eb',
      borderRadius: 14,
      background: '#fff',
      padding: 16,
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
    },

    sidebarTip: {
      marginTop: 14,
      background: '#f8fafc',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 12,
    },

    profileHero: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      padding: 8,
    },

    avatar: {
      width: 56,
      height: 56,
      borderRadius: 16,
      background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 20px rgba(29,78,216,0.22)',
      flexShrink: 0,
    },
    avatarText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 800,
      fontFamily: 'Arial, sans-serif',
      letterSpacing: 0.5,
    },

    profileName: {
      fontSize: 16,
      fontWeight: 800,
      color: '#111827',
      lineHeight: 1.2,
    },
    profileEmail: {
      marginTop: 4,
      color: '#6b7280',
      fontSize: 13,
      fontWeight: 600,
      wordBreak: 'break-word' as const,
    },
    profileMeta: {
      marginTop: 10,
      color: '#374151',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 0.2,
    },
    profileId: {
      marginTop: 6,
      padding: '8px 10px',
      borderRadius: 10,
      background: '#f3f4f6',
      border: '1px solid #e5e7eb',
      color: '#111827',
      fontFamily: 'monospace',
      fontSize: 12,
      wordBreak: 'break-word' as const,
    },

    sidebarSection: {
      padding: 12,
      borderRadius: 12,
      border: '1px solid #e5e7eb',
      background: '#fafafa',
    },
    sidebarSectionTitle: {
      fontSize: 13,
      fontWeight: 900,
      color: '#111827',
    },
    sidebarSectionText: {
      marginTop: 6,
      color: '#6b7280',
      fontSize: 13,
      lineHeight: 1.5,
      fontWeight: 600,
    },

    mainCol: {
      minWidth: 0,
    },

    card: {
      backgroundColor: '#fff',
      borderRadius: 14,
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
      padding: 18,
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: 900,
      color: '#111827',
    },
    cardSubTitle: {
      marginTop: 4,
      color: '#6b7280',
      fontSize: 12,
      fontWeight: 700,
    },

    kvGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
    },
    kvItem: {
      padding: '12px 12px',
      borderRadius: 12,
      background: '#f8fafc',
      border: '1px solid #e5e7eb',
    },
    kvLabel: {
      color: '#6b7280',
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 0.2,
    },
    kvValue: {
      marginTop: 6,
      color: '#111827',
      fontSize: 13,
      fontWeight: 800,
      wordBreak: 'break-word' as const,
    },

    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
    },
    formRow: {
      display: 'grid',
      gap: 8,
      padding: 12,
      borderRadius: 12,
      background: '#f8fafc',
      border: '1px solid #e5e7eb',
    },
    formLabel: {
      color: '#6b7280',
      fontSize: 12,
      fontWeight: 900,
    },
    input: {
      width: '100%',
      border: '1px solid #e5e7eb',
      borderRadius: 10,
      padding: '10px 12px',
      background: '#fff',
      color: '#111827',
      fontSize: 13,
      fontWeight: 800,
      outline: 'none',
      cursor: 'text',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },

    actionsRow: {
      marginTop: 16,
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
    },

    btn: {
      padding: '10px 14px',
      borderRadius: 12,
      border: '1px solid transparent',
      fontWeight: 900,
      fontSize: 13,
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    btnPrimary: {
      background: '#1d4ed8',
      color: '#fff',
    },
    btnSecondary: {
      background: '#f3f4f6',
      borderColor: '#e5e7eb',
      color: '#111827',
    },

    // Settings toggles (disabled)
    toggleGrid: {
      display: 'grid',
      gap: 12,
    },
    toggleRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: 12,
      borderRadius: 12,
      border: '1px solid #e5e7eb',
      background: '#f8fafc',
    },
    toggleTitle: {
      fontSize: 13,
      fontWeight: 900,
      color: '#111827',
    },
    toggleDesc: {
      marginTop: 6,
      color: '#6b7280',
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 1.4,
    },
    toggleWrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    switch: {
      width: 46,
      height: 26,
      borderRadius: 999,
      border: '1px solid #e5e7eb',
      background: '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      padding: 3,
      cursor: 'not-allowed',
    },
    switchDisabled: {
      opacity: 0.7,
    },
    switchKnob: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#ffffff',
      boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
      display: 'block',
    },

    // Profile Loading States
    profileLoadingContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      gap: 16,
    },
    profileLoadingSpinner: {
      width: 48,
      height: 48,
      border: '4px solid #e5e7eb',
      borderTopColor: '#1d4ed8',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    profileLoadingText: {
      color: '#6b7280',
      fontSize: 14,
      fontWeight: 600,
    },
    profileErrorContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      gap: 16,
    },
    profileErrorIcon: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: '#fef2f2',
      border: '2px solid #ef4444',
      color: '#ef4444',
      fontSize: 24,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileErrorText: {
      color: '#ef4444',
      fontSize: 14,
      fontWeight: 600,
    },

    // Profile Layout
    profileContainer: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '20px 20px 60px',
    },
    profileGrid: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: 24,
      alignItems: 'start',
    },

    // Profile Navigation Sidebar
    profileNavSidebar: {
      background: '#fff',
      borderRadius: 16,
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
      padding: 24,
      position: 'sticky',
      top: 100,
    },
    profileNavTitle: {
      fontSize: 20,
      fontWeight: 700,
      color: '#111827',
      marginBottom: 4,
    },
    profileNavSubtitle: {
      fontSize: 13,
      color: '#6b7280',
      fontWeight: 500,
      marginBottom: 24,
    },
    profileNavList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 4,
    },
    profileNavItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      borderRadius: 10,
      background: '#f8fafc',
      color: '#374151',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    profileNavItemActive: {
      background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
      color: '#fff',
    },
    profileNavIcon: {
      fontSize: 16,
    },

    // Profile Sidebar (original user info sidebar)
    profileSidebar: {
      background: 'linear-gradient(135deg, #1E3A6F 0%, #2563eb 100%)',
      borderRadius: 16,
      padding: 24,
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      position: 'sticky',
      top: 100,
    },
    profileAvatarLarge: {
      width: 100,
      height: 100,
      margin: '0 auto 16px',
      borderRadius: '50%',
      border: '4px solid rgba(255,255,255,0.3)',
      overflow: 'hidden',
    },
    avatarLargeInner: {
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarLargeText: {
      color: '#fff',
      fontSize: 32,
      fontWeight: 700,
      fontFamily: 'Georgia, serif',
    },
    profileSidebarName: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 4,
      fontFamily: 'Georgia, serif',
    },
    profileSidebarRole: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 13,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 20,
    },
    profileSidebarMeta: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 12,
      marginBottom: 24,
      paddingTop: 16,
      borderTop: '1px solid rgba(255,255,255,0.2)',
    },
    profileSidebarMetaItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    profileSidebarMetaIcon: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 16,
    },
    profileSidebarMetaText: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: 13,
      fontWeight: 500,
    },

    // Profile Main Content
    profileMain: {
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: 30,
      alignItems: 'flex-start',
    },
    profileCard: {
      background: '#fff',
      borderRadius: 12,
      border: '1px solid #e5e7eb',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      padding: '24px',
      overflow: 'hidden',
    },
    profileCardHeader: {
      padding: '0 0 20px 0',
      borderBottom: '1px solid #f3f4f6',
      background: 'transparent',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    profileCardTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: '#111827',
      margin: 0,
      fontFamily: 'Inter, sans-serif',
    },
    profileCardSubtitle: {
      fontSize: 13,
      color: '#6b7280',
      fontWeight: 400,
      margin: 0,
      fontFamily: 'Inter, sans-serif',
    },
    profileCardBadge: {
      background: '#10b981',
      color: '#fff',
      fontSize: 11,
      fontWeight: 500,
      padding: '4px 10px',
      borderRadius: 20,
      fontFamily: 'Inter, sans-serif',
    },
    profileFormGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 24,
    },
    profileFormGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 8,
    },
    profileFormLabel: {
      fontSize: 13,
      fontWeight: 600,
      color: '#374151',
    },
    profileFormInput: {
      width: '100%',
      padding: '12px 14px',
      border: '1px solid #e5e7eb',
      borderRadius: 10,
      fontSize: 14,
      color: '#111827',
      background: '#fff',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    profileFormSelect: {
      width: '100%',
      padding: '12px 14px',
      border: '1px solid #e5e7eb',
      borderRadius: 10,
      fontSize: 14,
      color: '#111827',
      background: '#fff',
      outline: 'none',
      cursor: 'pointer',
    },
    profileAlertError: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 14px',
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: 10,
      color: '#dc2626',
      fontSize: 13,
      fontWeight: 600,
      marginTop: 16,
    },
    profileAlertSuccess: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 14px',
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      borderRadius: 10,
      color: '#166534',
      fontSize: 13,
      fontWeight: 600,
      marginTop: 16,
    },
    profileAlertIcon: {
      fontSize: 16,
      fontWeight: 700,
    },
    profileFormActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 24,
      paddingTop: 16,
      borderTop: '1px solid #f3f4f6',
    },
    profileBtnPrimary: {
      background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      padding: '12px 24px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(29,78,216,0.3)',
    },
    profileBtnPrimaryDisabled: {
      background: '#9ca3af',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      padding: '12px 24px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'not-allowed',
      opacity: 0.7,
    },
    profileBtnSecondary: {
      background: '#f3f4f6',
      color: '#374151',
      border: '1px solid #e5e7eb',
      borderRadius: 10,
      padding: '12px 24px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
    },
    profileInfoList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 16,
    },
    profileInfoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: 16,
      background: '#f8fafc',
      borderRadius: 12,
      border: '1px solid #e5e7eb',
    },
    profileInfoIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      flexShrink: 0,
    },
    profileInfoContent: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 4,
    },
    profileInfoLabel: {
      fontSize: 12,
      fontWeight: 600,
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    profileInfoValue: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827',
      wordBreak: 'break-word' as const,
    },

    // Settings Layout
    settingsContainer: {
      maxWidth: 900,
      margin: '0 auto',
      padding: '20px 20px 60px',
    },
    settingsGrid: {
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: 24,
      alignItems: 'start',
    },

    // Settings Sidebar
    settingsSidebar: {
      background: '#fff',
      borderRadius: 16,
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
      padding: 24,
      position: 'sticky',
      top: 100,
    },
    settingsSidebarTitle: {
      fontSize: 20,
      fontWeight: 700,
      color: '#111827',
      marginBottom: 4,
    },
    settingsSidebarSubtitle: {
      fontSize: 13,
      color: '#6b7280',
      fontWeight: 500,
      marginBottom: 24,
    },
    settingsNav: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 4,
    },
    settingsNavItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      borderRadius: 10,
      background: '#f8fafc',
      color: '#374151',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    settingsNavIcon: {
      fontSize: 16,
    },
    settingsSidebarTip: {
      marginTop: 24,
      padding: 16,
      background: '#f0f9ff',
      borderRadius: 12,
      border: '1px solid #e0f2fe',
    },
    settingsSidebarTipTitle: {
      fontSize: 13,
      fontWeight: 700,
      color: '#0369a1',
      marginBottom: 8,
    },
    settingsSidebarTipText: {
      fontSize: 12,
      color: '#0369a1',
      lineHeight: 1.5,
      fontWeight: 500,
    },

    // Settings Main Content
    settingsMain: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 24,
    },
    settingsCard: {
      background: '#fff',
      borderRadius: 16,
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
      padding: 24,
    },
    settingsCardHeader: {
      marginBottom: 24,
      paddingBottom: 16,
      borderBottom: '1px solid #f3f4f6',
    },
    settingsCardTitle: {
      fontSize: 18,
      fontWeight: 700,
      color: '#111827',
      marginBottom: 4,
    },
    settingsCardSubtitle: {
      fontSize: 13,
      color: '#6b7280',
      fontWeight: 500,
    },
    settingsToggleList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 16,
    },
    settingsToggleItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      background: '#f8fafc',
      borderRadius: 12,
      border: '1px solid #e5e7eb',
      gap: 16,
    },
    settingsToggleInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 4,
    },
    settingsToggleTitle: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827',
    },
    settingsToggleDesc: {
      fontSize: 12,
      color: '#6b7280',
      fontWeight: 500,
    },
    settingsToggleSwitch: {
      position: 'relative' as const,
      display: 'inline-block',
      width: 48,
      height: 28,
      flexShrink: 0,
    },
    settingsToggleInput: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    settingsToggleSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#e5e7eb',
      transition: '0.3s',
      borderRadius: '28px',
      border: '2px solid #d1d5db',
    },
    settingsToggleKnob: {
      position: 'absolute',
      content: '',
      height: 20,
      width: 20,
      left: 2,
      bottom: 2,
      backgroundColor: 'white',
      transition: '0.3s',
      borderRadius: '50%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    settingsSecurityAction: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      background: '#f8fafc',
      borderRadius: 12,
      border: '1px solid #e5e7eb',
    },
    settingsSecurityInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 4,
    },
    settingsSecurityTitle: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827',
    },
    settingsSecurityDesc: {
      fontSize: 12,
      color: '#6b7280',
      fontWeight: 500,
    },
    settingsBtnOutline: {
      background: 'transparent',
      color: '#1d4ed8',
      border: '2px solid #1d4ed8',
      borderRadius: 10,
      padding: '10px 20px',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    settingsPasswordForm: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 16,
      padding: 20,
      background: '#f8fafc',
      borderRadius: 12,
      border: '1px solid #e5e7eb',
    },
    settingsFormGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 6,
    },
    settingsFormLabel: {
      fontSize: 13,
      fontWeight: 600,
      color: '#374151',
    },
    settingsFormInput: {
      width: '100%',
      padding: '12px 14px',
      border: '1px solid #e5e7eb',
      borderRadius: 10,
      fontSize: 14,
      color: '#111827',
      background: '#fff',
      outline: 'none',
      boxSizing: 'border-box' as const,
    },
    settingsFormActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 8,
    },
    settingsBtnPrimary: {
      background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      padding: '12px 24px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(29,78,216,0.3)',
    },
    settingsBtnSecondary: {
      background: '#f3f4f6',
      color: '#374151',
      border: '1px solid #e5e7eb',
      borderRadius: 10,
      padding: '12px 24px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
    },
    settingsSaveSection: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start',
      gap: 16,
    },
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            <section style={styles.heroSection}>
              <div style={styles.heroContainer}>
                <div style={styles.heroContent}>
                  <div style={styles.welcomeText}>Welcome to</div>
                  <h1 style={styles.heroTitle}>Our Lady of the Rosary Parish</h1>
                  <p style={styles.heroDescription}>Magallanes, Agusan del Norte</p>
                  {/* Landing page has no extra CTA in the dashboard view; keep it minimal */}
                </div>
              </div>
            </section>

            
            <section style={styles.communitySection}>
              <div style={styles.communityContainer}>
                <div style={styles.communityImages}>
                  <img src="/images/Nuestra landing page 2.jpg" alt="Church Interior" style={styles.communityImage} />
                  <img src="/images/Nuestra landing page 3.jpg" alt="Church Community" style={styles.communityImage} />
                </div>

                <div style={styles.communityContent}>
                  <h2 style={styles.communityTitle}>Serving God and Community in Faith</h2>
                  <p style={styles.communityDescription}>
                    Our Lady of the Rosary Parish is a welcoming Catholic community in Magallanes, Agusan del Norte. We are dedicated to worship, service, and spiritual growth, bringing people together to live out the Gospel in everyday life.
                  </p>
                  <p style={{ ...styles.communityDescription, marginBottom: 0 }}>
                    Through the Holy Mass, sacraments, and parish activities, we support one another in faith and invite everyone to be part of our journey with Christ.
                  </p>
                </div>
              </div>
            </section>
          </>
        );

      case 'profile':
        if (profileLoading) {
          return (
            <div style={styles.profileLoadingContainer}>
              <div style={styles.profileLoadingSpinner}></div>
              <p style={styles.profileLoadingText}>Loading your profile...</p>
            </div>
          );
        }

        if (profileError) {
          return (
            <div style={styles.profileErrorContainer}>
              <div style={styles.profileErrorIcon}>!</div>
              <p style={styles.profileErrorText}>{profileError}</p>
            </div>
          );
        }

        return (
          <div style={styles.profileContainer}>
            {/* Page Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 35,
              padding: '90px 20px 0',
              borderBottom: '1px solid #e5e7eb',
            }}>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0,
                textAlign: 'center',
              }}>My Profile</h1>
            </div>
            
            <div style={styles.profileMain}>
              {/* Profile Navigation Sidebar */}
              <div style={styles.profileNavSidebar}>
                <div style={styles.profileNavList}>
                  <div 
                    style={{...styles.profileNavItem, ...(activeNavSection === 'personal' ? styles.profileNavItemActive : {})}}
                    onClick={() => setActiveNavSection('personal')}
                  >
                    <User style={styles.profileNavIcon} />
                    <span>Personal Information</span>
                  </div>
                  <div 
                    style={{...styles.profileNavItem, ...(activeNavSection === 'password' ? styles.profileNavItemActive : {})}}
                    onClick={() => setActiveNavSection('password')}
                  >
                    <Lock style={styles.profileNavIcon} />
                    <span>Change Password</span>
                  </div>
                  <div 
                    style={{...styles.profileNavItem, ...(activeNavSection === 'notifications' ? styles.profileNavItemActive : {})}}
                    onClick={() => setActiveNavSection('notifications')}
                  >
                    <Bell style={styles.profileNavIcon} />
                    <span>Notification Settings</span>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div style={styles.mainCol}>
                {activeNavSection === 'personal' && (
                  <div style={styles.profileCard}>
                    <div style={styles.profileCardHeader}>
                      <div>
                        <h3 style={styles.profileCardTitle}>Personal Information</h3>
                        <p style={styles.profileCardSubtitle}>
                          {profile ? 'Update your personal details' : 'Complete your profile to get started'}
                        </p>
                      </div>
                    </div>

                    <form onSubmit={async (e) => {
                    e.preventDefault();
                    setProfileSaving(true);
                    setProfileSaveError(null);
                    setProfileSaveSuccess(false);
                    
                    // Validation
                    if (!profileForm.first_name.trim()) {
                      setProfileSaveError('First name is required');
                      setProfileSaving(false);
                      return;
                    }
                    if (!profileForm.last_name.trim()) {
                      setProfileSaveError('Last name is required');
                      setProfileSaving(false);
                      return;
                    }
                    if (!profileForm.dob) {
                      setProfileSaveError('Date of birth is required');
                      setProfileSaving(false);
                      return;
                    }
                    if (!profileForm.sex) {
                      setProfileSaveError('Sex is required');
                      setProfileSaving(false);
                      return;
                    }
                    if (!profileForm.purok.trim()) {
                      setProfileSaveError('Purok is required');
                      setProfileSaving(false);
                      return;
                    }
                    if (!profileForm.barangay.trim()) {
                      setProfileSaveError('Barangay is required');
                      setProfileSaving(false);
                      return;
                    }
                    
                    try {
                      const { userProfileService } = await import('../../services/user-profiles');
                      
                      // Check if profile exists, if not create it
                      if (!profile) {
                        await userProfileService.createUserProfile({
                          first_name: profileForm.first_name,
                          middle_name: profileForm.middle_name,
                          last_name: profileForm.last_name,
                          extension_name: profileForm.extension_name,
                          dob: profileForm.dob,
                          age: profileForm.dob ? new Date().getFullYear() - new Date(profileForm.dob).getFullYear() : 0,
                          sex: profileForm.sex || 'male',
                          purok: profileForm.purok,
                          barangay: profileForm.barangay,
                          contact_number: profileForm.contact_number,
                        });
                      } else {
                        await userProfileService.updateUserProfile({
                          first_name: profileForm.first_name,
                          middle_name: profileForm.middle_name,
                          last_name: profileForm.last_name,
                          extension_name: profileForm.extension_name,
                          dob: profileForm.dob,
                          age: profileForm.dob ? new Date().getFullYear() - new Date(profileForm.dob).getFullYear() : undefined,
                          sex: profileForm.sex || undefined,
                          purok: profileForm.purok,
                          barangay: profileForm.barangay,
                          contact_number: profileForm.contact_number,
                        });
                      }
                      
                      // Reload the profile to get the updated data
                      const updatedProfile = await userProfileService.getCurrentUserProfile();
                      setProfile(updatedProfile);
                      setProfileSaveSuccess(true);
                    } catch (err: any) {
                      setProfileSaveError(err?.message || 'Failed to save profile');
                    } finally {
                      setProfileSaving(false);
                    }
                  }}>
                    <div style={styles.profileFormGrid}>
                      <div style={styles.profileFormGroup}>
                        <label style={styles.profileFormLabel}>First Name</label>
                        <input
                          type="text"
                          style={styles.profileFormInput}
                          value={profileForm.first_name}
                          onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div style={styles.profileFormGroup}>
                        <label style={styles.profileFormLabel}>Middle Name</label>
                        <input
                          type="text"
                          style={styles.profileFormInput}
                          value={profileForm.middle_name}
                          onChange={(e) => setProfileForm({ ...profileForm, middle_name: e.target.value })}
                          placeholder="Enter middle name"
                        />
                      </div>
                      <div style={styles.profileFormGroup}>
                        <label style={styles.profileFormLabel}>Last Name</label>
                        <input
                          type="text"
                          style={styles.profileFormInput}
                          value={profileForm.last_name}
                          onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                          placeholder="Enter last name"
                        />
                      </div>
                      <div style={styles.profileFormGroup}>
                        <label style={styles.profileFormLabel}>Extension (Sr./Jr./III)</label>
                        <input
                          type="text"
                          style={styles.profileFormInput}
                          value={profileForm.extension_name}
                          onChange={(e) => setProfileForm({ ...profileForm, extension_name: e.target.value })}
                          placeholder="e.g., Jr."
                        />
                      </div>
                      <div style={styles.profileFormGroup}>
                        <label style={styles.profileFormLabel}>Date of Birth</label>
                        <input
                          type="date"
                          style={styles.profileFormInput}
                          value={profileForm.dob}
                          onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                        />
                      </div>
                      <div style={styles.profileFormGroup}>
                        <label style={styles.profileFormLabel}>Sex</label>
                        <select
                          style={styles.profileFormSelect}
                          value={profileForm.sex}
                          onChange={(e) => setProfileForm({ ...profileForm, sex: e.target.value as 'male' | 'female' })}
                        >
                          <option value="">Select sex</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div style={styles.profileFormGroup}>
                        <label style={styles.profileFormLabel}>Purok</label>
                        <input
                          type="text"
                          style={styles.profileFormInput}
                          value={profileForm.purok}
                          onChange={(e) => setProfileForm({ ...profileForm, purok: e.target.value })}
                          placeholder="Enter purok"
                        />
                      </div>
                      <div style={styles.profileFormGroup}>
                        <label style={styles.profileFormLabel}>Barangay</label>
                        <input
                          type="text"
                          style={styles.profileFormInput}
                          value={profileForm.barangay}
                          onChange={(e) => setProfileForm({ ...profileForm, barangay: e.target.value })}
                          placeholder="Enter barangay"
                        />
                      </div>
                      <div style={styles.profileFormGroup}>
                        <label style={styles.profileFormLabel}>Contact Number</label>
                        <input
                          type="tel"
                          style={styles.profileFormInput}
                          value={profileForm.contact_number}
                          onChange={(e) => setProfileForm({ ...profileForm, contact_number: e.target.value })}
                          placeholder="Enter contact number"
                        />
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div style={styles.profileFormActions}>
                      <button
                        type="button"
                        style={styles.profileBtnSecondary}
                        onClick={() => {
                          // Reset form to original values
                          if (profile) {
                            setProfileForm({
                              first_name: profile.first_name || '',
                              middle_name: profile.middle_name || '',
                              last_name: profile.last_name || '',
                              extension_name: profile.extension_name || '',
                              dob: profile.dob || '',
                              sex: profile.sex || '',
                              purok: profile.purok || '',
                              barangay: profile.barangay || '',
                              contact_number: (profile as any).contact_number || '',
                            });
                          }
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        style={profileSaving ? styles.profileBtnPrimaryDisabled : styles.profileBtnPrimary}
                        disabled={profileSaving}
                      >
                        {profileSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>

                    {/* Success/Error Messages */}
                    {profileSaveSuccess && (
                      <div style={styles.profileAlertSuccess}>
                        <span style={styles.profileAlertIcon}>✓</span>
                        Profile updated successfully!
                      </div>
                    )}
                    {profileSaveError && (
                      <div style={styles.profileAlertError}>
                        <span style={styles.profileAlertIcon}>✕</span>
                        {profileSaveError}
                      </div>
                    )}

                  </form>
                  </div>
                )}

                {activeNavSection === 'password' && (
                  <div style={styles.profileCard}>
                    <div style={styles.profileCardHeader}>
                      <div>
                        <h3 style={styles.profileCardTitle}>Change Password</h3>
                        <p style={styles.profileCardSubtitle}>Update your password to keep your account secure</p>
                      </div>
                    </div>

                    {!showPasswordForm ? (
                      <div style={styles.settingsSecurityAction}>
                        <div style={styles.settingsSecurityInfo}>
                          <h4 style={styles.settingsSecurityTitle}>Password</h4>
                          <p style={styles.settingsSecurityDesc}>
                            We recommend changing your password regularly.
                          </p>
                        </div>
                        <button
                          style={styles.settingsBtnOutline}
                          onClick={() => setShowPasswordForm(true)}
                        >
                          Change Password
                        </button>
                      </div>
                    ) : (
                      <div style={styles.settingsPasswordForm}>
                        <div style={styles.settingsFormGroup}>
                          <label style={styles.settingsFormLabel}>New Password</label>
                          <input
                            type="password"
                            style={styles.settingsFormInput}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                          />
                        </div>
                        <div style={styles.settingsFormGroup}>
                          <label style={styles.settingsFormLabel}>Confirm New Password</label>
                          <input
                            type="password"
                            style={styles.settingsFormInput}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                          />
                        </div>

                        {passwordMsg && (
                          <div style={passwordMsg.type === 'error' ? styles.profileAlertError : styles.profileAlertSuccess}>
                            <span style={styles.profileAlertIcon}>
                              {passwordMsg.type === 'error' ? '✕' : '✓'}
                            </span>
                            {passwordMsg.text}
                          </div>
                        )}

                        <div style={styles.settingsFormActions}>
                          <button
                            style={styles.settingsBtnSecondary}
                            onClick={() => {
                              setShowPasswordForm(false);
                              setNewPassword('');
                              setConfirmPassword('');
                              setPasswordMsg(null);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            style={passwordSaving ? styles.profileBtnPrimaryDisabled : styles.settingsBtnPrimary}
                            disabled={passwordSaving}
                            onClick={async () => {
                              if (newPassword !== confirmPassword) {
                                setPasswordMsg({ type: 'error', text: 'Passwords do not match' });
                                return;
                              }
                              if (newPassword.length < 8) {
                                setPasswordMsg({ type: 'error', text: 'Password must be at least 8 characters' });
                                return;
                              }
                              setPasswordSaving(true);
                              setPasswordMsg(null);
                              try {
                                const { supabase } = await import('../../lib/supabase');
                                const { error } = await supabase.auth.updateUser({ password: newPassword });
                                if (error) throw error;
                                setPasswordMsg({ type: 'success', text: 'Password changed successfully!' });
                                setNewPassword('');
                                setConfirmPassword('');
                                setShowPasswordForm(false);
                              } catch (err: any) {
                                setPasswordMsg({ type: 'error', text: err?.message || 'Failed to change password' });
                              } finally {
                                setPasswordSaving(false);
                              }
                            }}
                          >
                            {passwordSaving ? 'Updating...' : 'Update Password'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeNavSection === 'notifications' && (
                  <div style={styles.settingsCard}>
                    <div style={styles.settingsCardHeader}>
                      <div>
                        <h3 style={styles.settingsCardTitle}>Notification Settings</h3>
                        <p style={styles.settingsCardSubtitle}>Choose what notifications you receive</p>
                      </div>
                    </div>
                    
                    <div style={styles.settingsToggleList}>
                      <div style={styles.settingsToggleItem}>
                        <div style={styles.settingsToggleInfo}>
                          <span style={styles.settingsToggleTitle}>Email Notifications</span>
                          <span style={styles.settingsToggleDesc}>Receive updates and announcements via email</span>
                        </div>
                        <label style={styles.settingsToggleSwitch}>
                          <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.checked)}
                            style={styles.settingsToggleInput}
                          />
                          <span style={{
                            ...styles.settingsToggleSlider,
                            background: emailNotifications ? '#1d4ed8' : '#e5e7eb',
                          }}>
                            <span style={{
                              ...styles.settingsToggleKnob,
                              transform: emailNotifications ? 'translateX(20px)' : 'translateX(0)',
                            }}></span>
                          </span>
                        </label>
                      </div>

                      <div style={styles.settingsToggleItem}>
                        <div style={styles.settingsToggleInfo}>
                          <span style={styles.settingsToggleTitle}>Booking Reminders</span>
                          <span style={styles.settingsToggleDesc}>Get reminded about your upcoming bookings</span>
                        </div>
                        <label style={styles.settingsToggleSwitch}>
                          <input
                            type="checkbox"
                            checked={bookingReminders}
                            onChange={(e) => setBookingReminders(e.target.checked)}
                            style={styles.settingsToggleInput}
                          />
                          <span style={{
                            ...styles.settingsToggleSlider,
                            background: bookingReminders ? '#1d4ed8' : '#e5e7eb',
                          }}>
                            <span style={{
                              ...styles.settingsToggleKnob,
                              transform: bookingReminders ? 'translateX(20px)' : 'translateX(0)',
                            }}></span>
                          </span>
                        </label>
                      </div>

                                          </div>

                    <div style={styles.settingsFormActions}>
                      <button
                        style={notificationSaving ? styles.profileBtnPrimaryDisabled : styles.settingsBtnPrimary}
                        disabled={notificationSaving}
                        onClick={async () => {
                          setNotificationSaving(true);
                          try {
                            const { userProfileService } = await import('../../services/user-profiles');
                            await userProfileService.updatePreferences({
                              email_notifications: emailNotifications,
                              booking_reminders: bookingReminders,
                              system_updates: systemUpdates,
                            });
                          } catch (err: any) {
                            console.error('Failed to save notification settings:', err);
                          } finally {
                            setNotificationSaving(false);
                          }
                        }}
                      >
                        {notificationSaving ? 'Saving...' : 'Save Notification Settings'}
                      </button>
                    </div>
                  </div>
                )}

                              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const title = menuItems.find((item) => item.id === activeSection)?.label ?? 'Dashboard';

  return (
    <div style={styles.dashboard}>
      <Navbar />
      <div style={styles.mainContent}>
        {renderContent()}
        <Footer />
      </div>
    </div>
  );
}

export default function UserDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDashboardContent />
    </Suspense>
  );
}

