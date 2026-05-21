import React from 'react';
import Spinner from '@/components/shared/Spinner';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#FDF6EE] flex flex-col items-center justify-center">
      <div className="animate-in fade-in zoom-in duration-500">
        <Spinner size="lg" text="Sniffing out the best pages..." />
      </div>
    </div>
  );
}
