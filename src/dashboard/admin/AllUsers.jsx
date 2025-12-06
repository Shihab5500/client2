// import { useEffect, useState } from "react";
// import axiosSecure from "../../api/axiosSecure";
// import toast from "react-hot-toast";

// export default function AllUsers() {
//   const [filter, setFilter] = useState("");
//   const [users, setUsers] = useState([]);

//   const load = async () => {
//     const res = await axiosSecure.get(`/api/users?status=${filter}&page=1&limit=999`);
//     setUsers(res.data.users);
//   };

//   useEffect(()=>{ load(); },[filter]);

//   const updateStatus = async (id, status) => {
//     await axiosSecure.patch(`/api/users/${id}/status`, { status });
//     toast.success("Status updated");
//     load();
//   };

//   const updateRole = async (id, role) => {
//     await axiosSecure.patch(`/api/users/${id}/role`, { role });
//     toast.success("Role updated");
//     load();
//   };

//   return (
//     <div className="card p-6">
//       <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
//         <h2 className="text-xl font-black">All Users</h2>
//         <select className="input md:w-56" value={filter} onChange={e=>setFilter(e.target.value)}>
//           <option value="">All</option>
//           <option value="active">active</option>
//           <option value="blocked">blocked</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="p-2 text-left">User</th>
//               <th className="p-2">Role</th>
//               <th className="p-2">Status</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(u=>(
//               <tr key={u._id} className="border-b">
//                 <td className="p-2 flex items-center gap-2">
//                   <img className="w-9 h-9 rounded-full object-cover" src={u.avatar} alt="" />
//                   <div>
//                     <p className="font-semibold">{u.name}</p>
//                     <p className="text-xs text-slate-500">{u.email}</p>
//                   </div>
//                 </td>
//                 <td className="p-2 text-center">{u.role}</td>
//                 <td className="p-2 text-center">{u.status}</td>

//                 <td className="p-2">
//                   <div className="flex flex-wrap gap-2">
//                     {u.status === "active" ? (
//                       <button onClick={()=>updateStatus(u._id,"blocked")} className="btn-outline text-xs px-2 py-1">
//                         Block
//                       </button>
//                     ) : (
//                       <button onClick={()=>updateStatus(u._id,"active")} className="btn-primary text-xs px-2 py-1">
//                         Unblock
//                       </button>
//                     )}

//                     {u.role === "donor" && (
//                       <button onClick={()=>updateRole(u._id,"volunteer")} className="btn-outline text-xs px-2 py-1">
//                         Make Volunteer
//                       </button>
//                     )}

//                     {u.role !== "admin" && (
//                       <button onClick={()=>updateRole(u._id,"admin")} className="btn-primary text-xs px-2 py-1">
//                         Make Admin
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {!users.length && (
//               <tr><td colSpan="4" className="p-4 text-center text-slate-500">No users found.</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import axiosSecure from "../../api/axiosSecure";
// import toast from "react-hot-toast";

// export default function AllUsers() {
//   const [filter, setFilter] = useState("");
//   const [users, setUsers] = useState([]);

//   const load = async () => {
//     const res = await axiosSecure.get(`/api/users?status=${filter}&page=1&limit=999`);
//     setUsers(res.data.users);
//   };

//   useEffect(()=>{ load(); },[filter]);

//   const updateStatus = async (id, status) => {
//     await axiosSecure.patch(`/api/users/${id}/status`, { status });
//     toast.success("Status updated");
//     load();
//   };

//   const updateRole = async (id, role) => {
//     await axiosSecure.patch(`/api/users/${id}/role`, { role });
//     toast.success(`User is now a ${role}`);
//     load();
//   };

//   return (
//     <div className="card p-6">
//       <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
//         <h2 className="text-xl font-black">All Users</h2>
//         <select className="input md:w-56" value={filter} onChange={e=>setFilter(e.target.value)}>
//           <option value="">All</option>
//           <option value="active">active</option>
//           <option value="blocked">blocked</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="p-2 text-left">User</th>
//               <th className="p-2">Role</th>
//               <th className="p-2">Status</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(u=>(
//               <tr key={u._id} className="border-b">
//                 <td className="p-2 flex items-center gap-2">
//                   <img className="w-9 h-9 rounded-full object-cover" src={u.avatar} alt="" />
//                   <div>
//                     <p className="font-semibold">{u.name}</p>
//                     <p className="text-xs text-slate-500">{u.email}</p>
//                   </div>
//                 </td>
//                 <td className="p-2 text-center capitalize">{u.role}</td>
//                 <td className="p-2 text-center capitalize">{u.status}</td>

//                 <td className="p-2">
//                   <div className="flex flex-wrap gap-2">
//                     {/* Status Toggle (Block/Unblock) */}
//                     {u.status === "active" ? (
//                       <button onClick={()=>updateStatus(u._id,"blocked")} className="btn-outline text-xs px-2 py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
//                         Block
//                       </button>
//                     ) : (
//                       <button onClick={()=>updateStatus(u._id,"active")} className="btn-primary text-xs px-2 py-1 bg-green-600 hover:bg-green-700 border-none">
//                         Unblock
//                       </button>
//                     )}

//                     {/* Role Actions */}

//                     {/* 1. Donor -> Volunteer */}
//                     {u.role === "donor" && (
//                       <button onClick={()=>updateRole(u._id,"volunteer")} className="btn-outline text-xs px-2 py-1">
//                         Make Volunteer
//                       </button>
//                     )}

//                     {/* 2. Volunteer -> Donor (NEW ADDITION) */}
//                     {u.role === "volunteer" && (
//                       <button onClick={()=>updateRole(u._id,"donor")} className="btn-outline text-xs px-2 py-1">
//                         Make Donor
//                       </button>
//                     )}

//                     {/* 3. Make Admin (Any non-admin can be made admin) */}
//                     {u.role !== "admin" && (
//                       <button onClick={()=>updateRole(u._id,"admin")} className="btn-primary text-xs px-2 py-1">
//                         Make Admin
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {!users.length && (
//               <tr><td colSpan="4" className="p-4 text-center text-slate-500">No users found.</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import axiosSecure from "../../api/axiosSecure";
// import toast from "react-hot-toast";
// import useAuth from "../../hooks/useAuth"; // নিজের ইমেল চেক করার জন্য

// export default function AllUsers() {
//   const { user: currentUser } = useAuth(); // বর্তমানে লগইন করা অ্যাডমিন
//   const [filter, setFilter] = useState("");
//   const [users, setUsers] = useState([]);

//   const load = async () => {
//     const res = await axiosSecure.get(`/api/users?status=${filter}&page=1&limit=999`);
//     setUsers(res.data.users);
//   };

//   useEffect(()=>{ load(); },[filter]);

//   const updateStatus = async (id, status) => {
//     await axiosSecure.patch(`/api/users/${id}/status`, { status });
//     toast.success(`User is now ${status}`);
//     load();
//   };

//   const updateRole = async (id, role) => {
//     await axiosSecure.patch(`/api/users/${id}/role`, { role });
//     toast.success(`Role updated to ${role}`);
//     load();
//   };

//   return (
//     <div className="card p-6">
//       <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
//         <h2 className="text-xl font-black">All Users</h2>
//         <select className="input md:w-56" value={filter} onChange={e=>setFilter(e.target.value)}>
//           <option value="">All Status</option>
//           <option value="active">Active</option>
//           <option value="blocked">Blocked</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="p-2 text-left">User</th>
//               <th className="p-2">Role</th>
//               <th className="p-2">Status</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(u=>(
//               <tr key={u._id} className="border-b">
//                 <td className="p-2 flex items-center gap-2">
//                   <img className="w-9 h-9 rounded-full object-cover" src={u.avatar || "https://i.ibb.co/9W7w7yY/user.png"} alt="" />
//                   <div>
//                     <p className="font-semibold">{u.name}</p>
//                     <p className="text-xs text-slate-500">{u.email}</p>
//                   </div>
//                 </td>
                
//                 {/* Role Badge */}
//                 <td className="p-2 text-center">
//                   <span className={`px-2 py-1 rounded text-xs font-bold capitalize
//                     ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
//                       u.role === 'volunteer' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
//                     {u.role}
//                   </span>
//                 </td>
                
//                 <td className="p-2 text-center capitalize">{u.status}</td>

//                 <td className="p-2">
//                   <div className="flex flex-wrap gap-2">
                    
//                     {/* 🛑 নিজেকে ব্লক বা রোল চেঞ্জ করা যাবে না */}
//                     {u.email === currentUser?.email ? (
//                         <span className="text-xs text-slate-400 font-medium border px-2 py-1 rounded">It's You</span>
//                     ) : (
//                       <>
//                         {/* Status Actions */}
//                         {u.status === "active" ? (
//                           <button onClick={()=>updateStatus(u._id,"blocked")} className="btn-outline text-xs px-2 py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
//                             Block
//                           </button>
//                         ) : (
//                           <button onClick={()=>updateStatus(u._id,"active")} className="btn-primary text-xs px-2 py-1 bg-green-600 hover:bg-green-700 border-none">
//                             Unblock
//                           </button>
//                         )}

//                         {/* Role Changing Logic (Dynamic) */}
                        
//                         {/* যদি Donor হয় -> Volunteer বা Admin বানানো যাবে */}
//                         {u.role === "donor" && (
//                           <>
//                             <button onClick={()=>updateRole(u._id,"volunteer")} className="btn-outline text-xs px-2 py-1">Make Volunteer</button>
//                             <button onClick={()=>updateRole(u._id,"admin")} className="btn-primary text-xs px-2 py-1">Make Admin</button>
//                           </>
//                         )}

//                         {/* যদি Volunteer হয় -> Donor বা Admin বানানো যাবে */}
//                         {u.role === "volunteer" && (
//                           <>
//                             <button onClick={()=>updateRole(u._id,"donor")} className="btn-outline text-xs px-2 py-1">Make Donor</button>
//                             <button onClick={()=>updateRole(u._id,"admin")} className="btn-primary text-xs px-2 py-1">Make Admin</button>
//                           </>
//                         )}

//                         {/* যদি Admin হয় -> Donor বা Volunteer বানানো যাবে (Demote) */}
//                         {u.role === "admin" && (
//                           <>
//                             <button onClick={()=>updateRole(u._id,"donor")} className="btn-outline text-xs px-2 py-1">Make Donor</button>
//                             <button onClick={()=>updateRole(u._id,"volunteer")} className="btn-outline text-xs px-2 py-1">Make Volunteer</button>
//                           </>
//                         )}
//                       </>
//                     )}

//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import axiosSecure from "../../api/axiosSecure";
// import toast from "react-hot-toast";
// import useAuth from "../../hooks/useAuth"; 

// export default function AllUsers() {
//   const { user: currentUser } = useAuth(); 
//   const [filter, setFilter] = useState("");
//   const [users, setUsers] = useState([]);

//   const load = async () => {
//     try {
//       const res = await axiosSecure.get(`/api/users?status=${filter}&page=1&limit=999`);
//       setUsers(res.data.users);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(()=>{ load(); },[filter]);

//   const updateStatus = async (id, status) => {
//     await axiosSecure.patch(`/api/users/${id}/status`, { status });
//     toast.success(`User is now ${status}`);
//     load();
//   };

//   const updateRole = async (id, role) => {
//     await axiosSecure.patch(`/api/users/${id}/role`, { role });
//     toast.success(`Role updated to ${role}`);
//     load();
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto">
//       <div className="card bg-white shadow-sm border border-slate-100 rounded-xl p-4 sm:p-6">
        
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <h2 className="text-xl md:text-2xl font-black text-slate-800">All Users Management</h2>
          
//           <div className="w-full md:w-auto">
//             <select 
//               className="input w-full md:w-56 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer bg-slate-50 border-slate-200"
//               value={filter} 
//               onChange={e=>setFilter(e.target.value)}
//             >
//               <option value="">All Status</option>
//               <option value="active">Active</option>
//               <option value="blocked">Blocked</option>
//             </select>
//           </div>
//         </div>

//         {/* ✅ Table Responsive Container */}
//         <div className="overflow-x-auto rounded-lg border border-slate-100">
//           <table className="w-full text-sm min-w-[900px]"> {/* min-w ensures horizontal scroll */}
//             <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
//               <tr>
//                 <th className="p-4 text-left whitespace-nowrap">User Info</th>
//                 <th className="p-4 text-center whitespace-nowrap">Role</th>
//                 <th className="p-4 text-center whitespace-nowrap">Status</th>
//                 <th className="p-4 text-left whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {users.map(u=>(
//                 <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
//                   <td className="p-4">
//                     <div className="flex items-center gap-3">
//                       <img 
//                         className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" 
//                         src={u.avatar || "https://i.ibb.co/9W7w7yY/user.png"} 
//                         alt="" 
//                       />
//                       <div>
//                         <p className="font-bold text-slate-800">{u.name}</p>
//                         <p className="text-xs text-slate-500">{u.email}</p>
//                       </div>
//                     </div>
//                   </td>
                  
//                   {/* Role Badge */}
//                   <td className="p-4 text-center">
//                     <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize inline-block min-w-[80px]
//                       ${u.role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 
//                         u.role === 'volunteer' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 
//                         'bg-slate-100 text-slate-600 border border-slate-200'}`}>
//                       {u.role}
//                     </span>
//                   </td>
                  
//                   <td className="p-4 text-center">
//                     <span className={`px-2 py-1 rounded text-xs font-medium capitalize
//                       ${u.status === 'active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
//                       {u.status}
//                     </span>
//                   </td>

//                   <td className="p-4">
//                     <div className="flex flex-wrap items-center gap-2">
                      
//                       {/* 🛑 নিজেকে ব্লক বা রোল চেঞ্জ করা যাবে না */}
//                       {u.email === currentUser?.email ? (
//                           <span className="text-xs text-slate-400 font-medium border px-3 py-1.5 rounded bg-slate-50">It's You</span>
//                       ) : (
//                         <>
//                           {/* Status Actions */}
//                           {u.status === "active" ? (
//                             <button onClick={()=>updateStatus(u._id,"blocked")} className="btn-outline text-xs px-3 py-1.5 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-all">
//                               Block
//                             </button>
//                           ) : (
//                             <button onClick={()=>updateStatus(u._id,"active")} className="btn-primary text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 border-none shadow-sm shadow-emerald-200">
//                               Unblock
//                             </button>
//                           )}

//                           {/* Role Changing Logic (Dynamic) */}
                          
//                           {/* Donor -> Volunteer / Admin */}
//                           {u.role === "donor" && (
//                             <>
//                               <button onClick={()=>updateRole(u._id,"volunteer")} className="btn-outline text-xs px-3 py-1.5 border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-all">Make Volunteer</button>
//                               <button onClick={()=>updateRole(u._id,"admin")} className="btn-primary text-xs px-3 py-1.5">Make Admin</button>
//                             </>
//                           )}

//                           {/* Volunteer -> Donor / Admin */}
//                           {u.role === "volunteer" && (
//                             <>
//                               <button onClick={()=>updateRole(u._id,"donor")} className="btn-outline text-xs px-3 py-1.5 border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-all">Make Donor</button>
//                               <button onClick={()=>updateRole(u._id,"admin")} className="btn-primary text-xs px-3 py-1.5">Make Admin</button>
//                             </>
//                           )}

//                           {/* Admin -> Donor / Volunteer */}
//                           {u.role === "admin" && (
//                             <>
//                               <button onClick={()=>updateRole(u._id,"donor")} className="btn-outline text-xs px-3 py-1.5 border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-all">Make Donor</button>
//                               <button onClick={()=>updateRole(u._id,"volunteer")} className="btn-outline text-xs px-3 py-1.5 border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-all">Make Volunteer</button>
//                             </>
//                           )}
//                         </>
//                       )}

//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {!users.length && (
//                 <tr>
//                   <td colSpan="4" className="p-8 text-center text-slate-500 bg-slate-50/30">
//                     No users found matching your filter.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }





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

  useEffect(() => {
    load();
  }, [filter]);

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
    <div className="card p-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-black text-slate-800">All Users Management</h2>
        
        <div className="w-full md:w-auto">
          <select
            className="input w-full md:w-56 focus:ring-2 focus:ring-primary/20 bg-slate-50 border-slate-200"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* ✅ Responsive Table Wrapper */}
      {/* overflow-x-auto থাকার কারণে মোবাইলে স্ক্রল হবে */}
      <div className="overflow-x-auto rounded-lg border border-slate-100">
        
        {/* min-w-[900px] টেবিলকে ছোট হতে বাধা দেবে */}
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
            <tr>
              <th className="p-4 text-left whitespace-nowrap">User Info</th>
              <th className="p-4 text-center whitespace-nowrap">Role</th>
              <th className="p-4 text-center whitespace-nowrap">Status</th>
              <th className="p-4 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50/50 transition-colors border-b">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                      src={u.avatar || "https://i.ibb.co/9W7w7yY/user.png"}
                      alt=""
                    />
                    <div>
                      <p className="font-bold text-slate-800">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize inline-block min-w-[80px]
                    ${u.role === "admin" ? "bg-purple-100 text-purple-700 border border-purple-200" :
                      u.role === "volunteer" ? "bg-blue-100 text-blue-700 border border-blue-200" :
                      "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                    {u.role}
                  </span>
                </td>

                {/* Status */}
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize
                    ${u.status === "active" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}>
                    {u.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* নিজেকে এডিট করা যাবে না */}
                    {u.email === currentUser?.email ? (
                      <span className="text-xs text-slate-400 font-medium border px-3 py-1.5 rounded bg-slate-50">
                        It's You
                      </span>
                    ) : (
                      <>
                        {/* Block/Unblock */}
                        {u.status === "active" ? (
                          <button 
                            onClick={() => updateStatus(u._id, "blocked")} 
                            className="btn-outline text-xs px-3 py-1.5 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
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

                        {/* Role Change Logic */}
                        
                        {/* Donor -> Volunteer / Admin */}
                        {u.role === "donor" && (
                          <>
                            <button onClick={() => updateRole(u._id, "volunteer")} className="btn-outline text-xs px-3 py-1.5">Make Volunteer</button>
                            <button onClick={() => updateRole(u._id, "admin")} className="btn-primary text-xs px-3 py-1.5">Make Admin</button>
                          </>
                        )}

                        {/* Volunteer -> Donor / Admin */}
                        {u.role === "volunteer" && (
                          <>
                            <button onClick={() => updateRole(u._id, "donor")} className="btn-outline text-xs px-3 py-1.5">Make Donor</button>
                            <button onClick={() => updateRole(u._id, "admin")} className="btn-primary text-xs px-3 py-1.5">Make Admin</button>
                          </>
                        )}

                        {/* Admin -> Donor / Volunteer */}
                        {u.role === "admin" && (
                          <>
                            <button onClick={() => updateRole(u._id, "donor")} className="btn-outline text-xs px-3 py-1.5">Make Donor</button>
                            <button onClick={() => updateRole(u._id, "volunteer")} className="btn-outline text-xs px-3 py-1.5">Make Volunteer</button>
                          </>
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
                <td colSpan="4" className="p-8 text-center text-slate-500 bg-slate-50/30">
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