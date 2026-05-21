"use client";
// const dns = require("dns");
// dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import '../DashboardForm.css';
import { authClient } from '@/lib/auth-client';

export default function AddPetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Auto-filled owner email dynamically from session
  const { data, isPending } = authClient.useSession();
  const ownerEmail = data?.user?.email || "";

  const [formData, setFormData] = useState({
    petName: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    imageUrl: '',
    healthStatus: '',
    vaccinationStatus: '',
    location: '',
    adoptionFee: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElementData = new FormData(e.currentTarget);
    const animalData = Object.fromEntries(formElementData.entries());
    console.log(animalData);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animalData)
      });
      
      const newAnimal = await res.json();
      console.log("Response from server:", newAnimal);

      // Validation check
      if (!animalData.petName || !animalData.species || !animalData.age) {
        throw new Error("Please fill in all required fields.");
      }

      toast.success("Pet added successfully! Your pet is now listed.");
      
      // Redirect to My Listings
      router.push('/dashboard/listings');
      
    } catch (error) {
      toast.error(error.message || "Failed to add pet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paw-dashboard__content">
      <div className="paw-dashboard__welcome">
        <h1 className="paw-dashboard__welcome-title">Add a Pet</h1>
        <p className="paw-dashboard__welcome-subtitle">
          List a new pet for adoption and help them find a loving home.
        </p>
      </div>

      <form className="paw-dashboard__form" onSubmit={handleSubmit}>
        <div className="paw-dashboard__form-grid">
          
          <div className="paw-dashboard__form-group">
            <label className="paw-dashboard__form-label">Pet Name *</label>
            <input 
              type="text" 
              name="petName" 
              className="paw-dashboard__form-input" 
              placeholder="e.g. Max"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="paw-dashboard__form-group">
            <label className="paw-dashboard__form-label">Species *</label>
            <select 
              name="species" 
              className="paw-dashboard__form-select"
              value={formData.species}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="paw-dashboard__form-group">
            <label className="paw-dashboard__form-label">Breed</label>
            <input 
              type="text" 
              name="breed" 
              className="paw-dashboard__form-input" 
              placeholder="e.g. Golden Retriever"
              value={formData.breed}
              onChange={handleChange}
            />
          </div>

          <div className="paw-dashboard__form-group">
            <label className="paw-dashboard__form-label">Age (Years) *</label>
            <input 
              type="number" 
              name="age" 
              min="0"
              step="0.1"
              className="paw-dashboard__form-input" 
              placeholder="e.g. 2.5"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="paw-dashboard__form-group">
            <label className="paw-dashboard__form-label">Gender *</label>
            <select 
              name="gender" 
              className="paw-dashboard__form-select"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div className="paw-dashboard__form-group">
            <label className="paw-dashboard__form-label">Image URL *</label>
            <input 
              type="url" 
              name="imageUrl" 
              className="paw-dashboard__form-input" 
              placeholder="e.g. https://i.postimg.cc/..."
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="paw-dashboard__form-group">
            <label className="paw-dashboard__form-label">Health Status</label>
            <select 
              name="healthStatus" 
              className="paw-dashboard__form-select"
              value={formData.healthStatus}
              onChange={handleChange}
            >
              <option value="" disabled>Select Status</option>
              <option value="Healthy">Healthy</option>
              <option value="Special Needs">Special Needs</option>
              <option value="Recovering">Recovering</option>
            </select>
          </div>

          <div className="paw-dashboard__form-group">
            <label className="paw-dashboard__form-label">Vaccination Status</label>
            <select 
              name="vaccinationStatus" 
              className="paw-dashboard__form-select"
              value={formData.vaccinationStatus}
              onChange={handleChange}
            >
              <option value="" disabled>Select Status</option>
              <option value="Fully Vaccinated">Fully Vaccinated</option>
              <option value="Partially Vaccinated">Partially Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>

          <div className="paw-dashboard__form-group">
            <label className="paw-dashboard__form-label">Location *</label>
            <input 
              type="text" 
              name="location" 
              className="paw-dashboard__form-input" 
              placeholder="e.g. New York, NY"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="paw-dashboard__form-group">
            <label className="paw-dashboard__form-label">Adoption Fee ($)</label>
            <input 
              type="number" 
              name="adoptionFee" 
              min="0"
              className="paw-dashboard__form-input" 
              placeholder="e.g. 50"
              value={formData.adoptionFee}
              onChange={handleChange}
            />
          </div>

          <div className="paw-dashboard__form-group paw-dashboard__form-group--full">
            <label className="paw-dashboard__form-label">Description *</label>
            <textarea 
              name="description" 
              className="paw-dashboard__form-textarea" 
              placeholder="Tell us about the pet's personality, habits, etc..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="paw-dashboard__form-group paw-dashboard__form-group--full">
            <label className="paw-dashboard__form-label">Owner Email</label>
            <input 
              type="email" 
              name="ownerEmail" 
              className="paw-dashboard__form-input" 
              value={ownerEmail}
              readOnly
            />
            <small style={{ color: 'var(--paw-brown-light)', marginTop: '4px' }}>
              This is auto-filled based on your account.
            </small>
          </div>

        </div>

        <button 
          type="submit" 
          className="paw-dashboard__form-submit"
          disabled={loading}
        >
          {loading ? 'Adding Pet...' : 'List Pet for Adoption'}
        </button>
      </form>
    </div>
  );
}
