"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPaw, FaMapMarkerAlt, FaArrowRight, FaStar } from "react-icons/fa";

const FALLBACK = "https://placehold.co/400x320/F5E6D3/4A2C17?text=No+Image";

const FeaturedAnimalCard = ({ animal, index }) => {
  const {
    _id,
    petName = "Unknown Pet",
    species = "Animal",
    breed = "Mixed",
    age = "Unknown",
    gender = "Unknown",
    imageUrl,
    location = "Location Unknown",
    adoptionFee = 0,
    featured = false,
  } = animal || {};

  const [imgSrc, setImgSrc] = useState(imageUrl || FALLBACK);

  return (
    <div
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border-[1.5px] border-[#D4A574]/30 hover:border-[#E8742A]/60 shadow-[0_4px_24px_rgba(74,44,23,0.07)] hover:shadow-[0_16px_40px_rgba(232,116,42,0.18)] transition-all duration-500 hover:-translate-y-2"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* ── Image ── */}
      <div className="relative h-56 w-full overflow-hidden bg-[#F5E6D3]">
        <Image
          src={imgSrc}
          alt={`Photo of ${petName}`}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgSrc(FALLBACK)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Species badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#4A2C17] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          <FaPaw className="text-[#E8742A]" />
          {species}
        </div>

        {/* Gender pill */}
        {gender && (
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {gender}
          </div>
        )}

        {/* Featured badge */}
        {featured && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-[#E8742A] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
            <FaStar className="text-yellow-200 text-[10px]" /> Featured
          </div>
        )}

        {/* Adoption fee */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#E8742A] font-extrabold text-sm px-3 py-1 rounded-full shadow-sm">
          {adoptionFee > 0 ? `$${adoptionFee}` : "Free"}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-grow p-5 gap-3">
        <div>
          <h3 className="font-['Outfit'] font-extrabold text-[1.35rem] text-[#4A2C17] leading-tight truncate">
            {petName}
          </h3>
          <p className="text-[#8B5E3C] text-sm font-medium mt-0.5 truncate">
            {breed} &bull; {age} {Number(age) === 1 ? "Year" : "Years"} Old
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[#8B5E3C] text-sm">
          <FaMapMarkerAlt className="text-[#D4A574] shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        <div className="border-t border-[#F0E0CE]" />

        <Link
          href={`/all-pets/${_id || ""}`}
          className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-['Outfit'] font-bold text-sm text-[#4A2C17] bg-[#FFF8F0] border border-[#D4A574]/40 hover:bg-gradient-to-r hover:from-[#E8742A] hover:to-[#F5923E] hover:text-white hover:border-transparent hover:shadow-[0_4px_18px_rgba(232,116,42,0.35)] transition-all duration-300 group/btn"
        >
          Meet {petName}
          <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedAnimalCard;
