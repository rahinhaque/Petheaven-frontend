"use client";

import React, { useState, useEffect } from 'react';
import MyListingsClient from './MyListingsClient';
import { authClient } from '@/lib/auth-client';
import Spinner from '@/components/shared/Spinner';

export default function ListingsPage() {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchAnimals = async () => {
      try {
        const res = await fetch(`http://localhost:5000/animals/user/${user.email}`, {
          cache: 'no-store'
        });
        if (res.ok) {
          const fetchedAnimals = await res.json();
          setAnimals(fetchedAnimals);
        }
      } catch (error) {
        console.error("Failed to fetch user listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [user, isPending]);

  if (isPending || loading) {
    return (
      <div className="paw-dashboard__content">
        <div className="paw-dashboard__welcome">
          <h1 className="paw-dashboard__welcome-title">My Listings</h1>
          <Spinner text="Loading your listings..." />
        </div>
      </div>
    );
  }

  return <MyListingsClient initialAnimals={animals} />;
}
