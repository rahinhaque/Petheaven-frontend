"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaEye, FaEyeSlash, FaPaw, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const PasswordRule = ({ passed, label }) => (
  <li className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${passed ? 'text-green-600' : 'text-[#8B5E3C]'}`}>
    {passed
      ? <FaCheck className="text-green-500 shrink-0" />
      : <FaTimes className="text-[#D4A574] shrink-0" />
    }
    {label}
  </li>
);

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: '',
  });

  const pw = formData.password;
  const rules = {
    minLength:   pw.length >= 6,
    uppercase:   /[A-Z]/.test(pw),
    lowercase:   /[a-z]/.test(pw),
    match:       pw.length > 0 && pw === formData.confirmPassword,
  };
  const allRulesPassed = Object.values(rules).every(Boolean);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate password rules
    if (!rules.minLength) {
      setLoading(false);
      return toast.error('Password must be at least 6 characters.');
    }
    if (!rules.uppercase) {
      setLoading(false);
      return toast.error('Password must contain at least one uppercase letter.');
    }
    if (!rules.lowercase) {
      setLoading(false);
      return toast.error('Password must contain at least one lowercase letter.');
    }
    if (!rules.match) {
      setLoading(false);
      return toast.error('Passwords do not match.');
    }

    try {
      console.log('🚀 Sending signup request with:', {
        name: formData.name,
        email: formData.email,
        image: formData.photoURL,
      });

      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.photoURL || undefined,
        callbackURL: "/"
      });

      if (error) {
        console.error('❌ Better Auth Signup Error:', error);
        toast.error(error.message || 'Something went wrong during sign-up. Please try again.');
      } else {
        console.log('✅ Better Auth Signup Success:', data);
        toast.success('Account created successfully! Welcome to Paw Heaven 🐾');
        router.push('/');
      }
    } catch (err) {
      console.error('❌ Catch Block Signup Error:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      console.log("🚀 Initiating Google sign-up...");
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("❌ Google Sign-up Error:", err);
      toast.error("Failed to sign up with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex font-['Outfit'] bg-[#FFF8F0]">

      {/* ── Left Decorative Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#4A2C17] via-[#6B3E26] to-[#4A2C17]">
        {/* Ambient blobs */}
        <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full bg-[#E8742A]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 rounded-full bg-[#F5923E]/20 blur-3xl pointer-events-none" />

        {/* Floating paw prints */}
        {[
          { size: 'text-5xl', top: '8%',  left: '10%', rotate: '-12deg', opacity: 0.10 },
          { size: 'text-3xl', top: '22%', left: '78%', rotate: '18deg',  opacity: 0.09 },
          { size: 'text-4xl', top: '55%', left: '6%',  rotate: '8deg',   opacity: 0.08 },
          { size: 'text-2xl', top: '75%', left: '70%', rotate: '-22deg', opacity: 0.11 },
          { size: 'text-3xl', top: '40%', left: '88%', rotate: '5deg',   opacity: 0.08 },
        ].map((p, i) => (
          <span key={i} className={`absolute ${p.size} select-none pointer-events-none`}
            style={{ top: p.top, left: p.left, transform: `rotate(${p.rotate})`, opacity: p.opacity }}>
            🐾
          </span>
        ))}

        <div className="relative z-10 flex flex-col items-center text-center px-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8742A] to-[#F5923E] flex items-center justify-center shadow-lg shadow-[#E8742A]/30">
              <FaPaw className="text-white text-2xl" />
            </div>
            <span className="text-3xl font-extrabold text-white tracking-tight">
              Paw<span className="text-[#F5923E]">Heaven</span>
            </span>
          </div>

          {/* Hero emojis */}
          <div className="flex gap-4 mb-6 text-[72px] select-none" style={{ filter: 'drop-shadow(0 8px 24px rgba(232,116,42,0.3))' }}>
            🐱 🐰
          </div>

          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Your forever friend<br />is waiting for you.
          </h2>
          <p className="text-[#D4A574] text-lg font-medium max-w-sm leading-relaxed">
            Create your free account and start browsing hundreds of adorable pets looking for their forever home today.
          </p>

          {/* Feature pills */}
          <div className="mt-10 flex flex-col gap-3 w-full max-w-xs">
            {[
              { emoji: '🔍', text: 'Browse hundreds of pets' },
              { emoji: '📋', text: 'Submit adoption requests' },
              { emoji: '🏡', text: 'List pets for adoption' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                <span className="text-xl">{f.emoji}</span>
                <span className="text-white font-semibold text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-[460px]">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8742A] to-[#F5923E] flex items-center justify-center shadow-md">
              <FaPaw className="text-white text-lg" />
            </div>
            <span className="text-2xl font-extrabold text-[#4A2C17]">
              Paw<span className="text-[#E8742A]">Heaven</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-4xl font-extrabold text-[#4A2C17] mb-2">Create account</h1>
            <p className="text-[#6B3E26] text-base font-medium">
              Join Paw Heaven and find your perfect companion.
            </p>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white border-[1.5px] border-[#D4A574]/50 hover:border-[#E8742A]/60 hover:bg-[#FFF8F0] text-[#4A2C17] font-bold py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mb-5 cursor-pointer"
          >
            <FaGoogle className="text-[#E8742A] text-lg" />
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-[1.5px] bg-[#D4A574]/30 rounded-full" />
            <span className="text-[#8B5E3C] text-sm font-semibold">or register with email</span>
            <div className="flex-1 h-[1.5px] bg-[#D4A574]/30 rounded-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#6B3E26]">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white border-[1.5px] border-[#D4A574]/40 rounded-xl text-[#4A2C17] placeholder:text-[#B89070] font-medium outline-none focus:border-[#E8742A] focus:ring-4 focus:ring-[#E8742A]/10 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#6B3E26]">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white border-[1.5px] border-[#D4A574]/40 rounded-xl text-[#4A2C17] placeholder:text-[#B89070] font-medium outline-none focus:border-[#E8742A] focus:ring-4 focus:ring-[#E8742A]/10 transition-all duration-200"
              />
            </div>

            {/* Photo URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#6B3E26]">Photo URL <span className="text-[#B89070] font-normal">(optional)</span></label>
              <input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 bg-white border-[1.5px] border-[#D4A574]/40 rounded-xl text-[#4A2C17] placeholder:text-[#B89070] font-medium outline-none focus:border-[#E8742A] focus:ring-4 focus:ring-[#E8742A]/10 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#6B3E26]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 pr-12 bg-white border-[1.5px] border-[#D4A574]/40 rounded-xl text-[#4A2C17] placeholder:text-[#B89070] font-medium outline-none focus:border-[#E8742A] focus:ring-4 focus:ring-[#E8742A]/10 transition-all duration-200"
                />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C] hover:text-[#E8742A] transition-colors">
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#6B3E26]">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter your password"
                  className={`w-full px-4 py-3 pr-12 bg-white border-[1.5px] rounded-xl text-[#4A2C17] placeholder:text-[#B89070] font-medium outline-none focus:ring-4 transition-all duration-200
                    ${formData.confirmPassword.length > 0
                      ? rules.match
                        ? 'border-green-400 focus:border-green-500 focus:ring-green-500/10'
                        : 'border-red-400 focus:border-red-400 focus:ring-red-400/10'
                      : 'border-[#D4A574]/40 focus:border-[#E8742A] focus:ring-[#E8742A]/10'
                    }`}
                />
                <button type="button" onClick={() => setShowConfirm(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C] hover:text-[#E8742A] transition-colors">
                  {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Password Validation Rules */}
            {formData.password.length > 0 && (
              <div className="bg-[#FFF8F0] border border-[#D4A574]/30 rounded-xl p-4">
                <p className="text-xs font-bold text-[#6B3E26] uppercase tracking-wider mb-3">Password Requirements</p>
                <ul className="flex flex-col gap-2">
                  <PasswordRule passed={rules.minLength} label="At least 6 characters" />
                  <PasswordRule passed={rules.uppercase} label="One uppercase letter (A–Z)" />
                  <PasswordRule passed={rules.lowercase} label="One lowercase letter (a–z)" />
                  <PasswordRule passed={rules.match}     label="Password & Confirm Password must match" />
                </ul>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              onClick={() => console.log('🖱️ Button clicked, formData state:', formData)}
              className="w-full py-3.5 mt-1 bg-gradient-to-r from-[#E8742A] to-[#F5923E] hover:from-[#d66520] hover:to-[#e07d2c] text-white font-extrabold text-base rounded-xl shadow-[0_4px_18px_rgba(232,116,42,0.35)] hover:shadow-[0_6px_24px_rgba(232,116,42,0.45)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-[#6B3E26] font-medium mt-7 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-[#E8742A] font-extrabold hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-[#B89070] text-xs mt-5 leading-relaxed">
            By creating an account, you agree to our{' '}
            <span className="underline cursor-pointer hover:text-[#E8742A] transition-colors">Terms of Service</span>
            {' '}and{' '}
            <span className="underline cursor-pointer hover:text-[#E8742A] transition-colors">Privacy Policy</span>.
          </p>
        </div>
      </div>

    </div>
  );
}