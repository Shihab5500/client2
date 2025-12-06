// import { useEffect, useMemo, useState } from "react";
// import useAuth from "../hooks/useAuth";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { bloodGroups } from "../utils/bloodGroups";

// // ✅ data import
// import districts from "../Data/district.json";
// import upazilas from "../Data/upazilas.json";

// export default function Register() {
//   const { createUser, updateUserProfile } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ✅ dynamic district/upazila state
//   const [selectedDistrictId, setSelectedDistrictId] = useState("");
//   const [selectedUpazila, setSelectedUpazila] = useState("");

//   // ✅ district অনুযায়ী upazila filter
//   const filteredUpazilas = useMemo(() => {
//     if (!selectedDistrictId) return [];
//     return upazilas.filter(
//       (u) => String(u.district_id) === String(selectedDistrictId)
//     );
//   }, [selectedDistrictId]);

//   // ✅ district change হলে upazila reset
//   useEffect(() => {
//     setSelectedUpazila("");
//   }, [selectedDistrictId]);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const name = form.name.value;
//     // 🛑 [FIX] ইমেল সবসময় ছোট হাতের অক্ষরে কনভার্ট করা হচ্ছে
//     const email = form.email.value.toLowerCase(); 
//     const password = form.password.value;
//     const confirm = form.confirm_password.value;
//     const bloodGroup = form.bloodGroup.value;

//     // ✅ id → district name
//     const district =
//       districts.find((d) => String(d.id) === String(selectedDistrictId))?.name;

//     const upazila = selectedUpazila;
//     const image = form.avatar.files[0];

//     if (password !== confirm) return toast.error("Password mismatch");
//     if (!image) return toast.error("Avatar required");
//     if (!district) return toast.error("District required");
//     if (!upazila) return toast.error("Upazila required");

//     try {
//       setLoading(true);

//       // 1) imgBB upload
//       const fd = new FormData();
//       fd.append("image", image);

//       const imgbb = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
//         fd
//       );
//       const avatar = imgbb.data.data.display_url;

//       // 2) Firebase create user (using lowercase email)
//       await createUser(email, password);

//       // 3) Firebase profile update
//       await updateUserProfile(name, avatar);

//       // 4) Save user to DB (using lowercase email)
//       await axios.post(`${import.meta.env.VITE_apiUrl}/api/users`, {
//         name,
//         email, // ✅ এটি এখন lowercase
//         avatar,
//         bloodGroup,
//         district,
//         upazila,
//       });

//       toast.success("Registered successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.log("🔥 REGISTER ERROR FULL:", err);
//       console.log("🔥 MESSAGE:", err?.message);
      
//       toast.error(err?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-10">
//       <div className="max-w-2xl mx-auto card p-6 md:p-8">
//         <h2 className="text-2xl font-black mb-6">Join as a Donor</h2>

//         <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-4">
//           <div className="md:col-span-2">
//             <label className="label">Avatar</label>
//             <input
//               name="avatar"
//               type="file"
//               accept="image/*"
//               className="input"
//               required
//             />
//           </div>

//           <div>
//             <label className="label">Name</label>
//             <input name="name" className="input" required />
//           </div>
//           <div>
//             <label className="label">Email</label>
//             <input name="email" type="email" className="input" required />
//           </div>

//           <div>
//             <label className="label">Blood Group</label>
//             <select name="bloodGroup" className="input" required>
//               <option value="">Select</option>
//               {bloodGroups.map((bg) => (
//                 <option key={bg}>{bg}</option>
//               ))}
//             </select>
//           </div>

//           {/* ✅ District dynamic select */}
//           <div>
//             <label className="label">District</label>
//             <select
//               name="district"
//               className="input"
//               value={selectedDistrictId}
//               onChange={(e) => setSelectedDistrictId(e.target.value)}
//               required
//             >
//               <option value="">Select District</option>
//               {districts.map((d) => (
//                 <option key={d.id} value={d.id}>
//                   {d.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* ✅ Upazila dynamic select */}
//           <div>
//             <label className="label">Upazila</label>
//             <select
//               name="upazila"
//               className="input"
//               value={selectedUpazila}
//               onChange={(e) => setSelectedUpazila(e.target.value)}
//               disabled={!selectedDistrictId}
//               required
//             >
//               <option value="">Select Upazila</option>
//               {filteredUpazilas.map((u) => (
//                 <option key={u.id} value={u.name}>
//                   {u.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="label">Password</label>
//             <input name="password" type="password" className="input" required />
//           </div>

//           <div>
//             <label className="label">Confirm Password</label>
//             <input
//               name="confirm_password"
//               type="password"
//               className="input"
//               required
//             />
//           </div>

//           <button disabled={loading} className="btn-primary md:col-span-2 mt-2">
//             {loading ? "Creating..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useMemo, useState } from "react";
// import useAuth from "../hooks/useAuth";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { bloodGroups } from "../utils/bloodGroups";

// // ✅ data import
// import districts from "../Data/district.json";
// import upazilas from "../Data/upazilas.json";

// export default function Register() {
//   const { createUser, updateUserProfile } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const [selectedDistrictId, setSelectedDistrictId] = useState("");
//   const [selectedUpazila, setSelectedUpazila] = useState("");

//   const filteredUpazilas = useMemo(() => {
//     if (!selectedDistrictId) return [];
//     return upazilas.filter(
//       (u) => String(u.district_id) === String(selectedDistrictId)
//     );
//   }, [selectedDistrictId]);

//   useEffect(() => {
//     setSelectedUpazila("");
//   }, [selectedDistrictId]);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const name = form.name.value;
//     // ✅ ইমেল ছোট হাতের অক্ষরে কনভার্ট করা হচ্ছে
//     const email = form.email.value.toLowerCase();
//     const password = form.password.value;
//     const confirm = form.confirm_password.value;
//     const bloodGroup = form.bloodGroup.value;

//     const district =
//       districts.find((d) => String(d.id) === String(selectedDistrictId))?.name;
//     const upazila = selectedUpazila;
//     const image = form.avatar.files[0];

//     if (password !== confirm) return toast.error("Password mismatch");
//     if (!image) return toast.error("Avatar required");
//     if (!district) return toast.error("District required");
//     if (!upazila) return toast.error("Upazila required");

//     try {
//       setLoading(true);

//       // 1. imgBB upload
//       const fd = new FormData();
//       fd.append("image", image);
//       const imgbb = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
//         fd
//       );
//       const avatar = imgbb.data.data.display_url;

//       // 2. Firebase create user (With Error Handling)
//       try {
//         await createUser(email, password);
//         await updateUserProfile(name, avatar);
//       } catch (authErr) {
//         // 🛑 [FIX] যদি ইমেল অলরেডি থাকে, আমরা ধরে নেব এটি একটি 'Ghost User' এবং আমরা DB তে ডাটা সেভ করার চেষ্টা করব
//         if (authErr.code === 'auth/email-already-in-use') {
//           toast("Account exists in Firebase, syncing database...", { icon: '⚠️' });
//         } else {
//           throw authErr; // অন্য কোনো এরর হলে থামিয়ে দাও
//         }
//       }

//       // 3. Save user to DB (এটি এখন সবসময় চলবে)
//       await axios.post(`${import.meta.env.VITE_apiUrl}/api/users`, {
//         name,
//         email, 
//         avatar,
//         bloodGroup,
//         district,
//         upazila,
//       });

//       toast.success("Registered & Synced successfully!");
//       // রেজিস্ট্রেশনের পর পেজ রিফ্রেশ বা ড্যাশবোর্ডে যাওয়া
//       window.location.href = "/dashboard"; 
      
//     } catch (err) {
//       console.log("REGISTER ERROR:", err);
//       toast.error(err?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-10">
//       <div className="max-w-2xl mx-auto card p-6 md:p-8">
//         <h2 className="text-2xl font-black mb-6">Join as a Donor</h2>

//         <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-4">
//           <div className="md:col-span-2">
//             <label className="label">Avatar</label>
//             <input
//               name="avatar"
//               type="file"
//               accept="image/*"
//               className="input"
//               required
//             />
//           </div>

//           <div>
//             <label className="label">Name</label>
//             <input name="name" className="input" required />
//           </div>
//           <div>
//             <label className="label">Email</label>
//             <input name="email" type="email" className="input" required />
//           </div>

//           <div>
//             <label className="label">Blood Group</label>
//             <select name="bloodGroup" className="input" required>
//               <option value="">Select</option>
//               {bloodGroups.map((bg) => (
//                 <option key={bg}>{bg}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="label">District</label>
//             <select
//               name="district"
//               className="input"
//               value={selectedDistrictId}
//               onChange={(e) => setSelectedDistrictId(e.target.value)}
//               required
//             >
//               <option value="">Select District</option>
//               {districts.map((d) => (
//                 <option key={d.id} value={d.id}>
//                   {d.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="label">Upazila</label>
//             <select
//               name="upazila"
//               className="input"
//               value={selectedUpazila}
//               onChange={(e) => setSelectedUpazila(e.target.value)}
//               disabled={!selectedDistrictId}
//               required
//             >
//               <option value="">Select Upazila</option>
//               {filteredUpazilas.map((u) => (
//                 <option key={u.id} value={u.name}>
//                   {u.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="label">Password</label>
//             <input name="password" type="password" className="input" required />
//           </div>

//           <div>
//             <label className="label">Confirm Password</label>
//             <input
//               name="confirm_password"
//               type="password"
//               className="input"
//               required
//             />
//           </div>

//           <button disabled={loading} className="btn-primary md:col-span-2 mt-2">
//             {loading ? "Processing..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useMemo, useState } from "react";
// import useAuth from "../hooks/useAuth";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { bloodGroups } from "../utils/bloodGroups";

// // ✅ data import
// import districts from "../Data/district.json";
// import upazilas from "../Data/upazilas.json";

// export default function Register() {
//   const { createUser, updateUserProfile } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const [selectedDistrictId, setSelectedDistrictId] = useState("");
//   const [selectedUpazila, setSelectedUpazila] = useState("");

//   const filteredUpazilas = useMemo(() => {
//     if (!selectedDistrictId) return [];
//     return upazilas.filter(
//       (u) => String(u.district_id) === String(selectedDistrictId)
//     );
//   }, [selectedDistrictId]);

//   useEffect(() => {
//     setSelectedUpazila("");
//   }, [selectedDistrictId]);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const name = form.name.value;
//     // ✅ ইমেল ছোট হাতের অক্ষরে
//     const email = form.email.value.toLowerCase();
//     const password = form.password.value;
//     const confirm = form.confirm_password.value;
//     const bloodGroup = form.bloodGroup.value;

//     const district =
//       districts.find((d) => String(d.id) === String(selectedDistrictId))?.name;
//     const upazila = selectedUpazila;
//     const image = form.avatar.files[0];

//     if (password !== confirm) return toast.error("Password mismatch");
//     if (!image) return toast.error("Avatar required");
//     if (!district) return toast.error("District required");
//     if (!upazila) return toast.error("Upazila required");

//     try {
//       setLoading(true);

//       // 1. imgBB upload
//       const fd = new FormData();
//       fd.append("image", image);
//       const imgbb = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
//         fd
//       );
//       const avatar = imgbb.data.data.display_url;

//       // 2. Firebase create user (With Ghost User Handling)
//       try {
//         await createUser(email, password);
//         await updateUserProfile(name, avatar);
//       } catch (authErr) {
//         // 🛑 [MAGIC FIX] যদি ইমেল অলরেডি থাকে, আমরা ধরে নেব এটি একটি 'Ghost User'
//         // আমরা এরর ইগনোর করে ডাটাবেসে সেভ করতে এগিয়ে যাবো
//         if (authErr.code === 'auth/email-already-in-use') {
//           toast("Account exists, syncing database...", { icon: '🔄' });
//         } else {
//           // অন্য কোনো এরর হলে থামিয়ে দাও
//           throw authErr;
//         }
//       }

//       // 3. Save user to DB (এটি এখন সবসময় চলবে, এরর থাকলেও)
//       await axios.post(`${import.meta.env.VITE_apiUrl}/api/users`, {
//         name,
//         email, 
//         avatar,
//         bloodGroup,
//         district,
//         upazila,
//       });

//       toast.success("Registered & Synced successfully!");
      
//       // 🛑 পেজ রিফ্রেশ করে ড্যাশবোর্ডে পাঠানো, যাতে সেশন ক্লিয়ার থাকে
//       window.location.href = "/dashboard"; 
      
//     } catch (err) {
//       console.log("REGISTER ERROR:", err);
//       toast.error(err?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-10">
//       <div className="max-w-2xl mx-auto card p-6 md:p-8">
//         <h2 className="text-2xl font-black mb-6">Join as a Donor</h2>

//         <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-4">
//           <div className="md:col-span-2">
//             <label className="label">Avatar</label>
//             <input
//               name="avatar"
//               type="file"
//               accept="image/*"
//               className="input"
//               required
//             />
//           </div>

//           <div>
//             <label className="label">Name</label>
//             <input name="name" className="input" required />
//           </div>
//           <div>
//             <label className="label">Email</label>
//             <input name="email" type="email" className="input" required />
//           </div>

//           <div>
//             <label className="label">Blood Group</label>
//             <select name="bloodGroup" className="input" required>
//               <option value="">Select</option>
//               {bloodGroups.map((bg) => (
//                 <option key={bg}>{bg}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="label">District</label>
//             <select
//               name="district"
//               className="input"
//               value={selectedDistrictId}
//               onChange={(e) => setSelectedDistrictId(e.target.value)}
//               required
//             >
//               <option value="">Select District</option>
//               {districts.map((d) => (
//                 <option key={d.id} value={d.id}>
//                   {d.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="label">Upazila</label>
//             <select
//               name="upazila"
//               className="input"
//               value={selectedUpazila}
//               onChange={(e) => setSelectedUpazila(e.target.value)}
//               disabled={!selectedDistrictId}
//               required
//             >
//               <option value="">Select Upazila</option>
//               {filteredUpazilas.map((u) => (
//                 <option key={u.id} value={u.name}>
//                   {u.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="label">Password</label>
//             <input name="password" type="password" className="input" required />
//           </div>

//           <div>
//             <label className="label">Confirm Password</label>
//             <input
//               name="confirm_password"
//               type="password"
//               className="input"
//               required
//             />
//           </div>

//           <button disabled={loading} className="btn-primary md:col-span-2 mt-2">
//             {loading ? "Processing..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { bloodGroups } from "../utils/bloodGroups";

// ✅ data import
import districts from "../Data/district.json";
import upazilas from "../Data/upazilas.json";

export default function Register() {
  const { createUser, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const filteredUpazilas = useMemo(() => {
    if (!selectedDistrictId) return [];
    return upazilas.filter(
      (u) => String(u.district_id) === String(selectedDistrictId)
    );
  }, [selectedDistrictId]);

  useEffect(() => {
    setSelectedUpazila("");
  }, [selectedDistrictId]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    // ✅ ইমেল সবসময় ছোট হাতের অক্ষরে কনভার্ট করা হচ্ছে
    const email = form.email.value.toLowerCase();
    const password = form.password.value;
    const confirm = form.confirm_password.value;
    const bloodGroup = form.bloodGroup.value;

    const district =
      districts.find((d) => String(d.id) === String(selectedDistrictId))?.name;
    const upazila = selectedUpazila;
    const image = form.avatar.files[0];

    if (password !== confirm) return toast.error("Password mismatch");
    if (!image) return toast.error("Avatar required");
    if (!district) return toast.error("District required");
    if (!upazila) return toast.error("Upazila required");

    try {
      setLoading(true);

      // 1. imgBB upload
      const fd = new FormData();
      fd.append("image", image);
      const imgbb = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        fd
      );
      const avatar = imgbb.data.data.display_url;

      // 2. Firebase create user (Smart Handling)
      let firebaseUserCreated = false;
      try {
        await createUser(email, password);
        await updateUserProfile(name, avatar);
        firebaseUserCreated = true;
      } catch (authErr) {
        // 🛑 [FIX] যদি ইমেল অলরেডি থাকে, আমরা ডাটাবেস সিঙ্ক করার জন্য এগিয়ে যাবো
        if (authErr.code === 'auth/email-already-in-use') {
          toast("Account exists in Firebase, syncing database...", { icon: '🔄' });
        } else {
          // অন্য কোনো এরর হলে থামিয়ে দাও
          throw authErr;
        }
      }

      // 3. Save user to DB (এটি এখন সবসময় চলবে - Ghost User Fix)
      await axios.post(`${import.meta.env.VITE_apiUrl}/api/users`, {
        name,
        email, 
        avatar,
        bloodGroup,
        district,
        upazila,
      });

      if (firebaseUserCreated) {
        toast.success("Registered successfully!");
        // নতুন ইউজার হলে ড্যাশবোর্ডে
        window.location.href = "/dashboard";
      } else {
        toast.success("Database synced! Please login.");
        // যদি পুরনো ইউজার হয় (Sync Case), তবে লগইন পেজে পাঠাবো
        navigate("/login");
      }
      
    } catch (err) {
      console.log("REGISTER ERROR:", err);
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto card p-6 md:p-8">
        <h2 className="text-2xl font-black mb-6">Join as a Donor</h2>

        <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="label">Avatar</label>
            <input
              name="avatar"
              type="file"
              accept="image/*"
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Name</label>
            <input name="name" className="input" required />
          </div>
          <div>
            <label className="label">Email</label>
            <input name="email" type="email" className="input" required />
          </div>

          <div>
            <label className="label">Blood Group</label>
            <select name="bloodGroup" className="input" required>
              <option value="">Select</option>
              {bloodGroups.map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">District</label>
            <select
              name="district"
              className="input"
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              required
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Upazila</label>
            <select
              name="upazila"
              className="input"
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={!selectedDistrictId}
              required
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Password</label>
            <input name="password" type="password" className="input" required />
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <input
              name="confirm_password"
              type="password"
              className="input"
              required
            />
          </div>

          <button disabled={loading} className="btn-primary md:col-span-2 mt-2">
            {loading ? "Processing..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}