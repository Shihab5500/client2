

import { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { statuses } from "../../utils/bloodGroups";

export default function MyRequests() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const load = async () => {
    try {
      const { data } = await axiosSecure.get(`/api/requests?status=${filter}&page=${page}&limit=${limit}`);
      setData(data.requests);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, [filter, page]);

  const pages = Math.ceil(total / limit);

  const delReq = async (id) => {
    const res = await Swal.fire({
      title: "Delete request?",
      text: "You won't be able to revert this.",
      icon: "warning",
      showCancelButton: true
    });
    if (!res.isConfirmed) return;

    await axiosSecure.delete(`/api/requests/${id}`);
    toast.success("Deleted");
    load();
  };

  

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="card bg-white shadow-sm border border-slate-100 rounded-xl p-4 sm:p-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-black text-slate-800">My Donation Requests</h2>
          
          <div className="w-full md:w-auto">
            <select 
              value={filter} 
              onChange={e=>{setPage(1);setFilter(e.target.value);}} 
              className="input w-full md:w-56 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="">All Status</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/*  Table Responsive Container */}
        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full text-sm min-w-[1000px]">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Recipient</th>
                <th className="p-4 text-left whitespace-nowrap">Location</th>
                <th className="p-4 text-center whitespace-nowrap">Date</th>
                <th className="p-4 text-center whitespace-nowrap">Time</th>
                <th className="p-4 text-center whitespace-nowrap">Blood</th>
                <th className="p-4 text-center whitespace-nowrap">Status</th>
                <th className="p-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map(r=>(
                <tr key={r._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{r.recipientName}</td>
                  <td className="p-4 text-slate-600">
                    <span className="block">{r.recipientDistrict}</span>
                    <span className="text-xs text-slate-400">{r.recipientUpazila}</span>
                  </td>
                  <td className="p-4 text-center text-slate-600 whitespace-nowrap">{r.donationDate}</td>
                  <td className="p-4 text-center text-slate-600 whitespace-nowrap">{r.donationTime}</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-600 font-bold text-xs border border-rose-100">
                      {r.bloodGroup}
                    </span>
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
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      
                     
                      {r.status === "pending" ? (
                         <button 
                           onClick={()=>delReq(r._id)} 
                           className="btn-outline text-xs px-3 py-1.5 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-all"
                         >
                           Delete
                         </button>
                      ) : (
                        
                         <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded border border-slate-100">
                           View Only
                         </span>
                      )}

                    
                      
                    </div>
                  </td>
                </tr>
              ))}

              {!data.length && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500 bg-slate-50/30">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">📭</span>
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