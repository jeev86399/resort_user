// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDquQElWFLdSe6HHk0pF6qvhgpIz62R5RE",
  authDomain: "radha-resort-3c364.firebaseapp.com",
  projectId: "radha-resort-3c364",
  storageBucket: "radha-resort-3c364.firebasestorage.app",
  messagingSenderId: "1075562118246",
  appId: "1:1075562118246:web:21e10935312a531ce401a7",
  measurementId: "G-CYFWT4DEMV"
};

// INIT APP
const app = initializeApp(firebaseConfig);

// ⭐ LOGIN/SIGNUP
export const auth = getAuth(app);

// ⭐ FIRESTORE DATABASE (must for bookings, rooms, admin)
export const db = getFirestore(app);

export default app;
