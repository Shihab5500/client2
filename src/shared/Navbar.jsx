

import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX, HiMoon, HiSun } from "react-icons/hi";
import logo from "../picture/logo.png"; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Dark Mode Logic ---
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Reusable NavLink Classes
  const navLinkClass = ({ isActive }) =>
    `font-medium transition-colors ${
      isActive
        ? "text-primary"
        : "text-slate-600 dark:text-slate-300 hover:text-primary"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block py-2 font-medium ${
      isActive
        ? "text-primary"
        : "text-slate-600 dark:text-slate-300 hover:text-primary"
    }`;

  return (
    <nav className="border-b bg-white/95 backdrop-blur sticky top-0 z-50 shadow-sm dark:bg-slate-900/95 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="font-black text-2xl text-primary tracking-tight flex items-center gap-2">
           <span className="text-3xl">🩸</span> <span className=" text-slate-800 dark:text-white">Blood Donation</span>
        </Link>

        {/* Mobile Actions (Theme + Menu) */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            {theme === "dark" ? <HiSun size={24} /> : <HiMoon size={24} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 dark:text-slate-200 p-2 focus:outline-none"
          >
            {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/donation-requests" className={navLinkClass}>Donation Requests</NavLink>
          <NavLink to="/search" className={navLinkClass}>Search Donors</NavLink>
          <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>

          {/* Theme Toggler Desktop */}
          <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition ml-2">
            {theme === "dark" ? <HiSun size={24} className="text-yellow-400"/> : <HiMoon size={24} />}
          </button>

          {!user ? (
            <NavLink to="/login" className="btn-primary px-6 py-2 rounded-lg ml-4">Login</NavLink>
          ) : (
            <div ref={menuRef} className="relative ml-4">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden hover:border-primary transition-all"
              >
                <img
                  className="w-full h-full object-cover"
                  src={user.photoURL || "https://i.ibb.co/9W7w7yY/user.png"}
                  alt="avatar"
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl py-2 animate-fade-in z-50">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 mb-2">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{user.displayName}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 absolute w-full left-0 shadow-lg py-4 px-4 flex flex-col gap-2 animate-slide-down h-screen z-40">
          
          <NavLink to="/" onClick={closeMobileMenu} className={mobileNavLinkClass}>Home</NavLink>
          <NavLink to="/donation-requests" onClick={closeMobileMenu} className={mobileNavLinkClass}>Donation Requests</NavLink>
          <NavLink to="/search" onClick={closeMobileMenu} className={mobileNavLinkClass}>Search Donors</NavLink>
          <NavLink to="/blog" onClick={closeMobileMenu} className={mobileNavLinkClass}>Blog</NavLink>
          <NavLink to="/about" onClick={closeMobileMenu} className={mobileNavLinkClass}>About</NavLink>

          <div className="border-t border-slate-100 dark:border-slate-800 my-2"></div>

          {!user ? (
            <NavLink 
              to="/login" 
              onClick={closeMobileMenu}
              className="btn-primary w-full text-center py-2.5 rounded-lg"
            >
              Login
            </NavLink>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 py-2">
                <img
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
                  src={user.photoURL || "https://i.ibb.co/9W7w7yY/user.png"}
                  alt="avatar"
                />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{user.displayName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
              </div>
              
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="btn-outline w-full text-center block py-2 rounded-lg"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="btn-primary w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}