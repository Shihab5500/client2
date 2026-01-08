

import { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { statuses } from "../../utils/bloodGroups";

export default function AllRequests() {
  const { me } = useOutletContext();
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
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
      <div className="card bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-sm p-4 sm:p-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">All Donation Requests</h2>
          
          <div className="w-full md:w-auto">
            <select 
              className="input w-full md:w-56 bg-slate-50 dark:bg-slate-700 dark:text-white border-slate-200 dark:border-slate-600"
              value={filter} 
              onChange={e=>{setPage(1); setFilter(e.target.value)}}
            >
              <option value="">All Status</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-700">
          <table className="w-full text-sm min-w-[1000px]"> 
            <thead className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold border-b dark:border-slate-600">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Recipient Info</th>
                <th className="p-4 text-left whitespace-nowrap">Location</th>
                <th className="p-4 text-center whitespace-nowrap">Blood</th>
                <th className="p-4 text-center whitespace-nowrap">Date & Time</th>
                <th className="p-4 text-center whitespace-nowrap">Status</th>
                <th className="p-4 text-left whitespace-nowrap min-w-[350px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
              {data.map(r => (
                <tr key={r._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    <p className="font-bold">{r.recipientName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Req By: {r.requesterName}</p>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    <span className="block font-medium">{r.recipientDistrict}</span>
                    <span className="text-xs text-slate-400">{r.recipientUpazila}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-100 dark:border-rose-800">
                      {r.bloodGroup}
                    </span>
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    <p>{r.donationDate}</p>
                    <p className="text-xs text-slate-400">{r.donationTime}</p>
                  </td>
                  
                  {/* Status Badge */}
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-block min-w-[80px] text-center
                      ${r.status === 'done' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 
                        r.status === 'canceled' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 
                        r.status === 'inprogress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' : 
                        'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
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
                                ? "bg-slate-900 dark:bg-slate-600 text-white opacity-50 cursor-not-allowed border-transparent" 
                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary"}`}
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
                  <td colSpan="6" className="p-10 text-center text-slate-500 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-800">
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

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-6 flex justify-center sm:justify-end gap-2 flex-wrap">
            {[...Array(pages).keys()].map(p=>(
              <button
                key={p}
                onClick={()=>setPage(p+1)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all
                  ${page===p+1 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
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