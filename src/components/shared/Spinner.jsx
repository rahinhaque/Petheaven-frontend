import React from 'react';
import { FaPaw } from 'react-icons/fa';

export default function Spinner({ size = 'md', text = 'Loading...' }) {
  // Define dimensions for the ring and the inner icon
  const sizeConfig = {
    sm: { ring: 'w-8 h-8 border-2', icon: 'text-sm' },
    md: { ring: 'w-12 h-12 border-4', icon: 'text-xl' },
    lg: { ring: 'w-20 h-20 border-4', icon: 'text-3xl' },
  };

  const { ring, icon } = sizeConfig[size] || sizeConfig.md;

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <div className="relative flex items-center justify-center">
        {/* Spinning Ring */}
        <div 
          className={`rounded-full border-[#F5E6D3] border-t-[#E8742A] animate-spin ${ring}`}
        ></div>
        
        {/* Static Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-[#E8742A] animate-pulse">
          <FaPaw className={icon} />
        </div>
      </div>
      
      {/* Optional Text */}
      {text && (
        <p className="text-[#8B5E3C] font-semibold tracking-wide animate-pulse text-sm uppercase">
          {text}
        </p>
      )}
    </div>
  );
}
