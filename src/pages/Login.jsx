// import { useState } from "react";
// import useAuth from "../hooks/useAuth";
// import toast from "react-hot-toast";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// export default function Login() {
//   const { login } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/dashboard";

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     // 🛑 [FIX] ইমেল ইনপুট ছোট হাতের অক্ষরে কনভার্ট করা হচ্ছে
//     // এটি ডাটাবেসের সাথে মিল রাখতে সাহায্য করবে
//     const email = e.target.email.value.toLowerCase();
//     const password = e.target.password.value;

//     try {
//       setLoading(true);
      
//       // Firebase Login
//       await login(email, password);
      
//       toast.success("Logged in!");
      
//       // সফল হলে ড্যাশবোর্ডে পাঠাবে
//       navigate(from, { replace: true });
      
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message || "Login Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-10">
//       <div className="max-w-md mx-auto card p-6">
//         <h2 className="text-2xl font-black mb-4">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-3">
//           <div>
//             <label className="label">Email</label>
//             <input 
//               name="email" 
//               type="email" 
//               className="input" 
//               required 
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label className="label">Password</label>
//             <input 
//               name="password" 
//               type="password" 
//               className="input" 
//               required 
//               placeholder="Enter your password"
//             />
//           </div>

//           <button disabled={loading} className="btn-primary w-full">
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-sm text-slate-600">
//             New here? <Link to="/register" className="text-primary font-semibold">Register</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import useAuth from "../hooks/useAuth";
// import toast from "react-hot-toast";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// export default function Login() {
//   const { login } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/dashboard";

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     // ✅ ইমেল ছোট হাতের অক্ষরে কনভার্ট (ডাটাবেস ম্যাচের জন্য)
//     const email = e.target.email.value.toLowerCase();
//     const password = e.target.password.value;

//     try {
//       setLoading(true);
      
//       // 1. Firebase Login
//       await login(email, password);
      
//       toast.success("Logged in successfully!");

//       // 🛑 [FIX] টোকেন সেট হওয়ার জন্য ১.৫ সেকেন্ড অপেক্ষা করুন
//       // এটি আপনাকে 401 Unauthorized এরর থেকে বাঁচাবে
//       setTimeout(() => {
//         navigate(from, { replace: true });
//       }, 1500);
      
//     } catch (err) {
//       console.log(err);
//       toast.error("Invalid Email or Password");
//       setLoading(false); // এরর হলে লোডিং বন্ধ করুন
//     } 
//     // নোট: সফল হলে লোডিং বন্ধ করছি না, কারণ নেভিগেট হওয়া পর্যন্ত বাটন লোডিং দেখাবে
//   };

//   return (
//     <div className="container py-10">
//       <div className="max-w-md mx-auto card p-6 shadow-lg border border-slate-100">
//         <h2 className="text-2xl font-black mb-4 text-center">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="label">Email Address</label>
//             <input 
//               name="email" 
//               type="email" 
//               className="input" 
//               required 
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label className="label">Password</label>
//             <input 
//               name="password" 
//               type="password" 
//               className="input" 
//               required 
//               placeholder="Enter your password"
//             />
//           </div>

//           <button disabled={loading} className="btn-primary w-full py-3">
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-sm text-center text-slate-600">
//             New here? <Link to="/register" className="text-primary font-bold hover:underline">Create an account</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; 

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // 🛑 [FIX] সব সময় ড্যাশবোর্ড হোমে পাঠাবো, যাতে পারমিশন এরর না খায়
  const from = "/dashboard"; 

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.toLowerCase();
    const password = e.target.password.value;

    try {
      setLoading(true);
      await login(email, password);
      
      toast.success("Logged in successfully!");

      // ১.৫ সেকেন্ড অপেক্ষা করে রিডাইরেক্ট
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
      
    } catch (err) {
      console.log(err);
      toast.error("Invalid Email or Password");
      setLoading(false);
    } 
  };

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto card p-6 shadow-lg border border-slate-100">
        <h2 className="text-2xl font-black mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">Email Address</label>
            <input name="email" type="email" className="input" required placeholder="Enter your email" />
          </div>
          <div>
            <label className="label">Password</label>
            <input name="password" type="password" className="input" required placeholder="Enter your password" />
          </div>
          <button disabled={loading} className="btn-primary w-full py-3">
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center text-slate-600">
            New here? <Link to="/register" className="text-primary font-bold hover:underline">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}