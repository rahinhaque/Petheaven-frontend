"use client";

import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaPaw, FaEye, FaTrash } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { toast } from 'sonner';
import CancelRequestModal from '@/components/modal/CancelRequestModal';
import Spinner from '@/components/shared/Spinner';

export default function RequestsPage() {
  const { data: sessionData, isPending } = authClient.useSession();
  const user = sessionData?.user;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState(null);

  useEffect(() => {
    if (isPending) return;
    
    const fetchRequests = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }


      const {data: tokenData} = await authClient.token();
      console.log(tokenData);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/user/${user.email}`,
          {
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
            cache: "no-store",
          },
        );
        if (res.ok) {
          const fetchedRequests = await res.json();
          setRequests(fetchedRequests);
        }
      } catch (error) {
        console.error("Failed to fetch user requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user, isPending]);

  const handleCancelClick = (req) => {
    setRequestToCancel(req);
    setIsCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    if (!requestToCancel) return;
    const reqId = requestToCancel._id || requestToCancel.id;

    const { data: tokenData } = await authClient.token();
    console.log(tokenData);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/${reqId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      if (res.ok) {
        setRequests((prev) => prev.filter((req) => (req._id || req.id) !== reqId));
        toast.success('Adoption request cancelled successfully.');
      } else {
        toast.error('Failed to cancel request.');
      }
    } catch (error) {
      console.error('Error cancelling request:', error);
      toast.error('An error occurred while cancelling.');
    } finally {
      setIsCancelModalOpen(false);
      setRequestToCancel(null);
    }
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setRequestToCancel(null);
  };

  return (
    <div className="paw-dashboard__content">
      <div className="paw-dashboard__welcome">
        <h1 className="paw-dashboard__welcome-title">My Requests</h1>
        <p className="paw-dashboard__welcome-subtitle">
          Manage your adoption requests and track their status.
        </p>
      </div>

      <div className="paw-dashboard__stats" style={{ display: 'block', marginTop: '32px' }}>
        {loading ? (
          <Spinner size="md" text="Loading your requests..." />
        ) : requests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {requests.map((req, index) => {
              const reqId = req._id || req.id;
              const requestDate = req.requestDate 
                ? new Date(req.requestDate).toLocaleDateString() 
                : 'N/A';
              
              let statusColor = 'text-[#E8742A]'; // Pending
              if (req.status === 'approved') statusColor = 'text-green-600';
              if (req.status === 'rejected') statusColor = 'text-red-600';

              return (
                <div key={reqId || index} className="border border-[#D4A574]/30 rounded-2xl p-6 flex flex-col gap-3 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#4A2C17] text-xl flex items-center gap-2">
                      <FaPaw className="text-[#E8742A]" /> {req.petName}
                    </h4>
                    <span className={`font-bold capitalize px-3 py-1 bg-gray-50 rounded-full text-sm border ${statusColor}`}>
                      {req.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-[#6B3E26]">
                    <div>
                      <p className="font-semibold text-[#8B5E3C]">Request Date</p>
                      <p>{requestDate}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#8B5E3C]">Pickup Date</p>
                      <p>{req.pickupDate || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                    <Link 
                      href={`/all-pets/${req.petId}`}
                      className="flex-1 flex justify-center items-center gap-2 bg-[#FFF8F0] text-[#E8742A] border border-[#E8742A]/30 hover:bg-[#E8742A] hover:text-white py-2 rounded-xl font-semibold text-sm transition-colors"
                    >
                      <FaEye /> View Pet
                    </Link>
                    {req.status !== 'approved' && (
                      <button 
                        onClick={() => handleCancelClick(req)}
                        className="flex-1 flex justify-center items-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white py-2 rounded-xl font-semibold text-sm transition-colors"
                      >
                        <FaTrash /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="paw-dashboard__stat-card" style={{ maxWidth: '100%' }}>
            <div className="paw-dashboard__stat-icon">
              <FaClipboardList />
            </div>
            <div className="paw-dashboard__stat-info">
              <h4>No requests yet</h4>
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>You haven't made any adoption requests.</p>
            </div>
          </div>
        )}
      </div>

      <CancelRequestModal
        isOpen={isCancelModalOpen}
        request={requestToCancel}
        onClose={closeCancelModal}
        onConfirm={confirmCancel}
      />
    </div>
  );
}
