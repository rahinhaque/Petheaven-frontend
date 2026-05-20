"use client";

import React, { useState } from 'react';
import { toast } from 'sonner';

export default function AdoptionForm({ petName, petId }) {
  const [loading, setLoading] = useState(false);

  // Demo user data (could come from context/auth later)
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com'
  };

  const [formData, setFormData] = useState({
    pickupDate: '',
    message: '',
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
    setLoading(true);

    const adoptionRequest = {
      petId,
      petName,
      userName: user.name,
      userEmail: user.email,
      pickupDate: formData.pickupDate,
      message: formData.message,
      status: 'pending',
    };

    try {
      // Simulate API call
      // In reality, this would be: await fetch('http://localhost:5000/adoptions', { ... })
      await new Promise(resolve => setTimeout(resolve, 1200));

      toast.success(`Adoption request submitted for ${petName}! We will contact you soon.`);
      setFormData({ pickupDate: '', message: '' });
    } catch (error) {
      toast.error('Failed to submit adoption request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(74,44,23,0.08)] border-[1.5px] border-[#D4A574]/30 p-6 md:p-8">
      <h3 className="text-2xl font-bold text-[#4A2C17] mb-6 border-b border-[#D4A574]/20 pb-4">
        Adoption Request
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#6B3E26]">Pet Name</label>
          <input 
            type="text" 
            value={petName} 
            readOnly 
            className="w-full px-4 py-2.5 bg-[#f5f5f5] text-[#777] border-[1.5px] border-[#ddd] rounded-lg cursor-not-allowed font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#6B3E26]">Your Name</label>
          <input 
            type="text" 
            value={user.name} 
            readOnly 
            className="w-full px-4 py-2.5 bg-[#f5f5f5] text-[#777] border-[1.5px] border-[#ddd] rounded-lg cursor-not-allowed font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#6B3E26]">Your Email</label>
          <input 
            type="email" 
            value={user.email} 
            readOnly 
            className="w-full px-4 py-2.5 bg-[#f5f5f5] text-[#777] border-[1.5px] border-[#ddd] rounded-lg cursor-not-allowed font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#6B3E26]">Pickup Date *</label>
          <input 
            type="date" 
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-[#FFF8F0]/50 text-[#4A2C17] border-[1.5px] border-[#D4A574]/40 rounded-lg outline-none focus:border-[#E8742A] focus:ring-2 focus:ring-[#E8742A]/10 transition-all font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#6B3E26]">Message (Optional)</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us a little bit about your home or any questions you have..."
            rows={4}
            className="w-full px-4 py-2.5 bg-[#FFF8F0]/50 text-[#4A2C17] border-[1.5px] border-[#D4A574]/40 rounded-lg outline-none focus:border-[#E8742A] focus:ring-2 focus:ring-[#E8742A]/10 transition-all resize-y font-medium"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-4 w-full py-3.5 bg-gradient-to-r from-[#E8742A] to-[#F5923E] hover:from-[#d66520] hover:to-[#e07d2c] text-white font-bold rounded-lg shadow-[0_4px_14px_rgba(232,116,42,0.3)] hover:shadow-[0_6px_20px_rgba(232,116,42,0.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Submitting...' : 'Submit Adoption Request'}
        </button>
      </form>
    </div>
  );
}
