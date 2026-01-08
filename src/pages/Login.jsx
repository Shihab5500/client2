

import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const from = location.state?.from?.pathname || "/dashboard"; 

  // --- Login Function ---
  const performLogin = async (e) => {
    e.preventDefault(); 
    
    try {
      setLoading(true);
      
      await login(email, password);
      toast.success("Logged in successfully!");
      
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
      
    } catch (err) {
      console.log(err);
      toast.error("Invalid Email or Password");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLogin();
      toast.success("Google Login Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  
  const fillDemoAdmin = () => {
    setEmail("demo@admin.com");  
    setPassword("Admin123");     
    toast.success("Admin credentials filled! Click Login.");
  };

  const fillDemoUser = () => {
    setEmail("demo@user.com");   
    setPassword("User123");      
    toast.success("Donor credentials filled! Click Login.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-soft dark:bg-slate-900 transition-colors">
      <div className="w-full max-w-md card p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
        
        <h2 className="text-3xl font-black mb-6 text-center text-slate-800 dark:text-white">Welcome Back</h2>
        
        {/* Demo Buttons Section */}
        <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              type="button" 
              onClick={fillDemoAdmin} 
              className="btn bg-purple-600 text-white text-xs hover:bg-purple-700 border-none"
            >
              Demo Admin
            </button>
            <button 
              type="button" 
              onClick={fillDemoUser} 
              className="btn bg-blue-600 text-white text-xs hover:bg-blue-700 border-none"
            >
              Demo Donor
            </button>
        </div>

        <form onSubmit={performLogin} className="space-y-4">
          <div>
            <label className="label">Email Address</label>
            
            <input 
              name="email" 
              type="email" 
              className="input" 
              required 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Password</label>
            
            <input 
              name="password" 
              type="password" 
              className="input" 
              required 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          <button disabled={loading} className="btn-primary w-full py-3 shadow-lg shadow-primary/20">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-2 my-6">
            <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-700"></div>
            <span className="text-slate-400 text-sm font-medium">OR</span>
            <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-700"></div>
        </div>

        {/* Google Login Button */}
        <button 
            type="button"
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="btn w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600 gap-2 font-semibold"
        >
            <FaGoogle className="text-primary" /> Continue with Google
        </button>

        <p className="text-sm text-center text-slate-600 dark:text-slate-400 mt-6">
           New here? <Link to="/register" className="text-primary font-bold hover:underline">Create an account</Link>
        </p>

      </div>
    </div>
  );
}