import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCl2dmczueFgYP8fS-BW3cPFHVxUGUyIII",
  authDomain: "blood-donation-app-a9bcc.firebaseapp.com",
  projectId: "blood-donation-app-a9bcc",
  storageBucket: "blood-donation-app-a9bcc.firebasestorage.app",
  messagingSenderId: "433216209008",
  appId: "1:433216209008:web:98a49a8d9c89f5c5c6b4b5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
