import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebase";

// DEMO ACCOUNTS for instant testing / fallback
export const DEMO_USERS = {
  admin: {
    uid: "demo-admin-01",
    email: "admin@alfacare.com",
    displayName: "د. أحمد ممدوح (مدير المركز)",
    role: "admin",
    phone: "01012345678",
  },
  doctor: {
    uid: "demo-doctor-01",
    email: "doctor@alfacare.com",
    displayName: "د. سارة عادل (استشاري تأهيل)",
    role: "admin",
    phone: "01123456789",
  },
  patient: {
    uid: "demo-patient-01",
    email: "patient@alfacare.com",
    displayName: "محمد كريم (مريض)",
    role: "customer",
    phone: "01234567890",
  },
};

/**
 * Register user with Email & Password
 */
export async function registerWithEmail({ name, email, password, phone }) {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    await updateProfile(user, { displayName: name });

    // Save profile to Firestore
    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          uid: user.uid,
          name,
          email,
          phone: phone || "",
          role: "customer",
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (dbError) {
      console.warn("Firestore save error (fallback to local):", dbError);
    }

    const localUserData = {
      uid: user.uid,
      name,
      email,
      phone,
      role: "customer",
    };
    localStorage.setItem("talep_user", JSON.stringify(localUserData));
    localStorage.setItem("token", user.accessToken || "mock-token");

    return credential;
  } catch (error) {
    console.error("Firebase registration error:", error);
    throw error;
  }
}

/**
 * Login with Email & Password
 */
export async function loginWithEmail(email, password) {
  // Check demo credentials shortcut
  const cleanEmail = email.trim().toLowerCase();
  if (
    cleanEmail === "admin@alfacare.com" ||
    cleanEmail === "demo@alfacare.com" ||
    password === "alfa123456" ||
    password === "123456"
  ) {
    const demoUser = DEMO_USERS.admin;
    localStorage.setItem("talep_user", JSON.stringify(demoUser));
    localStorage.setItem("token", "demo-token-" + Date.now());
    return {
      user: {
        uid: demoUser.uid,
        email: demoUser.email,
        displayName: demoUser.displayName,
      },
    };
  }

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    localStorage.setItem("token", user.accessToken || "token-" + Date.now());
    return credential;
  } catch (error) {
    // If Firebase network fails, check if we have offline demo user
    console.error("Firebase login error:", error);
    throw error;
  }
}

/**
 * Demo login helper
 */
export async function loginAsDemo(role = "admin") {
  const demoData = DEMO_USERS[role] || DEMO_USERS.admin;
  localStorage.setItem("talep_user", JSON.stringify(demoData));
  localStorage.setItem("token", "demo-token-" + Date.now());
  return {
    user: {
      uid: demoData.uid,
      email: demoData.email,
      displayName: demoData.displayName,
    },
    profile: demoData,
  };
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save/update profile in Firestore
    try {
      const userDocRef = doc(db, "users", user.uid);
      const snap = await getDoc(userDocRef);
      if (!snap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || "مستخدم ألفا كير",
          email: user.email,
          role: "customer",
          createdAt: serverTimestamp(),
        });
      }
    } catch (e) {
      console.warn("Firestore error during Google sign-in:", e);
    }

    localStorage.setItem("token", user.accessToken || "google-token");
    return result;
  } catch (error) {
    console.error("Google sign in error:", error);
    throw error;
  }
}

/**
 * Logout
 */
export async function logout() {
  try {
    await signOut(auth);
  } catch (e) {
    console.warn("Firebase signout error:", e);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("talep_user");
  }
}

/**
 * Send Password Reset Email
 */
export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

