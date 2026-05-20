// ✅ Server Component — NO "use client" directive here
import React from "react";
import Link from "next/link";
import { FaPaw, FaArrowRight, FaHeart } from "react-icons/fa";
import FeaturedAnimalCard from "./Featuredanimalcard";

/* ── Section Header (pure JSX, no hooks) ── */
const SectionHeader = () => (
  <div className="text-center mb-12 md:mb-16">
    <div className="inline-flex items-center gap-2 bg-[#E8742A]/10 border border-[#E8742A]/30 text-[#E8742A] text-sm font-bold px-4 py-1.5 rounded-full mb-5">
      <FaPaw className="text-xs" /> Featured Animals
    </div>

    <h2 className="font-['Outfit'] font-extrabold text-4xl md:text-5xl text-[#4A2C17] tracking-tight leading-tight mb-4">
      Find Your{" "}
      <span className="relative inline-block">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8742A] to-[#F5923E]">
          Perfect Companion
        </span>
        <svg
          className="absolute -bottom-2 left-0 w-full"
          viewBox="0 0 200 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.5 C 40 1, 80 7, 120 3.5 S 160 1, 199 5"
            stroke="#E8742A"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </span>
    </h2>

    <p className="text-[#6B3E26] text-lg md:text-xl font-medium max-w-xl mx-auto">
      These adorable pets are waiting for a loving home. Each adoption changes
      two lives — theirs and yours.
    </p>
  </div>
);

/* ── Empty State ── */
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-[0_4px_24px_rgba(74,44,23,0.06)] border-[1.5px] border-[#D4A574]/20 text-center px-6">
    <div className="w-20 h-20 bg-[#FFF8F0] rounded-full flex items-center justify-center mb-5 shadow-inner">
      <FaHeart className="text-3xl text-[#E8742A]/40" />
    </div>
    <h3 className="font-['Outfit'] font-bold text-2xl text-[#4A2C17] mb-2">
      No featured pets right now
    </h3>
    <p className="text-[#6B3E26] max-w-sm">
      Check back soon — we&apos;re always adding new lovable friends looking for
      their forever home!
    </p>
  </div>
);

/* ── Main Server Component ── */
const FeatureAnimal = async () => {
  let animals = [];

  try {
    const res = await fetch("http://localhost:5000/animals?_limit=6", {
      cache: "no-store",
    });
    if (res.ok) {
      animals = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch featured animals:", error);
    // animals stays [] — EmptyState renders gracefully
  }

  return (
    <section className="bg-[#FFF8F0] font-['Outfit'] py-20 md:py-28 relative overflow-hidden">
      {/* ── Background Decorations ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#F5923E]/[0.08] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#D4A574]/10 blur-3xl" />
        <div className="absolute top-12 left-8 text-[90px] opacity-[0.025] rotate-[-15deg] select-none">
          🐾
        </div>
        <div className="absolute bottom-12 right-8 text-[110px] opacity-[0.025] rotate-[10deg] select-none">
          🐾
        </div>
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #8B5E3C 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        <SectionHeader />

        {animals.length > 0 ? (
          <>
            {/* Cards grid — each card is a Client Component */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {animals.slice(0, 6).map((animal, idx) => (
                <FeaturedAnimalCard
                  key={animal._id || idx}
                  animal={animal}
                  index={idx}
                />
              ))}
            </div>

            {/* View All CTA */}
            <div className="flex justify-center mt-14">
              <Link
                href="/all-pets"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#E8742A] to-[#F5923E] hover:from-[#D4651F] hover:to-[#E8742A] text-white font-['Outfit'] font-bold text-base px-8 py-4 rounded-2xl shadow-[0_6px_24px_rgba(232,116,42,0.35)] hover:shadow-[0_8px_32px_rgba(232,116,42,0.45)] transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <FaPaw className="text-white/70" />
                View All Pets
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};

export default FeatureAnimal;
