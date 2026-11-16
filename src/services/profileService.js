import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { DEMO_USERS } from "./authService";

/**
 * Fetch user profile from Firestore or LocalStorage
 */
export async function getUserProfile(uid) {
  if (!uid) return null;

  // Check demo users first
  for (const key of Object.keys(DEMO_USERS)) {
    if (DEMO_USERS[key].uid === uid) {
      return DEMO_USERS[key];
    }
  }

  // Check LocalStorage cache
  try {
    const saved = localStorage.getItem("talep_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.uid === uid) return parsed;
    }
  } catch (e) {
    // Ignore JSON parse error
  }

  // Check Firestore
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (error) {
    console.warn("Could not fetch user profile from Firestore:", error);
  }

  // Default fallback profile
  return {
    uid,
    role: "customer",
    name: "مريض ألفا كير",
  };
}

/**
 * Update user profile
 */
export async function updateUserProfile(uid, data) {
  if (!uid) return;
  try {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, data);
  } catch (e) {
    console.warn("Firestore update profile failed, saving locally:", e);
  }

  try {
    const current = JSON.parse(localStorage.getItem("talep_user") || "{}");
    const updated = { ...current, ...data };
    localStorage.setItem("talep_user", JSON.stringify(updated));
  } catch (e) {}
}

