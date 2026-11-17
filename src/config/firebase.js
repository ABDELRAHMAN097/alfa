import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD-DADpbKNWciTQMQcSC605nkEZdgm7dt4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "crm-system-cafc8.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "crm-system-cafc8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "crm-system-cafc8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "122362809149",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:122362809149:web:9921dc8b868d5c4f381354",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PCWY3ZWDZL",
};

let app = null;
let auth = null;
let db = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization warning:", error);
}

export { auth, db };
export default app;
