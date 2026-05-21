import React from "react";
import Link from "next/link";
import { FaPaw, FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDF6EE] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#F5E6D3] to-transparent opacity-40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#F5E6D3] to-transparent opacity-40 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* 404 Header with Paws */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <FaPaw className="text-4xl text-[#D4A574] -rotate-12" />
          <h1 className="text-8xl md:text-9xl font-black text-[#2E1503]" style={{ fontFamily: "'Playfair Display', serif" }}>
            4<span className="text-[#E8742A]">0</span>4
          </h1>
          <FaPaw className="text-4xl text-[#D4A574] rotate-12 mt-12" />
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#4A2C17] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          We sniffed everywhere...
        </h2>
        <p className="text-lg text-[#6B3E26] mb-10 max-w-lg leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
          But the page you are looking for seems to have wandered off. It might have been moved, deleted, or never existed in the first place!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#E8742A] hover:bg-[#d96621] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <FaHome className="text-xl" />
            Back to Home
          </Link>
          <Link
            href="/all-pets"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#FFF8F0] text-[#E8742A] border-2 border-[#E8742A]/20 hover:border-[#E8742A] rounded-full font-bold shadow-sm hover:shadow-md transition-all duration-300"
          >
            <FaSearch className="text-xl" />
            Browse Pets
          </Link>
        </div>
      </div>
    </div>
  );
}
