

import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import { HiMenuAlt2 } from "react-icons/hi"; 

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const [me, setMe] = useState(null);
  const [dashLoading, setDashLoading] = useState(true);
  
  // সাইডবার খোলা/বন্ধ করার স্টেট
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navigate = useNavigate();

  // লিংক ক্লিক করলে সাইডবার বন্ধ করার ফাংশন
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
      <div className="min-h-screen grid place-items-center bg-white dark:bg-slate-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
        <button onClick={() => navigate("/")} className="btn btn-primary">Go Home</button>
      </div>
    );
  }

  
  const navLinkClasses = ({isActive}) => `block px-3 py-2 rounded-lg transition-colors duration-200 mb-1 font-medium ${
    isActive 
      ? "bg-primary text-white shadow-md shadow-primary/30" 
      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
  }`;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 relative transition-colors duration-300">
      
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar (Responsive Drawer) */}
      <aside 
        className={`fixed md:sticky top-0 h-screen w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-4 z-30 transition-transform duration-300 ease-in-out shadow-lg md:shadow-none
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-6">
          {/* লোগো */}
          <Link to="/" onClick={closeSidebar} className="font-black text-xl text-primary hover:opacity-80 flex items-center gap-2">
            <span className="text-2xl">🩸</span> <span className="text-slate-800 dark:text-white">BloodBond</span>
          </Link>
          
          {/* Close button for mobile */}
          <button 
            className="md:hidden btn btn-sm btn-circle btn-ghost text-slate-500 dark:text-slate-400"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>

        <nav className="space-y-1 h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
          
          <NavLink 
            to="/" 
            onClick={closeSidebar} 
            className="block px-3 py-2 rounded-lg mb-6 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            🏠 Go Home
          </NavLink>

          <p className="px-3 text-xs font-bold text-slate-400 uppercase mb-3 mt-4 tracking-wider">Dashboard Menu</p>

          <NavLink to="/dashboard" end onClick={closeSidebar} className={navLinkClasses}>
            Dashboard Home
          </NavLink>
          <NavLink to="/dashboard/profile" onClick={closeSidebar} className={navLinkClasses}>
            Profile
          </NavLink>

          {me?.role === "donor" && (
            <>
              <NavLink to="/dashboard/create-donation-request" onClick={closeSidebar} className={navLinkClasses}>
                Create Request
              </NavLink>
              <NavLink to="/dashboard/my-donation-requests" onClick={closeSidebar} className={navLinkClasses}>
                My Requests
              </NavLink>
            </>
          )}

          {me?.role === "admin" && (
            <NavLink to="/dashboard/all-users" onClick={closeSidebar} className={navLinkClasses}>
              All Users
            </NavLink>
          )}

          {(me?.role === "admin" || me?.role === "volunteer") && (
            <>
              <NavLink to="/dashboard/all-blood-donation-request" onClick={closeSidebar} className={navLinkClasses}>
                All Requests
              </NavLink>
            </>
          )}

          <NavLink to="/dashboard/funding" onClick={closeSidebar} className={navLinkClasses}>
            Funding
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden mb-6 flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="btn btn-ghost btn-circle bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <HiMenuAlt2 size={24} className="text-slate-700 dark:text-white" />
          </button>
          <span className="font-bold text-lg text-slate-700 dark:text-white">Dashboard</span>
        </div>

        <div className="max-w-7xl mx-auto">
          <Outlet context={{ me }} />
        </div>
      </main>
    </div>
  );
}