

import { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

export default function AllUsers() {
  const { user: currentUser } = useAuth();
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  const load = async () => {
    try {
      const res = await axiosSecure.get(`/api/users?status=${filter}&page=1&limit=999`);
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/api/users/${id}/status`, { status });
      toast.success(`User is now ${status}`);
      load();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const updateRole = async (id, role) => {
    try {
      await axiosSecure.patch(`/api/users/${id}/role`, { role });
      toast.success(`Role updated to ${role}`);
      load();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="card p-6 bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">All Users Management</h2>
        
        <div className="w-full md:w-auto">
          <select
            className="input w-full md:w-56 bg-slate-50 dark:bg-slate-700 dark:text-white border-slate-200 dark:border-slate-600"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      
      <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-700">
        
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold border-b dark:border-slate-600">
            <tr>
              <th className="p-4 text-left whitespace-nowrap">User Info</th>
              <th className="p-4 text-center whitespace-nowrap">Role</th>
              <th className="p-4 text-center whitespace-nowrap">Status</th>
              <th className="p-4 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b dark:border-slate-700">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-600 shadow-sm"
                      src={u.avatar || "https://i.ibb.co/9W7w7yY/user.png"}
                      alt=""
                    />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-white">{u.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize inline-block min-w-[80px]
                    ${u.role === "admin" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" :
                      u.role === "volunteer" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" :
                      "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>
                    {u.role}
                  </span>
                </td>

                {/* Status */}
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize
                    ${u.status === "active" ? "text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400" : "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400"}`}>
                    {u.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    
                    {u.email === currentUser?.email ? (
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium border dark:border-slate-600 px-3 py-1.5 rounded bg-slate-50 dark:bg-slate-800">
                        It's You
                      </span>
                    ) : (
                      <>
                        {/* Block/Unblock */}
                        {u.status === "active" ? (
                          <button 
                            onClick={() => updateStatus(u._id, "blocked")} 
                            className="btn-outline text-xs px-3 py-1.5 text-red-500 border-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-600"
                          >
                            Block
                          </button>
                        ) : (
                          <button 
                            onClick={() => updateStatus(u._id, "active")} 
                            className="btn-primary text-xs px-3 py-1.5 bg-green-600 hover:bg-green-700 border-none"
                          >
                            Unblock
                          </button>
                        )}

                        {/* Role Change Buttons */}
                        {u.role !== "admin" && (
                            <button onClick={() => updateRole(u._id, "admin")} className="btn-primary text-xs px-3 py-1.5">Make Admin</button>
                        )}
                        {u.role !== "volunteer" && (
                            <button onClick={() => updateRole(u._id, "volunteer")} className="btn-outline text-xs px-3 py-1.5">Make Volunteer</button>
                        )}
                        {u.role !== "donor" && (
                            <button onClick={() => updateRole(u._id, "donor")} className="btn-outline text-xs px-3 py-1.5">Make Donor</button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {/* Empty State */}
            {!users.length && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-800">
                  No users found matching your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}