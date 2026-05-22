import AllAnimalCards from "@/components/cards/AllAnimalCards";
import SearchFilterBar from "../../components/filter/SearchFilterBar";
import { Suspense } from "react";
import React from "react";
import { FaHeart } from "react-icons/fa";

export const dynamic = "force-dynamic";

const AllPetsSection = async ({ searchParams }) => {
  // ✅ Await searchParams — required in Next.js 15
  const resolvedParams = await searchParams;

  const params = new URLSearchParams();
  if (resolvedParams?.name) params.set("name", resolvedParams.name);
  if (resolvedParams?.species) params.set("species", resolvedParams.species);

  const queryString = params.toString();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/animals${queryString ? `?${queryString}` : ""}`;

  let animals = [];
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) animals = await res.json();
  } catch (error) {
    console.error("Failed to fetch animals:", error);
  }

  const hasActiveFilters = resolvedParams?.name || resolvedParams?.species;

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-['Outfit']">
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#FFF8F0] to-[#F5E6D3] py-16 md:py-24 border-b-[1.5px] border-[#D4A574]/30 relative overflow-hidden">
        <div className="absolute top-10 right-10 text-[120px] opacity-[0.03] rotate-12 pointer-events-none">
          🐾
        </div>
        <div className="absolute bottom-10 left-10 text-[100px] opacity-[0.03] -rotate-12 pointer-events-none">
          🐾
        </div>

        <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-[#E8742A]/30 text-[#E8742A] font-bold text-sm px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <FaHeart /> Find Your Best Friend
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#4A2C17] tracking-tight mb-6">
            All Animals for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8742A] to-[#F5923E]">
              Adoption
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#6B3E26] max-w-2xl mx-auto font-medium">
            Browse our list of lovable pets waiting for their forever home.
            Every adoption saves a life and fills yours with endless joy.
          </p>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────── */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 py-16">
        {/* Search + Filter Bar */}
        <Suspense
          fallback={
            <div className="h-14 w-full rounded-2xl bg-white/60 border border-[#D4A574]/30 animate-pulse mb-8" />
          }
        >
          <SearchFilterBar />
        </Suspense>

        {/* Active filter summary */}
        {hasActiveFilters && (
          <p className="text-sm text-[#6B3E26] font-medium mb-6 -mt-2">
            Showing{" "}
            <span className="text-[#E8742A] font-bold">{animals.length}</span>{" "}
            result{animals.length !== 1 ? "s" : ""}
            {resolvedParams?.name && (
              <>
                {" "}
                for &ldquo;<em>{resolvedParams.name}</em>&rdquo;
              </>
            )}
            {resolvedParams?.species && (
              <>
                {" "}
                &middot; species: <em>{resolvedParams.species}</em>
              </>
            )}
          </p>
        )}

        {/* ── Results Grid ──────────────────────────────────────── */}
        {animals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {animals.map((animal) => (
              <AllAnimalCards
                key={animal._id || animal.id || Math.random().toString()}
                animal={animal}
              />
            ))}
          </div>
        ) : (
          /* ── Empty State ──────────────────────────────────────── */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-[0_4px_24px_rgba(74,44,23,0.06)] border-[1.5px] border-[#D4A574]/20 text-center px-6">
            <div className="w-24 h-24 bg-[#FFF8F0] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FaHeart className="text-4xl text-[#E8742A]/40" />
            </div>
            <h3 className="text-2xl font-bold text-[#4A2C17] mb-3">
              {hasActiveFilters
                ? "No pets match your search"
                : "No pets available right now"}
            </h3>
            <p className="text-[#6B3E26] max-w-md mx-auto">
              {hasActiveFilters
                ? "Try a different name or species — your perfect match is out there!"
                : "We couldn't find any pets currently listed for adoption. Please check back later!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPetsSection;
