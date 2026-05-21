import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function CancelRequestModal({ isOpen, request, onClose, onConfirm }) {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#D4A574]/30 animate-in fade-in zoom-in duration-200 p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaExclamationTriangle className="text-red-500 text-3xl" />
        </div>
        <h2 className="text-2xl font-bold text-[#4A2C17] mb-2">Cancel Request?</h2>
        <p className="text-[#6B3E26] mb-8">
          Are you sure you want to cancel your adoption request for <span className="font-bold">{request.petName}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors w-full"
          >
            No, Keep it
          </button>
          <button 
            onClick={onConfirm}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all w-full"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
