"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaEye, FaEyeSlash, FaPaw, FaHeart } from 'react-icons/fa';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Immediate trigger log
    console.log('🚀 Login Form Submit Triggered!');

    // 2. Extract using standard HTML5 FormData API
    const formElementData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formElementData.entries());
    console.log('📦 Login Data via FormData API:', formValues);

    // 3. Extract from React controlled state
    console.log('⚛️ Login Data via React State:', formData);

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/"
      });

      if (error) {
        console.error('❌ Better Auth Login Error:', error);
        toast.error(error.message || "Invalid email or password. Please try again.");
      } else {
        console.log('✅ Better Auth Login Success:', data);
        toast.success("Logged in successfully! Welcome back 🐾");
        router.push('/');
      }
    } catch (err) {
      console.error('❌ Catch Block Login Error:', err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    // TODO: Hook up Google OAuth
    toast.info("Google login coming soon!");
  };

  return (
    <div className="min-h-screen flex font-['Outfit'] bg-[#FFF8F0]">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#4A2C17] via-[#6B3E26] to-[#4A2C17]">

        {/* Decorative blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-80 h-80 rounded-full bg-[#E8742A]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 rounded-full bg-[#F5923E]/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* Floating paw prints */}
        {[
          { size: 'text-4xl', top: '10%',  left: '12%', rotate: '-15deg', opacity: 0.12 },
          { size: 'text-3xl', top: '25%',  left: '75%', rotate: '20deg',  opacity: 0.10 },
          { size: 'text-5xl', top: '60%',  left: '8%',  rotate: '10deg',  opacity: 0.08 },
          { size: 'text-2xl', top: '78%',  left: '65%', rotate: '-25deg', opacity: 0.12 },
          { size: 'text-3xl', top: '45%',  left: '85%', rotate: '5deg',   opacity: 0.09 },
        ].map((p, i) => (
          <span
            key={i}
            className={`absolute ${p.size} select-none pointer-events-none`}
            style={{ top: p.top, left: p.left, transform: `rotate(${p.rotate})`, opacity: p.opacity }}
          >
            🐾
          </span>
        ))}

        {/* Content */}
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

          {/* Big emoji illustration */}
          <div className="text-[110px] mb-6 drop-shadow-2xl select-none" style={{ filter: 'drop-shadow(0 8px 24px rgba(232,116,42,0.3))' }}>
            🐶
          </div>

          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Every pet deserves<br />a loving home.
          </h2>
          <p className="text-[#D4A574] text-lg font-medium max-w-sm leading-relaxed">
            Join thousands of families who found their perfect furry companion through Paw Heaven.
          </p>

          {/* Stats row */}
          <div className="mt-10 flex gap-8">
            {[
              { count: '2,400+', label: 'Pets Adopted' },
              { count: '1,800+', label: 'Happy Families' },
              { count: '500+', label: 'Pets Available' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-[#F5923E]">{s.count}</span>
                <span className="text-[#D4A574] text-xs font-semibold mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[440px]">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8742A] to-[#F5923E] flex items-center justify-center shadow-md">
              <FaPaw className="text-white text-lg" />
            </div>
            <span className="text-2xl font-extrabold text-[#4A2C17]">
              Paw<span className="text-[#E8742A]">Heaven</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-[#4A2C17] mb-2">Welcome back!</h1>
            <p className="text-[#6B3E26] text-base font-medium">
              Sign in to continue your adoption journey.{' '}
              <FaHeart className="inline text-[#E8742A] text-sm" />
            </p>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white border-[1.5px] border-[#D4A574]/50 hover:border-[#E8742A]/60 hover:bg-[#FFF8F0] text-[#4A2C17] font-bold py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mb-6 cursor-pointer"
          >
            <FaGoogle className="text-[#E8742A] text-lg" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1.5px] bg-[#D4A574]/30 rounded-full" />
            <span className="text-[#8B5E3C] text-sm font-semibold">or sign in with email</span>
            <div className="flex-1 h-[1.5px] bg-[#D4A574]/30 rounded-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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
                className="w-full px-4 py-3.5 bg-white border-[1.5px] border-[#D4A574]/40 rounded-xl text-[#4A2C17] placeholder:text-[#B89070] font-medium outline-none focus:border-[#E8742A] focus:ring-4 focus:ring-[#E8742A]/10 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[#6B3E26]">Password</label>
                <button type="button" className="text-xs text-[#E8742A] font-semibold hover:underline focus:outline-none">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 pr-12 bg-white border-[1.5px] border-[#D4A574]/40 rounded-xl text-[#4A2C17] placeholder:text-[#B89070] font-medium outline-none focus:border-[#E8742A] focus:ring-4 focus:ring-[#E8742A]/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C] hover:text-[#E8742A] transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#E8742A] to-[#F5923E] hover:from-[#d66520] hover:to-[#e07d2c] text-white font-extrabold text-base rounded-xl shadow-[0_4px_18px_rgba(232,116,42,0.35)] hover:shadow-[0_6px_24px_rgba(232,116,42,0.45)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-[#6B3E26] font-medium mt-8 text-sm">
            New to Paw Heaven?{' '}
            <Link href="/signup" className="text-[#E8742A] font-extrabold hover:underline">
              Create an account
            </Link>
          </p>

          {/* Footer note */}
          <p className="text-center text-[#B89070] text-xs mt-6 leading-relaxed">
            By signing in, you agree to our{' '}
            <span className="underline cursor-pointer hover:text-[#E8742A] transition-colors">Terms of Service</span>
            {' '}and{' '}
            <span className="underline cursor-pointer hover:text-[#E8742A] transition-colors">Privacy Policy</span>.
          </p>

        </div>
      </div>

    </div>
  );
}