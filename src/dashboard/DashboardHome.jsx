

import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardHome() {
  const { me } = useOutletContext();
  const [recent, setRecent] = useState([]);
  const [stats, setStats] = useState({ users: 0, requests: 0, funds: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!me) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);

        // 1. Donor Logic
        if (me.role === "donor") {
          const reqRes = await axiosSecure.get("/api/requests?page=1&limit=3");
          setRecent(reqRes.data.requests || []);
        }

        // 2. Admin & Volunteer Logic
        if (me.role === "admin" || me.role === "volunteer") {
          const fundsRes = await axiosSecure.get("/api/fundings/total");
          const allReq = await axiosSecure.get("/api/requests?page=1&limit=1");

          let totalUsers = 0;
          // Only Admin fetches users
          if (me.role === "admin") {
            const usersRes = await axiosSecure.get("/api/users?page=1&limit=1");
            totalUsers = usersRes.data.total || 0;
          }

          setStats({
            users: totalUsers,
            requests: allReq.data.total || 0,
            funds: fundsRes.data.total || 0
          });
        }

      } catch (err) {
        console.log("DASHBOARD HOME ERROR:", err?.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (me?.role) load();
  }, [me]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  if (!me) {
    return (
      <div className="card p-6 text-center text-red-500">
        <h2 className="text-xl font-bold">User Profile Not Found</h2>
        <p>Please try logging in again.</p>
      </div>
    );
  }

  const displayName = me?.name || me?.displayName || "User";

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-0">
      
      {/* Welcome Card */}
      <div className="card bg-white shadow-sm border border-slate-100 rounded-xl p-6">
        <h2 className="text-xl md:text-2xl font-black text-slate-800">
          Welcome, <span className="text-primary">{displayName}</span> 👋
        </h2>
        <p className="text-slate-600 mt-2 text-sm md:text-base">
          Role: <span className="capitalize font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">{me.role}</span> • Status: <span className="capitalize font-bold text-green-600">{me.status}</span>
        </p>
      </div>

      {/* Stats Cards - Admin & Volunteer */}
      {(me.role === "admin" || me.role === "volunteer") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {me.role === "admin" && (
             <StatCard title="Total Users" value={stats.users} icon="👥" />
          )}
          
          <StatCard title="Total Funding ($)" value={stats.funds} icon="💰" />
          <StatCard title="Total Requests" value={stats.requests} icon="🩸" />
        </div>
      )}

      {/* Chart - Admin & Volunteer */}
      {(me.role === "admin" || me.role === "volunteer") && (
        <div className="card bg-white shadow-sm border border-slate-100 rounded-xl p-6 h-80 flex flex-col">
          <h3 className="font-bold text-lg mb-4 text-slate-700">Requests Overview</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    ...(me.role === "admin" ? [{ name: "Users", value: stats.users }] : []),
                    { name: "Requests", value: stats.requests },
                    { name: "Funds", value: stats.funds || 1 }
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Donor Section - Recent Requests */}
      {me.role === "donor" && (
        <div className="card bg-white shadow-sm border border-slate-100 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h3 className="text-lg font-black text-slate-800">Recent Requests (max 3)</h3>
            <Link to="/dashboard/my-donation-requests" className="btn-outline text-xs sm:text-sm px-3 py-1.5 w-full sm:w-auto text-center">
              View all requests
            </Link>
          </div>

          {recent.length > 0 ? (
            <RequestsTable items={recent} />
          ) : (
            <div className="text-center text-slate-500 py-10 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <span className="text-4xl block mb-2">📭</span>
              You have no donation requests yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

//  Stat Card Component
function StatCard({ title, value, icon }) {
  return (
    <div className="card bg-white shadow-sm border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-black mt-1 text-slate-800">{value}</p>
        </div>
        <div className="text-4xl opacity-20">{icon}</div>
      </div>
    </div>
  );
}

//  Requests Table Component (Cleaned for DOM Nesting Warning)
function RequestsTable({ items }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-100">
      <table className="w-full text-sm min-w-[600px]">
        <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
          <tr>
            <th className="p-3 text-left whitespace-nowrap">Recipient</th>
            <th className="p-3 text-left whitespace-nowrap">Location</th>
            <th className="p-3 text-center whitespace-nowrap">Date</th>
            <th className="p-3 text-center whitespace-nowrap">Blood</th>
            <th className="p-3 text-center whitespace-nowrap">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((r) => (
            <tr key={r._id} className="hover:bg-slate-50/50 transition-colors">
              <td className="p-3 font-medium text-slate-800">{r.recipientName}</td>
              <td className="p-3 text-slate-600">
                <span className="block text-xs sm:text-sm">{r.recipientDistrict}, {r.recipientUpazila}</span>
              </td>
              <td className="p-3 text-center text-slate-600 whitespace-nowrap">{r.donationDate}</td>
              <td className="p-3 text-center">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-50 text-rose-600 font-bold text-xs border border-rose-100">
                  {r.bloodGroup}
                </span>
              </td>
              <td className="p-3 text-center">
                <span className={`px-2 py-1 rounded text-xs font-semibold capitalize inline-block min-w-[70px] text-center
                  ${r.status === 'done' ? 'bg-green-100 text-green-700' : 
                    r.status === 'canceled' ? 'bg-red-100 text-red-700' : 
                    r.status === 'inprogress' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-slate-100 text-slate-600'}`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}