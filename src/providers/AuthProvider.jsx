import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, pass) =>
    createUserWithEmailAndPassword(auth, email, pass);

  const login = (email, pass) =>
    signInWithEmailAndPassword(auth, email, pass);

  const logout = () => signOut(auth);

  const updateUserProfile = (name, photoURL) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL });

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

          
          await axios.get(`${import.meta.env.VITE_apiUrl}/api/users/me`, {
            headers: {
              authorization: `Bearer ${data.token}`
            }
          });

        } catch (err) {
          console.log("AUTH CHECK ERROR:", err?.response?.data || err.message);
          
         
        }
      } else {
        
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const value = { user, loading, createUser, login, logout, updateUserProfile };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}