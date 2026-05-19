'use client'
import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   HOOK – lightweight intersection observer
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const adoptReasons = [
  {
    emoji: "🏠",
    title: "Give a Home, Get a Family",
    body: "Adopted pets bond deeply with their new families. You're not just gaining a pet — you're welcoming a loyal companion who'll love you unconditionally for life.",
    accent: "#E8742A",
  },
  {
    emoji: "💛",
    title: "Save a Life",
    body: "Every adoption directly saves a life and frees up space for another animal in need. Your choice to adopt creates a ripple of compassion throughout the shelter system.",
    accent: "#F5923E",
  },
  {
    emoji: "🐾",
    title: "Health & Happiness",
    body: "Studies show pet owners enjoy lower stress, better heart health, and improved mood. Pets bring structure, joy, and purpose into everyday life.",
    accent: "#D4622A",
  },
  {
    emoji: "💰",
    title: "Affordable & Ethical",
    body: "Adoption fees are far lower than breeder prices and include vaccinations, microchipping, and a vet checkup. You get a healthy pet while supporting ethical animal care.",
    accent: "#E8742A",
  },
  {
    emoji: "🌍",
    title: "Fight Overpopulation",
    body: "Choosing adoption over breeders helps reduce pet overpopulation, cuts down on stray animals, and supports the mission of humane shelters worldwide.",
    accent: "#F5923E",
  },
  {
    emoji: "⭐",
    title: "Mature Pets Are Magic",
    body: "Adult rescues are already trained, calmer, and their personalities are known. They settle in quickly and often become the most loyal, grateful companions imaginable.",
    accent: "#D4622A",
  },
];

const stories = [
  {
    name: "Bella & the Mehtas",
    pet: "Golden Retriever Mix, 2 yrs",
    quote: "We were nervous first-time adopters. Bella walked in and within 10 minutes she was asleep on our daughter's lap. She completed our family instantly.",
    avatar: "🐕",
    rating: 5,
    tag: "Adopted 6 months ago",
  },
  {
    name: "Shadow & Karim",
    pet: "Black Cat, 4 yrs",
    quote: "Everyone told me black cats bring bad luck. Shadow brought me nothing but joy. He waits at the door every evening. I can't imagine life without him.",
    avatar: "🐈‍⬛",
    rating: 5,
    tag: "Adopted 1 year ago",
  },
  {
    name: "Mochi & the Rahmans",
    pet: "Shih Tzu, 8 months",
    quote: "Mochi was shy at first, but now she's the loudest personality in the house. She's best friends with our toddler. The best decision we ever made.",
    avatar: "🐶",
    rating: 5,
    tag: "Adopted 3 months ago",
  },
];

const careTips = [
  {
    number: "01",
    title: "Nutrition First",
    body: "Feed age-appropriate, vet-approved food. Fresh water always. Avoid table scraps — many human foods are toxic to pets. Consistency in feeding times reduces anxiety.",
    icon: "🥩",
  },
  {
    number: "02",
    title: "Daily Movement",
    body: "Dogs need 30–60 min of activity daily. Cats need play sessions with toys. Exercise prevents obesity, boredom, and destructive behavior while strengthening your bond.",
    icon: "🏃",
  },
  {
    number: "03",
    title: "Vet Check-Ups",
    body: "Annual wellness exams catch issues early. Keep vaccinations current and maintain flea, tick, and heartworm prevention. Don't wait for symptoms to appear.",
    icon: "🩺",
  },
  {
    number: "04",
    title: "Mental Enrichment",
    body: "Puzzle feeders, training sessions, and social time keep minds sharp. A bored pet is a mischievous pet. Rotate toys weekly to keep things fresh and stimulating.",
    icon: "🧠",
  },
  {
    number: "05",
    title: "Grooming Rituals",
    body: "Regular brushing, nail trims, and baths build trust and catch skin issues early. Dental hygiene matters too — brush teeth weekly to prevent costly dental disease.",
    icon: "✂️",
  },
  {
    number: "06",
    title: "Safe Space",
    body: "Every pet needs a quiet retreat — a crate, bed, or corner that's theirs alone. This reduces stress, especially during loud events like storms or parties.",
    icon: "🏡",
  },
];

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8742A]/30 bg-white/70 backdrop-blur-sm mb-5">
    <span className="w-1.5 h-1.5 rounded-full bg-[#E8742A]" />
    <span style={{ fontFamily: "'Lora', serif", fontSize: "0.7rem", letterSpacing: "0.14em" }} className="uppercase font-semibold text-[#E8742A]">
      {children}
    </span>
  </div>
);

/* ─────────────────────────────────────────────
   SECTION 1 – WHY ADOPT
───────────────────────────────────────────── */
const WhyAdopt = () => {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="relative py-28 px-6 bg-[#FDF6EE] overflow-hidden">
      {/* bg texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><filter id="g1"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#g1)"/></svg>
      </div>
      {/* warm blob */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #F5923E1A 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        {/* heading */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionLabel>Why Choose Adoption</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2E1503", letterSpacing: "-0.02em" }} className="font-black leading-tight">
            Six Reasons Adoption<br />
            <span style={{ color: "#E8742A" }}>Changes Everything</span>
          </h2>
          <p style={{ fontFamily: "'Lora', serif" }} className="mt-4 text-[#6B3E26] max-w-xl mx-auto leading-relaxed text-[1.05rem]">
            Adopting isn't just kind — it's the smartest, most rewarding choice you'll ever make for your family.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adoptReasons.map((r, i) => (
            <div
              key={i}
              className="group relative rounded-3xl p-7 bg-white border border-[#E8D5C0]/60 hover:border-[#E8742A]/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              style={{
                transitionDelay: `${i * 60}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.6s ${i * 0.08}s, transform 0.6s ${i * 0.08}s, box-shadow 0.3s, border-color 0.3s`,
              }}
            >
              {/* accent bar */}
              <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full rounded-t-3xl transition-all duration-500" style={{ background: `linear-gradient(90deg, ${r.accent}, #F5923E)` }} />
              {/* icon bubble */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: `${r.accent}15` }}>
                {r.emoji}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2E1503", fontSize: "1.15rem" }} className="font-bold mb-2">{r.title}</h3>
              <p style={{ fontFamily: "'Lora', serif" }} className="text-[#6B3E26] leading-relaxed text-sm">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 2 – SUCCESS STORIES
───────────────────────────────────────────── */
const SuccessStories = () => {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden" style={{ background: "linear-gradient(160deg, #2E1503 0%, #4A2C17 50%, #3A1E0A 100%)" }}>
      {/* warm glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, #E8742A18 0%, transparent 65%)" }} />
      </div>
      {/* paw prints */}
      {["top-8 left-8", "bottom-8 right-8", "top-1/2 right-12"].map((pos, i) => (
        <span key={i} className={`absolute text-white/5 text-6xl pointer-events-none select-none ${pos}`}>🐾</span>
      ))}

      <div className="max-w-5xl mx-auto relative">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionLabel>Success Stories</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FDF6EE", letterSpacing: "-0.02em" }} className="font-black leading-tight">
            Real Families.<br />
            <span style={{ color: "#F5923E" }}>Real Love.</span>
          </h2>
          <p style={{ fontFamily: "'Lora', serif" }} className="mt-4 text-[#D4A574] max-w-md mx-auto text-[1.05rem] leading-relaxed">
            Thousands of pets have found their forever homes through Pet Heaven. Here are just a few of their stories.
          </p>
        </div>

        {/* Featured card */}
        <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {stories.map((s, i) => (
            <div
              key={i}
              className="transition-all duration-500"
              style={{ display: i === active ? "block" : "none" }}
            >
              <div className="relative rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}>
                {/* quote mark */}
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "8rem", lineHeight: 1, color: "#E8742A", opacity: 0.15 }} className="absolute top-4 left-6 select-none pointer-events-none">"</div>

                <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
                  {/* avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg" style={{ background: "linear-gradient(135deg, #E8742A, #F5923E)" }}>
                      {s.avatar}
                    </div>
                  </div>
                  {/* content */}
                  <div className="flex-1">
                    <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "#FDF6EE", fontStyle: "italic", lineHeight: 1.7 }}>
                      "{s.quote}"
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", color: "#F5923E" }} className="font-bold text-lg">{s.name}</div>
                        <div style={{ fontFamily: "'Lora', serif" }} className="text-[#D4A574] text-sm">{s.pet}</div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: s.rating }).map((_, j) => <span key={j} className="text-[#F5923E]">★</span>)}
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold border border-white/20 text-[#D4A574]">{s.tag}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* dots */}
        <div className="flex justify-center gap-3 mt-8">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === active ? "2rem" : "0.5rem",
                height: "0.5rem",
                background: i === active ? "#E8742A" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* stat strip */}
        <div className="mt-14 grid grid-cols-3 gap-4 text-center">
          {[["1,200+", "Pets Rescued"], ["98%", "Adoption Rate"], ["4.9★", "Avg. Rating"]].map(([val, lab]) => (
            <div key={lab} className="rounded-2xl p-5 border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#F5923E" }} className="font-black">{val}</div>
              <div style={{ fontFamily: "'Lora', serif" }} className="text-[#D4A574] text-xs uppercase tracking-widest mt-1">{lab}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 3 – PET CARE TIPS
───────────────────────────────────────────── */
const PetCareTips = () => {
  const { ref, inView } = useInView();
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section ref={ref} className="relative py-28 px-6 bg-[#FDF6EE] overflow-hidden">
      {/* blob */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #F5923E18 0%, transparent 70%)" }} />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #FDDBB430 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row gap-16 items-start transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Sticky left */}
          <div className="lg:w-2/5 lg:sticky lg:top-28">
            <SectionLabel>Expert Pet Care</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "#2E1503", letterSpacing: "-0.02em" }} className="font-black leading-tight mb-5">
              Keep Your Pet<br />
              <span style={{ color: "#E8742A" }}>Happy & Healthy</span>
            </h2>
            <p style={{ fontFamily: "'Lora', serif" }} className="text-[#6B3E26] leading-relaxed text-[1.05rem] max-w-sm">
              Bringing a pet home is just the beginning. These six pillars of care will help your companion thrive for years to come.
            </p>

            {/* illustration card */}
            <div className="mt-10 rounded-3xl p-6 border border-[#E8D5C0]" style={{ background: "linear-gradient(135deg, #FFF8F0, #FEE9D1)" }}>
              <div className="text-5xl mb-3">🐾</div>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "#2E1503" }} className="font-bold text-lg mb-1">Need personalised advice?</div>
              <p style={{ fontFamily: "'Lora', serif" }} className="text-[#6B3E26] text-sm leading-relaxed">Our team of pet care specialists is always ready to guide new adopters through the journey.</p>
              <button className="mt-4 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #E8742A, #F5923E)", fontFamily: "'Lora', serif" }}>
                Talk to a Specialist →
              </button>
            </div>
          </div>

          {/* Right: accordion tips */}
          <div className="lg:w-3/5 space-y-4">
            {careTips.map((tip, i) => {
              const open = openIdx === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: open ? "#E8742A" : "#E8D5C0",
                    background: open ? "#FFF8F0" : "#FFFFFF",
                    boxShadow: open ? "0 8px 24px rgba(232,116,42,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.6s ${i * 0.08}s, transform 0.6s ${i * 0.08}s, border-color 0.3s, background 0.3s, box-shadow 0.3s`,
                  }}
                >
                  <button
                    className="w-full flex items-center gap-5 p-5 text-left group"
                    onClick={() => setOpenIdx(open ? null : i)}
                  >
                    {/* number */}
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: open ? "#E8742A" : "#D4A574", minWidth: "2.2rem" }} className="font-black">{tip.number}</span>
                    {/* icon */}
                    <span className="text-2xl">{tip.icon}</span>
                    {/* title */}
                    <span style={{ fontFamily: "'Playfair Display', serif", color: "#2E1503", fontSize: "1.05rem" }} className="font-bold flex-1">{tip.title}</span>
                    {/* chevron */}
                    <span className="text-[#E8742A] transition-transform duration-300 text-lg" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-400"
                    style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
                  >
                    <p style={{ fontFamily: "'Lora', serif" }} className="px-5 pb-5 text-[#6B3E26] leading-relaxed text-[0.95rem] border-t border-[#E8D5C0] pt-4">
                      {tip.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 4 – ADOPTION PROCESS
───────────────────────────────────────────── */
const AdoptionProcess = () => {
  const { ref, inView } = useInView();
  
  const steps = [
    { num: "01", title: "Find Your Match", desc: "Browse our online profiles or visit our shelter to meet our wonderful animals.", icon: "🔍" },
    { num: "02", title: "Meet & Greet", desc: "Spend time with your potential new family member to ensure a perfect connection.", icon: "🤝" },
    { num: "03", title: "Application", desc: "Fill out a simple form so we can help set you and your pet up for success.", icon: "📝" },
    { num: "04", title: "Bring Them Home", desc: "Sign the adoption papers, receive your starter kit, and start your new life together!", icon: "🎉" }
  ];

  return (
    <section ref={ref} className="relative py-28 px-6 bg-[#FDF6EE] overflow-hidden">
      {/* blob */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #F5923E18 0%, transparent 70%)" }} />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #FDDBB430 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto relative">
        <div className={`text-center mb-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionLabel>How It Works</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2E1503", letterSpacing: "-0.02em" }} className="font-black leading-tight">
            Your Journey to<br />
            <span style={{ color: "#E8742A" }}>Unconditional Love</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line for large screens */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#E8D5C0]/0 via-[#E8742A]/30 to-[#E8D5C0]/0 -translate-y-1/2 z-0" />
          
          {steps.map((step, i) => (
            <div 
              key={i}
              className="relative z-10 flex flex-col items-center text-center group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`
              }}
            >
              <div className="w-24 h-24 rounded-full bg-white border-4 border-[#E8D5C0] shadow-xl flex items-center justify-center text-4xl mb-6 relative group-hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute inset-0 rounded-full border border-[#E8742A]/20 scale-110 group-hover:scale-125 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#E8742A] text-white flex items-center justify-center text-xs font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {step.num}
                </div>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2E1503" }} className="font-bold text-xl mb-3">{step.title}</h3>
              <p style={{ fontFamily: "'Lora', serif" }} className="text-[#6B3E26] text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 5 – GET INVOLVED
───────────────────────────────────────────── */
const GetInvolved = () => {
  const { ref, inView } = useInView();
  
  const ways = [
    { title: "Volunteer", desc: "Spend time walking dogs, cuddling cats, or helping at our events. Your time is their treasure.", action: "Join the Team" },
    { title: "Foster", desc: "Open your home temporarily to an animal in need. It frees up shelter space and saves a life.", action: "Become a Foster" },
    { title: "Donate", desc: "Every dollar provides food, medical care, and toys for our rescues. No contribution is too small.", action: "Make a Gift" }
  ];

  return (
    <section ref={ref} className="relative py-28 px-6 bg-[#2E1503] overflow-hidden text-center">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionLabel>Support Our Mission</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "#FDF6EE", letterSpacing: "-0.02em" }} className="font-black leading-tight mb-16">
            Can't Adopt Right Now?<br />
            <span style={{ color: "#F5923E" }}>Other Ways to Help</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ways.map((w, i) => (
            <div 
              key={i}
              className="p-8 rounded-3xl border border-white/10 group hover:border-[#E8742A]/50 transition-colors duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(i * 0.1) + 0.2}s`
              }}
            >
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#F5923E" }} className="font-bold text-2xl mb-4">{w.title}</h3>
              <p style={{ fontFamily: "'Lora', serif" }} className="text-[#D4A574] text-sm leading-relaxed mb-8">{w.desc}</p>
              <button className="px-6 py-2.5 rounded-full text-sm font-semibold text-white/90 border border-white/20 group-hover:bg-[#E8742A] group-hover:border-[#E8742A] group-hover:text-white transition-all duration-300" style={{ fontFamily: "'Lora', serif" }}>
                {w.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
const HomeSections = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
    `}</style>
    <WhyAdopt />
    <AdoptionProcess />
    <SuccessStories />
    <PetCareTips />
    <GetInvolved />
  </>
);

export default HomeSections;