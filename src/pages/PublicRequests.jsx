import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PublicRequests() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_apiUrl}/api/requests/public`)
      .then((res) => {
        const incoming = res.data;

        // ✅ যেকোনো রেসপন্স আসুক, array না হলে empty করে দেবে
        if (Array.isArray(incoming)) {
          setData(incoming);
        } else if (Array.isArray(incoming?.requests)) {
          setData(incoming.requests);
        } else {
          setData([]);
        }
      })
      .catch(() => setData([]));
  }, []);

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-black mb-5">
        Pending Donation Requests
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {data.map((r) => (
          <div key={r._id} className="card p-5">
            <h3 className="font-bold text-lg">{r.recipientName}</h3>
            <p className="text-slate-600 text-sm mt-1">
              {r.recipientDistrict}, {r.recipientUpazila}
            </p>
            <div className="mt-3 flex justify-between text-sm">
              <span className="font-semibold text-primary">
                {r.bloodGroup}
              </span>
              <span>
                {r.donationDate} • {r.donationTime}
              </span>
            </div>
            <Link
              to={`/donation-requests/${r._id}`}
              className="btn-primary w-full mt-4"
            >
              View Details
            </Link>
          </div>
        ))}

        {!data.length && (
          <div className="md:col-span-3 card p-6 text-center text-slate-500">
            No pending requests right now.
          </div>
        )}
      </div>
    </div>
  );
}
