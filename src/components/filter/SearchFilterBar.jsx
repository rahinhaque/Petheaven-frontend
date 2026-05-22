"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";

const SPECIES_OPTIONS = [
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
  const [selectedSpecies, setSelectedSpecies] = useState(() => {
    const s = searchParams.get("species");
    return s ? s.split(",").map((x) => x.trim()) : [];
  });

  const updateURL = useCallback(
    (newName, newSpeciesArray) => {
      const params = new URLSearchParams();
      if (newName) params.set("name", newName);
      if (newSpeciesArray.length > 0)
        params.set("species", newSpeciesArray.join(","));
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname],
  );

  // Debounce name input so it doesn't fire on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL(name, selectedSpecies);
    }, 400);
    return () => clearTimeout(timer);
  }, [name]); // eslint-disable-line

  const handleSpeciesToggle = (s) => {
    let updated;
    if (s === "All") {
      updated = [];
    } else {
      updated = selectedSpecies.includes(s)
        ? selectedSpecies.filter((x) => x !== s)
        : [...selectedSpecies, s];
    }
    setSelectedSpecies(updated);
    updateURL(name, updated);
  };

  const handleClear = () => {
    setName("");
    setSelectedSpecies([]);
    router.push(pathname);
  };

  const hasFilters = name || selectedSpecies.length > 0;

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* ── Search by name ───────────────────────────────────── */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A574] text-lg" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by name..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-[1.5px] border-[#D4A574]/40 bg-white text-[#4A2C17] placeholder-[#D4A574] font-medium focus:outline-none focus:border-[#E8742A] focus:ring-2 focus:ring-[#E8742A]/10 shadow-sm transition-all"
        />
      </div>

      {/* ── Filter by species ─────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        <MdFilterList className="text-[#D4A574] text-xl shrink-0" />

        {/* All button */}
        <button
          onClick={() => handleSpeciesToggle("All")}
          className={`px-4 py-2 rounded-full text-sm font-semibold border-[1.5px] transition-all ${
            selectedSpecies.length === 0
              ? "bg-[#E8742A] text-white border-[#E8742A] shadow-md shadow-[#E8742A]/20"
              : "bg-white text-[#6B3E26] border-[#D4A574]/40 hover:border-[#E8742A] hover:text-[#E8742A]"
          }`}
        >
          All
        </button>

        {/* Species buttons */}
        {SPECIES_OPTIONS.map((s) => {
          const isActive = selectedSpecies.includes(s);
          return (
            <button
              key={s}
              onClick={() => handleSpeciesToggle(s)}
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

        {/* Clear all */}
        {hasFilters && (
          <button
            onClick={handleClear}
            className="text-sm text-[#E8742A] font-semibold hover:underline ml-2"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
