"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { FaListAlt, FaCheckCircle, FaPaw, FaEye, FaEdit, FaTrash, FaInbox, FaTimes } from 'react-icons/fa';

export default function MyListingsClient({ initialAnimals }) {
  const [animals, setAnimals] = useState(initialAnimals || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetName, setSelectedPetName] = useState('');
  
  // Simulated requests for the demo
  const [requests, setRequests] = useState([
    {
      id: 1,
      userName: "John Doe",
      email: "john@example.com",
      pickupDate: "2026-06-01",
      status: "pending"
    },
    {
      id: 2,
      userName: "Jane Smith",
      email: "jane@smith.com",
      pickupDate: "2026-06-03",
      status: "pending"
    }
  ]);

  const totalListings = animals.length;
  // Assume status is available unless marked adopted (simulating for now)
  const availableCount = animals.filter(a => a.status !== 'adopted').length;
  const adoptedCount = animals.filter(a => a.status === 'adopted').length;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    
    try {
      // Simulate API DELETE request
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnimals(prev => prev.filter(animal => animal._id !== id));
      toast.success("Listing deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete listing.");
    }
  };

  const openRequestsModal = (petName) => {
    setSelectedPetName(petName);
    setIsModalOpen(true);
  };

  const closeRequestsModal = () => {
    setIsModalOpen(false);
    setSelectedPetName('');
  };

  const handleRequestAction = (reqId, action) => {
    setRequests(prev => prev.filter(req => req.id !== reqId));
    toast.success(`Request ${action} successfully!`);
  };

  return (
    <div className="paw-dashboard__content relative">
      <div className="paw-dashboard__welcome mb-8">
        <h1 className="paw-dashboard__welcome-title">My Listings</h1>
        <p className="paw-dashboard__welcome-subtitle">
          Manage the pets you have listed for adoption.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border-[1.5px] border-[#D4A574]/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E8742A]/10 flex items-center justify-center text-[#E8742A] text-xl">
            <FaListAlt />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#6B3E26] uppercase">Total Listings</p>
            <p className="text-2xl font-bold text-[#4A2C17]">{totalListings}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border-[1.5px] border-[#D4A574]/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
            <FaPaw />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#6B3E26] uppercase">Available</p>
            <p className="text-2xl font-bold text-[#4A2C17]">{availableCount}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border-[1.5px] border-[#D4A574]/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#6B3E26] uppercase">Adopted</p>
            <p className="text-2xl font-bold text-[#4A2C17]">{adoptedCount}</p>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      {animals.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <div key={animal._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border-[1.5px] border-[#D4A574]/30 hover:shadow-md transition-shadow flex flex-col">
              <div className="relative h-48 w-full bg-[#F5E6D3]">
                <Image
                  src={animal.imageUrl || "https://via.placeholder.com/400x300.png?text=No+Image"}
                  alt={animal.petName || "Pet Image"}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#FFF8F0] text-[#E8742A] font-bold text-sm px-3 py-1 rounded-lg shadow-sm">
                  {animal.adoptionFee > 0 ? `$${animal.adoptionFee}` : 'Free'}
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-[#4A2C17] mb-4 truncate">{animal.petName}</h3>
                
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => openRequestsModal(animal.petName)}
                    className="flex items-center justify-center gap-2 bg-[#FFF8F0] text-[#E8742A] border border-[#E8742A]/30 hover:bg-[#E8742A] hover:text-white py-2 rounded-lg font-semibold text-sm transition-colors"
                  >
                    <FaInbox /> Requests
                  </button>
                  <Link 
                    href={`/all-pets/${animal._id}`}
                    className="flex items-center justify-center gap-2 bg-[#FFF8F0] text-[#6B3E26] border border-[#D4A574]/30 hover:bg-[#D4A574] hover:text-white py-2 rounded-lg font-semibold text-sm transition-colors"
                  >
                    <FaEye /> View
                  </Link>
                  <Link 
                    href={`/dashboard/update-pet/${animal._id}`}
                    className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white py-2 rounded-lg font-semibold text-sm transition-colors"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(animal._id)}
                    className="flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white py-2 rounded-lg font-semibold text-sm transition-colors"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="paw-dashboard__stats" style={{ display: "block", marginTop: "32px" }}>
          <div className="paw-dashboard__stat-card" style={{ maxWidth: "100%" }}>
            <div className="paw-dashboard__stat-icon">
              <FaListAlt />
            </div>
            <div className="paw-dashboard__stat-info">
              <h4>No active listings</h4>
              <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                You don't have any pets listed for adoption right now.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Requests Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#D4A574]/30 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#D4A574]/20 bg-[#FFF8F0]">
              <h2 className="text-2xl font-bold text-[#4A2C17]">
                Adoption Requests <span className="text-[#E8742A]">({selectedPetName})</span>
              </h2>
              <button 
                onClick={closeRequestsModal}
                className="text-[#8B5E3C] hover:text-[#E8742A] bg-white rounded-full p-2 shadow-sm transition-colors"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto bg-white">
              {requests.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {requests.map(req => (
                    <div key={req.id} className="border border-[#D4A574]/30 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F5E6D3]/20">
                      <div>
                        <p className="font-bold text-[#4A2C17] text-lg">{req.userName}</p>
                        <p className="text-[#6B3E26] text-sm mb-1">{req.email}</p>
                        <p className="text-sm font-semibold text-[#8B5E3C]">Pickup: <span className="text-[#4A2C17]">{req.pickupDate}</span></p>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleRequestAction(req.id, 'approved')}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-sm shadow-sm transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleRequestAction(req.id, 'rejected')}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm shadow-sm transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-[#FFF8F0] rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaInbox className="text-[#D4A574] text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-[#4A2C17]">No Pending Requests</h3>
                  <p className="text-[#6B3E26]">There are no adoption requests for this pet yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
