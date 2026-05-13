'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  FileText,
  Heart,
  Baby,
  Users,
  ArrowRight,
  CalendarDays,
  User,
  MapPin,
  TriangleAlert,
  CreditCard,
  Clock,
  Bookmark
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { userProfileService } from '../../services/user-profiles';

export default function Bookings() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState('wedding');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [displayMonth, setDisplayMonth] = useState(4); // May (0-indexed)
  const [displayYear, setDisplayYear] = useState(2026);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [emailNotification, setEmailNotification] = useState<string>('');

  // Send Gmail notification with reference number
  const sendGmailNotification = async (referenceNumber: string, userEmail: string) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: userEmail,
          subject: `Church Booking Reference: ${referenceNumber}`,
          text: `Your booking has been confirmed! Reference Number: ${referenceNumber}

Please visit the parish office with this reference number to complete your booking process.

Thank you!
Our Lady of the Rosary Parish`,
        }),
      });

      if (response.ok) {
        setEmailNotification('Email sent successfully to your Gmail account!');
        console.log('✅ Gmail notification sent');
      } else {
        setEmailNotification('Failed to send email. Please try again.');
        console.error('❌ Gmail notification failed:', response.statusText);
      }
    } catch (error) {
      setEmailNotification('Failed to send email. Please try again.');
      console.error('❌ Gmail notification error:', error);
    }
  };

  // Copy reference number to clipboard
  const copyReferenceNumber = () => {
    navigator.clipboard.writeText(referenceNumber);
    alert('Reference number copied to clipboard!');
  };
  const [weddingType, setWeddingType] = useState('regular');
  const [yourInfo, setYourInfo] = useState({
    // Wedding Information
    fullName: '',
    email: '',
    mobileNumber: '',
    alternateNumber: '',
    completeAddress: '',
    brideName: '',
    groomName: '',
    additionalNotes: '',
    numberOfGuests: '',
    
    // Baptism Information
    parentName: '',
    parentEmail: '',
    parentMobile: '',
    parentAddress: '',
    childName: '',
    childDOB: '',
    childPlaceOfBirth: '',
    childGender: '',
    numberOfGodparents: '',
    godparentNames: '',
    
    // Funeral Information
    requesterName: '',
    requesterRelationship: '',
    requesterEmail: '',
    requesterMobile: '',
    requesterAddress: '',
    deceasedName: '',
    dateOfDeath: '',
    age: '',
    causeOfDeath: '',
    burialLocation: '',
    funeralHome: '',
    
    // Certificate Request Information
    certificateType: '',
    purpose: '',
    numberOfCopies: '',
    dateNeeded: ''
  });

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const services = [
    {
      id: 'wedding',
      name: 'Wedding',
      icon: Heart,
      description: 'Book your wedding ceremony',
          },
    { 
      id: 'baptism', 
      name: 'Baptism',
      icon: Baby,
      description: 'Schedule baptism for your child',
          },
    { 
      id: 'funeral', 
      name: 'Funeral',
      icon: Users,
      description: 'Arrange funeral services',
          },
    {
      id: 'certificate',
      name: 'Request of Certificate',
      icon: FileText,
      description: 'Request church certificates',
          }
  ];
  const requiredDocuments: Record<string, string[]> = {
  wedding: [
    'Marriage License',
    'Birth Certificates',
    'Baptismal Certificates',
    'Confirmation Certificates',
    'Pre-Marriage Seminar Certificate'
  ],
  baptism: [
    'Birth Certificate',
    'Parents Marriage Certificate',
    'Godparents Information',
    'Baptismal Seminar Certificate'
  ],
  funeral: [
    'Death Certificate',
    'Burial Permit',
    'Family Authorization Letter'
  ],
  certificate: [
    'Valid ID',
    'Authorization Letter if representative'
  ]
};

  // Available dates for May 2026 (matching the image)
  const availableDates = [5, 12, 15, 19, 26];
  const fullyBookedDates = [24, 28, 29, 30];

  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
    setSelectedDate(null);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(displayMonth, displayYear);
    const firstDay = getFirstDayOfMonth(displayMonth, displayYear);
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of month with availability status
    const today = new Date();
    const currentDate = new Date(displayYear, displayMonth, 1);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isAvailable = availableDates.includes(day);
      const isFullyBooked = fullyBookedDates.includes(day);
      const isSelected = selectedDate === day;
      
      // Check if this date is in the past
      const checkDate = new Date(displayYear, displayMonth, day);
      const isPastDate = checkDate < today && 
                        checkDate.toDateString() !== today.toDateString();
      
      days.push({
        day,
        isAvailable,
        isFullyBooked,
        isSelected,
        isPastDate
      });
    }
    
    return (
      <div style={styles.calendarContainer}>
        {/* Month Navigation */}
        <div style={styles.monthNavigation}>
          <button onClick={handlePrevMonth} style={styles.navButton}>
            <ChevronLeft size={16} color="#6B7280" />
          </button>
          <h3 style={styles.monthYear}>{monthNames[displayMonth]} {displayYear}</h3>
          <button onClick={handleNextMonth} style={styles.navButton}>
            <ChevronRight size={16} color="#6B7280" />
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div style={styles.calendarGrid}>
          {/* Day Headers */}
          {dayNames.map(day => (
            <div key={day} style={styles.dayHeader}>{day}</div>
          ))}
          
          {/* Calendar Days */}
          {days.map((dayInfo, index) => {
            if (!dayInfo) {
              return <div key={`empty-${index}`} style={styles.emptyDay}></div>;
            }
            
            const { day, isAvailable, isFullyBooked, isSelected, isPastDate } = dayInfo;
            
            return (
              <div
                key={day}
                style={{
                  ...styles.dayCell,
                  ...(isSelected && styles.selectedDay),
                  ...(isAvailable && !isSelected && styles.availableDay),
                  ...(isFullyBooked && styles.fullyBookedDay),
                  ...(isPastDate && styles.pastDateDay)
                }}
                onClick={() => !isFullyBooked && !isPastDate && setSelectedDate(day)}
              >
                <span style={{
                  ...styles.dayNumber,
                  ...(isPastDate && styles.pastDateText)
                }}>{day}</span>
                {isAvailable && (
                  <div style={styles.availableDot}></div>
                )}
                {isFullyBooked && (
                  <div style={styles.fullyBookedDot}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLegend = () => (
    <div style={styles.legend}>
      <div style={styles.legendItem}>
        <div style={styles.legendDotAvailable}></div>
        <span style={styles.legendText}>Available</span>
      </div>
      <div style={styles.legendItem}>
        <div style={styles.legendDotFullyBooked}></div>
        <span style={styles.legendText}>Fully Booked</span>
      </div>
      <div style={styles.legendItem}>
        <div style={styles.legendDotSelected}></div>
        <span style={styles.legendText}>Selected</span>
      </div>
    </div>
  );

  const submitBooking = async () => {
    console.log('🔍 Starting booking submission...');
    console.log('📋 User:', user?.id);
    console.log('📅 Selected date:', selectedDate);
    console.log('⏰ Selected time:', selectedTime);
    console.log('⛪ Selected service:', selectedService);

    // Ensure user profile exists before creating booking
    if (!user) {
      console.error('❌ No user found');
      setSubmitError('You must be logged in to make a booking');
      return;
    }

    // Create or get user profile if it doesn't exist
    let userProfile = await userProfileService.getCurrentUserProfile();

if (!userProfile) {
      const fullName = user.user_metadata?.full_name || 'Unknown User';
      const nameParts = fullName.split(' ');
      userProfile = await userProfileService.createUserProfile({
        first_name: nameParts[0] || 'Unknown',
        last_name: nameParts[nameParts.length - 1] || 'User',
        middle_name: nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '',
        dob: '1990-01-01', // Default date since it's required
        age: 30, // Default age since it's required
        sex: 'male', // Default sex since it's required
        purok: 'Unknown', // Default purok since it's required
        barangay: 'Unknown', // Default barangay since it's required
        contact_number: user.user_metadata?.phone || ''
      });
      console.log('✅ User profile created:', userProfile?.id);
    }

    if (!selectedDate || !selectedTime) {
      console.error('❌ Missing date or time');
      setSubmitError('Please select a date and time for your booking');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('👤 Checking user profile...');
      // First, ensure user profile exists in the users table
      const { userProfileService } = await import('../../services/user-profiles');
      try {
        const profile = await userProfileService.getCurrentUserProfile();
        console.log('✅ User profile found:', profile?.id);
      } catch (profileError: any) {
        console.log('⚠️ Profile error:', profileError);
        // If profile doesn't exist, create it
        if (profileError.message?.includes('No profile found') || profileError.message?.includes('RLS recursion')) {
          console.log('🔧 Creating new user profile...');
          const userMeta = (user as any)?.user_metadata || {};
          const profileData = {
            first_name: userMeta.first_name || user.email?.split('@')[0] || 'User',
            last_name: userMeta.last_name || '',
            dob: userMeta.dob || '',
            age: 0,
            sex: userMeta.sex || 'male',
            purok: userMeta.purok || '',
            barangay: userMeta.barangay || '',
            contact_number: userMeta.contact_number || ''
          };
          console.log('📝 Profile data:', profileData);
          
          const newProfile = await userProfileService.createUserProfile(profileData);
          console.log('✅ New profile created:', newProfile?.id);
        } else {
          console.error('❌ Unexpected profile error:', profileError);
          throw profileError;
        }
      }

      const bookingDate = new Date(displayYear, displayMonth, selectedDate);
      const formattedDate = bookingDate.toISOString().split('T')[0];
      console.log('📅 Formatted date:', formattedDate);

      let bookingData: any = {
        notes: yourInfo.additionalNotes || '',
        status: 'pending'
      };

      if (selectedService === 'wedding') {
        console.log('💑 Processing wedding booking...');
        const { weddingService } = await import('../../services/supabase');
        
        bookingData = {
          ...bookingData,
          wedding_date: formattedDate,
          wedding_time: selectedTime,
          wedding_type: weddingType,
          bride_first_name: yourInfo.brideName?.split(' ')[0] || '',
          bride_last_name: yourInfo.brideName?.split(' ').slice(1).join(' ') || '',
          bride_contact: yourInfo.mobileNumber,
          bride_email: yourInfo.email,
          groom_first_name: yourInfo.groomName?.split(' ')[0] || '',
          groom_last_name: yourInfo.groomName?.split(' ').slice(1).join(' ') || '',
          groom_contact: yourInfo.mobileNumber,
          groom_email: yourInfo.email,
          venue: 'Our Lady of the Rosary Parish',
          priest_name: 'Parish Priest'
        };
        
        console.log('📋 Wedding booking data:', bookingData);
        console.log('📤 Creating wedding booking...');
        const result = await weddingService.createWeddingBooking(bookingData);
        console.log('✅ Wedding booking created:', result?.id);
        setBookingReference(result.id);

      } else if (selectedService === 'baptism') {
        const { baptismService } = await import('../../services/supabase');
        
        bookingData = {
          ...bookingData,
          baptism_date: formattedDate,
          baptism_time: selectedTime,
          child_first_name: yourInfo.childName?.split(' ')[0] || '',
          child_last_name: yourInfo.childName?.split(' ').slice(1).join(' ') || '',
          child_dob: yourInfo.childDOB,
          child_birth_place: yourInfo.childPlaceOfBirth || '',
          child_sex: yourInfo.childGender?.toLowerCase() as 'male' | 'female',
          father_first_name: yourInfo.parentName?.split(' ')[0] || '',
          father_last_name: yourInfo.parentName?.split(' ').slice(1).join(' ') || '',
          father_contact: yourInfo.parentMobile,
          father_email: yourInfo.parentEmail,
          mother_first_name: yourInfo.parentName?.split(' ')[0] || '',
          mother_last_name: yourInfo.parentName?.split(' ').slice(1).join(' ') || '',
          mother_contact: yourInfo.parentMobile,
          mother_email: yourInfo.parentEmail,
          godfather_first_name: yourInfo.godparentNames?.split(',')[0]?.trim() || '',
          godfather_last_name: '',
          godfather_contact: '',
          godmother_first_name: yourInfo.godparentNames?.split(',')[1]?.trim() || '',
          godmother_last_name: '',
          godmother_contact: '',
          venue: 'Our Lady of the Rosary Parish',
          priest_name: 'Parish Priest'
        };

        const result = await baptismService.createBaptismBooking(bookingData);
        setBookingReference(result.id);

      } else if (selectedService === 'funeral') {
        const { funeralService } = await import('../../services/supabase');
        
        bookingData = {
          ...bookingData,
          funeral_date: formattedDate,
          funeral_time: selectedTime,
          deceased_first_name: yourInfo.deceasedName?.split(' ')[0] || '',
          deceased_last_name: yourInfo.deceasedName?.split(' ').slice(1).join(' ') || '',
          date_of_death: yourInfo.dateOfDeath,
          cause_of_death: yourInfo.causeOfDeath || '',
          death_place: yourInfo.burialLocation || '',
          informant_first_name: yourInfo.requesterName?.split(' ')[0] || '',
          informant_last_name: yourInfo.requesterName?.split(' ').slice(1).join(' ') || '',
          informant_contact: yourInfo.requesterMobile,
          informant_email: yourInfo.requesterEmail,
          informant_relationship: yourInfo.requesterRelationship || '',
          venue: 'Our Lady of the Rosary Parish',
          priest_name: 'Parish Priest',
          burial_place: yourInfo.burialLocation || ''
        };

        const result = await funeralService.createFuneralBooking(bookingData);
        setBookingReference(result.id);

      } else if (selectedService === 'certificate') {
        console.log('📜 Processing certificate request...');
        const { certificateService } = await import('../../services/supabase');
        
        bookingData = {
          ...bookingData,
          requester_first_name: yourInfo.fullName?.split(' ')[0] || '',
          requester_last_name: yourInfo.fullName?.split(' ').slice(1).join(' ') || '',
          requester_contact: yourInfo.mobileNumber,
          requester_email: yourInfo.email,
          certificate_type: yourInfo.certificateType,
          purpose: yourInfo.purpose,
          number_of_copies: parseInt(yourInfo.numberOfCopies) || 1,
          date_needed: yourInfo.dateNeeded ? new Date(yourInfo.dateNeeded).toISOString().split('T')[0] : null
        };
        
        console.log('📋 Certificate booking data:', bookingData);
        console.log('📤 Creating certificate booking...');
        const result = await certificateService.createCertificateBooking(bookingData);
        console.log('✅ Certificate booking created:', result?.id);
        setBookingReference(result.id);
      }

      setCurrentStep(4); // Move to confirmation step

    } catch (error: any) {
      console.error('❌ Booking submission error:', error);
      console.error('❌ Error type:', typeof error);
      console.error('❌ Error keys:', error ? Object.keys(error) : 'No error object');
      console.error('❌ Error message:', error?.message);
      console.error('❌ Error details:', error?.details);
      console.error('❌ Full error string:', JSON.stringify(error, null, 2));
      
      // Better error handling to capture detailed error information
      let errorMessage = 'Failed to submit booking. Please try again.';
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error?.message) {
        errorMessage = error.error.message;
      } else if (error?.details) {
        errorMessage = error.details;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        // Try to extract useful information from error object
        const errorStr = JSON.stringify(error);
        if (errorStr !== '{}') {
          errorMessage = `Booking error: ${errorStr}`;
        }
      }
      
      console.error('❌ Final error message:', errorMessage);
      setSubmitError(errorMessage);
    } finally {
      console.log('🏁 Booking submission finished');
      
      // Generate unique reference number
      const refNumber = `REF-${Date.now().toString(36).slice(-6)}-${Math.random().toString(36).slice(2, 8)}`;
      setReferenceNumber(refNumber);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Arial, sans-serif'
    },
    mainContent: {
      padding: '60px 70px 100px 70px',
      maxWidth: '100%',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '40px',
      marginTop: '40px'
    },
    title: {
      fontSize: '32px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    // Progress Steps
    progressSteps: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '40px',
      maxWidth: '900px',
      margin: '0 auto 40px auto'
    },
    progressStep: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '8px'
    },
    progressLine: {
      flex: 1,
      height: '4px',
      backgroundColor: '#d1d5db',
      margin: '0 0px',
      minHeight: '4px',
      minWidth: '40px',
      marginBottom: '20px'
    },
    progressLineCompleted: {
      backgroundColor: '#10b981'
    },
    progressLineCurrent: {
      backgroundColor: '#2563eb'
    },
    stepNumber: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '600',
      color: '#6b7280'
    },
    activeStep: {
      backgroundColor: '#2563eb',
      color: '#ffffff'
    },
    completedStep: {
      backgroundColor: '#10b981',
      color: '#ffffff'
    },
    stepText: {
      fontSize: '12px',
      color: '#6b7280',
      textAlign: 'center' as const
    },
    activeStepText: {
      color: '#2563eb',
      fontWeight: '600'
    },
    // Main Content Layout
    content: {
      display: 'grid',
      gridTemplateColumns: '280px 1fr 280px',
      gap: '20px',
      alignItems: 'stretch'
    },
    // Service Selection Styles
    serviceSection: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 16px 0'
    },
    serviceList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px'
    },
    serviceItem: {
      padding: '12px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff'
    },
    selectedService: {
      border: '2px solid #2563eb',
      backgroundColor: '#eff6ff'
    },
    serviceItemContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    serviceIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
      flexShrink: 0
    },
    
    helpSection: {
      marginTop: '20px',
      padding: '16px',
      backgroundColor: '#f0f9ff',
      borderRadius: '8px',
      border: '1px solid #dbeafe'
    },
    helpTitle: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#1e40af',
      margin: '0 0 8px 0'
    },
    helpDescription: {
      fontSize: '10px',
      color: '#64748b',
      marginBottom: '8px'
    },
    helpPhone: {
      fontSize: '12px',
      color: '#2563eb',
      fontWeight: '600'
    },
    // Calendar Styles
    calendarSection: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    },
    calendarContainer: {
      width: '100%'
    },
    monthNavigation: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    navButton: {
      width: '32px',
      height: '32px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    monthYear: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    calendarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gridTemplateRows: 'repeat(7, 1fr)', // 1 for headers + 6 for weeks
      gap: '6px',
      marginBottom: '16px',
      minHeight: '280px' // Fixed height for 6 weeks
    },
    dayHeader: {
      fontSize: '12px',
      color: '#6b7280',
      textAlign: 'center' as const,
      padding: '8px 0'
    },
    dayCell: {
      width: '40px',
      height: '40px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#e5e7eb',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: '#fff'
    },
    selectedDay: {
      backgroundColor: '#2563eb',
      borderColor: '#2563eb',
      color: '#ffffff',
      borderWidth: '2px'
    },
    availableDay: {
      borderColor: '#10b981',
      backgroundColor: '#f0fdf4',
      borderWidth: '2px'
    },
    fullyBookedDay: {
      backgroundColor: '#f8fafc',
      borderColor: '#e2e8f0',
      cursor: 'not-allowed'
    },
    pastDateDay: {
      backgroundColor: '#f9fafb',
      borderColor: '#e5e7eb',
      cursor: 'not-allowed',
      opacity: '0.5'
    },
    emptyDay: {
      backgroundColor: 'transparent',
      border: 'none'
    },
    dayNumber: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#1f2937',
      border: 'none',
      outline: 'none'
    },
    pastDateText: {
      color: '#9ca3af',
      textDecoration: 'line-through'
    },
    availableDot: {
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      backgroundColor: '#10b981',
      marginTop: '2px'
    },
    fullyBookedDot: {
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      backgroundColor: '#94a3b8',
      marginTop: '2px'
    },
    legend: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '12px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      marginTop: '-20px'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    legendDotAvailable: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#10b981'
    },
    legendDotFullyBooked: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#e5e7eb'
    },
    legendDotSelected: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#2563eb'
    },
    legendText: {
      fontSize: '11px',
      color: '#6b7280'
    },
    // Time Selection
    timeSection: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    },
    timeSlots: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px'
    },
    timeSlot: {
      padding: '14px 16px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#d1d5db',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '48px'
    },
    selectedTimeSlot: {
      backgroundColor: '#eff6ff',
      borderColor: '#2563eb',
      borderWidth: '2px'
    },
    disabledTimeSlot: {
      cursor: 'not-allowed',
      opacity: '0.5',
      backgroundColor: '#f9fafb'
    },
    nextButton: {
      backgroundColor: '#2563eb',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      width: 'fit-content'
    },
    // Requirements Section
    requirementsSection: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    },
    documentsList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px'
    },
    documentItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '13px',
      color: '#374151'
    },
    importantNote: {
      marginTop: '20px',
      padding: '16px',
      backgroundColor: '#fef3c7',
      borderRadius: '8px',
      border: '1px solid #fcd34d'
    },
    noteTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#92400e',
      margin: '0 0 8px 0'
    },
    noteText: {
      fontSize: '12px',
      color: '#92400e',
      lineHeight: '1.5',
      margin: '0 0 4px 0'
    },
    securityNote: {
      textAlign: 'center' as const,
      fontSize: '11px',
      color: '#6b7280',
      marginTop: '20px'
    },
    // Date & Time Container Styles
    dateTimeContainer: {
      display: 'flex',
      gap: '20px',
      alignItems: 'flex-start'
    },
    selectDateColumn: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px'
    },
    selectTimeColumn: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px'
    },
    columnHeaderTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 16px 0'
    },
    // Form Styles
    formContainer: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    },
    formSection: {
      marginBottom: '30px'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    formGroupFull: {
      display: 'flex',
      flexDirection: 'column' as const,
      gridColumn: '1 / -1'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      padding: '12px 16px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#1f2937',
      backgroundColor: '#fff',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    textarea: {
      padding: '12px 16px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#1f2937',
      backgroundColor: '#fff',
      transition: 'all 0.2s ease',
      outline: 'none',
      resize: 'vertical' as const,
      fontFamily: 'inherit'
    },
    step2Container: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      maxWidth: '800px',
      margin: '0 auto'
    },
    stepTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '30px',
      textAlign: 'center' as const
    },
    formActions: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '20px',
      marginTop: '30px'
    },
    previousButton: {
      backgroundColor: '#fff',
      color: '#6b7280',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      width: 'fit-content'
    },
    confirmButton: {
      backgroundColor: '#10b981',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    
    confirmationContainer: {
      backgroundColor: '#f0fdf4',
      borderRadius: '8px',
      padding: '20px',
      border: '1px solid #10b981'
    },
    // Step 1 Styles
    step1Container: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '40px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    step1Header: {
      textAlign: 'center' as const,
      marginBottom: '40px'
    },
    step1MainTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '12px',
      margin: '0 0 12px 0'
    },
    step1Subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: 0
    },
    step1Content: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '32px'
    },
    step1Section: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #e5e7eb'
    },
    step1SectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '20px',
      margin: '0 0 20px 0'
    },
    serviceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    serviceCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      border: '2px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative' as const,
      minHeight: '140px'
    },
    selectedServiceCard: {
      borderColor: '#2563eb',
      backgroundColor: '#eff6ff'
    },
    serviceCardIcon: {
      marginBottom: '12px'
    },
    serviceCardName: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px'
    },
    serviceCardDescription: {
      fontSize: '12px',
      color: '#6b7280',
      marginBottom: '16px'
    },
    serviceCardCheck: {
      position: 'absolute' as const,
      top: '16px',
      right: '16px'
    },
    dateTimeGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px'
    },
    calendarCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #e5e7eb'
    },
    timeCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #e5e7eb'
    },
    
    requirementsCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #e5e7eb'
    },
    requirementsContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px'
    },
    requirementsColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px'
    },
    requirementsTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '12px',
      margin: '0 0 12px 0'
    },
    step1Actions: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '32px'
    },
    // Wedding Form Styles
    weddingFormContainer: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '40px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      maxWidth: '800px',
      margin: '0 auto'
    },
    weddingSection: {
      marginBottom: '32px'
    },
    weddingSectionTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '24px',
      borderBottom: '2px solid #e5e7eb',
      paddingBottom: '12px'
    },
    weddingFormGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px'
    },
    weddingFormGroup: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    weddingFormGroupFull: {
      display: 'flex',
      flexDirection: 'column' as const,
      gridColumn: '1 / -1'
    },
    weddingLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    weddingInput: {
      padding: '12px 16px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#1f2937',
      backgroundColor: '#fff',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    weddingTextarea: {
      padding: '12px 16px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#1f2937',
      backgroundColor: '#fff',
      transition: 'all 0.2s ease',
      outline: 'none',
      resize: 'vertical' as const,
      fontFamily: 'inherit'
    },
    // Review Booking Styles
    reviewContainer: {
      padding: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e5e7eb',
      maxWidth: '800px',
      margin: '0 auto',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    reviewHeader: {
      textAlign: 'center' as const,
      marginBottom: '40px'
    },
    reviewTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '12px',
      lineHeight: '1.2'
    },
    reviewSubtitle: {
      fontSize: '18px',
      color: '#6b7280',
      marginBottom: '0',
      lineHeight: '1.5'
    },
    reviewCard: {
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    serviceIconContainer: {
      width: '56px',
      height: '56px',
      backgroundColor: '#dbeafe',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    serviceInfo: {
      flex: 1,
      minWidth: 0
    },
    serviceName: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 8px 0',
      lineHeight: '1.3'
    },
    serviceDateTime: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '4px'
    },
    dateLabel: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500'
    },
    dateTimeValue: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#111827',
      lineHeight: '1.4'
    },
    statusBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      backgroundColor: '#dcfce7',
      borderRadius: '20px',
      border: '1px solid #bbf7d0',
      flexShrink: 0
    },
    statusDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#22c55e',
      borderRadius: '50%'
    },
    statusText: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#16a34a'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 16px 0',
      lineHeight: '1.3'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '16px'
    },
    infoItem: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '4px'
    },
    infoLabel: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '500',
      lineHeight: '1.4',
      marginBottom: '2px'
    },
    infoValue: {
      fontSize: '14px',
      color: '#111827',
      fontWeight: '500',
      lineHeight: '1.4'
    },
    notesSection: {
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: '1px solid #e5e7eb'
    },
    notesValue: {
      fontSize: '16px',
      color: '#111827',
      lineHeight: '1.5',
      backgroundColor: '#ffffff',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      marginTop: '6px'
    },
    // Review Booking Section Styles
    reviewBookingSection: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    },
    confirmationBox: {
      backgroundColor: '#f0fdf4',
      borderRadius: '8px',
      padding: '14px',
      border: '1px solid #10b981',
      marginTop: '16px'
    },
    confirmationText: {
      fontSize: '12px',
      color: '#166534',
      lineHeight: '1.4',
      margin: 0
    },
    bottomNavigation: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '24px',
      padding: '16px 0',
      borderTop: '1px solid #e5e7eb'
    },
    confirmBookingButton: {
      backgroundColor: '#10b981',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  
  // Form Components
  const renderWeddingForm = () => (
    <div style={styles.weddingFormContainer}>
        <h2 style={styles.weddingSectionTitle}>Wedding Information</h2>
        <div style={styles.weddingFormGrid}>
          <div style={styles.weddingFormGroup}>
            <label style={styles.weddingLabel}>Full Name (Primary Contact) <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.weddingInput}
              value={yourInfo.fullName}
              onChange={(e) => setYourInfo({...yourInfo, fullName: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>
          <div style={styles.weddingFormGroup}>
            <label style={styles.weddingLabel}>Email Address <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="email"
              style={styles.weddingInput}
              value={yourInfo.email}
              onChange={(e) => setYourInfo({...yourInfo, email: e.target.value})}
              placeholder="Enter email address"
            />
          </div>
          <div style={styles.weddingFormGroup}>
            <label style={styles.weddingLabel}>Mobile Number <span style={{color: '#dc2626'}}>*</span></label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select style={{ 
                padding: '12px 8px', 
                borderWidth: '1px', 
                borderStyle: 'solid', 
                borderColor: '#d1d5db', 
                borderRadius: '8px', 
                fontSize: '14px', 
                color: '#1f2937', 
                backgroundColor: '#fff', 
                minWidth: '80px' 
              }}>
                <option value="+63">+63</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                style={{...styles.weddingInput, flex: 1}}
                value={yourInfo.mobileNumber}
                onChange={(e) => setYourInfo({...yourInfo, mobileNumber: e.target.value})}
                placeholder="Enter mobile number"
              />
            </div>
          </div>
          <div style={styles.weddingFormGroup}>
            <label style={styles.weddingLabel}>Alternate Number (Optional)</label>
            <input
              type="tel"
              style={styles.weddingInput}
              value={yourInfo.alternateNumber || ''}
              onChange={(e) => setYourInfo({...yourInfo, alternateNumber: e.target.value})}
              placeholder="Enter alternate number"
            />
          </div>
          <div style={styles.weddingFormGroup}>
            <label style={styles.weddingLabel}>Bride's Full Name <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.weddingInput}
              value={yourInfo.brideName}
              onChange={(e) => setYourInfo({...yourInfo, brideName: e.target.value})}
              placeholder="Enter bride's full name"
            />
          </div>
          <div style={styles.weddingFormGroup}>
            <label style={styles.weddingLabel}>Groom's Full Name <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.weddingInput}
              value={yourInfo.groomName}
              onChange={(e) => setYourInfo({...yourInfo, groomName: e.target.value})}
              placeholder="Enter groom's full name"
            />
          </div>
          <div style={styles.weddingFormGroupFull}>
            <label style={styles.weddingLabel}>Additional Notes (Optional)</label>
            <textarea
              style={styles.weddingTextarea}
              value={yourInfo.additionalNotes}
              onChange={(e) => setYourInfo({...yourInfo, additionalNotes: e.target.value})}
              placeholder="Enter additional notes or special requirements"
              rows={3}
            />
          </div>
        </div>
        <div style={styles.formActions}>
          <button style={styles.previousButton} onClick={handlePrevious}>
            Back
          </button>
          <button style={{
            ...styles.nextButton,
            opacity: isNextButtonDisabled() ? 0.5 : 1,
            cursor: isNextButtonDisabled() ? 'not-allowed' : 'pointer'
          }} 
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
        >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
    </div>
  );

  const renderBaptismForm = () => (
    <div style={styles.formContainer}>
      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Parent / Guardian Information</h3>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Parent or Guardian Name <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.input}
              value={yourInfo.parentName}
              onChange={(e) => setYourInfo({...yourInfo, parentName: e.target.value})}
              placeholder="Enter parent/guardian name"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="email"
              style={styles.input}
              value={yourInfo.parentEmail}
              onChange={(e) => setYourInfo({...yourInfo, parentEmail: e.target.value})}
              placeholder="Enter email address"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mobile Number <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="tel"
              style={styles.input}
              value={yourInfo.parentMobile}
              onChange={(e) => setYourInfo({...yourInfo, parentMobile: e.target.value})}
              placeholder="Enter mobile number"
            />
          </div>
          <div style={styles.formGroupFull}>
            <label style={styles.label}>Complete Address</label>
            <textarea
              style={styles.textarea}
              value={yourInfo.parentAddress}
              onChange={(e) => setYourInfo({...yourInfo, parentAddress: e.target.value})}
              placeholder="Enter complete address"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Child Information</h3>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Child's Full Name <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.input}
              value={yourInfo.childName}
              onChange={(e) => setYourInfo({...yourInfo, childName: e.target.value})}
              placeholder="Enter child's full name"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date of Birth <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="date"
              style={styles.input}
              value={yourInfo.childDOB}
              onChange={(e) => setYourInfo({...yourInfo, childDOB: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Place of Birth <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.input}
              value={yourInfo.childPlaceOfBirth}
              onChange={(e) => setYourInfo({...yourInfo, childPlaceOfBirth: e.target.value})}
              placeholder="Enter place of birth"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Gender <span style={{color: '#dc2626'}}>*</span></label>
            <select
              style={styles.input}
              value={yourInfo.childGender}
              onChange={(e) => setYourInfo({...yourInfo, childGender: e.target.value})}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>

      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Godparents Information</h3>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Number of Godparents</label>
            <input
              type="number"
              style={styles.input}
              value={yourInfo.numberOfGodparents}
              onChange={(e) => setYourInfo({...yourInfo, numberOfGodparents: e.target.value})}
              placeholder="Enter number"
              min="1"
              max="6"
            />
          </div>
          <div style={styles.formGroupFull}>
            <label style={styles.label}>Godparents Complete Names</label>
            <textarea
              style={styles.textarea}
              value={yourInfo.godparentNames}
              onChange={(e) => setYourInfo({...yourInfo, godparentNames: e.target.value})}
              placeholder="Enter godparents' complete names (separate by comma)"
              rows={3}
            />
          </div>
        </div>
      </div>
      <div style={styles.formActions}>
        <button style={styles.previousButton} onClick={handlePrevious}>
          Back
        </button>
        <button style={{
            ...styles.nextButton,
            opacity: isNextButtonDisabled() ? 0.5 : 1,
            cursor: isNextButtonDisabled() ? 'not-allowed' : 'pointer'
          }} 
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
        >
          Next
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderFuneralForm = () => (
    <div style={styles.formContainer}>
      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Requester Information</h3>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.input}
              value={yourInfo.requesterName}
              onChange={(e) => setYourInfo({...yourInfo, requesterName: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Relationship to Deceased <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.input}
              value={yourInfo.requesterRelationship}
              onChange={(e) => setYourInfo({...yourInfo, requesterRelationship: e.target.value})}
              placeholder="Enter relationship"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="email"
              style={styles.input}
              value={yourInfo.requesterEmail}
              onChange={(e) => setYourInfo({...yourInfo, requesterEmail: e.target.value})}
              placeholder="Enter email address"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mobile Number <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="tel"
              style={styles.input}
              value={yourInfo.requesterMobile}
              onChange={(e) => setYourInfo({...yourInfo, requesterMobile: e.target.value})}
              placeholder="Enter mobile number"
            />
          </div>
          <div style={styles.formGroupFull}>
            <label style={styles.label}>Complete Address</label>
            <textarea
              style={styles.textarea}
              value={yourInfo.requesterAddress}
              onChange={(e) => setYourInfo({...yourInfo, requesterAddress: e.target.value})}
              placeholder="Enter complete address"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Deceased Information</h3>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name of Deceased <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.input}
              value={yourInfo.deceasedName}
              onChange={(e) => setYourInfo({...yourInfo, deceasedName: e.target.value})}
              placeholder="Enter deceased's full name"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date of Death <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="date"
              style={styles.input}
              value={yourInfo.dateOfDeath}
              onChange={(e) => setYourInfo({...yourInfo, dateOfDeath: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Age <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="number"
              style={styles.input}
              value={yourInfo.age}
              onChange={(e) => setYourInfo({...yourInfo, age: e.target.value})}
              placeholder="Enter age"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Cause of Death <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.input}
              value={yourInfo.causeOfDeath}
              onChange={(e) => setYourInfo({...yourInfo, causeOfDeath: e.target.value})}
              placeholder="Enter cause of death"
            />
          </div>
        </div>
      </div>

      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Funeral Service Details</h3>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Burial Location / Cemetery</label>
            <input
              type="text"
              style={styles.input}
              value={yourInfo.burialLocation}
              onChange={(e) => setYourInfo({...yourInfo, burialLocation: e.target.value})}
              placeholder="Enter burial location"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Funeral Home Name (Optional)</label>
            <input
              type="text"
              style={styles.input}
              value={yourInfo.funeralHome}
              onChange={(e) => setYourInfo({...yourInfo, funeralHome: e.target.value})}
              placeholder="Enter funeral home name"
            />
          </div>
        </div>
      </div>
      <div style={styles.formActions}>
        <button style={styles.previousButton} onClick={handlePrevious}>
          Back
        </button>
        <button style={{
            ...styles.nextButton,
            opacity: isNextButtonDisabled() ? 0.5 : 1,
            cursor: isNextButtonDisabled() ? 'not-allowed' : 'pointer'
          }} 
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
        >
          Next
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderCertificateForm = () => (
    <div style={styles.formContainer}>
      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Personal Information</h3>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="text"
              style={styles.input}
              value={yourInfo.requesterName}
              onChange={(e) => setYourInfo({...yourInfo, requesterName: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="email"
              style={styles.input}
              value={yourInfo.requesterEmail}
              onChange={(e) => setYourInfo({...yourInfo, requesterEmail: e.target.value})}
              placeholder="Enter email address"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mobile Number <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="tel"
              style={styles.input}
              value={yourInfo.requesterMobile}
              onChange={(e) => setYourInfo({...yourInfo, requesterMobile: e.target.value})}
              placeholder="Enter mobile number"
            />
          </div>
        </div>
      </div>

      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Certificate Request</h3>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Certificate Type <span style={{color: '#dc2626'}}>*</span></label>
            <select
              style={styles.input}
              value={yourInfo.certificateType}
              onChange={(e) => setYourInfo({...yourInfo, certificateType: e.target.value})}
            >
              <option value="">Select Certificate Type</option>
              <option value="baptismal">Baptismal Certificate</option>
              <option value="confirmation">Confirmation Certificate</option>
              <option value="marriage">Marriage Certificate</option>
              <option value="death">Death Certificate</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Number of Copies <span style={{color: '#dc2626'}}>*</span></label>
            <input
              type="number"
              style={styles.input}
              value={yourInfo.numberOfCopies}
              onChange={(e) => setYourInfo({...yourInfo, numberOfCopies: e.target.value})}
              placeholder="Enter number of copies"
              min="1"
              max="10"
            />
          </div>
          <div style={styles.formGroupFull}>
            <label style={styles.label}>Purpose of Request <span style={{color: '#dc2626'}}>*</span></label>
            <textarea
              style={styles.textarea}
              value={yourInfo.purpose}
              onChange={(e) => setYourInfo({...yourInfo, purpose: e.target.value})}
              placeholder="Enter purpose of request"
              rows={3}
            />
          </div>
        </div>
      </div>
      <div style={styles.formActions}>
        <button style={styles.previousButton} onClick={handlePrevious}>
          Back
        </button>
        <button style={{
            ...styles.nextButton,
            opacity: isNextButtonDisabled() ? 0.5 : 1,
            cursor: isNextButtonDisabled() ? 'not-allowed' : 'pointer'
          }} 
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
        >
          Next
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  
  const renderInformationForm = () => {
    switch (selectedService) {
      case 'wedding':
        return renderWeddingForm();
      case 'baptism':
        return renderBaptismForm();
      case 'funeral':
        return renderFuneralForm();
      case 'certificate':
        return renderCertificateForm();
      default:
        return null;
    }
  };

  const isNextButtonDisabled = () => {
    // Check if next button should be disabled based on current step
    if (currentStep === 1) {
      // Step 1: Check if service, date, and time are selected
      return !selectedService || !selectedDate || !selectedTime;
    }
    
    if (currentStep === 2) {
      // Step 2: Check required fields based on selected service
      if (selectedService === 'wedding') {
        return !yourInfo.fullName.trim() || 
               !yourInfo.email.trim() || 
               !yourInfo.mobileNumber.trim() || 
               !yourInfo.brideName.trim() || 
               !yourInfo.groomName.trim();
      } else if (selectedService === 'baptism') {
        return !yourInfo.parentName.trim() || 
               !yourInfo.parentEmail.trim() || 
               !yourInfo.parentMobile.trim() || 
               !yourInfo.childName.trim() || 
               !yourInfo.childDOB || 
               !yourInfo.childPlaceOfBirth.trim() || 
               !yourInfo.childGender;
      } else if (selectedService === 'funeral') {
        return !yourInfo.requesterName.trim() || 
               !yourInfo.requesterEmail.trim() || 
               !yourInfo.requesterMobile.trim() || 
               !yourInfo.deceasedName.trim() || 
               !yourInfo.dateOfDeath || 
               !yourInfo.age || 
               !yourInfo.causeOfDeath.trim();
      }
    }
    return false; // Enable button for other steps
  };

  const handleNext = () => {
    if (currentStep === 3) {
      // Navigate to confirmation step when booking is confirmed
      setCurrentStep(4);
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            {/* Main Content: 3 Columns */}
            <div style={styles.content}>
              {/* Left Column - Service Selection */}
              <div style={styles.serviceSection}>
                <h2 style={styles.sectionTitle}>Select Service</h2>
                <div style={styles.serviceList}>
                  {services.map(service => {
                    const IconComponent = service.icon;
                    const isSelected = selectedService === service.id;
                    return (
                      <div
                        key={service.id}
                        style={{
                          ...styles.serviceItem,
                          ...(isSelected && styles.selectedService)
                        }}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <div style={styles.serviceItemContent}>
                          <div style={styles.serviceIcon}>
                            <IconComponent size={20} color={isSelected ? '#2563eb' : '#6b7280'} />
                          </div>
                          <div style={styles.serviceName}>{service.name}</div>
                          {isSelected && (
                            <CheckCircle size={16} color="#2563eb" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Need Help Section */}
                <div style={styles.helpSection}>
                  <h3 style={styles.helpTitle}>Need Help?</h3>
                  <p style={styles.helpDescription}>
                    If you have any questions, please contact the parish office.
                  </p>
                  <div style={styles.helpPhone}>(02) 8123 4567</div>
                </div>
              </div>

              {/* Center Column - Date & Time Selection */}
              <div style={styles.calendarSection}>
                <h2 style={styles.sectionTitle}>Choose Date & Time</h2>
                
                <div style={styles.dateTimeContainer}>
                  {/* Select Date Column */}
                  <div style={styles.selectDateColumn}>
                    <h3 style={styles.columnHeaderTitle}>Select Date</h3>
                    <div style={styles.calendarContainer}>
                      {renderCalendar()}
                    </div>
                    {renderLegend()}
                  </div>

                  {/* Select Time Column */}
                  <div style={styles.selectTimeColumn}>
                    <h3 style={styles.columnHeaderTitle}>Select Time</h3>
                    <div style={styles.timeSlots}>
                      {['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'].map(time => {
                        const isSelected = selectedTime === time;
                        const isDateSelected = selectedDate !== null;
                        return (
                          <div
                            key={time}
                            style={{
                              ...styles.timeSlot,
                              ...(isSelected && styles.selectedTimeSlot),
                              ...(!isDateSelected && styles.disabledTimeSlot)
                            }}
                            onClick={() => isDateSelected && setSelectedTime(time)}
                          >
                            <span style={{ 
                              fontSize: '14px', 
                              fontWeight: '500', 
                              color: isDateSelected ? '#1f2937' : '#9ca3af' 
                            }}>{time}</span>
                            {isSelected && (
                              <CheckCircle size={16} color="#2563eb" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                      <button style={{
            ...styles.nextButton,
            opacity: isNextButtonDisabled() ? 0.5 : 1,
            cursor: isNextButtonDisabled() ? 'not-allowed' : 'pointer'
          }} 
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
        >
                        Next
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
  return (
    <div>
      <div style={styles.content}>
        {/* Left Column - Selected Service */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
          <div style={styles.serviceSection}>
            <h2 style={styles.sectionTitle}>Selected Service</h2>
            <div style={styles.serviceList}>
              {selectedService && (() => {
                const service = services.find(s => s.id === selectedService);
                if (!service) return null;
                const IconComponent = service.icon;

                return (
                  <div style={{
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      flexShrink: 0
                    }}>
                      <IconComponent size={20} color="#2563eb" />
                    </div>

                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {service.name}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          <div style={styles.helpSection}>
            <h3 style={styles.helpTitle}>Need Help?</h3>
            <p style={styles.helpDescription}>
              If you have any questions, please contact the parish office.
            </p>
            <div style={styles.helpPhone}>(02) 8123 4567</div>
          </div>
        </div>

        {/* Middle Column */}
        <div>
          {renderInformationForm()}
        </div>

        {/* Right Column - Requirements */}
        <div style={styles.requirementsSection}>
          <h2 style={styles.sectionTitle}>Requirements</h2>

          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
              Required Documents
            </h3>

            <div style={styles.documentsList}>
              {selectedService && (requiredDocuments[selectedService] ?? []).map((doc, index) => (
                <div key={index} style={styles.documentItem}>
                  <CheckCircle size={14} color="#10b981" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.importantNote}>
            <h3 style={styles.noteTitle}>Important Note</h3>
            <p style={styles.noteText}>
              Payment will be made at the parish office upon submission of the required documents.
            </p>
            <p style={styles.noteText}>
              Your booking is not yet final until it is verified and confirmed by the parish office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
      case 3:
        return (
          <div>
            {/* Main Content: 3 Columns */}
            <div style={styles.content}>
              {/* Left Column - Selected Service */}
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                {/* Selected Service Card */}
                <div style={styles.serviceSection}>
                  <h2 style={styles.sectionTitle}>Selected Service</h2>
                  <div style={styles.serviceList}>
                    {selectedService && (() => {
                      const service = services.find(s => s.id === selectedService);
                      if (!service) return null;
                      const IconComponent = service.icon;
                      return (
                        <div style={{
                          padding: '12px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            flexShrink: 0
                          }}>
                            <IconComponent size={20} color="#2563eb" />
                          </div>
                          <div>
                            <div style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#1f2937'
                            }}>{service.name}</div>
                            <div style={{
                              fontSize: '12px',
                              color: '#6b7280',
                              marginTop: '2px'
                            }}>{service.description}</div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                
                {/* Need Help Section - Outside the card */}
                <div style={styles.helpSection}>
                  <h3 style={styles.helpTitle}>Need Help?</h3>
                  <p style={styles.helpDescription}>
                    If you have any questions, please contact the parish office.
                  </p>
                  <div style={styles.helpPhone}>(02) 8123 4567</div>
                </div>
              </div>

              {/* Middle Column - Review Your Booking */}
              <div style={styles.reviewBookingSection}>
                <h2 style={styles.sectionTitle}>Review Your Booking</h2>
                
                {/* Booking Details Card */}
                <div style={styles.reviewCard}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <CalendarDays size={20} color="#2563eb" />
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Booking Details</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    <div>
                      <div style={styles.infoLabel}>Service</div>
                      <div style={styles.infoValue}>{selectedService && services.find(s => s.id === selectedService)?.name}</div>
                    </div>
                    
                    <div>
                      <div style={styles.infoLabel}>Date & Time</div>
                      <div style={styles.infoValue}>
                        {selectedDate && `${monthNames[displayMonth]} ${selectedDate}, ${displayYear} (${dayNames[new Date(displayYear, displayMonth, selectedDate).getDay()]})`}
                        <br />
                        {selectedTime}
                      </div>
                    </div>
                    
                    <div>
                      <div style={styles.infoLabel}>Location</div>
                      <div style={styles.infoValue}>
                        Parish Office
                        <br />
                        St. Joseph Parish
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Information */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <User size={20} color="#2563eb" />
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Your Information</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '24px', width: '100%' }}>
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', alignItems: 'center' }}>
                      {selectedService === 'wedding' && (
                        <>
                          <div style={styles.infoLabel}>Full Name</div>
                          <div style={styles.infoValue}>: {yourInfo.fullName || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Email Address</div>
                          <div style={styles.infoValue}>: {yourInfo.email || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Mobile Number</div>
                          <div style={styles.infoValue}>: {yourInfo.mobileNumber || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Alternate Number</div>
                          <div style={styles.infoValue}>: {yourInfo.alternateNumber || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Bride's Full Name</div>
                          <div style={styles.infoValue}>: {yourInfo.brideName || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Groom's Full Name</div>
                          <div style={styles.infoValue}>: {yourInfo.groomName || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Number of Guests</div>
                          <div style={styles.infoValue}>: {yourInfo.numberOfGuests || 'Not provided'}</div>
                        </>
                      )}

                      {selectedService === 'baptism' && (
                        <>
                          <div style={styles.infoLabel}>Parent or Guardian Name</div>
                          <div style={styles.infoValue}>: {yourInfo.parentName || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Email Address</div>
                          <div style={styles.infoValue}>: {yourInfo.parentEmail || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Mobile Number</div>
                          <div style={styles.infoValue}>: {yourInfo.parentMobile || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Complete Address</div>
                          <div style={styles.infoValue}>: {yourInfo.parentAddress || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Child's Full Name</div>
                          <div style={styles.infoValue}>: {yourInfo.childName || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Date of Birth</div>
                          <div style={styles.infoValue}>: {yourInfo.childDOB || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Place of Birth</div>
                          <div style={styles.infoValue}>: {yourInfo.childPlaceOfBirth || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Gender</div>
                          <div style={styles.infoValue}>: {yourInfo.childGender || 'Not provided'}</div>
                        </>
                      )}

                      {selectedService === 'funeral' && (
                        <>
                          <div style={styles.infoLabel}>Requester Name</div>
                          <div style={styles.infoValue}>: {yourInfo.requesterName || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Email Address</div>
                          <div style={styles.infoValue}>: {yourInfo.requesterEmail || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Mobile Number</div>
                          <div style={styles.infoValue}>: {yourInfo.requesterMobile || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Relationship to Deceased</div>
                          <div style={styles.infoValue}>: {yourInfo.requesterRelationship || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Deceased Name</div>
                          <div style={styles.infoValue}>: {yourInfo.deceasedName || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Date of Death</div>
                          <div style={styles.infoValue}>: {yourInfo.dateOfDeath || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Age</div>
                          <div style={styles.infoValue}>: {yourInfo.age || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Cause of Death</div>
                          <div style={styles.infoValue}>: {yourInfo.causeOfDeath || 'Not provided'}</div>
                        </>
                      )}

                      {selectedService === 'certificate' && (
                        <>
                          <div style={styles.infoLabel}>Full Name</div>
                          <div style={styles.infoValue}>: {yourInfo.requesterName || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Email Address</div>
                          <div style={styles.infoValue}>: {yourInfo.requesterEmail || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Mobile Number</div>
                          <div style={styles.infoValue}>: {yourInfo.requesterMobile || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Certificate Type</div>
                          <div style={styles.infoValue}>: {yourInfo.certificateType || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Number of Copies</div>
                          <div style={styles.infoValue}>: {yourInfo.numberOfCopies || 'Not provided'}</div>

                          <div style={styles.infoLabel}>Purpose of Request</div>
                          <div style={styles.infoValue}>: {yourInfo.purpose || 'Not provided'}</div>
                        </>
                      )}
                    </div>
                    
                    {yourInfo.additionalNotes && (
                      <div style={{ flex: 1, paddingLeft: '20px', borderLeft: '1px solid #e5e7eb' }}>
                        <div style={styles.infoLabel}>Additional Notes</div>
                        <div style={{ ...styles.notesValue, marginTop: '8px', fontSize: '14px', lineHeight: '1.5' }}>
                          {yourInfo.additionalNotes}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Please Confirm Box */}
                <div style={styles.confirmationBox}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckCircle size={16} color="#10b981" />
                    <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#166534', margin: 0 }}>Please Confirm</h3>
                  </div>
                  <div style={styles.confirmationText}>
                    By confirming, you agree that all the information provided is accurate and complete. You can still go back and edit any details if needed.
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div style={styles.formActions}>
                  <button style={styles.previousButton} onClick={handlePrevious}>
                    ← Back
                  </button>
                  <button style={styles.confirmBookingButton} onClick={handleNext}>
                    Confirm Booking →
                  </button>
                </div>
              </div>

              {/* Right Column - Requirements */}
              <div style={styles.requirementsSection}>
                <h2 style={styles.sectionTitle}>Requirements</h2>
                
                {/* Required Documents */}
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                    Required Documents
                  </h3>
                  <div style={styles.documentsList}>
                    {selectedService && (requiredDocuments[selectedService] ?? []).map((doc, index) => (
                      <div key={index} style={styles.documentItem}>
                        <CheckCircle size={14} color="#10b981" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Important Note */}
                <div style={styles.importantNote}>
                  <h3 style={styles.noteTitle}>Important Note</h3>
                  <p style={styles.noteText}>
                    Payment will be made at the parish office. Please bring your reference number when you visit.
                  </p>
                  <p style={styles.noteText}>
                    Your booking is not yet final until it is verified and confirmed by the parish office.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            {/* Main Content: 3 Columns */}
            <div style={styles.content}>
              
              {/* Left Column - Selected Service and Need Help */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Selected Service Card */}
                <div style={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '12px', 
                  padding: '16px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  height: 'fit-content'
                }}>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#1f2937', 
                    margin: '0 0 12px 0' 
                  }}>
                    Selected Service
                  </h3>
                  {selectedService && (() => {
                    const service = services.find(s => s.id === selectedService);
                    if (!service) return null;
                    const IconComponent = service.icon;
                    return (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          backgroundColor: '#dbeafe',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <IconComponent size={24} color="#2563eb" />
                        </div>
                        <div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1f2937',
                            marginBottom: '4px'
                          }}>{service.name}</div>
                          <div style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            lineHeight: '1.4'
                          }}>{service.description}</div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Need Help Card */}
                <div style={{ 
                  backgroundColor: '#f0f9ff', 
                  borderRadius: '12px', 
                  padding: '20px', 
                  border: '1px solid #dbeafe',
                  height: 'fit-content'
                }}>
                  <h3 style={{ 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    color: '#1e40af', 
                    margin: '0 0 12px 0' 
                  }}>
                    Need Help?
                  </h3>
                  <p style={{ 
                    fontSize: '10px', 
                    color: '#64748b', 
                    margin: '0 0 12px 0',
                    lineHeight: '1.5'
                  }}>
                    If you have any questions, please contact the parish office.
                  </p>
                  <div style={{ fontSize: '12px', color: '#2563eb', fontWeight: '600' }}>
                    (02) 8123 4567
                  </div>
                </div>

                {/* What happens next? */}
                <div style={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '12px', 
                  padding: '24px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  height: 'fit-content'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#dbeafe',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#2563eb',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: '8px',
                        fontWeight: '600'
                      }}>i</div>
                    </div>
                    <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                      What happens next?
                    </h3>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#2563eb'
                      }}>1</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                          Submit required documents to the parish office
                        </div>
                        <div style={{ fontSize: '10px', color: '#6b7280', lineHeight: '1.4' }}>
                          Bring all necessary documents for verification
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#2563eb'
                      }}>2</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                          Payment processing
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>
                          Complete payment at the parish office
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#2563eb'
                      }}>3</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                          Booking confirmation
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>
                          Receive confirmation via email or SMS
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#2563eb'
                      }}>4</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                          Your booking will be verified and confirmed by the parish office.
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                          You will be notified via email or SMS once your booking is finalized.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column - Confirmation Section */}
              <div style={{ 
                backgroundColor: '#f0fdf4',
                borderRadius: '12px', 
                padding: '40px', 
                border: '1px solid #10b981',
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto',
                height: 'fit-content'
              }}>
                {bookingReference ? (
                  <>
                    {/* Success Checkmark with Sparkles */}
                    <div style={{ 
                      position: 'relative',
                      width: '80px', 
                      height: '80px', 
                      backgroundColor: '#10b981', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      margin: '0 auto 24px'
                    }}>
                      <CheckCircle size={48} color="#ffffff" />
                      {/* Sparkle effects */}
                      <div style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#fbbf24',
                        borderRadius: '50%',
                        opacity: 0.8
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: '-5px',
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#fbbf24',
                        borderRadius: '50%',
                        opacity: 0.6
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        top: '5px',
                        left: '-8px',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#fbbf24',
                        borderRadius: '50%',
                        opacity: 0.7
                      }}></div>
                    </div>
                    
                    <h1 style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: '#166534', 
                      margin: '0 0 12px 0' 
                    }}>
                      Your Booking is Confirmed!
                    </h1>
                    
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#166534', 
                      margin: '0 0 32px 0',
                      lineHeight: '1.5'
                    }}>
                      Thank you! Your church service booking has been successfully received.
                    </p>
                    
                    {/* Booking Reference Number Box */}
                    <div style={{
                      backgroundColor: '#10b981',
                      borderRadius: '8px',
                      padding: '20px',
                      margin: '0 auto 32px',
                      maxWidth: '400px'
                    }}>
                      <div style={{ fontSize: '14px', color: '#ffffff', marginBottom: '8px', fontWeight: '500' }}>
                        Booking Reference Number
                      </div>
                      Reference Number: <span style={{ fontSize: '20px', fontWeight: '700', color: '#2563eb' }}>{selectedService.toUpperCase()}-{displayYear}-{String(displayMonth + 1).padStart(2, '0')}-{String(selectedDate).padStart(2, '0')}-{bookingReference?.slice(0, 5).toUpperCase()}</span>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                        You may need this reference number for any questions or follow-ups regarding your booking.
                      </p>
                      <button
                        style={{
                          backgroundColor: '#10b981',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 16px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          // Copy reference number to clipboard
                          navigator.clipboard.writeText(selectedService.toUpperCase() + "-" + displayYear + "-" + String(displayMonth + 1).padStart(2, '0') + "-" + String(selectedDate).padStart(2, '0') + "-" + bookingReference?.slice(0, 5).toUpperCase());
                          alert('Reference number copied to clipboard!');
                        }}
                      >
                        Copy Reference
                      </button>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CheckCircle size={10} color="#ffffff" />
                      </div>
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#166534', 
                        margin: 0,
                        lineHeight: '1.4'
                      }}>
                        A copy of this reference number has been sent to your email.
                      </p>
                    </div>

                    {/* Booking Summary */}
                    <div style={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '12px', 
                      padding: '24px', 
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      marginBottom: '24px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <CalendarDays size={20} color="#2563eb" />
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                          Booking Summary
                        </h3>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Service</div>
                          <div style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937' }}>
                            {selectedService && services.find(s => s.id === selectedService)?.name}
                          </div>
                        </div>
                        
                        <div>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Date & Time</div>
                          <div style={{ fontSize: '12px', fontWeight: '600', color: '#1f2937' }}>
                            {selectedDate && `${monthNames[displayMonth]} ${selectedDate}, ${displayYear} (${dayNames[new Date(displayYear, displayMonth, selectedDate).getDay()]})`}
                            <br />
                            {selectedTime}
                          </div>
                        </div>
                        
                        <div>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Location</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                            Our Lady of the Rosary Parish
                            <br />
                            Magallanes, Agusan del Norte
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Navigation Buttons */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <button style={{
                        backgroundColor: '#fff',
                        color: '#6b7280',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }} onClick={() => router.push('/userdashboard')}>
                        ← Back to Dashboard
                      </button>
                      
                      <button style={{
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }} onClick={() => router.push('/records')}>
                        View My Bookings
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Loading/Error State */}
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      {isSubmitting ? (
                        <>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            border: '4px solid #e5e7eb',
                            borderTopColor: '#10b981',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 16px'
                          }}></div>
                          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '16px' }}>
                            Submitting your booking...
                          </p>
                        </>
                      ) : submitError ? (
                        <>
                          <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            backgroundColor: '#fee2e2',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px'
                          }}>
                            <TriangleAlert size={24} color="#dc2626" />
                          </div>
                          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#dc2626', marginBottom: '8px' }}>
                            Booking Failed
                          </h3>
                          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
                            {submitError}
                          </p>
                          <button
                            onClick={submitBooking}
                            style={{
                              backgroundColor: '#10b981',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '12px 24px',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            Try Again
                          </button>
                        </>
                      ) : (
                        <>
                          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                            Confirm Your Booking
                          </h3>
                          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
                            Please review your booking details before submitting.
                          </p>
                          <button
                            onClick={submitBooking}
                            disabled={isSubmitting}
                            style={{
                              backgroundColor: '#10b981',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '12px 24px',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: isSubmitting ? 'not-allowed' : 'pointer',
                              opacity: isSubmitting ? 0.7 : 1
                            }}
                          >
                            {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - Important Reminder */}
              <div style={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px', 
                padding: '24px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                height: 'fit-content'
              }}>
                {/* Booking Reference */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <TriangleAlert size={24} color="#f59e0b" />
                    <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                      Your Booking Reference
                    </h2>
                  </div>
                  
                  {/* Individual Reminder Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Reference Number */}

                    {/* Payment */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '1px solid #e5e7eb'
                      }}>
                        <CreditCard size={20} color="#f59e0b" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                          Payment
                        </h4>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                          Payment will be made at the parish office upon submission of documents.
                        </p>
                      </div>
                    </div>

                    {/* Arrive On Time */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '1px solid #e5e7eb'
                      }}>
                        <Clock size={20} color="#f59e0b" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                          Arrive On Time
                        </h4>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                          Please arrive at least 15 minutes before your scheduled time.
                        </p>
                      </div>
                    </div>

                    {/* Need to Reschedule */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '1px solid #e5e7eb'
                      }}>
                        <CalendarDays size={20} color="#f59e0b" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                          Need to Reschedule?
                        </h4>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                          Contact the parish office as early as possible if you need to reschedule.
                        </p>
                      </div>
                    </div>

                    {/* Keep Your Reference Number */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '1px solid #e5e7eb'
                      }}>
                        <Bookmark size={20} color="#f59e0b" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                          Keep Your Reference Number
                        </h4>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                          You may need this reference number for any questions or follow-ups regarding your booking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.title}>Book Church Service</h1>
        </div>

        {/* Progress Steps */}
        <div style={styles.progressSteps}>
          {[
            { number: 1, text: 'Select Service', active: currentStep === 1 },
            { number: 2, text: 'Your Information', active: currentStep === 2 },
            { number: 3, text: 'Review Booking', active: currentStep === 3 },
            { number: 4, text: 'Confirmation', active: currentStep === 4 }
          ].map((step, index) => (
            <React.Fragment key={step.number}>
              <div style={styles.progressStep}>
                <div style={{
                  ...styles.stepNumber,
                  ...(step.active && styles.activeStep),
                  ...(currentStep > step.number && styles.completedStep)
                }}>
                  {currentStep > step.number ? <CheckCircle size={16} color="#ffffff" /> : step.number}
                </div>
                <div style={{
                  ...styles.stepText,
                  ...(step.active && styles.activeStepText)
                }}>
                  {step.text}
                </div>
              </div>
              {index < 3 && (
                <div style={{
                  ...styles.progressLine,
                  ...(index < currentStep - 1 && styles.progressLineCompleted),
                  ...(index === currentStep - 1 && styles.progressLineCurrent)
                }}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Security Note */}
        <div style={styles.securityNote}>
          Your information is secure and will only be used for church service booking.
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
