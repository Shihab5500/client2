


import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Create User (Email/Pass)
  const createUser = (email, pass) =>
    createUserWithEmailAndPassword(auth, email, pass);

  // 2. Login (Email/Pass)
  const login = (email, pass) =>
    signInWithEmailAndPassword(auth, email, pass);
  
  // 3. Google Login (Updated Logic)
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      
      await axios.post(`${import.meta.env.VITE_apiUrl}/api/users`, {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        
        district: null,
        upazila: null,
        bloodGroup: null 
      });

      return result;
    } catch (error) {
      throw error;
    }
  };

  // 4. Logout
  const logout = () => signOut(auth);

  // 5. Update Profile
  const updateUserProfile = (name, photoURL) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL });

  // 6. Auth State Observer
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (current) => {
      setUser(current);

      if (current?.email) {
        try {
          
          const { data } = await axios.post(
            `${import.meta.env.VITE_apiUrl}/api/auth/jwt`,
            { email: current.email }
          );
          
          localStorage.setItem("token", data.token);
          
          
          setLoading(false);
        } catch (err) {
          console.log("AUTH JWT ERROR:", err);
          localStorage.removeItem("token");
          setLoading(false);
        }
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const value = { user, loading, createUser, login, googleLogin, logout, updateUserProfile };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}