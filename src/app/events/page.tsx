'use client';



import React, { useState } from 'react';

import Navbar from '../../components/Navbar';

import AuthModals from '../../components/AuthModals';

import Footer from '../../components/Footer';



interface CalendarEvent {

  date: number;

  day: string;

  event: string;

  type: 'holy' | 'saint' | 'secular';

  color: string;

  fullDate?: Date;

}



export default function EventsPage() {

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showSignupModal, setShowSignupModal] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const [filterType, setFilterType] = useState<'all' | 'holy' | 'saint' | 'secular'>('all');

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  


  // Get current date for default month/year

  const currentDate = new Date();

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());



  // Calendar data for holidays and observances organized by month

  const calendarData: { [key: string]: CalendarEvent[] } = {

    '2026-0': [ // January 2026
      { date: 1, day: 'Thursday', event: 'Solemnity of Mary, Mother of God', type: 'saint', color: '#3b82f6' },
      { date: 1, day: 'Thursday', event: 'New Year\'s Day', type: 'secular', color: '#6b7280' },
      { date: 9, day: 'Friday', event: 'Feast of the Black Nazarene', type: 'saint', color: '#3b82f6' },
      { date: 18, day: 'Sunday', event: 'Feast of Santo Niño', type: 'saint', color: '#3b82f6' },
    ],

    '2026-1': [ // February 2026
      { date: 18, day: 'Wednesday', event: 'Ash Wednesday', type: 'holy', color: '#dc2626' },
    ],

    '2026-2': [ // March 2026
      { date: 29, day: 'Sunday', event: 'Palm Sunday', type: 'holy', color: '#dc2626' },
    ],

    '2026-3': [ // April 2026
      { date: 2, day: 'Thursday', event: 'Maundy Thursday', type: 'holy', color: '#dc2626' },
      { date: 3, day: 'Friday', event: 'Good Friday', type: 'holy', color: '#dc2626' },
      { date: 4, day: 'Saturday', event: 'Black Saturday', type: 'holy', color: '#dc2626' },
      { date: 5, day: 'Sunday', event: 'Easter Sunday', type: 'holy', color: '#dc2626' },
    ],

    '2026-4': [ // May 2026
      { date: 1, day: 'Friday', event: 'Flores de Mayo', type: 'saint', color: '#3b82f6' },
    ],

    '2026-5': [ // June 2026
      { date: 7, day: 'Sunday', event: 'Feast of Corpus Christi', type: 'holy', color: '#3b82f6' },
    ],

    '2026-7': [ // August 2026
      { date: 15, day: 'Saturday', event: 'Feast of the Assumption of Mary', type: 'saint', color: '#3b82f6' },
    ],

    '2026-9': [ // October 2026
      { date: 1, day: 'Thursday', event: 'Month of the Holy Rosary', type: 'saint', color: '#3b82f6' },
      { date: 17, day: 'Saturday', event: 'Feast of Nuestra Señora del Rosario', type: 'secular', color: '#6b7280' },

    ],

    '2026-10': [ // November 2024
      { date: 1, day: 'Friday', event: 'All Saints\' Day', type: 'saint', color: '#3b82f6' },
      { date: 2, day: 'Saturday', event: 'All Souls\' Day', type: 'holy', color: '#dc2626' },
    ],

    '2026-11': [ // December 2024
      { date: 8, day: 'Sunday', event: 'Feast of the Immaculate Conception', type: 'saint', color: '#3b82f6' },
      { date: 24, day: 'Tuesday', event: 'Christmas Eve', type: 'holy', color: '#dc2626' },
      { date: 25, day: 'Wednesday', event: 'Christmas Day', type: 'holy', color: '#dc2626' },
      { date: 31, day: 'Tuesday', event: 'New Year\'s Eve', type: 'secular', color: '#6b7280' },
    ],

  };



  // Generate calendar days for current month/year

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();



  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const currentMonthEvents = calendarData[`${currentYear}-${currentMonth}`] || [];



  const days = [];

  for (let i = 0; i < firstDay; i++) {

    days.push(null);

  }

  for (let i = 1; i <= daysInMonth; i++) {

    days.push(i);

  }



  const getEventForDate = (date: number) => {

    return currentMonthEvents.find((event: CalendarEvent) => event.date === date);

  };



  const getDayOfWeek = (date: number) => {

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return dayNames[new Date(currentYear, currentMonth, date).getDay()];

  };



  // Navigation functions

  const goToPreviousMonth = () => {

    if (currentMonth === 0) {

      setCurrentMonth(11);

      setCurrentYear(currentYear - 1);

    } else {

      setCurrentMonth(currentMonth - 1);

    }

  };



  const goToNextMonth = () => {

    if (currentMonth === 11) {

      setCurrentMonth(0);

      setCurrentYear(currentYear + 1);

    } else {

      setCurrentMonth(currentMonth + 1);

    }

  };



  const goToToday = () => {

    setCurrentMonth(currentDate.getMonth());

    setCurrentYear(currentDate.getFullYear());

  };



  const styles = {

    page: {

      minHeight: '90vh',

      background: '#F7FAFC',

      color: '#111827',

      paddingTop: '100px',

    },



    container: {

      maxWidth: 1200,

      margin: '0 auto',

      padding: '0 20px 80px',

    },



    header: {

      textAlign: 'center' as const,

      marginBottom: '40px',

    },



    title: {

      fontSize: 48,

      fontWeight: 600,

      color: '#1E3A6F',

      marginBottom: '15px',

      fontFamily: 'Poppins, sans-serif',

      borderBottom: '2px solid #D4AF37',

      paddingBottom: 8,

      display: 'inline-block',

      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

    },



    subtitle: {

      fontSize: 18,

      color: '#000',

      marginBottom: '24px',

      fontWeight: 400,

      lineHeight: 1.4,

      fontFamily: 'Inter, sans-serif',

    },



    searchControlsContainer: {

      display: 'flex',

      justifyContent: 'center',

      gap: '20px',

      marginBottom: '40px',

      flexWrap: 'wrap' as const,

    },



    dropdownContainer: {

      position: 'relative' as const,

      display: 'inline-block',

    },



    dropdown: {

      background: '#FFFFFF',

      border: '1px solid #e5e7eb',

      color: '#374151',

      borderRadius: '8px',

      padding: '8px 35px 8px 30px',

      fontSize: '14px',

      fontWeight: '500',

      cursor: 'pointer',

      transition: 'all 0.3s ease',

      minWidth: '140px',

      outline: 'none',

      fontFamily: 'Inter, sans-serif',

      appearance: 'none' as any,

      WebkitAppearance: 'none' as any,

      MozAppearance: 'none' as any,

      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3e%3cpath d='${isDropdownOpen ? 'M5 15l7-7 7 7' : 'M7 10l5 5 5-5'}' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,

      backgroundRepeat: 'no-repeat',

      backgroundPosition: 'right 10px center',

      backgroundSize: '20px',

    },



    searchInputContainer: {

      position: 'relative' as const,

      display: 'flex',

      alignItems: 'center',

    },





    searchIcon: {

      position: 'absolute' as const,

      left: '16px',

      color: '#000000',

      fontSize: '16px',

    },



    eventsContainer: {

      display: 'grid',

      gridTemplateColumns: 'repeat(3, 1fr)',

      gap: '28px',

      marginBottom: '20px',

      maxWidth: '1000px',

      margin: '0 auto',

    },



    eventCard: {

      background: '#FFFFFF',

      borderRadius: '16px',

      padding: 0,

      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',

      border: '1px solid #E5E7EB',

      transition: 'all 0.3s ease',

      cursor: 'pointer',

      position: 'relative' as const,

      overflow: 'hidden',

      width: '340px',

      minHeight: '100px',
      display: 'flex',
      flexDirection: 'column',

    },



    eventCardHover: {

      transform: 'translateY(-6px)',

      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)',

      borderColor: 'rgba(59, 130, 246, 0.2)',

    },



    eventImage: {

      width: '100%',

      height: '120px',

      objectFit: 'cover' as const,

      display: 'flex',

      alignItems: 'center',

      justifyContent: 'center',

      color: '#ffffff',

      fontSize: '20px',

      fontWeight: '600',

      letterSpacing: 1,

      fontFamily: 'Inter, sans-serif',

    },



    eventContent: {

      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,

    },



    eventDate: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '4px',
      color: '#1E3A6F',
      fontSize: '12px',
      fontWeight: '600',
      background: '#EBF4FF',
      padding: '4px 12px',
      borderRadius: '20px',
      marginBottom: '12px',
      border: '0.5px solid #D1E0FF',
      fontFamily: 'Inter, sans-serif',
      width: 'fit-content',
    },




    eventTitle: {

      fontSize: '15px',

      fontWeight: '600',

      color: '#1E2A3A',

      marginBottom: '8px',

      fontFamily: 'Poppins, sans-serif',

      lineHeight: 1.3,

    },


    eventType: {

      display: 'inline-block',

      padding: '4px 12px',

      borderRadius: '20px',

      fontSize: '11px',

      fontWeight: '600',
      width: 'fit-content',

      textTransform: 'uppercase' as const,

      letterSpacing: '0.5px',

      marginBottom: '12px',

      fontFamily: 'Inter, sans-serif',

    },



    holyType: {

      background: '#FFF4E5',

      color: '#B7791F',

    },



    saintType: {

      background: '#FFF4E5',

      color: '#B7791F',

    },



    secularType: {

      background: '#FFF4E5',

      color: '#B7791F',

    },



    filterContainer: {

      display: 'flex',

      justifyContent: 'space-between',

      alignItems: 'center',

      marginBottom: 35,

      flexWrap: 'wrap' as const,

    },



    filterButton: {

      padding: '7px 19px',

      border: '1px solid #e5e7eb',

      background: '#FFFFFF',

      color: '#6b7280',

      borderRadius: '8px',

      fontSize: '14px',

      fontWeight: '500',

      cursor: 'pointer',

      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

      fontFamily: 'Inter, sans-serif',

      marginRight: '8px',

      transform: 'scale(1)',

      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

    },

    filterButtonHover: {

      background: '#1e3a6f',

      color: '#FFFFFF',

      borderColor: '#1e3a6f',

      transform: 'scale(1.05)',

      boxShadow: '0 4px 12px rgba(30, 58, 111, 0.3)',

    },



    filterButtonActive: {

      background: '#1e3a6f',

      color: '#FFFFFF',

      borderColor: '#1e3a6f',

      border: '1px solid #1e3a6f',

    },



    eventModal: {

      position: 'fixed' as const,

      top: 0,

      left: 0,

      right: 0,

      bottom: 0,

      backgroundColor: 'rgba(0, 0, 0, 0.5)',

      display: 'flex',

      alignItems: 'center',

      justifyContent: 'center',

      zIndex: 1000,

    },



    eventModalContent: {

      background: '#ffffff',

      borderRadius: 16,
      marginBottom: '-15px',

      padding: '32px',

      maxWidth: 500,

      width: '90%',

      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

    },



    eventModalTitle: {

      fontSize: 24,

      fontWeight: 700,

      color: '#111827',

      margin: '0 0 8px 0',

    },



    eventModalDate: {

      fontSize: 16,

      color: '#6b7280',

      margin: '0 0 16px 0',

    },



    eventModalDescription: {

      fontSize: 16,

      color: '#000000',

      lineHeight: 1.6,

      margin: 0,

      fontFamily: 'Georgia, serif',

    },



    closeButton: {

      background: '#1E3A6F',

      color: '#FFFFFF',

      border: '1px solid #1E3A6F',

      borderRadius: '8px',

      padding: '8px 10px',

      fontSize: '14px',

      fontWeight: '600',

      cursor: 'pointer',

      marginTop: '24px',

      transition: 'all 0.3s ease',

      fontFamily: 'Inter, sans-serif',

      width: '100%'

    },



    // Responsive Design

    '@media (max-width: 1024px)': {

      container: {

        padding: '40px 20px',

      },

      

      calendarContainer: {

        margin: '0 20px',

      },

    },



    '@media (max-width: 768px)': {

      navContainer: {

        padding: '0 16px',

      },

      

      navCenter: {

        display: 'none',

      },

      

      navMenu: {

        display: 'none',

      },

      

      navToggle: {

        display: 'flex',

        position: 'absolute' as const,

        right: 20,

      },

      

      navBrand: {

        left: 16,

      },

      

      logo: {

        height: 40,

      },

      

      brandText: {

        fontSize: 16,

      },

      

      container: {

        padding: '40px 16px',

      },

      

      header: {

        marginBottom: '40px',

      },

      

      title: {

        fontSize: 36,

      },

      

      subtitle: {

        fontSize: 16,

      },

      

      searchControlsContainer: {

        flexDirection: 'column' as const,

        gap: '16px',

        marginBottom: '30px',

      },

      

      searchBar: {

        minWidth: '100%',

      },

      

      eventsContainer: {

        gridTemplateColumns: '1fr',

        gap: '20px',

      },

      

      eventCard: {

        borderRadius: '16px',

      },

      

      eventImage: {

        height: '160px',

        fontSize: '40px',

      },

      

      eventContent: {

        padding: '20px',

      },

      

      eventTitle: {

        fontSize: '18px',

      },

      

      filterContainer: {

        flexWrap: 'wrap' as const,

        gap: '10px',

      },

      

      filterButton: {

        padding: '10px 20px',

        fontSize: '13px',

      },

      

      page: {

        paddingTop: '76px',

      },

      

      calendarContainer: {

        margin: '0 16px',

        borderRadius: 12,

      },

      

      calendarHeader: {

        padding: '20px',

      },

      

      monthYear: {

        fontSize: 24,

      },

      

      weekDays: {

        display: 'none',

      },

      

      calendarGrid: {

        gridTemplateColumns: 'repeat(7, 1fr)',

        gap: '2px',

      },

      

      calendarDay: {

        minHeight: 60,

        padding: '4px',

      },

      

      calendarDayNumber: {

        fontSize: 14,

      },

      

      calendarEvent: {

        fontSize: 8,

        padding: '1px 2px',

        marginTop: '2px',

      },

      

      legend: {

        gap: '16px',

        flexDirection: 'column' as const,

        alignItems: 'center',

      },

      

      eventModalContent: {

        margin: '20px',

        padding: '24px',

        width: 'calc(100% - 40px)',

      },

      

      eventModalTitle: {

        fontSize: 20,

      },

      

      eventModalDate: {

        fontSize: 14,

      },

      

      eventModalDescription: {

        fontSize: 14,

      },

      

      closeButton: {

        width: '100%',

        padding: '14px 16px',

      },

    },



    '@media (max-width: 480px)': {

      title: {

        fontSize: 28,

      },

      

      subtitle: {

        fontSize: 14,

      },

      

      calendarHeader: {

        padding: '16px',

      },

      

      monthYear: {

        fontSize: 20,

      },

      

      calendarGrid: {

        gap: '1px',

      },

      

      calendarDay: {

        minHeight: 50,

        padding: '2px',

      },

      

      calendarDayNumber: {

        fontSize: 12,

      },

      

      calendarEvent: {

        fontSize: 7,

        padding: '1px',

      },

      

      eventModalContent: {

        padding: '20px',

        margin: '16px',

      },

      

      eventModalTitle: {

        fontSize: 18,

      },

      

      eventModalDescription: {

        fontSize: 13,

      },

    },

  };



  // Get all events from all months

  const getAllEvents = () => {

    const allEvents: CalendarEvent[] = [];

    Object.keys(calendarData).forEach(key => {

      const [year, month] = key.split('-').map(Number);

      calendarData[key].forEach(event => {

        allEvents.push({

          ...event,

          fullDate: new Date(year, month, event.date)

        });

      });

    });

    return allEvents.sort((a, b) => (a.fullDate as Date).getTime() - (b.fullDate as Date).getTime());

  };



const filteredEvents = getAllEvents().filter(event => 

  (filterType === 'all' || event.type === filterType) &&
  (selectedMonth === -1 || (event.fullDate as Date).getMonth() === selectedMonth)

);



return (

  <div style={styles.page}>

    <Navbar 

      showLoginModal={showLoginModal}

      showSignupModal={showSignupModal}

      setShowLoginModal={setShowLoginModal}

      setShowSignupModal={setShowSignupModal}

    />



    <div style={styles.container}>

      <div style={styles.header}>

        <h1 style={{...styles.title, fontFamily: 'Georgia, serif'}}>Church Events</h1>

        <p style={{...styles.subtitle, fontFamily: 'Poppins'}}>Liturgical Calendar and Important Celebrations</p>

      </div>



      <div style={styles.filterContainer}>
        
        <div style={{ ...styles.dropdownContainer }}>
          <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" fill="#374151"/>
            </svg>
          </div>
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(Number(e.target.value));
              setIsDropdownOpen(false);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setIsDropdownOpen(false)}
            style={styles.dropdown}
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index} style={{ background: 'transparent', color: '#1E3A6F' }}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterType('all')}
            style={{
              ...styles.filterButton,
              ...(filterType === 'all' ? styles.filterButtonActive : {})
            }}
            onMouseEnter={(e) => {
              if (filterType !== 'all') {
                Object.assign(e.currentTarget.style, styles.filterButtonHover);
              }
            }}
            onMouseLeave={(e) => {
              if (filterType !== 'all') {
                Object.assign(e.currentTarget.style, { background: '#FFFFFF', color: '#6b7280', borderColor: '#e5e7eb' });
              }
            }}
          >
            All Events
          </button>

          <button
            onClick={() => setFilterType('holy')}
            style={{
              ...styles.filterButton,
              ...(filterType === 'holy' ? styles.filterButtonActive : {})
            }}
            onMouseEnter={(e) => {
              if (filterType !== 'holy') {
                Object.assign(e.currentTarget.style, styles.filterButtonHover);
              }
            }}
            onMouseLeave={(e) => {
              if (filterType !== 'holy') {
                Object.assign(e.currentTarget.style, { background: '#FFFFFF', color: '#6b7280', borderColor: '#e5e7eb' });
              }
            }}
          >
            Holy Days
          </button>

          <button
            onClick={() => setFilterType('saint')}
            style={{
              ...styles.filterButton,
              ...(filterType === 'saint' ? styles.filterButtonActive : {})
            }}
            onMouseEnter={(e) => {
              if (filterType !== 'saint') {
                Object.assign(e.currentTarget.style, styles.filterButtonHover);
              }
            }}
            onMouseLeave={(e) => {
              if (filterType !== 'saint') {
                Object.assign(e.currentTarget.style, { background: '#FFFFFF', color: '#6b7280', borderColor: '#e5e7eb' });
              }
            }}
          >
            Saint Days
          </button>

          <button
            onClick={() => setFilterType('secular')}
            style={{
              ...styles.filterButton,
              ...(filterType === 'secular' ? styles.filterButtonActive : {})
            }}
            onMouseEnter={(e) => {
              if (filterType !== 'secular') {
                Object.assign(e.currentTarget.style, styles.filterButtonHover);
              }
            }}
            onMouseLeave={(e) => {
              if (filterType !== 'secular') {
                Object.assign(e.currentTarget.style, { background: '#FFFFFF', color: '#6b7280', borderColor: '#e5e7eb' });
              }
            }}
          >
            Holidays
          </button>
        </div>
      </div>

      <div style={styles.eventsContainer}>
        {filteredEvents.map((event, index) => (

          <div

            key={index}

            style={styles.eventCard}

            onClick={() => setSelectedEvent(event)}

            onMouseEnter={(e) => {

              Object.assign(e.currentTarget.style, styles.eventCardHover);

            }}

            onMouseLeave={(e) => {

              Object.assign(e.currentTarget.style, { transform: 'none', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' });

            }}

          >

            <div style={styles.eventImage}>
              <img 
                src={
                  event.event === 'Solemnity of Mary, Mother of God' ? '/images/calendar/Santa maria madre de dios.jpg' :
                  event.event === 'New Year\'s Day' ? '/images/calendar/New Years day.jpg' :
                  event.event === 'Feast of the Black Nazarene' ? '/images/calendar/Feast of the black nazarene.png' :
                  event.event === 'Feast of Santo Niño' ? '/images/calendar/Feast of Santo Niño.png' :
                  event.event === 'Feast of the Immaculate Conception' ? '/images/calendar/Feast of the Immaculate Conception.jpg' :
                  event.event === 'Christmas Eve' ? '/images/calendar/Christmas Eve.jpg' :
                  event.event === 'Good Friday' ? '/images/calendar/good friday.jpg' :
                  event.event === 'Black Saturday' ? '/images/calendar/black saturday.jpg' :
                  event.event === 'Maundy Thursday' ? '/images/calendar/maundy thursday.jpg' :
                  event.event === 'Ash Wednesday' ? '/images/calendar/ash wednesday.jpg' :
                  event.event === 'Palm Sunday' ? '/images/calendar/palm sunday.jpg' :
                  event.event === 'Month of the Holy Rosary' ? '/images/calendar/month of the holy rosary.jpg' :
                  event.event === 'Feast of the Assumption of Mary' ? '/images/calendar/feast of assumption mary.png' :
                  event.event === "Feast of Corpus Christi" ? '/images/calendar/Feast of corpus christi.png' :
                  event.event === 'Flores de Mayo' ? '/images/calendar/flores de mayo.jpg' :
                  event.event === 'Feast of Nuestra Señora del Rosario' ? '/images/calendar/feast of nuestra señora del rosario.jpg' :
                  event.event === 'All Saints\' Day' ? '/images/calendar/all saints day.jpg' :
                  event.event === 'All Souls\' Day' ? '/images/calendar/all souls day.jpg' :
                  event.type === 'holy' ? '/images/calendar/easter sunday.jpg' :
                  event.type === 'saint' ? '/images/saint.jpg' :
                  '/images/lectures.jpg'
                }
                alt={event.event}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: event.event === 'Black Saturday' ? 'center 10%' : 
                  (event.event === 'Flores de Mayo' ? 'center 20%' : 
                  (event.event === 'Feast of Corpus Christi' ? 'center 10%' : 
                  (event.event === 'Feast of the Assumption of Mary' ? 'center 20%' : 'center center')))
                }}

              />
            </div>

            <div style={styles.eventContent}>

              <div style={styles.eventDate}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" fill="#1E3A6F"/>
                </svg>
                {monthNames[(event.fullDate as Date).getMonth()].toUpperCase()} {event.date}, {(event.fullDate as Date).getFullYear()}
              </div>

              <h3 style={styles.eventTitle}>{event.event}</h3>

              <span style={{
                ...styles.eventType,

                ...(event.type === 'holy' ? styles.holyType : 

                    event.type === 'saint' ? styles.saintType : 

                    styles.secularType)

              }}>

                {event.type}

              </span>

              <div style={{ flex: 1 }}></div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                }}
                style={{
                  background: '#1E3A6F',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 15px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, sans-serif',
                  marginTop: 'auto',
                  display: 'block',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#172554';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1E3A6F';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>



    {/* Event Detail Modal */}

    {selectedEvent && (

      <div style={styles.eventModal}>

        <div style={styles.eventModalContent}>

          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1E3A6F"/>
              </svg>
              <span style={{ fontWeight: '600', color: '#1E3A6F', fontSize: '14px' }}>Mass Times:</span>
            </div>
            <p style={{ marginLeft: '24px', color: '#000000', fontSize: '14px', marginBottom: '12px' }}>
              5:30 AM, 7:00 AM, 9:00 AM, 4:00 PM, 6:00 PM
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="#1E3A6F" stroke-width="2" fill="none"/>
              </svg>
              <span style={{ fontWeight: '600', color: '#1E3A6F', fontSize: '14px' }}>Main Church:</span>
            </div>
            <p style={{ marginLeft: '24px', color: '#000000', fontSize: '14px', marginBottom: '12px' }}>
              Nuestra Seniora Parish Church
            </p>
          </div>

          <p style={styles.eventModalDescription}>

            {selectedEvent.type === 'holy' && 

              `This is an important liturgical celebration in the Catholic Church. 

              ${selectedEvent.event.includes('Easter') ? 

                'Easter is the celebration of Christ\'s resurrection from the dead, the most important Christian feast.' : 

                'Holy Week commemorates the passion and death of Jesus Christ.'}`

            }

            {selectedEvent.type === 'saint' && 

              `Today we celebrate the feast of ${selectedEvent.event}. 

              This is a day to honor the life and witness of this holy person and ask for their intercession.`

            }

            {selectedEvent.type === 'secular' && 

              `This is a secular holiday observed on this date.`

            }

          </p>

          <button 

            onClick={() => setSelectedEvent(null)}

            style={styles.closeButton}

            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#172554';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1E3A6F';
              e.currentTarget.style.transform = 'translateY(0)';
            }}

          >

            Close

          </button>

        </div>

      </div>

    )}



    <Footer />

    <AuthModals 

      showLoginModal={showLoginModal}

      showSignupModal={showSignupModal}

      setShowLoginModal={setShowLoginModal}

      setShowSignupModal={setShowSignupModal}

    />

  </div>

);

}