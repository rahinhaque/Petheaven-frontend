"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUser, FaClipboardList, FaPlusCircle, FaListAlt, FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';
import { authClient } from '@/lib/auth-client';

const navItems = [
  { name: 'Profile', href: '/dashboard', icon: FaUser },
  { name: 'My Requests', href: '/dashboard/requests', icon: FaClipboardList },
  { name: 'Add Pet', href: '/dashboard/add-pet', icon: FaPlusCircle },
  { name: 'My Listings', href: '/dashboard/listings', icon: FaListAlt },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isPending, error } = authClient.useSession();

  // Extract session and user from data
  const session = data?.session;
  const user = data?.user;

  useEffect(() => {
    if (isPending) {
      console.log("⏳ Navbar: Session is loading...");
    } else if (error) {
      console.error("❌ Navbar: Session error:", error);
    } else if (data) {
      console.log("👤 User:", data.user); // User profile
    }
  }, [data, isPending, error]);

  // Protect the dashboard: redirect to login if session is empty and finished loading
  useEffect(() => {
    if (!isPending && !user) {
      router.push('/login');
    }
  }, [user, isPending, router]);

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        }
      }
    });
  };

  return (
    <div className="paw-dashboard">
      {/* Sidebar */}
      <aside className="paw-dashboard__sidebar">
        <div className="paw-dashboard__user-info">
          <div className="paw-dashboard__avatar" style={{ overflow: 'hidden' }}>
            {isPending ? (
              <span className="text-sm">⏳</span>
            ) : user?.image ? (
              <img 
                src={user.image} 
                alt={user.name || 'User'} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              getInitials(user?.name)
            )}
          </div>
          <div className="paw-dashboard__user-details">
            <h3>{isPending ? "Loading..." : (user?.name || "Guest")}</h3>
            <p>{isPending ? "Please wait..." : (user?.email || "No email available")}</p>
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

        <button className="paw-dashboard__logout" onClick={handleSignOut}>
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
