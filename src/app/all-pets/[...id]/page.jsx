import React from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPaw, FaInfoCircle, FaHeartbeat, FaSyringe, FaMoneyBillWave, FaLock } from 'react-icons/fa';
import AdoptionForm from '@/components/forms/AdoptionForm';
import { auth } from '@/lib/auth';
import { headers } from "next/headers";

const AnimalDetailsPage = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  // ✅ Get session server-side
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUserEmail = session?.user?.email || null;

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
  } = animalData;

  // ✅ Check if current user is the owner
  const isOwner = currentUserEmail && currentUserEmail === ownerEmail;

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
                {/* Fallback styling implicitly handled by next/image or we can just use unoptimized */}
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
                  <FaHeartbeat className="text-[#E8742A] text-xl" />
                  <div>
                    <span className="font-semibold block">Health Status</span>
                    <span>{healthStatus}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#6B3E26] bg-[#FFF8F0] p-4 rounded-xl border border-[#D4A574]/20">
                  <FaSyringe className="text-[#E8742A] text-xl" />
                  <div>
                    <span className="font-semibold block">Vaccination</span>
                    <span>{vaccinationStatus}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#6B3E26] bg-[#FFF8F0] p-4 rounded-xl border border-[#D4A574]/20">
                  <FaMoneyBillWave className="text-[#E8742A] text-xl" />
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
            {isOwner ? (
              // ✅ Show this instead of the form
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
            ) : (
              <AdoptionForm petName={petName} petId={_id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};;;

export default AnimalDetailsPage;