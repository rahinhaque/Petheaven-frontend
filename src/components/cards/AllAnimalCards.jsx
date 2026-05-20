"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaPaw, FaInfoCircle } from 'react-icons/fa';

const AllAnimalCards = ({ animal }) => {
  // Use fallbacks for safety
  const {
    _id,
    petName = "Unknown Pet",
    species = "Animal",
    breed = "Mixed",
    age = "Unknown",
    gender = "Unknown",
    imageUrl = "https://via.placeholder.com/400x300.png?text=No+Image",
    location = "Location Unknown",
    adoptionFee = 0,
  } = animal || {};

  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(74,44,23,0.06)] hover:shadow-[0_12px_30px_rgba(74,44,23,0.12)] transition-all duration-300 border-[1.5px] border-[#D4A574]/30 hover:border-[#E8742A]/50 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-[#F5E6D3]">
        <Image
          src={imgError ? "https://via.placeholder.com/400x300.png?text=No+Image" : imageUrl}
          alt={`Photo of ${petName}`}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImgError(true)}
        />
        <div className="absolute top-4 left-4 bg-[#FFF8F0]/90 backdrop-blur-sm text-[#4A2C17] font-bold text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
          <FaPaw className="text-[#E8742A]" />
          {species}
        </div>
        {gender && (
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white font-medium text-xs px-2.5 py-1 rounded-full shadow-sm">
            {gender}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-['Outfit'] font-bold text-2xl text-[#4A2C17] truncate max-w-[70%]">
            {petName}
          </h3>
          <div className="bg-[#FFF8F0] border border-[#E8742A]/20 text-[#E8742A] font-bold text-sm px-3 py-1 rounded-lg shrink-0">
            {adoptionFee > 0 ? `$${adoptionFee}` : 'Free'}
          </div>
        </div>

        <p className="text-[#6B3E26] font-medium text-sm mb-4 truncate">
          {breed} • {age} {age == 1 ? 'Year' : 'Years'} Old
        </p>

        <div className="flex items-center gap-1.5 text-[#8B5E3C] text-sm mb-6">
          <FaMapMarkerAlt className="shrink-0 text-[#D4A574]" />
          <span className="truncate">{location}</span>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Link
            href={`/all-pets/${_id || ''}`}
            className="w-full flex items-center justify-center gap-2 bg-[#FFF8F0] hover:bg-gradient-to-r hover:from-[#E8742A] hover:to-[#F5923E] text-[#4A2C17] hover:text-white border border-[#D4A574]/40 hover:border-transparent font-['Outfit'] font-bold text-[0.95rem] py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-[0_4px_14px_rgba(232,116,42,0.3)]"
          >
            <FaInfoCircle className="text-lg" />
            Meet {petName}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllAnimalCards;