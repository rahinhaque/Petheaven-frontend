import React from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPaw,
  FaInfoCircle,
  FaHeartbeat,
  FaSyringe,
  FaMoneyBillWave,
  FaLock,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import Link from "next/link";
import AdoptionForm from "@/components/forms/AdoptionForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AnimalDetailsPage = async ({ params }) => {
  const { id } = await params;

  // Get session server-side
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUserEmail = session?.user?.email || null;

  // Fetch animal data
  let animalData = null;
  try {
    const res = await fetch(`http://localhost:5000/animals/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      animalData = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch animal details:", error);
  }

  if (!animalData) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center font-['Outfit']">
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
          <h2 className="text-2xl font-bold text-[#4A2C17] mb-2">
            Pet Not Found
          </h2>
          <p className="text-[#6B3E26]">
            We couldn't find the details for this pet. They might have already
            been adopted!
          </p>
        </div>
      </div>
    );
  }

  // Check if current user already applied
  let hasAlreadyApplied = false;
  if (currentUserEmail && animalData) {
    try {
      const adoptionRes = await fetch(
        `http://localhost:5000/adoptions/check?petId=${id}&email=${currentUserEmail}`,
        { cache: "no-store" },
      );
      if (adoptionRes.ok) {
        const adoptionData = await adoptionRes.json();
        hasAlreadyApplied = adoptionData.hasApplied;
      }
    } catch (error) {
      console.error("Failed to check adoption status:", error);
    }
  }

  const {
    _id,
    petName = "Unknown Pet",
    species = "Animal",
    breed = "Mixed",
    age = "Unknown",
    gender = "Unknown",
    imageUrl = "https://via.placeholder.com/600x400.png?text=No+Image",
    location = "Location Unknown",
    adoptionFee = 0,
    healthStatus = "Not specified",
    vaccinationStatus = "Not specified",
    description = "No description available for this pet.",
    ownerEmail = null,
    status = "available",
  } = animalData;

  // Check if current user is the owner
  const isOwner = currentUserEmail && currentUserEmail === ownerEmail;
  const isAdopted = status === "adopted";

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-['Outfit'] pb-20">
      {/* Header / Hero */}
      <div className="bg-[#4A2C17] py-12 px-6">
        <div className="max-w-[1200px] mx-auto text-center md:text-left text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center md:justify-start gap-3">
            Meet {petName} <FaPaw className="text-[#E8742A] text-3xl" />
          </h1>
          <p className="text-[#D4A574] text-lg md:text-xl font-medium max-w-2xl">
            Give a loving home to a beautiful soul. Your new best friend is
            waiting!
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Pet Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Image Card */}
            <div className="bg-white p-4 rounded-3xl shadow-[0_8px_30px_rgba(74,44,23,0.06)] border-[1.5px] border-[#D4A574]/20">
              <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden bg-[#F5E6D3]">
                <Image
                  src={imageUrl}
                  alt={`Photo of ${petName}`}
                  fill
                  unoptimized
                  className="object-cover"
                />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#FFF8F0]/90 backdrop-blur-md text-[#4A2C17] font-bold text-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                    {species}
                  </span>
                  <span className="bg-[#E8742A]/90 backdrop-blur-md text-white font-bold text-sm px-4 py-2 rounded-full shadow-md">
                    {gender}
                  </span>
                </div>

                {/* Adopted Ribbon */}
                {isAdopted && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500/90 backdrop-blur-md text-white font-bold text-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                      <FaCheckCircle /> Adopted
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(74,44,23,0.06)] border-[1.5px] border-[#D4A574]/20 p-8">
              <h2 className="text-3xl font-bold text-[#4A2C17] mb-6 border-b border-[#D4A574]/30 pb-4">
                About {petName}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col">
                  <span className="text-[#8B5E3C] text-sm font-semibold uppercase tracking-wider mb-1">
                    Breed
                  </span>
                  <span className="text-[#4A2C17] font-bold text-lg">
                    {breed}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8B5E3C] text-sm font-semibold uppercase tracking-wider mb-1">
                    Age
                  </span>
                  <span className="text-[#4A2C17] font-bold text-lg">
                    {age} Years
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8B5E3C] text-sm font-semibold uppercase tracking-wider mb-1">
                    Location
                  </span>
                  <span className="text-[#4A2C17] font-bold text-lg flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-[#E8742A] text-sm" />{" "}
                    {location}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-[#6B3E26] bg-[#FFF8F0] p-4 rounded-xl border border-[#D4A574]/20">
                  <FaHeartbeat className="text-[#E8742A] text-xl flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">Health Status</span>
                    <span>{healthStatus}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#6B3E26] bg-[#FFF8F0] p-4 rounded-xl border border-[#D4A574]/20">
                  <FaSyringe className="text-[#E8742A] text-xl flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">Vaccination</span>
                    <span>{vaccinationStatus}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#6B3E26] bg-[#FFF8F0] p-4 rounded-xl border border-[#D4A574]/20">
                  <FaMoneyBillWave className="text-[#E8742A] text-xl flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">Adoption Fee</span>
                    <span className="font-bold text-[#E8742A]">
                      {adoptionFee > 0 ? `$${adoptionFee}` : "Free"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5E6D3]/30 p-6 rounded-2xl border border-[#D4A574]/20">
                <h3 className="text-xl font-bold text-[#4A2C17] mb-3 flex items-center gap-2">
                  <FaInfoCircle className="text-[#E8742A]" /> Meet & Greet
                </h3>
                <p className="text-[#6B3E26] leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Adoption Form Side Panel */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            {/* Case 1: User is the owner */}
            {isOwner ? (
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(74,44,23,0.06)] border-[1.5px] border-[#D4A574]/20 p-8 text-center">
                <div className="w-16 h-16 bg-[#FFF8F0] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLock className="text-[#E8742A] text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-[#4A2C17] mb-2">
                  You listed this pet
                </h3>
                <p className="text-[#6B3E26] font-medium">
                  Pet owners are not allowed to submit adoption requests.
                </p>
              </div>
            ) : isAdopted ? (
              /* Case 2: Pet is already adopted */
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(74,44,23,0.06)] border-[1.5px] border-[#D4A574]/20 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-green-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-[#4A2C17] mb-2">
                  Already Adopted!
                </h3>
                <p className="text-[#6B3E26] font-medium">
                  This pet has already found their forever home. Check out other
                  pets looking for adoption!
                </p>
                <Link
                  href="/all-pets"
                  className="mt-6 inline-block bg-gradient-to-r from-[#E8742A] to-[#F5923E] text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Browse Other Pets
                </Link>
              </div>
            ) : hasAlreadyApplied ? (
              /* Case 3: User already submitted a request */
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(74,44,23,0.06)] border-[1.5px] border-[#D4A574]/20 p-8 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-yellow-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-[#4A2C17] mb-2">
                  Request Submitted!
                </h3>
                <p className="text-[#6B3E26] font-medium">
                  You've already submitted an adoption request for{" "}
                  <span className="text-[#E8742A] font-bold">{petName}</span>.
                  Please wait while we review your application.
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
            ) : (
              /* Case 4: Show adoption form */
              <AdoptionForm
                petName={petName}
                petId={_id}
                initialHasApplied={hasAlreadyApplied}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailsPage;
