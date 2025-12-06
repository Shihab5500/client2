// import { useEffect, useState } from "react";
// import axiosSecure from "../../api/axiosSecure";
// import { useOutletContext } from "react-router-dom";
// import toast from "react-hot-toast";
// import { statuses } from "../../utils/bloodGroups";

// export default function AllRequests() {
//   const { me } = useOutletContext();
//   const [filter, setFilter] = useState("");
//   const [data, setData] = useState([]);

//   const load = async () => {
//     const res = await axiosSecure.get(`/api/requests?status=${filter}`);
//     setData(res.data.requests || res.data);
//   };

//   useEffect(() => { load(); }, [filter]);

//   const updateStatus = async (id, status) => {
//     try {
//       await axiosSecure.patch(`/api/requests/${id}/status`, { status });
//       toast.success("Status updated");
//       load();
//     } catch (e) {
//       toast.error(e.message);
//     }
//   };

//   return (
//     <div className="card p-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
//         <h2 className="text-xl font-black">All Donation Requests</h2>
//         <select className="input md:w-56" value={filter} onChange={e=>setFilter(e.target.value)}>
//           <option value="">All</option>
//           {statuses.map(s => <option key={s} value={s}>{s}</option>)}
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="p-2 text-left">Recipient</th>
//               <th className="p-2 text-left">Location</th>
//               <th className="p-2">Blood</th>
//               <th className="p-2">Date</th>
//               <th className="p-2">Time</th>
//               <th className="p-2">Status</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map(r => (
//               <tr key={r._id} className="border-b">
//                 <td className="p-2">{r.recipientName}</td>
//                 <td className="p-2">{r.recipientDistrict}, {r.recipientUpazila}</td>
//                 <td className="p-2 text-center font-bold text-primary">{r.bloodGroup}</td>
//                 <td className="p-2 text-center">{r.donationDate}</td>
//                 <td className="p-2 text-center">{r.donationTime}</td>
//                 <td className="p-2 text-center">
//                   <span className="px-2 py-1 rounded-full bg-soft text-primary font-semibold">
//                     {r.status}
//                   </span>
//                 </td>
//                 <td className="p-2">
//                   {(me.role === "admin" || me.role === "volunteer") && (
//                     <div className="flex flex-wrap gap-2">
//                       {statuses.map(s => (
//                         <button
//                           key={s}
//                           onClick={() => updateStatus(r._id, s)}
//                           className="btn-outline text-xs px-3 py-1"
//                           disabled={r.status === s}
//                         >
//                           {s}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}

//             {!data.length && (
//               <tr>
//                 <td className="p-4 text-center text-slate-500" colSpan="7">
//                   No requests found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






// import { useEffect, useState } from "react";
// import axiosSecure from "../../api/axiosSecure";
// import { useOutletContext } from "react-router-dom";
// import toast from "react-hot-toast";
// import { statuses } from "../../utils/bloodGroups";

// export default function AllRequests() {
//   const { me } = useOutletContext();
//   const [filter, setFilter] = useState("");
//   const [data, setData] = useState([]);

//   // Pagination states
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [total, setTotal] = useState(0);

//   const load = async () => {
//     try {
//       const res = await axiosSecure.get(`/api/requests?status=${filter}&page=${page}&limit=${limit}`);
//       setData(res.data.requests || []);
//       setTotal(res.data.total || 0);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { load(); }, [filter, page]);

//   const updateStatus = async (id, status) => {
//     try {
//       await axiosSecure.patch(`/api/requests/${id}/status`, { status });
//       toast.success("Status updated");
//       load();
//     } catch (e) {
//       toast.error(e.message);
//     }
//   };

//   const pages = Math.ceil(total / limit);

//   return (
//     <div className="card p-6">
      
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
//         <h2 className="text-xl font-black">All Donation Requests</h2>
//         <select 
//           className="input md:w-56" 
//           value={filter} 
//           onChange={e=>{setPage(1); setFilter(e.target.value)}}
//         >
//           <option value="">All</option>
//           {statuses.map(s => <option key={s} value={s}>{s}</option>)}
//         </select>
//       </div>

//       {/* ✅ Responsive Table Wrapper */}
//       {/* overflow-x-auto মোবাইলে স্ক্রল করার সুবিধা দেবে */}
//       <div className="overflow-x-auto">
        
//         {/* min-w-[1000px] টেবিলকে ছোট হতে বাধা দেবে, যাতে ডিজাইন না ভাঙে */}
//         <table className="w-full text-sm min-w-[1000px]">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="p-2 text-left">Recipient</th>
//               <th className="p-2 text-left">Location</th>
//               <th className="p-2 text-center">Blood</th>
//               <th className="p-2 text-center">Date</th>
//               <th className="p-2 text-center">Time</th>
//               <th className="p-2 text-center">Status</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map(r => (
//               <tr key={r._id} className="border-b">
//                 <td className="p-2 font-semibold">
//                   {r.recipientName}
//                   <span className="block text-xs text-slate-500 font-normal">Req: {r.requesterName}</span>
//                 </td>
//                 <td className="p-2">
//                   {r.recipientDistrict}, {r.recipientUpazila}
//                 </td>
//                 <td className="p-2 text-center font-bold text-primary">{r.bloodGroup}</td>
//                 <td className="p-2 text-center">{r.donationDate}</td>
//                 <td className="p-2 text-center">{r.donationTime}</td>
                
//                 {/* Status Badge (Original Style) */}
//                 <td className="p-2 text-center">
//                   <span className="px-2 py-1 rounded-full bg-soft text-primary font-semibold text-xs">
//                     {r.status}
//                   </span>
//                 </td>

//                 <td className="p-2">
//                   {(me.role === "admin" || me.role === "volunteer") && (
//                     <div className="flex flex-wrap gap-2">
//                       {statuses.map(s => (
//                         <button
//                           key={s}
//                           onClick={() => updateStatus(r._id, s)}
//                           className="btn-outline text-xs px-3 py-1" // Original Button Style
//                           disabled={r.status === s}
//                         >
//                           {s}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}

//             {!data.length && (
//               <tr>
//                 <td className="p-4 text-center text-slate-500" colSpan="7">
//                   No requests found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination (Original Style) */}
//       {pages > 1 && (
//         <div className="mt-4 flex gap-2 flex-wrap">
//           {[...Array(pages).keys()].map(p=>(
//             <button
//               key={p}
//               onClick={()=>setPage(p+1)}
//               className={`px-3 py-1 rounded-lg border ${page===p+1 ? "bg-primary text-white border-primary":""}`}
//             >
//               {p+1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { statuses } from "../../utils/bloodGroups";

export default function AllRequests() {
  const { me } = useOutletContext();
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const load = async () => {
    try {
      const res = await axiosSecure.get(`/api/requests?status=${filter}&page=${page}&limit=${limit}`);
      setData(res.data.requests || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, [filter, page]);

  const updateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/api/requests/${id}/status`, { status });
      toast.success("Status updated");
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const pages = Math.ceil(total / limit);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="card bg-white shadow-sm border border-slate-100 rounded-xl p-4 sm:p-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-black text-slate-800">All Donation Requests</h2>
          
          <div className="w-full md:w-auto">
            <select 
              className="input w-full md:w-56 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer bg-slate-50 border-slate-200"
              value={filter} 
              onChange={e=>{setPage(1); setFilter(e.target.value)}}
            >
              <option value="">All Status</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* ✅ Table Responsive Container */}
        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full text-sm min-w-[1000px]"> 
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Recipient Info</th>
                <th className="p-4 text-left whitespace-nowrap">Location</th>
                <th className="p-4 text-center whitespace-nowrap">Blood</th>
                <th className="p-4 text-center whitespace-nowrap">Date & Time</th>
                <th className="p-4 text-center whitespace-nowrap">Status</th>
                <th className="p-4 text-left whitespace-nowrap min-w-[350px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map(r => (
                <tr key={r._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">
                    <p className="font-bold">{r.recipientName}</p>
                    <p className="text-xs text-slate-500 mt-1">Req By: {r.requesterName}</p>
                  </td>
                  <td className="p-4 text-slate-600">
                    <span className="block font-medium">{r.recipientDistrict}</span>
                    <span className="text-xs text-slate-400">{r.recipientUpazila}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-600 font-bold text-xs border border-rose-100">
                      {r.bloodGroup}
                    </span>
                  </td>
                  <td className="p-4 text-center text-slate-600 whitespace-nowrap">
                    <p>{r.donationDate}</p>
                    <p className="text-xs text-slate-400">{r.donationTime}</p>
                  </td>
                  
                  {/* Status Badge */}
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-block min-w-[80px] text-center
                      ${r.status === 'done' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                        r.status === 'canceled' ? 'bg-red-100 text-red-700 border border-red-200' : 
                        r.status === 'inprogress' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                        'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                      {r.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {(me.role === "admin" || me.role === "volunteer") && (
                      <div className="flex flex-wrap gap-2">
                        {statuses.map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(r._id, s)}
                            disabled={r.status === s}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium whitespace-nowrap shadow-sm flex-1 text-center
                              ${r.status === s 
                                ? "bg-slate-900 text-white border-slate-800 opacity-50 cursor-not-allowed" 
                                : "bg-white border-slate-800 text-black hover:border-primary hover:text-primary hover:bg-slate-50 active:scale-95"}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {!data.length && (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-slate-500 bg-slate-50/30">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">📭</span>
                      <p>No donation requests found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {pages > 1 && (
          <div className="mt-6 flex justify-center sm:justify-end gap-2 flex-wrap">
            {[...Array(pages).keys()].map(p=>(
              <button
                key={p}
                onClick={()=>setPage(p+1)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all
                  ${page===p+1 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"}`}
              >
                {p+1}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}