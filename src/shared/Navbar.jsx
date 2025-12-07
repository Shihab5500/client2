
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../picture/logo.png"

export default function Navbar() {
  const { user, logout } = useAuth();
  
 
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  
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

  return (
    <nav className="border-b bg-white/95 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="font-black text-2xl text-primary tracking-tight">
          <img className="w-[160px]" src={logo} alt="" />
        </Link>

        {/* ✅ Mobile Menu Toggle Button (Hamburger) */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 p-2 focus:outline-none"
          >
            {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink 
            to="/donation-requests" 
            className={({isActive}) => `font-medium transition-colors ${isActive ? "text-primary" : "text-slate-600 hover:text-primary"}`}
          >
            Donation Requests
          </NavLink>
          <NavLink 
            to="/search" 
            className={({isActive}) => `font-medium transition-colors ${isActive ? "text-primary" : "text-slate-600 hover:text-primary"}`}
          >
            Search Donors
          </NavLink>

          {!user ? (
            <NavLink to="/login" className="btn-primary px-6 py-2 rounded-lg">Login</NavLink>
          ) : (
            <div ref={menuRef} className="relative">
              {/* Avatar Button */}
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

              {/* Desktop Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-100 mb-2">
                    <p className="text-sm font-bold text-slate-800 truncate">{user.displayName}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/*  Mobile Menu Dropdown (Visible only on Mobile) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-lg py-4 px-4 flex flex-col gap-4 animate-slide-down">
          
          {/* Mobile Links */}
          <NavLink 
            to="/donation-requests" 
            onClick={closeMobileMenu}
            className={({isActive}) => `block py-2 font-medium ${isActive ? "text-primary" : "text-slate-600"}`}
          >
            Donation Requests
          </NavLink>
          <NavLink 
            to="/search" 
            onClick={closeMobileMenu}
            className={({isActive}) => `block py-2 font-medium ${isActive ? "text-primary" : "text-slate-600"}`}
          >
            Search Donors
          </NavLink>

          <div className="border-t border-slate-100 my-1"></div>

          {/* Mobile Auth Options */}
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
                  className="w-10 h-10 rounded-full border border-slate-200 object-cover"
                  src={user.photoURL || "https://i.ibb.co/9W7w7yY/user.png"}
                  alt="avatar"
                />
                <div>
                  <p className="font-bold text-slate-800">{user.displayName}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
              
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="btn-outline w-full text-center block py-2 rounded-lg border-slate-300 text-slate-700"
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