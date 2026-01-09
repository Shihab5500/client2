


import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; 
import axiosSecure from "../api/axiosSecure"; 
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton"; 

export default function RequestDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [reqData, setReqData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  
  const load = async () => {
    try {
      setLoading(true);
      
      const { data } = await axios.get(`${import.meta.env.VITE_apiUrl}/api/requests/${id}`);
      setReqData(data);
    } catch (err) {
      console.error(err);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  
  const handleDonateClick = () => {
    if (!user) {
      
      toast.error("Please login to donate!");
      return navigate("/login", { state: { from: location } });
    }
    setOpen(true);
  };

 
  const confirmDonate = async () => {
    try {
      await axiosSecure.patch(`/api/requests/${id}/confirm-donate`, {
        donorName: user.displayName,
        donorEmail: user.email
      });
      toast.success("Donation confirmed successfully!");
      setOpen(false);
      load(); 
    } catch (e) {
      toast.error(e.response?.data?.message || "Donation failed");
    }
  };

  // --- Loading State ---
  if (loading) return (
    <div className="container py-10 max-w-4xl mx-auto px-4">
       <div className="animate-pulse space-y-4">
          <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 w-3/4 rounded"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 w-1/2 rounded"></div>
       </div>
    </div>
  );

  if (!reqData) return <div className="text-center py-20 text-red-500 text-xl">Request Data Not Found!</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 transition-colors duration-300">
      <div className="container max-w-4xl mx-auto px-4">
        
        <div className="card bg-white dark:bg-slate-800 overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 rounded-2xl">
            
            {/* Header Gradient */}
            <div className="h-32 bg-gradient-to-r from-primary to-rose-600 relative">
                <div className="absolute -bottom-8 left-8 p-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                    <div className="w-16 h-16 bg-rose-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-primary font-black text-2xl border border-rose-100 dark:border-slate-600">
                        {reqData.bloodGroup}
                    </div>
                </div>
            </div>

            <div className="pt-12 px-6 md:px-8 pb-8">
                {/* Title & Status */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">{reqData.recipientName}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                            at {reqData.hospitalName}
                        </p>
                    </div>
                    
                    {reqData.status === "pending" ? (
                        <button onClick={handleDonateClick} className="btn-primary px-8 py-3 font-bold shadow-lg shadow-primary/30 w-full md:w-auto">
                            Donate Now
                        </button>
                    ) : (
                        <span className={`px-4 py-2 rounded-lg font-bold capitalize border 
                            ${reqData.status === 'done' ? 'bg-green-50 text-green-600 border-green-200' : 
                              reqData.status === 'inprogress' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                              'bg-slate-100 text-slate-600 border-slate-200'}`}>
                            Status: {reqData.status}
                        </span>
                    )}
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-slate-50 dark:bg-slate-700/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">📋 Request Details</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                            {reqData.requestMessage || "Emergency blood needed."}
                        </p>
                        <div className="space-y-2">
                            <DetailRow label="Date" value={reqData.donationDate} />
                            <DetailRow label="Time" value={reqData.donationTime} />
                            <DetailRow label="Address" value={reqData.fullAddress} />
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">👤 Contact Info</h3>
                        <div className="space-y-3">
                            <DetailRow label="Requester" value={reqData.requesterName} />
                            <DetailRow label="Email" value={reqData.requesterEmail} />
                            <DetailRow label="District" value={reqData.recipientDistrict} />
                            <DetailRow label="Upazila" value={reqData.recipientUpazila} />
                        </div>
                    </div>
                </div>

                {/* Donor Section (Visible only if In Progress or Done) */}
                {(reqData.status === "inprogress" || reqData.status === "done") && reqData.donorName && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-100 dark:border-green-900/30 text-center">
                        <h3 className="text-green-700 dark:text-green-400 font-bold text-lg mb-1">
                           🦸‍♂️ Donor: {reqData.donorName}
                        </h3>
                        <p className="text-green-600 dark:text-green-300 text-sm">{reqData.donorEmail}</p>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {open && user && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-black mb-4 dark:text-white">Confirm Donation</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
                Are you sure you want to donate? Your name <b>({user.displayName})</b> and email will be shared with the requester.
            </p>
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

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-600/50 pb-2 last:border-0 last:pb-0">
        <span className="text-slate-500 dark:text-slate-400 text-sm">{label}</span>
        <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm text-right">{value}</span>
    </div>
  );
}