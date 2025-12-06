// import axios from "axios";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase.config"; // path ঠিক আছে কিনা দেখবেন

// const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_apiUrl,
// });

// // Request Interceptor
// axiosSecure.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor
// axiosSecure.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const status = error.response ? error.response.status : null;

//     // 🛑 [FIX] শুধুমাত্র 401 (Unauthorized) বা 403 (Forbidden) হলেই লগআউট করাবো
//     // 404 (Not Found) হলে লগআউট করাবো না
//     if (status === 401 || status === 403) {
//       await signOut(auth);
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default axiosSecure;


import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_apiUrl,
});

// Request Interceptor
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;

    // শুধুমাত্র 401 (Unauthorized) বা 403 (Forbidden) হলেই লগআউট করাবে
    if (status === 401 || status === 403) {
      await signOut(auth);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export default axiosSecure;