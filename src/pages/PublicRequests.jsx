

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardSkeleton } from "../components/Skeleton";
import { FaMapMarkerAlt, FaClock, FaSortAmountDown } from "react-icons/fa";

export default function PublicRequests() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- States for Sort & Pagination ---
  const [sortOrder, setSortOrder] = useState("newest"); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_apiUrl}/api/requests/public`)
      .then((res) => {
        const incoming = res.data;
        setData(Array.isArray(incoming) ? incoming : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // --- Sorting Logic ---
  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  // --- Pagination Logic ---
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); 
    }
  };

  return (
    <div className="min-h-screen bg-soft dark:bg-slate-900 transition-colors duration-300">
      <div className="container py-12">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white">
                    Donation Requests
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Find urgent blood needs in your area.
                </p>
            </div>

            {/* Sorting Dropdown (Requirement Met) */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <FaSortAmountDown /> Sort By:
                </span>
                <select 
                    className="select select-bordered select-sm rounded-lg bg-white dark:bg-slate-800 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
        </div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {loading && [...Array(8)].map((_, i) => <CardSkeleton key={i} />)}

          {!loading && currentData.map((r) => (
            <div key={r._id} className="card p-5 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col h-full bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700">
              
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white line-clamp-1" title={r.recipientName}>
                    {r.recipientName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {r.hospitalName}
                  </p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-rose-50 dark:bg-rose-900/30 text-primary rounded-full font-black text-sm shadow-sm border border-rose-100 dark:border-rose-800 shrink-0">
                  {r.bloodGroup}
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6 flex-1">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary/70" />
                  <span className="truncate">{r.recipientDistrict}, {r.recipientUpazila}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-primary/70" />
                  <span>{r.donationDate} • {r.donationTime}</span>
                </div>
              </div>

              <Link
                to={`/donation-requests/${r._id}`}
                className="btn-primary w-full py-2.5 text-sm shadow-md shadow-rose-200 dark:shadow-none mt-auto"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* --- Empty State --- */}
        {!loading && !data.length && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Pending Requests</h3>
            <p className="text-slate-500">Currently there are no urgent blood requests.</p>
          </div>
        )}

        {/* --- Pagination Controls (Requirement Met) --- */}
        {!loading && totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-outline border-slate-300 dark:border-slate-600 disabled:opacity-50"
                >
                    Prev
                </button>
                
                {[...Array(totalPages).keys()].map(page => (
                    <button 
                        key={page}
                        onClick={() => handlePageChange(page + 1)}
                        className={`btn btn-sm w-8 ${currentPage === page + 1 ? 'btn-primary' : 'btn-outline border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'}`}
                    >
                        {page + 1}
                    </button>
                ))}

                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-outline border-slate-300 dark:border-slate-600 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        )}

      </div>
    </div>
  );
}