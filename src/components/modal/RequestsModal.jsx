import React from 'react';
import { FaTimes, FaInbox } from 'react-icons/fa';

export default function RequestsModal({ isOpen, selectedPetName, requests, onClose, onAction }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#D4A574]/30 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-[#D4A574]/20 bg-[#FFF8F0]">
          <h2 className="text-2xl font-bold text-[#4A2C17]">
            Adoption Requests <span className="text-[#E8742A]">({selectedPetName})</span>
          </h2>
          <button 
            onClick={onClose}
            className="text-[#8B5E3C] hover:text-[#E8742A] bg-white rounded-full p-2 shadow-sm transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto bg-white">
          {requests.length > 0 ? (
            <div className="flex flex-col gap-4">
              {requests.map(req => (
                <div key={req.id} className="border border-[#D4A574]/30 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F5E6D3]/20">
                  <div>
                    <p className="font-bold text-[#4A2C17] text-lg">{req.userName}</p>
                    <p className="text-[#6B3E26] text-sm mb-1">{req.email}</p>
                    <p className="text-sm font-semibold text-[#8B5E3C]">Pickup: <span className="text-[#4A2C17]">{req.pickupDate}</span></p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => onAction(req.id, 'approved')}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-sm shadow-sm transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => onAction(req.id, 'rejected')}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm shadow-sm transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-[#FFF8F0] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaInbox className="text-[#D4A574] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#4A2C17]">No Pending Requests</h3>
              <p className="text-[#6B3E26]">There are no adoption requests for this pet yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
