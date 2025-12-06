import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function RequestDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [reqData, setReqData] = useState(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const { data } = await axiosSecure.get(`/api/requests/${id}`);
    setReqData(data);
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

  if (!reqData) return <div className="min-h-screen grid place-items-center">Loading...</div>;

  return (
    <div className="container py-8">
      <div className="card p-6">
        <h2 className="text-2xl font-black mb-3">Donation Request Details</h2>

        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <Info label="Requester" value={`${reqData.requesterName} (${reqData.requesterEmail})`} />
          <Info label="Recipient" value={reqData.recipientName} />
          <Info label="Location" value={`${reqData.recipientDistrict}, ${reqData.recipientUpazila}`} />
          <Info label="Hospital" value={reqData.hospitalName} />
          <Info label="Address" value={reqData.fullAddress} />
          <Info label="Blood Group" value={reqData.bloodGroup} />
          <Info label="Date" value={reqData.donationDate} />
          <Info label="Time" value={reqData.donationTime} />
          <Info label="Status" value={reqData.status} />
        </div>

        <p className="mt-4 text-slate-700">
          <span className="font-semibold">Message:</span> {reqData.requestMessage}
        </p>

        {reqData.status === "pending" && (
          <button onClick={() => setOpen(true)} className="btn-primary mt-5">
            Donate
          </button>
        )}
        {reqData.status !== "pending" && reqData.donorEmail && (
          <div className="mt-5 text-sm">
            <p className="font-semibold">Donor Info:</p>
            <p>{reqData.donorName} • {reqData.donorEmail}</p>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
          <div className="card p-6 w-full max-w-md">
            <h3 className="text-lg font-black mb-3">Confirm Donation</h3>

            <div className="space-y-2 text-sm">
              <label className="label">Donor Name</label>
              <input value={user.displayName} readOnly className="input bg-slate-50" />
              <label className="label">Donor Email</label>
              <input value={user.email} readOnly className="input bg-slate-50" />
            </div>

            <div className="mt-4 flex gap-2 justify-end">
              <button onClick={() => setOpen(false)} className="btn-outline">Cancel</button>
              <button onClick={confirmDonate} className="btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <p className="text-slate-500">{label}</p>
      <p className="font-semibold">{value || "-"}</p>
    </div>
  );
}
