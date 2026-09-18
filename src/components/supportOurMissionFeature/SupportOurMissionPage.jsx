"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaCheckCircle, FaClock, FaArrowRight } from "react-icons/fa";

/* ─────────────────────────────────────────────
   HOOK – lightweight intersection observer
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   SECTION LABEL (matches site theme)
───────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8742A]/30 bg-white/70 backdrop-blur-sm mb-5">
    <span className="w-1.5 h-1.5 rounded-full bg-[#E8742A]" />
    <span
      style={{ fontFamily: "'Lora', serif", fontSize: "0.7rem", letterSpacing: "0.14em" }}
      className="uppercase font-semibold text-[#E8742A]"
    >
      {children}
    </span>
  </div>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const features = [
  {
    key: "volunteer",
    emoji: "🤝",
    icon: "💝",
    title: "Volunteer",
    action: "Join the Team",
    desc: "Spend time walking dogs, cuddling cats, or helping at our events. Your time is their treasure.",
    perks: [
      "Dog walking & shelter care shifts",
      "Community adoption events",
      "Fundraising & awareness drives",
    ],
    status: "Coming Soon",
  },
  {
    key: "foster",
    emoji: "🏡",
    icon: "🐾",
    title: "Foster",
    action: "Become a Foster",
    desc: "Open your home temporarily to an animal in need. It frees up shelter space and saves a life.",
    perks: [
      "Short-term & long-term placements",
      "Full vet & supply support provided",
      "Pre-matched pets by lifestyle",
    ],
    status: "Coming Soon",
  },
  {
    key: "gift",
    emoji: "🎁",
    icon: "❤️",
    title: "Make a Gift",
    action: "Make a Gift",
    desc: "Every dollar provides food, medical care, and toys for our rescues. No contribution is too small.",
    perks: [
      "One-time & recurring gifts",
      "Sponsor a pet's treatment",
      "Corporate matching programmes",
    ],
    status: "Coming Soon",
  },
];

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-[#FFF8F0] to-[#F5E6D3] py-16 md:py-24 border-b-[1.5px] border-[#D4A574]/30 relative overflow-hidden">
      <div className="absolute top-10 right-10 text-[120px] opacity-[0.03] rotate-12 pointer-events-none select-none">
        🤝
      </div>
      <div className="absolute bottom-10 left-10 text-[100px] opacity-[0.03] -rotate-12 pointer-events-none select-none">
        🐾
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-[#E8742A]/30 text-[#E8742A] font-bold text-sm px-4 py-1.5 rounded-full mb-6 shadow-sm">
          <FaHeart /> Support Our Mission
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#4A2C17] tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Can&apos;t Adopt Right Now?{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8742A] to-[#F5923E]">
            Other Ways to Help
          </span>
        </h1>
        <p className="text-lg md:text-xl text-[#6B3E26] max-w-2xl mx-auto font-medium" style={{ fontFamily: "'Lora', Georgia, serif" }}>
          Volunteer your time, open your home as a foster, or make a gift to
          our rescues. Every bit of support changes an animal&apos;s life.
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   FEATURE CARDS
───────────────────────────────────────────── */
const FeatureCard = ({ feature, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-3xl p-8 bg-white border border-[#E8D5C0]/60 shadow-[0_4px_24px_rgba(74,44,23,0.06)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
    >
      {/* accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 w-0 group-hover:w-full rounded-t-3xl transition-all duration-500 bg-gradient-to-r from-[#E8742A] to-[#F5923E]" />

      {/* status pill */}
      <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEE9D1] border border-[#E8742A]/30">
        <FaClock className="text-[#E8742A] text-xs" />
        <span className="text-[11px] font-bold text-[#2E1503] uppercase tracking-wide" style={{ fontFamily: "'Lora', serif" }}>
          {feature.status}
        </span>
      </div>

      {/* icon */}
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, #E8742A15, #F5923E15)" }}>
        {feature.icon}
      </div>

      <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2E1503", fontSize: "1.4rem" }} className="font-black mb-2">
        {feature.title}
      </h3>
      <p style={{ fontFamily: "'Lora', serif" }} className="text-[#6B3E26] text-sm leading-relaxed mb-6">
        {feature.desc}
      </p>

      {/* perks */}
      <div className="rounded-2xl p-5 mb-8 flex-1" style={{ background: "#FFF8F0", border: "1px solid #F0DFC9" }}>
        <div className="text-xs font-bold uppercase tracking-wider text-[#A0663A] mb-3" style={{ fontFamily: "'Lora', serif" }}>
          What you can expect
        </div>
        <ul className="space-y-2.5">
          {feature.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2.5 text-[#4A2C17] text-sm" style={{ fontFamily: "'Lora', serif" }}>
              <FaCheckCircle className="text-[#E8742A] mt-0.5 flex-shrink-0" />
              {perk}
            </li>
          ))}
        </ul>
      </div>

      {/* disabled / coming soon button */}
      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#A0663A] bg-[#F0DFC9] cursor-not-allowed select-none self-start" style={{ fontFamily: "'Lora', serif" }}>
        {feature.action} <FaClock className="text-xs" />
      </div>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────
   COMING SOON BANNER
───────────────────────────────────────────── */
const ComingSoonBanner = () => {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="relative py-24 px-6 bg-[#2E1503] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, #E8742A15 0%, transparent 65%)" }} />
      </div>

      <div className={`max-w-3xl mx-auto relative z-10 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-6xl mb-6">🚧</div>
        <SectionLabel>Under Construction</SectionLabel>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#FDF6EE", letterSpacing: "-0.02em" }} className="font-black leading-tight mb-5">
          These Features Are <span style={{ color: "#F5923E" }}>Coming Soon</span>
        </h2>
        <p style={{ fontFamily: "'Lora', serif" }} className="text-[#D4A574] max-w-xl mx-auto leading-relaxed text-[1.05rem] mb-9">
          Our team is working hard to launch volunteering, fostering, and donation
          tools. Join our newsletter and we&apos;ll let you know the moment they go live.
        </p>

        {/* notify form (demo) */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-[#D4A574] outline-none focus:border-[#E8742A] focus:bg-white/15 transition-colors text-sm"
            style={{ fontFamily: "'Lora', serif" }}
          />
          <button
            type="submit"
            className="px-7 py-3 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-orange-300/40 hover:-translate-y-0.5 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #E8742A, #F5923E)", fontFamily: "'Lora', serif" }}
          >
            Notify Me
          </button>
        </form>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full font-bold text-white overflow-hidden shadow-lg hover:shadow-orange-300/50 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2"
            style={{ background: "linear-gradient(135deg, #E8742A 0%, #F5923E 60%, #FFAB60 100%)", fontFamily: "'Lora', Georgia, serif", fontSize: "1rem" }}
          >
            Back to Home
          </Link>
          <Link
            href="/all-pets"
            className="px-8 py-3.5 rounded-full font-bold border-2 border-[#D4A574] text-[#FDF6EE] hover:border-[#E8742A] hover:text-[#E8742A] transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2"
            style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1rem" }}
          >
            Adopt a Pet <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function SupportOurMissionPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] font-['Outfit']">
      <Hero />

      {/* features grid */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="text-center mb-14">
          <SectionLabel>Our Programmes</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#2E1503", letterSpacing: "-0.02em" }} className="font-black leading-tight">
            Ways to Make a <span style={{ color: "#E8742A" }}>Difference</span>
          </h2>
          <p style={{ fontFamily: "'Lora', serif" }} className="mt-4 text-[#6B3E26] max-w-xl mx-auto leading-relaxed text-[1.02rem]">
            Three meaningful ways to support rescued pets — each one is being
            built and will be available very soon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={feature.key} feature={feature} index={i} />
          ))}
        </div>
      </section>

      <ComingSoonBanner />
    </div>
  );
}