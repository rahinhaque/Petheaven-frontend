"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Banner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FDF6EE] flex items-center">
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm cream base with subtle grain via SVG filter */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Large warm arc — top right */}
        <div
          className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, #F5923E33 0%, transparent 70%)",
          }}
        />

        {/* Soft peach blob — bottom left */}
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, #FDDBB433 0%, transparent 70%)",
          }}
        />

        {/* Curved divider wave at bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C360,120 1080,0 1440,80 L1440,120 L0,120 Z"
            fill="#F5E6D3"
            fillOpacity="0.45"
          />
        </svg>
      </div>

      {/* ── Floating paw prints (decorative) ── */}
      {[
        "top-[14%] left-[6%]",
        "top-[70%] left-[3%]",
        "top-[30%] right-[5%]",
        "top-[80%] right-[8%]",
      ].map((pos, i) => (
        <span
          key={i}
          className={`absolute text-[#E8742A] select-none pointer-events-none ${pos}`}
          style={{
            fontSize: i % 2 === 0 ? "1.4rem" : "1rem",
            opacity: 0.18 + i * 0.04,
            transform: `rotate(${i * 22}deg)`,
            animation: `pawBob ${3 + i * 0.7}s ease-in-out infinite alternate`,
          }}
        >
          🐾
        </span>
      ))}

      {/* ── Main Grid ── */}
      <div className="relative max-w-7xl mx-auto px-6 py-28 w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* ── Left: Copy ── */}
        <div
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
          style={{
            animation: mounted
              ? "slideUp 0.7s cubic-bezier(.22,1,.36,1) both"
              : "none",
          }}
        >
          {/* Pill badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8742A]/30 bg-white/70 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E8742A] animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#E8742A]">
              Rescue • Adopt • Love
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-[1.08] text-[#2E1503]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Every Paw Deserves{" "}
            <span
              className="relative inline-block"
              style={{ color: "#E8742A" }}
            >
              a Forever Home
              {/* Underline swoosh */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2,10 Q75,2 150,8 Q225,14 298,6"
                  stroke="#E8742A"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>
          </h1>

          {/* Sub-copy */}
          <p
            className="mt-7 text-[#6B3E26] leading-relaxed max-w-md mx-auto lg:mx-0"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
            }}
          >
            Meet your new best friend at{" "}
            <strong className="text-[#E8742A]">Pet Heaven</strong>. Hundreds of
            rescued cats, dogs, and more are waiting to shower you with
            unconditional love. One visit could change two lives.
          </p>

          {/* Stats row */}
          <div className="mt-8 flex gap-8 justify-center lg:justify-start">
            {[
              { value: "1,200+", label: "Pets Rescued" },
              { value: "840+", label: "Happy Homes" },
              { value: "4.9★", label: "Adopter Rating" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center lg:items-start"
              >
                <span
                  className="text-[#E8742A] font-extrabold"
                  style={{
                    fontSize: "1.35rem",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {value}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#A0663A] mt-0.5">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/all-pets"
              className="group relative px-8 py-3.5 rounded-full font-bold text-white overflow-hidden shadow-lg hover:shadow-orange-300/50 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #E8742A 0%, #F5923E 60%, #FFAB60 100%)",
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "1rem",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                🐾 Adopt Now
              </span>
              {/* shine sweep */}
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
            </Link>

            <Link
              href="/all-pets"
              className="px-8 py-3.5 rounded-full font-bold border-2 border-[#D4A574] text-[#4A2C17] hover:border-[#E8742A] hover:text-[#E8742A] hover:bg-orange-50 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "1rem",
              }}
            >
              Meet the Pets →
            </Link>
          </div>
        </div>

        {/* ── Right: Image Card ── */}
        <div
          className="flex justify-center lg:justify-end"
          style={{
            animation: mounted
              ? "slideUp 0.85s 0.15s cubic-bezier(.22,1,.36,1) both"
              : "none",
          }}
        >
          <div className="relative w-full max-w-[480px]">
            {/* Card glow ring */}
            <div
              className="absolute inset-0 rounded-[2.5rem] scale-95 blur-2xl"
              style={{
                background: "linear-gradient(135deg, #F5923E55, #FDDBB455)",
              }}
            />

            {/* Card shell */}
            <div
              className="relative rounded-[2.5rem] overflow-hidden border border-white/60 shadow-2xl"
              style={{
                background: "linear-gradient(145deg, #FFFFFF 0%, #FFF3E8 100%)",
                animation: "float 5s ease-in-out infinite",
              }}
            >
              <Image
                src="/assets/banner.png.png"
                alt="Adorable rescue pet"
                width={600}
                height={520}
                priority
                className="w-full h-auto object-cover"
              />

              {/* Overlay tag — bottom of card */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-md border border-orange-100">
                <span className="text-[#E8742A] text-sm">🐶</span>
                <span
                  className="text-[#4A2C17] font-semibold text-sm"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  200+ pets ready to meet you
                </span>
              </div>
            </div>

            {/* Floating accent card — top left */}
            <div
              className="absolute -top-4 -left-6 px-4 py-2.5 rounded-2xl bg-white shadow-lg border border-orange-100 flex items-center gap-2"
              style={{ animation: "float 4s 0.5s ease-in-out infinite" }}
            >
              <span className="text-xl">🐱</span>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#A0663A] font-semibold">
                  New arrival
                </div>
                <div className="text-xs font-bold text-[#2E1503]">
                  Mochi, 3 months
                </div>
              </div>
            </div>

            {/* Floating accent card — bottom right */}
            <div
              className="absolute -bottom-4 -right-6 px-4 py-2.5 rounded-2xl bg-[#E8742A] shadow-lg flex items-center gap-2"
              style={{ animation: "float 4.5s 1s ease-in-out infinite" }}
            >
              <span className="text-xl">❤️</span>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-orange-200 font-semibold">
                  Adopted today
                </div>
                <div className="text-xs font-bold text-white">
                  Rocky found his home!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Animations ── */}
    </section>
  );
};

export default Banner;

