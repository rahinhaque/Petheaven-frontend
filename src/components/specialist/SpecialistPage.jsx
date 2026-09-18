"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { MdVerified, MdMedicalServices } from "react-icons/md";

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
   DEMO DOCTORS DATA (consultant contract demo)
───────────────────────────────────────────── */
const specialists = [
  {
    id: "dr-ayesha-rahman",
    name: "Dr. Ayesha Rahman",
    title: "Senior Veterinarian & Pet Nutritionist",
    focus: "Nutrition plans, wellness checkups, and preventive care for dogs & cats.",
    image:
      "https://images.unsplash.com/photo-1788493066087-b5f68c64e6a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
    phone: "+880 1712-345678",
    whatsapp: "8801712345678",
    email: "ayesha.rahman@petheaven.com",
    badge: "12+ yrs experience",
  },
  {
    id: "dr-imran-hossain",
    name: "Dr. Imran Hossain",
    title: "Canine Orthopedic Surgery Specialist",
    focus: "ACL repair, hip dysplasia care, and post-surgery rehabilitation for dogs.",
    image:
      "https://images.unsplash.com/photo-1773332611528-566f16120979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    phone: "+880 1812-345678",
    whatsapp: "8801812345678",
    email: "imran.hossain@petheaven.com",
    badge: "15+ yrs experience",
  },
  {
    id: "dr-farhana-akter",
    name: "Dr. Farhana Akter",
    title: "Feline Health & Behaviour Consultant",
    focus: "Cat-specific medicine, anxiety, litter training, and geriatric feline care.",
    image:
      "https://images.unsplash.com/photo-1784460469768-6661fe0ad593?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
    phone: "+880 1912-345678",
    whatsapp: "8801912345678",
    email: "farhana.akter@petheaven.com",
    badge: "10+ yrs experience",
  },
  {
    id: "dr-tanvir-ahmed",
    name: "Dr. Tanvir Ahmed",
    title: "Avian & Exotic Pet Specialist",
    focus: "Birds, rabbits, and exotic pets — diet, habitat setup, and emergency care.",
    image:
      "https://images.unsplash.com/photo-1788809804817-6545652b70b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    phone: "+880 1512-345678",
    whatsapp: "8801512345678",
    email: "tanvir.ahmed@petheaven.com",
    badge: "8+ yrs experience",
  },
];

const promises = [
  {
    emoji: "🩺",
    title: "Free First Consultation",
    body: "Every new adopter gets a complimentary 20-minute video consult with a specialist of their choice.",
  },
  {
    emoji: "📞",
    title: "Direct Contact",
    body: "Call, WhatsApp, or email your specialist directly — no call centres, no waiting queues.",
  },
  {
    emoji: "🗓️",
    title: "Flexible Scheduling",
    body: "Book consultations 7 days a week, with same-day emergency slots for urgent pet concerns.",
  },
  {
    emoji: "🐾",
    title: "Follow-Ups Included",
    body: "Each contract includes two follow-up sessions to make sure your pet stays happy and healthy.",
  },
];

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
   HERO
───────────────────────────────────────────── */
const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-[#FFF8F0] to-[#F5E6D3] py-16 md:py-24 border-b-[1.5px] border-[#D4A574]/30 relative overflow-hidden">
      <div className="absolute top-10 right-10 text-[120px] opacity-[0.03] rotate-12 pointer-events-none select-none">
        🩺
      </div>
      <div className="absolute bottom-10 left-10 text-[100px] opacity-[0.03] -rotate-12 pointer-events-none select-none">
        🐾
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-[#E8742A]/30 text-[#E8742A] font-bold text-sm px-4 py-1.5 rounded-full mb-6 shadow-sm">
          <FaHeart /> Vet-Approved Guidance
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#4A2C17] tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Talk to a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8742A] to-[#F5923E]">
            Specialist
          </span>
        </h1>
        <p className="text-lg md:text-xl text-[#6B3E26] max-w-2xl mx-auto font-medium" style={{ fontFamily: "'Lora', Georgia, serif" }}>
          Meet our panel of expert pet care consultants. Whether it&apos;s nutrition,
          surgery, feline behaviour, or exotic pets — get direct, personalised advice.
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SPECIALIST CARD
───────────────────────────────────────────── */
const SpecialistCard = ({ doctor, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-3xl overflow-hidden bg-white border border-[#E8D5C0]/60 shadow-[0_4px_24px_rgba(74,44,23,0.06)] hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
    >
      {/* accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-10 w-0 group-hover:w-full rounded-t-3xl transition-all duration-500 bg-gradient-to-r from-[#E8742A] to-[#F5923E]" />

      {/* photo */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E1503]/70 via-transparent to-transparent pointer-events-none" />

        {/* verification tag */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md shadow-sm border border-orange-100">
          <MdVerified className="text-[#E8742A]" />
          <span className="text-[11px] font-bold text-[#4A2C17] tracking-wide uppercase">
            Verified Vet
          </span>
        </div>

        {/* name on photo */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-xl font-black leading-tight drop-shadow">
            {doctor.name}
          </h3>
          <p style={{ fontFamily: "'Lora', serif" }} className="text-orange-100 text-sm font-medium drop-shadow">
            {doctor.title}
          </p>
        </div>
      </div>

      {/* body */}
      <div className="p-6 flex flex-col flex-1">
        <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#2E1503]" style={{ background: "#FDDBB455", fontFamily: "'Lora', serif" }}>
          <MdMedicalServices className="text-[#E8742A]" /> {doctor.badge}
        </span>

        <p style={{ fontFamily: "'Lora', serif" }} className="mt-4 text-[#6B3E26] leading-relaxed text-[0.95rem] flex-1">
          {doctor.focus}
        </p>

        {/* contact actions */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <a
            href={`tel:${doctor.phone.replace(/[^+\d]/g, "")}`}
            className="flex flex-col items-center gap-1 py-3 rounded-xl border border-[#E8D5C0] text-[#4A2C17] hover:border-[#E8742A] hover:bg-[#FFF8F0] hover:text-[#E8742A] transition-all duration-300"
            aria-label={`Call ${doctor.name}`}
          >
            <FaPhoneAlt className="text-lg" />
            <span className="text-[11px] font-bold" style={{ fontFamily: "'Lora', serif" }}>Call</span>
          </a>
          <a
            href={`https://wa.me/${doctor.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-3 rounded-xl border border-[#E8D5C0] text-[#4A2C17] hover:border-[#25D366] hover:bg-green-50 hover:text-[#128C7E] transition-all duration-300"
            aria-label={`WhatsApp ${doctor.name}`}
          >
            <FaWhatsapp className="text-lg" />
            <span className="text-[11px] font-bold" style={{ fontFamily: "'Lora', serif" }}>WhatsApp</span>
          </a>
          <a
            href={`mailto:${doctor.email}`}
            className="flex flex-col items-center gap-1 py-3 rounded-xl border border-[#E8D5C0] text-[#4A2C17] hover:border-[#E8742A] hover:bg-[#FFF8F0] hover:text-[#E8742A] transition-all duration-300"
            aria-label={`Email ${doctor.name}`}
          >
            <FaEnvelope className="text-lg" />
            <span className="text-[11px] font-bold" style={{ fontFamily: "'Lora', serif" }}>Email</span>
          </a>
        </div>

        {/* full contact details */}
        <div className="mt-4 pt-4 border-t border-[#E8D5C0]/60 space-y-1.5 text-[0.85rem]" style={{ fontFamily: "'Lora', serif" }}>
          <a href={`tel:${doctor.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 text-[#6B3E26] hover:text-[#E8742A] transition-colors">
            <FaPhoneAlt className="text-[#E8742A] text-xs" /> <span className="truncate">{doctor.phone}</span>
          </a>
          <a href={`https://wa.me/${doctor.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#6B3E26] hover:text-[#128C7E] transition-colors">
            <FaWhatsapp className="text-[#128C7E] text-xs" /> <span className="truncate">+{doctor.whatsapp}</span>
          </a>
          <a href={`mailto:${doctor.email}`} className="flex items-center gap-2 text-[#6B3E26] hover:text-[#E8742A] transition-colors">
            <FaEnvelope className="text-[#6B3E26] text-xs" /> <span className="truncate">{doctor.email}</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
const HowItWorks = () => {
  const { ref, inView } = useInView();

  const steps = [
    { num: "01", title: "Pick Your Specialist", desc: "Choose the consultant whose expertise matches your pet's needs.", icon: "🧑‍⚕️" },
    { num: "02", title: "Reach Out Directly", desc: "Call, WhatsApp, or email them — whichever you prefer.", icon: "📲" },
    { num: "03", title: "Get Personalised Care", desc: "Receive a tailored plan for your pet's health and happiness.", icon: "💡" },
  ];

  return (
    <section ref={ref} className="relative py-20 px-6 bg-[#FDF6EE] overflow-hidden border-b-[1.5px] border-[#D4A574]/20">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, #F5923E18 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto relative">
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionLabel>Consultation Contract</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#2E1503", letterSpacing: "-0.02em" }} className="font-black leading-tight mb-5">
            Simple Steps to{" "}
            <span style={{ color: "#E8742A" }}>Expert Pet Care</span>
          </h2>
          <p style={{ fontFamily: "'Lora', serif" }} className="text-[#6B3E26] max-w-xl mx-auto leading-relaxed text-[1.02rem]">
            Our demo consultant contract connects you straight to a specialist in three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative rounded-3xl p-8 bg-white border border-[#E8D5C0]/60 hover:border-[#E8742A]/40 hover:shadow-xl transition-all duration-500 text-center group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i * 0.12) + 0.1}s`,
              }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#E8742A] text-white flex items-center justify-center text-sm font-bold shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                {s.num}
              </div>
              <div className="text-4xl mb-4 mt-2">{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2E1503", fontSize: "1.15rem" }} className="font-bold mb-2">{s.title}</h3>
              <p style={{ fontFamily: "'Lora', serif" }} className="text-[#6B3E26] leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* promises */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border border-[#E8D5C0] flex gap-4 items-start"
              style={{
                background: "linear-gradient(135deg, #FFF8F0, #FEE9D1)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i * 0.1) + 0.3}s`,
              }}
            >
              <span className="text-3xl flex-shrink-0">{p.emoji}</span>
              <div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#2E1503" }} className="font-bold text-[0.95rem] mb-1">{p.title}</h4>
                <p style={{ fontFamily: "'Lora', serif" }} className="text-[#6B3E26] text-xs leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────── */
const CtaBanner = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-[#2E1503]">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, #E8742A18 0%, transparent 65%)" }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="text-5xl mb-5">🩺</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#FDF6EE", letterSpacing: "-0.02em" }} className="font-black leading-tight mb-5">
          Not Sure Which Specialist{" "}
          <span style={{ color: "#F5923E" }}>You Need?</span>
        </h2>
        <p style={{ fontFamily: "'Lora', serif" }} className="text-[#D4A574] max-w-xl mx-auto leading-relaxed mb-8 text-[1.02rem]">
          Send a quick note to our team and we&apos;ll match you with the right consultant for your pet&apos;s situation.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-9 text-[#E8742A] text-sm font-semibold" style={{ fontFamily: "'Lora', serif" }}>
          {["Free initial consult", "Same-day replies", "Demo contract only"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <FaCheckCircle /> <span className="text-[#FDF6EE]">{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="mailto:care@petheaven.com"
            className="px-8 py-3.5 rounded-full font-bold text-white overflow-hidden shadow-lg hover:shadow-orange-300/50 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #E8742A 0%, #F5923E 60%, #FFAB60 100%)",
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "1rem",
            }}
          >
            Email the Care Team
          </Link>
          <Link
            href="/all-pets"
            className="px-8 py-3.5 rounded-full font-bold border-2 border-[#D4A574] text-[#FDF6EE] hover:border-[#E8742A] hover:text-[#E8742A] transition-all duration-300 hover:-translate-y-0.5"
            style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1rem" }}
          >
            Browse Adoptable Pets →
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function SpecialistPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] font-['Outfit']">
      <Hero />

      {/* specialists grid */}
      <section className="max-w-[1320px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="text-center mb-14">
          <SectionLabel>Our Specialists</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#2E1503", letterSpacing: "-0.02em" }} className="font-black leading-tight">
            Meet the {" "}
            <span style={{ color: "#E8742A" }}>Experts</span>
          </h2>
          <p style={{ fontFamily: "'Lora', serif" }} className="mt-4 text-[#6B3E26] max-w-xl mx-auto leading-relaxed text-[1.02rem]">
            Four dedicated pet doctors, each a specialist in their field, ready to advise you directly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialists.map((doctor, i) => (
            <SpecialistCard key={doctor.id} doctor={doctor} index={i} />
          ))}
        </div>
      </section>

      <HowItWorks />
      <CtaBanner />
    </div>
  );
}