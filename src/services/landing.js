import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const LANDING_DOC_ID = "landing_config";

export async function getLandingPage() {
  try {
    const snap = await getDoc(doc(db, "settings", LANDING_DOC_ID));
    if (snap.exists()) {
      return snap.data();
    }
  } catch (e) {
    console.warn("Could not fetch landing config from firestore:", e);
  }

  // Fallback to local storage or defaults
  try {
    const local = localStorage.getItem("alfa_landing_config");
    if (local) return JSON.parse(local);
  } catch (e) {}

  return null;
}

export async function saveLandingPage(data) {
  try {
    await setDoc(doc(db, "settings", LANDING_DOC_ID), data, { merge: true });
  } catch (e) {
    console.warn("Could not save landing config to firestore:", e);
  }
  localStorage.setItem("alfa_landing_config", JSON.stringify(data));
  return { success: true };
}

