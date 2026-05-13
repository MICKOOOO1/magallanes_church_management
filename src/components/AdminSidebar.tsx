"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, FileText, Users, Clock, Megaphone, Settings, type LucideIcon } from 'lucide-react';

const items = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/booking-management', label: 'Booking Management', icon: Calendar },
  { href: '/admin/certificate-requests', label: 'Certificate Requests', icon: FileText },
  { href: '/admin/parishioner-records', label: 'Parishioner Records', icon: Users },
  { href: '/admin/mass-schedules', label: 'Mass Schedules', icon: Clock },
  { href: '/admin/announcements-events', label: 'Announcements & Events', icon: Megaphone },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin' || pathname === '/admin/dashboard';
    }

    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 h-screen bg-linear-to-b from-slate-900 to-slate-800 text-white overflow-hidden hidden md:flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-lg font-bold">ADMIN PANEL</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => {
          const Icon = item.icon as LucideIcon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${active ? 'active' : 'hover:bg-slate-700'}`}
            >
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800 text-xs text-slate-300">
        <div className="mb-2">Serving God and Community in Faith</div>
        <div className="opacity-80">© {new Date().getFullYear()}</div>
      </div>
    </aside>
  );
}
