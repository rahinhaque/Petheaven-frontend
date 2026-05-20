import React from 'react';
import MyListingsClient from './MyListingsClient';

export default async function ListingsPage() {
  let animals = [];
  try {
    // For now we use the hardcoded email as per user request to fetch user's specific listings
    const userEmail = "alex.johnson@example.com";
    const res = await fetch(`http://localhost:5000/animals/user/${userEmail}`, {
      cache: 'no-store'
    });
    if (res.ok) {
      animals = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch user listings:", error);
  }

  return <MyListingsClient initialAnimals={animals} />;
}
