


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton"; // Import Skeleton

export default function RequestDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [reqData, setReqData] = useState(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    try {
        const { data } = await axiosSecure.get(`/api/requests/${id}`);
        setReqData(data);
    } catch (err) {
        toast.error("Failed to load details");
    }
  };

  useEffect(() => { load(); }, [id]);

  const confirmDonate = async () => {
    try {
      await axiosSecure.patch(`/api/requests/${id}/confirm-donate`, {
        donorName: user.displayName,
        donorEmail: user.email
      });
      toast.success("Donation confirmed!");
      setOpen(false);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  // Loading State
  if (!reqData) return (
      <div className="container py-10 max-w-3xl">
          <Skeleton className="h-10 w-1/2 mb-6" />
          <Skeleton className="h-64 w-full rounded-xl" />
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 transition-colors">
      <div className="container max-w-4xl mx-auto">
        
        {/* Main Card */}
        <div className="card bg-white dark:bg-slate-800 overflow-hidden shadow-lg border-0">
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-r from-primary to-rose-600 relative">
                <div className="absolute -bottom-8 left-8 p-1 bg-white dark:bg-slate-800 rounded-2xl">
                    <div className="w-16 h-16 bg-rose-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-primary font-black text-2xl border border-rose-100 dark:border-slate-600">
                        {reqData.bloodGroup}
                    </div>
                </div>
            </div>

            <div className="pt-12 px-8 pb-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 dark:text-white">{reqData.recipientName}</h1>
                        <p className="text-slate-500 dark:text-slate-400">Needs blood at {reqData.hospitalName}</p>
                    </div>
                    {reqData.status === "pending" ? (
                         <button onClick={() => setOpen(true)} className="btn-primary px-6">Donate Now</button>
                    ) : (
                        <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg font-bold capitalize">
                            Status: {reqData.status}
                        </span>
                    )}
                </div>

                {/* --- Section 1: Description / Overview --- */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">
                        Description & Reason
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {reqData.requestMessage || "No additional details provided by the requester."}
                    </p>
                </div>

                {/* --- Section 2: Key Information / Specifications --- */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 mb-4">
                        Key Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <DetailItem label="Location" value={`${reqData.recipientDistrict}, ${reqData.recipientUpazila}`} />
                        <DetailItem label="Full Address" value={reqData.fullAddress} />
                        <DetailItem label="Date Required" value={reqData.donationDate} />
                        <DetailItem label="Time Required" value={reqData.donationTime} />
                        <DetailItem label="Requester Name" value={reqData.requesterName} />
                        <DetailItem label="Requester Email" value={reqData.requesterEmail} />
                    </div>
                </div>

                {/* --- Section 3: Donor Info (If Applicable) --- */}
                {reqData.status !== "pending" && reqData.donorEmail && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                        <h3 className="text-green-700 dark:text-green-400 font-bold mb-2">Donor Details</h3>
                        <p className="text-slate-700 dark:text-slate-300">Name: {reqData.donorName}</p>
                        <p className="text-slate-700 dark:text-slate-300">Email: {reqData.donorEmail}</p>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Modal for Confirmation */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
            <h3 className="text-xl font-black mb-4 dark:text-white">Confirm Donation</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Are you sure you want to donate blood for this request? Your contact details will be shared with the requester.
            </p>

            <div className="space-y-3 text-sm bg-slate-50 dark:bg-slate-900 p-4 rounded-xl mb-6">
              <div>
                <span className="block text-slate-400 text-xs">Donor Name</span>
                <span className="font-semibold dark:text-slate-200">{user.displayName}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-xs">Donor Email</span>
                <span className="font-semibold dark:text-slate-200">{user.email}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setOpen(false)} className="btn-outline border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
              <button onClick={confirmDonate} className="btn-primary">Yes, Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="font-semibold text-slate-700 dark:text-slate-200">{value}</span>
    </div>
  );
}