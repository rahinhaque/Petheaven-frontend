"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { FaListAlt, FaCheckCircle, FaPaw, FaEye, FaEdit, FaTrash, FaInbox } from 'react-icons/fa';
import '../DashboardForm.css';

import EditPetModal from '@/components/modal/EditPetModal';
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal';
import RequestsModal from '@/components/modal/RequestsModal';

export default function MyListingsClient({ initialAnimals }) {
  const [animals, setAnimals] = useState(initialAnimals || []);
  
  // Requests Modal State
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [selectedPetName, setSelectedPetName] = useState('');
  
  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPetForDelete, setSelectedPetForDelete] = useState(null);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
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
  const availableCount = animals.filter(a => a.status !== 'adopted').length;
  const adoptedCount = animals.filter(a => a.status === 'adopted').length;

  // --- Requests Logic ---
  const openRequestsModal = (petName) => {
    setSelectedPetName(petName);
    setIsRequestsModalOpen(true);
  };

  const closeRequestsModal = () => {
    setIsRequestsModalOpen(false);
    setSelectedPetName('');
  };

  const handleRequestAction = (reqId, action) => {
    setRequests(prev => prev.filter(req => req.id !== reqId));
    toast.success(`Request ${action} successfully!`);
  };

  // --- Delete Logic ---
  const openDeleteModal = (animal) => {
    setSelectedPetForDelete(animal);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPetForDelete(null);
  };

  const confirmDelete = async () => {
    if (!selectedPetForDelete) return;
    try {
      const res = await fetch(
        `http://localhost:5000/animals/${selectedPetForDelete._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Server responded with an error.");
      }

      // Remove from local state
      setAnimals(prev => prev.filter(animal => animal._id !== selectedPetForDelete._id));
      toast.success(`${selectedPetForDelete.petName} has been deleted from your listings.`);
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Failed to delete listing. Please try again.");
      closeDeleteModal();
    }
  };

  // --- Edit Logic ---
  const openEditModal = (animal) => {
    setEditFormData({ ...animal });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditFormData(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formElementData = new FormData(e.currentTarget);
    const animalData = Object.fromEntries(formElementData.entries());
    console.log("Form Data from Edit Modal:", animalData);

    const res = await fetch(`http://localhost:5000/animals/${editFormData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalData)
    });
    
    const updatedAnimal = await res.json();
    console.log("Response from server:", updatedAnimal);  
    
    setIsSaving(true);
    try {
      // Simulate API PUT request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setAnimals(prev => prev.map(animal => 
        animal._id === editFormData._id ? { ...editFormData, ...animalData } : animal
      ));
      
      toast.success(`${animalData.petName}'s details have been successfully updated!`);
      closeEditModal();
    } catch (error) {
      toast.error("Failed to update pet details.");
    } finally {
      setIsSaving(false);
    }
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
                  <button 
                    onClick={() => openEditModal(animal)}
                    className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    onClick={() => openDeleteModal(animal)}
                    className="flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer"
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

      {/* Extracted Modal Components */}
      
      <RequestsModal 
        isOpen={isRequestsModalOpen} 
        selectedPetName={selectedPetName} 
        requests={requests} 
        onClose={closeRequestsModal} 
        onAction={handleRequestAction} 
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        animal={selectedPetForDelete} 
        onClose={closeDeleteModal} 
        onConfirm={confirmDelete} 
      />

      <EditPetModal 
        isOpen={isEditModalOpen} 
        formData={editFormData} 
        isSaving={isSaving} 
        onClose={closeEditModal} 
        onChange={handleEditChange} 
        onSubmit={handleEditSubmit} 
      />

    </div>
  );
}
