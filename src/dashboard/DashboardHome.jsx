


import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function DashboardHome() {
  const { me } = useOutletContext();
  const [recent, setRecent] = useState([]);
  const [stats, setStats] = useState({ users: 0, requests: 0, funds: 0 });
  const [loading, setLoading] = useState(true);

  // Chart Colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
      <div className="min-h-[60vh] grid place-items-center text-slate-500 dark:text-slate-400">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!me) return null;

  const displayName = me?.name || me?.displayName || "User";

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-0">
      
      {/* Welcome Card */}
      <div className="card bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-8 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
          Welcome, <span className="text-primary">{displayName}</span> 👋
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Role: <span className="capitalize font-bold bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded text-slate-700 dark:text-slate-200">{me.role}</span> • Status: <span className="capitalize font-bold text-green-600 dark:text-green-400">{me.status}</span>
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
        <div className="card bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-6 h-96 flex flex-col">
          <h3 className="font-bold text-lg mb-4 text-slate-700 dark:text-white">Requests Overview</h3>
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
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {[0,1,2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                
                <Tooltip 
                  contentStyle={{
                    backgroundColor: document.documentElement.classList.contains("dark") ? "#1e293b" : "#ffffff",
                    borderColor: document.documentElement.classList.contains("dark") ? "#334155" : "#e2e8f0",
                    color: document.documentElement.classList.contains("dark") ? "#f1f5f9" : "#1e293b",
                    borderRadius: "8px"
                  }} 
                  itemStyle={{ color: document.documentElement.classList.contains("dark") ? "#cbd5e1" : "#475569" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Donor Section - Recent Requests */}
      {me.role === "donor" && (
        <div className="card bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <h3 className="text-xl font-black text-slate-800 dark:text-white">Recent Requests</h3>
            <Link to="/dashboard/my-donation-requests" className="btn-outline text-xs sm:text-sm px-4 py-2">
              View All
            </Link>
          </div>

          {recent.length > 0 ? (
            <RequestsTable items={recent} />
          ) : (
            <div className="text-center text-slate-500 dark:text-slate-400 py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <span className="text-4xl block mb-2">📭</span>
              You have no donation requests yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="card bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-black mt-2 text-slate-800 dark:text-white">{value}</p>
        </div>
        <div className="text-5xl opacity-10 dark:opacity-20 dark:text-white">{icon}</div>
      </div>
    </div>
  );
}

function RequestsTable({ items }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700">
      <table className="w-full text-sm min-w-[600px]">
        <thead className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold border-b dark:border-slate-600">
          <tr>
            <th className="p-4 text-left whitespace-nowrap">Recipient</th>
            <th className="p-4 text-left whitespace-nowrap">Location</th>
            <th className="p-4 text-center whitespace-nowrap">Date</th>
            <th className="p-4 text-center whitespace-nowrap">Blood</th>
            <th className="p-4 text-center whitespace-nowrap">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
          {items.map((r) => (
            <tr key={r._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <td className="p-4 font-bold text-slate-800 dark:text-white">{r.recipientName}</td>
              <td className="p-4 text-slate-600 dark:text-slate-300">
                <span className="block text-sm">{r.recipientDistrict}, {r.recipientUpazila}</span>
              </td>
              <td className="p-4 text-center text-slate-600 dark:text-slate-300 whitespace-nowrap">{r.donationDate}</td>
              <td className="p-4 text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-100 dark:border-rose-800">
                  {r.bloodGroup}
                </span>
              </td>
              <td className="p-4 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-block min-w-[80px] text-center
                  ${r.status === 'done' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 
                    r.status === 'canceled' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 
                    r.status === 'inprogress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 
                    'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
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