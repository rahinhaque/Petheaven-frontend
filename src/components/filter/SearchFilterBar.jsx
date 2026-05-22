// components/SearchFilterBar.jsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";

const SPECIES_OPTIONS = [
  "All",
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Hamster",
  "Fish",
  "Other",
];

export default function SearchFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [name, setName] = useState(searchParams.get("name") || "");
  const [species, setSpecies] = useState(searchParams.get("species") || "");

  const updateURL = useCallback(
    (newName, newSpecies) => {
      const params = new URLSearchParams();
      if (newName) params.set("name", newName);
      if (newSpecies && newSpecies !== "All") params.set("species", newSpecies);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname],
  );

  const handleNameChange = (e) => {
    setName(e.target.value);
    updateURL(e.target.value, species);
  };

  const handleSpeciesChange = (value) => {
    setSpecies(value);
    updateURL(name, value);
  };

  const handleClear = () => {
    setName("");
    setSpecies("");
    router.push(pathname);
  };

  const hasFilters = name || (species && species !== "All");

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search by name */}
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A574] text-lg" />
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Search by name..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-[1.5px] border-[#D4A574]/40 bg-white text-[#4A2C17] placeholder-[#D4A574] font-medium focus:outline-none focus:border-[#E8742A] focus:ring-2 focus:ring-[#E8742A]/10 shadow-sm transition-all"
        />
      </div>

      {/* Filter by species */}
      <div className="flex items-center gap-2 flex-wrap">
        <MdFilterList className="text-[#D4A574] text-xl shrink-0" />
        {SPECIES_OPTIONS.map((s) => {
          const isActive = species === s || (s === "All" && !species);
          return (
            <button
              key={s}
              onClick={() => handleSpeciesChange(s === "All" ? "" : s)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-[1.5px] transition-all ${
                isActive
                  ? "bg-[#E8742A] text-white border-[#E8742A] shadow-md shadow-[#E8742A]/20"
                  : "bg-white text-[#6B3E26] border-[#D4A574]/40 hover:border-[#E8742A] hover:text-[#E8742A]"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={handleClear}
          className="text-sm text-[#E8742A] font-semibold hover:underline self-center shrink-0"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
