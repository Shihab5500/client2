// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import { useEffect, useState } from "react";
// import axiosSecure from "../api/axiosSecure";

// export default function DashboardLayout() {
//   const { user, loading } = useAuth();
//   const [me, setMe] = useState(null);
//   const [dashLoading, setDashLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (loading) return; // firebase এখনো চেক করছে

//     const loadMe = async () => {
//       try {
//         if (!user?.email) {
//           setDashLoading(false);
//           return navigate("/login");
//         }

//         const res = await axiosSecure.get("/api/users/me");
//         setMe(res.data);
//       } catch (err) {
//         console.log("ME ERROR:", err?.response?.data || err.message);
        
//         // 🛑 [FIX] সার্ভার এরর দিলে বা ইউজার না পেলে জোর করে লগআউট করাবেন না।
//         // navigate("/login"); <--- এই লাইনটি সমস্যার মূল কারণ ছিল
        
//       } finally {
//         setDashLoading(false); // ✅ fail/success যাই হোক loading off
//       }
//     };

//     loadMe();
//   }, [user, loading, navigate]);

//   if (loading || dashLoading) {
//     return (
//       <div className="min-h-screen grid place-items-center">
//         Loading dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen grid grid-cols-12 bg-slate-50">
//       <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white border-r p-4 sticky top-0 h-screen">
//         <div className="font-black text-xl text-primary mb-6">BloodBond</div>

//         <nav className="space-y-1">
//           <NavLink to="/dashboard" end className="block px-3 py-2 rounded-lg hover:bg-soft">
//             Dashboard Home
//           </NavLink>
//           <NavLink to="/dashboard/profile" className="block px-3 py-2 rounded-lg hover:bg-soft">
//             Profile
//           </NavLink>

//           {me?.role === "donor" && (
//             <>
//               <NavLink to="/dashboard/create-donation-request" className="block px-3 py-2 rounded-lg hover:bg-soft">
//                 Create Request
//               </NavLink>
//               <NavLink to="/dashboard/my-donation-requests" className="block px-3 py-2 rounded-lg hover:bg-soft">
//                 My Requests
//               </NavLink>
//             </>
//           )}

//           {me?.role === "admin" && (
//             <NavLink to="/dashboard/all-users" className="block px-3 py-2 rounded-lg hover:bg-soft">
//               All Users
//             </NavLink>
//           )}

//           {(me?.role === "admin" || me?.role === "volunteer") && (
//             <>
//               <NavLink to="/dashboard/all-blood-donation-request" className="block px-3 py-2 rounded-lg hover:bg-soft">
//                 All Requests
//               </NavLink>
//               <NavLink to="/dashboard/funding" className="block px-3 py-2 rounded-lg hover:bg-soft">
//                 Funding
//               </NavLink>
//             </>
//           )}
//         </nav>
//       </aside>

//       <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4 md:p-6">
//         {/* me পাস করা হচ্ছে, কিন্তু যদি me null হয় তবে চাইল্ড কম্পোনেন্ট সেটা হ্যান্ডেল করবে */}
//         <Outlet context={{ me }} />
//       </main>
//     </div>
//   );
// }

// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import { useEffect, useState } from "react";
// import axiosSecure from "../api/axiosSecure";

// export default function DashboardLayout() {
//   const { user, loading } = useAuth();
//   const [me, setMe] = useState(null);
//   const [dashLoading, setDashLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (loading) return;

//     const loadMe = async () => {
//       try {
//         if (!user?.email) {
//           setDashLoading(false);
//           return navigate("/login");
//         }

//         const res = await axiosSecure.get("/api/users/me");
//         setMe(res.data);
//       } catch (err) {
//         console.log("ME ERROR:", err?.response?.data || err.message);
//         // এখানে জোর করে navigate("/login") দিলে লুপ হতে পারে, তাই দেওয়া হলো না।
//       } finally {
//         setDashLoading(false);
//       }
//     };

//     loadMe();
//   }, [user, loading, navigate]);

//   if (loading || dashLoading) {
//     return (
//       <div className="min-h-screen grid place-items-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   // যদি ইউজার ডাটা না পাওয়া যায় (Safe Fallback)
//   if (!me) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
//         <p>User profile not found. Please register again.</p>
//         <button onClick={() => navigate("/")} className="btn btn-primary">Go Home</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen grid grid-cols-12 bg-slate-50">
//       <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white border-r p-4 sticky top-0 h-screen overflow-y-auto">
//         <div className="font-black text-xl text-primary mb-6">BloodBond</div>

//         <nav className="space-y-1">
//           <NavLink to="/dashboard" end className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//             Dashboard Home
//           </NavLink>
//           <NavLink to="/dashboard/profile" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//             Profile
//           </NavLink>

//           {me?.role === "donor" && (
//             <>
//               <NavLink to="/dashboard/create-donation-request" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//                 Create Request
//               </NavLink>
//               <NavLink to="/dashboard/my-donation-requests" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//                 My Requests
//               </NavLink>
//             </>
//           )}

//           {me?.role === "admin" && (
//             <NavLink to="/dashboard/all-users" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//               All Users
//             </NavLink>
//           )}

//           {(me?.role === "admin" || me?.role === "volunteer") && (
//             <>
//               <NavLink to="/dashboard/all-blood-donation-request" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//                 All Requests
//               </NavLink>
//               <NavLink to="/dashboard/funding" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//                 Funding
//               </NavLink>
//             </>
//           )}
//         </nav>
//       </aside>

//       <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4 md:p-6 overflow-x-auto">
//         <Outlet context={{ me }} />
//       </main>
//     </div>
//   );
// }



// import { Outlet, NavLink, useNavigate, Link } from "react-router-dom"; // ✅ Link ইমপোর্ট করা হলো
// import useAuth from "../hooks/useAuth";
// import { useEffect, useState } from "react";
// import axiosSecure from "../api/axiosSecure";

// export default function DashboardLayout() {
//   const { user, loading } = useAuth();
//   const [me, setMe] = useState(null);
//   const [dashLoading, setDashLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (loading) return;

//     const loadMe = async () => {
//       try {
//         if (!user?.email) {
//           setDashLoading(false);
//           return navigate("/login");
//         }

//         const res = await axiosSecure.get("/api/users/me");
//         setMe(res.data);
//       } catch (err) {
//         console.log("ME ERROR:", err?.response?.data || err.message);
//         // এখানে জোর করে navigate("/login") দিলে লুপ হতে পারে, তাই দেওয়া হলো না।
//       } finally {
//         setDashLoading(false);
//       }
//     };

//     loadMe();
//   }, [user, loading, navigate]);

//   if (loading || dashLoading) {
//     return (
//       <div className="min-h-screen grid place-items-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   // যদি ইউজার ডাটা না পাওয়া যায় (Safe Fallback)
//   if (!me) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
//         <p>User profile not found. Please register again.</p>
//         <button onClick={() => navigate("/")} className="btn btn-primary">Go Home</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen grid grid-cols-12 bg-slate-50">
//       <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white border-r p-4 sticky top-0 h-screen overflow-y-auto">
        
//         {/* 🛑 [CHANGE 1] লোগোতে ক্লিক করলে এখন হোম পেজে নিয়ে যাবে */}
//         <Link to="/" className="font-black text-xl text-primary mb-6 block hover:opacity-80">
//           BloodBond
//         </Link>

//         <nav className="space-y-1">
          
//           {/* 🛑 [CHANGE 2] ড্যাশবোর্ড থেকে বের হওয়ার জন্য 'Go Home' বাটন যুক্ত করা হলো */}
//           <NavLink to="/" className="block px-3 py-2 rounded-lg hover:bg-soft mb-4 border border-slate-100 text-slate-700 font-semibold">
//             🏠 Go Home
//           </NavLink>

//           <p className="px-3 text-xs font-bold text-slate-400 uppercase mb-2 mt-4">Dashboard Menu</p>

//           <NavLink to="/dashboard" end className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//             Dashboard Home
//           </NavLink>
//           <NavLink to="/dashboard/profile" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//             Profile
//           </NavLink>

//           {me?.role === "donor" && (
//             <>
//               <NavLink to="/dashboard/create-donation-request" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//                 Create Request
//               </NavLink>
//               <NavLink to="/dashboard/my-donation-requests" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//                 My Requests
//               </NavLink>
//             </>
//           )}

//           {me?.role === "admin" && (
//             <NavLink to="/dashboard/all-users" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//               All Users
//             </NavLink>
//           )}

//           {(me?.role === "admin" || me?.role === "volunteer") && (
//             <>
//               <NavLink to="/dashboard/all-blood-donation-request" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//                 All Requests
//               </NavLink>
//               <NavLink to="/dashboard/funding" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//                 Funding
//               </NavLink>
//             </>
//           )}
//         </nav>
//       </aside>

//       <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4 md:p-6 overflow-x-auto">
//         <Outlet context={{ me }} />
//       </main>
//     </div>
//   );
// }




// import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import { useEffect, useState } from "react";
// import axiosSecure from "../api/axiosSecure";

// export default function DashboardLayout() {
//   const { user, loading } = useAuth();
//   const [me, setMe] = useState(null);
//   const [dashLoading, setDashLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (loading) return;

//     const loadMe = async () => {
//       try {
//         if (!user?.email) {
//           setDashLoading(false);
//           return navigate("/login");
//         }

//         const res = await axiosSecure.get("/api/users/me");
//         setMe(res.data);
//       } catch (err) {
//         console.log("ME ERROR:", err?.response?.data || err.message);
//       } finally {
//         setDashLoading(false);
//       }
//     };

//     loadMe();
//   }, [user, loading, navigate]);

//   if (loading || dashLoading) {
//     return (
//       <div className="min-h-screen grid place-items-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   // যদি ইউজার ডাটা না পাওয়া যায় (Safe Fallback)
//   if (!me) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
//         <p>User profile not found. Please register again.</p>
//         <button onClick={() => navigate("/")} className="btn btn-primary">Go Home</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen grid grid-cols-12 bg-slate-50">
//       <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white border-r p-4 sticky top-0 h-screen overflow-y-auto">
        
//         {/* লোগোতে ক্লিক করলে হোম পেজে যাবে */}
//         <Link to="/" className="font-black text-xl text-primary mb-6 block hover:opacity-80">
//           BloodBond
//         </Link>

//         <nav className="space-y-1">
          
//           {/* 'Go Home' বাটন */}
//           <NavLink to="/" className="block px-3 py-2 rounded-lg hover:bg-soft mb-4 border border-slate-100 text-slate-700 font-semibold">
//             🏠 Go Home
//           </NavLink>

//           <p className="px-3 text-xs font-bold text-slate-400 uppercase mb-2 mt-4">Dashboard Menu</p>

//           {/* ১. কমন মেনু (সবার জন্য) */}
//           <NavLink to="/dashboard" end className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
//             Dashboard Home
//           </NavLink>
//           <NavLink to="/dashboard/profile" className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>


import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import { HiMenuAlt2 } from "react-icons/hi"; // npm install react-icons

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const [me, setMe] = useState(null);
  const [dashLoading, setDashLoading] = useState(true);
  
  // ✅ সাইডবার খোলা/বন্ধ করার স্টেট
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navigate = useNavigate();

  // ✅ লিংক ক্লিক করলে সাইডবার বন্ধ করার ফাংশন
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    if (loading) return;

    const loadMe = async () => {
      try {
        if (!user?.email) {
          setDashLoading(false);
          return navigate("/login");
        }
        const res = await axiosSecure.get("/api/users/me");
        setMe(res.data);
      } catch (err) {
        console.log("ME ERROR:", err?.response?.data || err.message);
      } finally {
        setDashLoading(false);
      }
    };
    loadMe();
  }, [user, loading, navigate]);

  if (loading || dashLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
        <button onClick={() => navigate("/")} className="btn btn-primary">Go Home</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      
      {/* ✅ Mobile Overlay (Background dim) */}
      {/* বাইরে ক্লিক করলেও মেনু বন্ধ হবে */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
          onClick={closeSidebar}
        ></div>
      )}

      {/* ✅ Sidebar (Responsive Drawer) */}
      <aside 
        className={`fixed md:sticky top-0 h-screen w-64 bg-white border-r p-4 z-30 transition-transform duration-300 ease-in-out shadow-lg md:shadow-none
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-6">
          {/* লোগো ক্লিক করলে সাইডবার বন্ধ হবে এবং হোমে যাবে */}
          <Link to="/" onClick={closeSidebar} className="font-black text-xl text-primary hover:opacity-80">
            🩸Blood Donation
          </Link>
          
          {/* Close button for mobile */}
          <button 
            className="md:hidden btn btn-sm btn-circle btn-ghost text-slate-500"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>

        <nav className="space-y-1 h-[calc(100vh-100px)] overflow-y-auto">
          
          {/* ✅ প্রতিটা NavLink এ onClick={closeSidebar} দেওয়া হয়েছে */}
          
          <NavLink to="/" onClick={closeSidebar} className="block px-3 py-2 rounded-lg hover:bg-soft mb-4 border border-slate-100 text-slate-700 font-semibold">
            🏠 Go Home
          </NavLink>

          <p className="px-3 text-xs font-bold text-slate-400 uppercase mb-2 mt-4">Dashboard Menu</p>

          <NavLink to="/dashboard" end onClick={closeSidebar} className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
            Dashboard Home
          </NavLink>
          <NavLink to="/dashboard/profile" onClick={closeSidebar} className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
            Profile
          </NavLink>

          {me?.role === "donor" && (
            <>
              <NavLink to="/dashboard/create-donation-request" onClick={closeSidebar} className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
                Create Request
              </NavLink>
              <NavLink to="/dashboard/my-donation-requests" onClick={closeSidebar} className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
                My Requests
              </NavLink>
            </>
          )}

          {me?.role === "admin" && (
            <NavLink to="/dashboard/all-users" onClick={closeSidebar} className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
              All Users
            </NavLink>
          )}

          {(me?.role === "admin" || me?.role === "volunteer") && (
            <>
              <NavLink to="/dashboard/all-blood-donation-request" onClick={closeSidebar} className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
                All Requests
              </NavLink>
            </>
          )}

          <NavLink to="/dashboard/funding" onClick={closeSidebar} className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-soft"}`}>
            Funding
          </NavLink>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-4 md:p-6 w-full overflow-x-hidden">
        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden mb-4 flex items-center gap-2">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="btn btn-ghost btn-circle bg-white shadow-sm border border-slate-200"
          >
            <HiMenuAlt2 size={24} className="text-slate-700" />
          </button>
          <span className="font-bold text-lg text-slate-700">Dashboard</span>
        </div>

        <div className="max-w-7xl mx-auto">
          <Outlet context={{ me }} />
        </div>
      </main>
    </div>
  );
}