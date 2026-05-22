"use client";

import React, { useState, useEffect } from 'react';
import { FaPaw, FaHeart, FaCommentDots } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import Spinner from "@/components/shared/Spinner";

export default function DashboardPage() {
  const { data, isPending, error } = authClient.useSession();
  const [petCount, setPetCount] = useState(0);
  const [loadingPets, setLoadingPets] = useState(true);

  // Extract session and user from data
  const session = data?.session;
  const user = data?.user;

  useEffect(() => {
    if (isPending) {
      console.log("⏳ Dashboard: Session is loading...");
    } else if (error) {
      console.error("❌ Dashboard: Session error:", error);
    } else if (data) {
      console.log("👤 User:", data.user);
    }
  }, [data, isPending, error]);

  useEffect(() => {
    if (isPending) return;
    if (!user?.email) {
      setLoadingPets(false);
      return;
    }

    const fetchPetCount = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/animals/user/${user.email}`,
        );
        if (res.ok) {
          const fetchedAnimals = await res.json();
          setPetCount(fetchedAnimals.length || 0);
        }
      } catch (error) {
        console.error("Failed to fetch user listings count:", error);
      } finally {
        setLoadingPets(false);
      }
    };

    fetchPetCount();
  }, [user, isPending]);

  const displayName = isPending 
    ? "..." 
    : user?.name 
      ? user.name.split(' ')[0] 
      : "Guest";

  return (
    <div className="paw-dashboard__content">
      <div className="paw-dashboard__welcome">
        <h1 className="paw-dashboard__welcome-title">Welcome back, {displayName}! 👋</h1>
        <p className="paw-dashboard__welcome-subtitle">
          Here is what's happening with your pets and adoption requests today. Ready to make a furry friend's day?
        </p>
      </div>

      <div className="paw-dashboard__stats">
        <div className="paw-dashboard__stat-card">
          <div className="paw-dashboard__stat-icon">
            <FaPaw />
          </div>
          <div className="paw-dashboard__stat-info">
            <h4>Total Pets Listed</h4>
            <div className="h-8 flex items-center">
              {isPending || loadingPets ? <Spinner size="sm" text="" /> : <p className="text-2xl font-bold">{petCount}</p>}
            </div>
          </div>
        </div>

        <div className="paw-dashboard__stat-card">
          <div className="paw-dashboard__stat-icon">
            <FaHeart />
          </div>
          <div className="paw-dashboard__stat-info">
            <h4>Adoption Requests</h4>
            <p>12</p>
          </div>
        </div>

        <div className="paw-dashboard__stat-card">
          <div className="paw-dashboard__stat-icon">
            <FaCommentDots />
          </div>
          <div className="paw-dashboard__stat-info">
            <h4>New Messages</h4>
            <p>5</p>
          </div>
        </div>
      </div>
    </div>
  );
}