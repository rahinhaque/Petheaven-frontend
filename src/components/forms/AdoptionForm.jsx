"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { FaClock } from "react-icons/fa";

export default function AdoptionForm({
  petName,
  petId,
  initialHasApplied = false,
}) {
  const [loading, setLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(initialHasApplied); // ✅ track locally

  const { data, isPending } = authClient.useSession();
  const sessionUser = data?.user;

  const user = {
    name: isPending ? "Loading..." : sessionUser?.name || "Guest",
    email: isPending ? "Loading..." : sessionUser?.email || "",
  };

  const [formData, setFormData] = useState({
    pickupDate: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionUser) {
      toast.error("You must be logged in to submit an adoption request.");
      return;
    }

    setLoading(true);

    const adoptionRequest = {
      petId,
      petName,
      userName: user.name,
      userEmail: user.email,
      pickupDate: formData.pickupDate,
      message: formData.message,
      status: "pending",
      requestDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adoptionRequest),
      });

      if (!response.ok) throw new Error("Failed to submit adoption request");

      toast.success(`Adoption request submitted for ${petName}!`);
      setFormData({ pickupDate: "", message: "" });
      setHasApplied(true); // ✅ instantly switch to success UI
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit adoption request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show success state immediately after submission
  if (hasApplied) {
    return (
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(74,44,23,0.06)] border-[1.5px] border-[#D4A574]/20 p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaClock className="text-yellow-500 text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-[#4A2C17] mb-2">
          Request Submitted!
        </h3>
        <p className="text-[#6B3E26] font-medium">
          You've already submitted an adoption request for{" "}
          <span className="text-[#E8742A] font-bold">{petName}</span>. Please
          wait while we review your application.
        </p>
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-yellow-700 text-sm font-medium">
            ⏳ Your request is under review. We'll notify you soon!
          </p>
        </div>
        <Link
          href="/all-pets"
          className="mt-6 inline-block bg-gradient-to-r from-[#E8742A] to-[#F5923E] text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Browse Other Pets
        </Link>
      </div>
    );
  }

  const isSubmitDisabled = loading || isPending || !sessionUser;

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(74,44,23,0.08)] border-[1.5px] border-[#D4A574]/30 p-6 md:p-8">
      <h3 className="text-2xl font-bold text-[#4A2C17] mb-6 border-b border-[#D4A574]/20 pb-4">
        Adoption Request
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#6B3E26]">
            Pet Name
          </label>
          <input
            type="text"
            value={petName}
            readOnly
            className="w-full px-4 py-2.5 bg-[#f5f5f5] text-[#777] border-[1.5px] border-[#ddd] rounded-lg cursor-not-allowed font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#6B3E26]">
            Your Name
          </label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="w-full px-4 py-2.5 bg-[#f5f5f5] text-[#777] border-[1.5px] border-[#ddd] rounded-lg cursor-not-allowed font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#6B3E26]">
            Your Email
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-4 py-2.5 bg-[#f5f5f5] text-[#777] border-[1.5px] border-[#ddd] rounded-lg cursor-not-allowed font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#6B3E26]">
            Pickup Date *
          </label>
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
            disabled={!sessionUser}
            className="w-full px-4 py-2.5 bg-[#FFF8F0]/50 text-[#4A2C17] border-[1.5px] border-[#D4A574]/40 rounded-lg outline-none focus:border-[#E8742A] focus:ring-2 focus:ring-[#E8742A]/10 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#6B3E26]">
            Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={
              sessionUser
                ? "Tell us a little bit about your home..."
                : "Please log in to submit details..."
            }
            rows={4}
            disabled={!sessionUser}
            className="w-full px-4 py-2.5 bg-[#FFF8F0]/50 text-[#4A2C17] border-[1.5px] border-[#D4A574]/40 rounded-lg outline-none focus:border-[#E8742A] focus:ring-2 focus:ring-[#E8742A]/10 transition-all resize-y font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="mt-4 w-full py-3.5 bg-gradient-to-r from-[#E8742A] to-[#F5923E] hover:from-[#d66520] hover:to-[#e07d2c] text-white font-bold rounded-lg shadow-[0_4px_14px_rgba(232,116,42,0.3)] hover:shadow-[0_6px_20px_rgba(232,116,42,0.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Submitting..." : "Submit Adoption Request"}
        </button>

        {!isPending && !sessionUser && (
          <p className="text-red-500 text-sm font-semibold text-center mt-2">
            You must be logged in to submit an adoption request.{" "}
            <Link href="/login" className="underline text-[#E8742A] font-bold">
              Log in here
            </Link>
            .
          </p>
        )}
      </form>
    </div>
  );
}
