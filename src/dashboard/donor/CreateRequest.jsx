

// import { useOutletContext, useNavigate } from "react-router-dom";
// import axiosSecure from "../../api/axiosSecure";
// import toast from "react-hot-toast";
// import { bloodGroups } from "../../utils/bloodGroups";

// export default function CreateRequest() {
//   const { me } = useOutletContext();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const f = e.target;

//     const payload = {
//       requesterName: me.name,
//       requesterEmail: me.email,
//       recipientName: f.recipientName.value,
//       recipientDistrict: f.recipientDistrict.value,
//       recipientUpazila: f.recipientUpazila.value,
//       hospitalName: f.hospitalName.value,
//       fullAddress: f.fullAddress.value,
//       bloodGroup: f.bloodGroup.value,
//       donationDate: f.donationDate.value,
//       donationTime: f.donationTime.value,
//       requestMessage: f.requestMessage.value
//     };

//     try {
//       await axiosSecure.post("/api/requests", payload);
//       toast.success("Donation request created!");
//       navigate("/dashboard/my-donation-requests");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <div className="card p-6">
//       <h2 className="text-xl font-black mb-4">Create Donation Request</h2>

//       <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label className="label">Requester Name</label>
//           <input value={me.name} readOnly className="input bg-slate-50" />
//         </div>
//         <div>
//           <label className="label">Requester Email</label>
//           <input value={me.email} readOnly className="input bg-slate-50" />
//         </div>

//         <div>
//           <label className="label">Recipient Name</label>
//           <input name="recipientName" className="input" required />
//         </div>

//         <div>
//           <label className="label">Hospital Name</label>
//           <input name="hospitalName" className="input" required />
//         </div>

//         <div>
//           <label className="label">Recipient District</label>
//           <input name="recipientDistrict" className="input" required />
//         </div>

//         <div>
//           <label className="label">Recipient Upazila</label>
//           <input name="recipientUpazila" className="input" required />
//         </div>

//         <div className="md:col-span-2">
//           <label className="label">Full Address</label>
//           <input name="fullAddress" className="input" required />
//         </div>

//         <div>
//           <label className="label">Blood Group</label>
//           <select name="bloodGroup" className="input" required>
//             {bloodGroups.map(bg => <option key={bg}>{bg}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="label">Donation Date</label>
//           <input type="date" name="donationDate" className="input" required />
//         </div>

//         <div>
//           <label className="label">Donation Time</label>
//           <input type="time" name="donationTime" className="input" required />
//         </div>

//         <div className="md:col-span-2">
//           <label className="label">Request Message</label>
//           <textarea name="requestMessage" className="input min-h-28" required />
//         </div>

//         <button className="btn-primary md:col-span-2">Request</button>
//       </form>
//     </div>
//   );
// }



// import { useMemo, useState } from "react";
// import districts from "../../Data/district.json";
// import upazilas from "../../Data/upazilas.json";

// import { useOutletContext, useNavigate } from "react-router-dom";
// import axiosSecure from "../../api/axiosSecure";
// import toast from "react-hot-toast";
// import { bloodGroups } from "../../utils/bloodGroups";

// export default function CreateRequest() {
//   const { me } = useOutletContext();
//   const navigate = useNavigate();

//   const [selectedDistrictId, setSelectedDistrictId] = useState("");
//   const [selectedUpazila, setSelectedUpazila] = useState("");

//   // ✅ district অনুযায়ী upazila filter
//   const filteredUpazilas = useMemo(() => {
//     if (!selectedDistrictId) return [];
//     return upazilas.filter(
//       (u) => String(u.district_id) === String(selectedDistrictId)
//     );
//   }, [selectedDistrictId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const f = e.target;

//     // ✅ district id থেকে district name বের করলাম
//     const districtName =
//       districts.find((d) => String(d.id) === String(selectedDistrictId))?.name;

//     const payload = {
//       requesterName: me.name,
//       requesterEmail: me.email,
//       recipientName: f.recipientName.value,
//       recipientDistrict: districtName,
//       recipientUpazila: selectedUpazila,
//       hospitalName: f.hospitalName.value,
//       fullAddress: f.fullAddress.value,
//       bloodGroup: f.bloodGroup.value,
//       donationDate: f.donationDate.value,
//       donationTime: f.donationTime.value,
//       requestMessage: f.requestMessage.value
//     };

//     try {
//       await axiosSecure.post("/api/requests", payload);
//       toast.success("Donation request created!");
//       navigate("/dashboard/my-donation-requests");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <div className="card p-6">
//       <h2 className="text-xl font-black mb-4">Create Donation Request</h2>

//       <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label className="label">Requester Name</label>
//           <input value={me.name} readOnly className="input bg-slate-50" />
//         </div>

//         <div>
//           <label className="label">Requester Email</label>
//           <input value={me.email} readOnly className="input bg-slate-50" />
//         </div>

//         <div>
//           <label className="label">Recipient Name</label>
//           <input name="recipientName" className="input" required />
//         </div>

//         <div>
//           <label className="label">Hospital Name</label>
//           <input name="hospitalName" className="input" required />
//         </div>

//         {/* ✅ District Select */}
//         <div>
//           <label className="label">Recipient District</label>
//           <select
//             name="recipientDistrict"
//             className="input"
//             value={selectedDistrictId}
//             onChange={(e) => {
//               setSelectedDistrictId(e.target.value);
//               setSelectedUpazila(""); // district change হলে upazila reset
//             }}
//             required
//           >
//             <option value="">Select District</option>
//             {districts.map((d) => (
//               <option key={d.id} value={d.id}>
//                 {d.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* ✅ Upazila Select */}
//         <div>
//           <label className="label">Recipient Upazila</label>
//           <select
//             name="recipientUpazila"
//             className="input"
//             value={selectedUpazila}
//             onChange={(e) => setSelectedUpazila(e.target.value)}
//             disabled={!selectedDistrictId}
//             required
//           >
//             <option value="">Select Upazila</option>
//             {filteredUpazilas.map((u) => (
//               <option key={u.id} value={u.name}>
//                 {u.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="md:col-span-2">
//           <label className="label">Full Address</label>
//           <input name="fullAddress" className="input" required />
//         </div>

//         <div>
//           <label className="label">Blood Group</label>
//           <select name="bloodGroup" className="input" required>
//             {bloodGroups.map((bg) => (
//               <option key={bg}>{bg}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="label">Donation Date</label>
//           <input type="date" name="donationDate" className="input" required />
//         </div>

//         <div>
//           <label className="label">Donation Time</label>
//           <input type="time" name="donationTime" className="input" required />
//         </div>

//         <div className="md:col-span-2">
//           <label className="label">Request Message</label>
//           <textarea name="requestMessage" className="input min-h-28" required />
//         </div>

//         <button className="btn-primary md:col-span-2">Request</button>
//       </form>
//     </div>
//   );
// }



import { useMemo, useState } from "react";
import districts from "../../Data/district.json";
import upazilas from "../../Data/upazilas.json";

import { useOutletContext, useNavigate } from "react-router-dom";
import axiosSecure from "../../api/axiosSecure";
import toast from "react-hot-toast";
import { bloodGroups } from "../../utils/bloodGroups";

export default function CreateRequest() {
  const { me } = useOutletContext();
  const navigate = useNavigate();

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  // ✅ district অনুযায়ী upazila filter
  const filteredUpazilas = useMemo(() => {
    if (!selectedDistrictId) return [];
    return upazilas.filter(
      (u) => String(u.district_id) === String(selectedDistrictId)
    );
  }, [selectedDistrictId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;

    // ✅ district id থেকে district name বের করলাম
    const districtName =
      districts.find((d) => String(d.id) === String(selectedDistrictId))?.name;

    const payload = {
      requesterName: me.name,
      requesterEmail: me.email,
      recipientName: f.recipientName.value,
      recipientDistrict: districtName,
      recipientUpazila: selectedUpazila,
      hospitalName: f.hospitalName.value,
      fullAddress: f.fullAddress.value,
      bloodGroup: f.bloodGroup.value,
      donationDate: f.donationDate.value,
      donationTime: f.donationTime.value,
      requestMessage: f.requestMessage.value
    };

    try {
      await axiosSecure.post("/api/requests", payload);
      toast.success("Donation request created!");
      navigate("/dashboard/my-donation-requests");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card bg-white shadow-sm border border-slate-100 rounded-xl p-4 sm:p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-black mb-6 text-slate-800">
          Create Donation Request
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          
          {/* Requester Info (Read Only) */}
          <div className="space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Requester Name</label>
            <input 
              value={me.name} 
              readOnly 
              className="input w-full bg-slate-50 text-slate-500 cursor-not-allowed" 
            />
          </div>

          <div className="space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Requester Email</label>
            <input 
              value={me.email} 
              readOnly 
              className="input w-full bg-slate-50 text-slate-500 cursor-not-allowed" 
            />
          </div>

          {/* Recipient Info */}
          <div className="space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Recipient Name</label>
            <input 
              name="recipientName" 
              className="input w-full focus:ring-2 focus:ring-primary/20 transition-all" 
              placeholder="Full name of patient"
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Hospital Name</label>
            <input 
              name="hospitalName" 
              className="input w-full focus:ring-2 focus:ring-primary/20 transition-all" 
              placeholder="e.g. Dhaka Medical College"
              required 
            />
          </div>

          {/* ✅ District Select */}
          <div className="space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Recipient District</label>
            <select
              name="recipientDistrict"
              className="input w-full focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
              value={selectedDistrictId}
              onChange={(e) => {
                setSelectedDistrictId(e.target.value);
                setSelectedUpazila(""); // district change হলে upazila reset
              }}
              required
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Upazila Select */}
          <div className="space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Recipient Upazila</label>
            <select
              name="recipientUpazila"
              className="input w-full focus:ring-2 focus:ring-primary/20 transition-all appearance-none disabled:bg-slate-50 disabled:text-slate-400"
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={!selectedDistrictId}
              required
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Full Address - Spans full width on mobile/tablet */}
          <div className="md:col-span-2 space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Full Address</label>
            <input 
              name="fullAddress" 
              className="input w-full focus:ring-2 focus:ring-primary/20 transition-all" 
              placeholder="House no, Road no, Area details..."
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Blood Group</label>
            <select 
              name="bloodGroup" 
              className="input w-full focus:ring-2 focus:ring-primary/20 transition-all appearance-none" 
              required
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Donation Date</label>
            <input 
              type="date" 
              name="donationDate" 
              className="input w-full focus:ring-2 focus:ring-primary/20 transition-all" 
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Donation Time</label>
            <input 
              type="time" 
              name="donationTime" 
              className="input w-full focus:ring-2 focus:ring-primary/20 transition-all" 
              required 
            />
          </div>

          {/* Message - Spans full width */}
          <div className="md:col-span-2 space-y-1">
            <label className="label block text-sm font-medium text-slate-700">Request Message</label>
            <textarea 
              name="requestMessage" 
              className="input w-full min-h-[120px] py-3 focus:ring-2 focus:ring-primary/20 transition-all resize-y" 
              placeholder="Describe why you need blood urgency..."
              required 
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <button className="btn-primary w-full py-3 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98]">
              Create Request
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}