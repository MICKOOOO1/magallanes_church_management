'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingRequest {
  referenceNo: string;
  parishioner: string;
  serviceType: string;
  schedule: string;
  status: 'Pending' | 'Approved' | 'Confirmed' | 'Rejected';
  dateRequested: string;
}

interface Announcement {
  title: string;
  date: string;
  icon: string;
}

export default function AdminDashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4)); // May 2026

  // Stat cards
  const stats = [
    { label: 'Pending Bookings', value: 12, color: 'bg-blue-50', textColor: 'text-blue-600', icon: '📅' },
    { label: 'Approved Bookings', value: 18, color: 'bg-green-50', textColor: 'text-green-600', icon: '✓' },
    { label: 'Certificate Requests', value: 7, color: 'bg-orange-50', textColor: 'text-orange-600', icon: '📄' },
    { label: 'Total Parishioners', value: 124, color: 'bg-purple-50', textColor: 'text-purple-600', icon: '👥' },
    { label: 'Upcoming Eventures', value: 3, color: 'bg-pink-50', textColor: 'text-pink-600', icon: '🎉' },
  ];

  // Recent booking requests
  const recentBookings: BookingRequest[] = [
    {
      referenceNo: 'BR-2026-0012',
      parishioner: 'Juan Dela Cruz',
      serviceType: 'Wedding',
      schedule: 'May 25, 2026 2:00 PM',
      status: 'Pending',
      dateRequested: 'May 10, 2026',
    },
    {
      referenceNo: 'BR-2026-0011',
      parishioner: 'Maria Santos',
      serviceType: 'Baptism',
      schedule: 'May 24, 2026 11:00 AM',
      status: 'Pending',
      dateRequested: 'May 9, 2026',
    },
    {
      referenceNo: 'BR-2026-0010',
      parishioner: 'Pedro Reyes',
      serviceType: 'Funeral',
      schedule: 'May 23, 2026 9:00 AM',
      status: 'Approved',
      dateRequested: 'May 8, 2026',
    },
    {
      referenceNo: 'BR-2026-0009',
      parishioner: 'Ana Fernandez',
      serviceType: 'Wedding',
      schedule: 'May 22, 2026 3:00 PM',
      status: 'Confirmed',
      dateRequested: 'May 7, 2026',
    },
    {
      referenceNo: 'BR-2026-0008',
      parishioner: 'Jose Ramos',
      serviceType: 'Baptism',
      schedule: 'May 21, 2026 10:00 AM',
      status: 'Rejected',
      dateRequested: 'May 6, 2026',
    },
  ];

  // Recent announcements
  const recentAnnouncements: Announcement[] = [
    { title: 'Holy Week Schedule', date: 'May 10, 2026', icon: '📖' },
    { title: 'Office Hours Update', date: 'May 8, 2026', icon: '⏰' },
  ];

  // Calendar
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const calendarDays = [];
  
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Confirmed: 'bg-blue-100 text-blue-800',
      Rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Certificate Requests</h1>
          <p className="text-gray-600 mt-2">Review and manage certificate requests from parishioners.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.color} rounded-lg p-6 shadow hover:shadow-lg transition-shadow`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className={`${stat.textColor} text-3xl font-bold mt-2`}>{stat.value}</p>
              <p className="text-gray-600 text-xs mt-2">View all</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Booking Requests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Booking Requests</h2>
                <button className="text-blue-600 hover:text-blue-900 font-medium text-sm">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Reference No.</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Parishioner</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Service Type</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Schedule</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking, idx) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{booking.referenceNo}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{booking.parishioner}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{booking.serviceType}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{booking.schedule}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Calendar & Announcements */}
          <div className="space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{monthName}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4 text-center text-xs font-medium text-gray-600">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, idx) => (
                  <div
                    key={idx}
                    className={`p-2 text-sm rounded text-center ${
                      day
                        ? `cursor-pointer hover:bg-blue-100 ${
                            day === 24
                              ? 'bg-blue-600 text-white font-semibold'
                              : 'text-gray-900'
                          }`
                        : 'text-gray-300'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Upcoming Events</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">📅</span>
                    <span className="text-gray-900">May 21, 2026 - 10:00 AM</span>
                  </div>
                  <div className="text-gray-600 text-xs">Baptism - Jose Ramos</div>
                </div>
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
                <button className="text-blue-600 hover:text-blue-900 font-medium text-sm">View all</button>
              </div>
              <div className="space-y-4">
                {recentAnnouncements.map((announcement, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
                    <span className="text-xl">{announcement.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{announcement.title}</p>
                      <p className="text-xs text-gray-600">{announcement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <button className="flex flex-col items-center justify-center p-6 hover:bg-blue-50 rounded-lg transition-colors">
              <span className="text-4xl mb-2">📢</span>
              <span className="text-sm font-medium text-gray-900">Add Announcement</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 hover:bg-blue-50 rounded-lg transition-colors">
              <span className="text-4xl mb-2">📅</span>
              <span className="text-sm font-medium text-gray-900">Add Event</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 hover:bg-blue-50 rounded-lg transition-colors">
              <span className="text-4xl mb-2">⏰</span>
              <span className="text-sm font-medium text-gray-900">Create Mass Schedule</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 hover:bg-blue-50 rounded-lg transition-colors">
              <span className="text-4xl mb-2">📋</span>
              <span className="text-sm font-medium text-gray-900">View Reports</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 hover:bg-blue-50 rounded-lg transition-colors">
              <span className="text-4xl mb-2">👤</span>
              <span className="text-sm font-medium text-gray-900">Manage Certificates</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
