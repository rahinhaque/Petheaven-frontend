"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUser, FaClipboardList, FaPlusCircle, FaListAlt, FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';

const navItems = [
  { name: 'Profile', href: '/dashboard', icon: FaUser },
  { name: 'My Requests', href: '/dashboard/requests', icon: FaClipboardList },
  { name: 'Add Pet', href: '/dashboard/add-pet', icon: FaPlusCircle },
  { name: 'My Listings', href: '/dashboard/listings', icon: FaListAlt },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  // Demo user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    initials: 'AJ'
  };

  return (
    <div className="paw-dashboard">
      {/* Sidebar */}
      <aside className="paw-dashboard__sidebar">
        <div className="paw-dashboard__user-info">
          <div className="paw-dashboard__avatar">
            {user.initials}
          </div>
          <div className="paw-dashboard__user-details">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <nav className="paw-dashboard__nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`paw-dashboard__nav-link ${isActive ? 'paw-dashboard__nav-link--active' : ''}`}
              >
                <Icon />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button className="paw-dashboard__logout">
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="paw-dashboard__main">
        {children}
      </main>
    </div>
  );
}
