import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { getUserProfile } from "@/services/profileService";
import { logout as apiLogout } from "@/services/authService";

const AuthContext = createContext(null);

const DASHBOARD_ROLES = ["admin", "super_admin", "doctor", "therapist", "driver"];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to load profile
  const syncProfile = async (firebaseUser) => {
    if (!firebaseUser) {
      // Check if there is a local demo user session
      try {
        const local = localStorage.getItem("talep_user");
        if (local) {
          const parsed = JSON.parse(local);
          if (parsed && parsed.uid) {
            setUser({
              uid: parsed.uid,
              email: parsed.email,
              displayName: parsed.name || parsed.displayName,
            });
            setProfile(parsed);
            setRole(parsed.role || "customer");
            return;
          }
        }
      } catch (e) {}

      setUser(null);
      setProfile(null);
      setRole(null);
      return;
    }

    setUser(firebaseUser);
    try {
      const userDoc = await getUserProfile(firebaseUser.uid);
      const userRole = userDoc?.role || "customer";
      setProfile(userDoc || { uid: firebaseUser.uid, email: firebaseUser.email });
      setRole(userRole);
    } catch (e) {
      console.warn("Error syncing profile:", e);
      setProfile({ uid: firebaseUser.uid, email: firebaseUser.email });
      setRole("customer");
    }
  };

  useEffect(() => {
    // Check initial local session first
    try {
      const local = localStorage.getItem("talep_user");
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed?.uid) {
          setUser({
            uid: parsed.uid,
            email: parsed.email,
            displayName: parsed.name || parsed.displayName,
          });
          setProfile(parsed);
          setRole(parsed.role || "admin");
        }
      }
    } catch (e) {}

    let unsubscribe = () => {};
    if (auth) {
      try {
        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            await syncProfile(currentUser);
          } else {
            // If not in Firebase auth, check if localStorage has manual session
            const local = localStorage.getItem("talep_user");
            if (!local) {
              setUser(null);
              setProfile(null);
              setRole(null);
            }
          }
          setLoading(false);
        });
      } catch (e) {
        console.warn("Firebase onAuthStateChanged error:", e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    setLoading(false);

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await apiLogout();
    setUser(null);
    setProfile(null);
    setRole(null);
  };

  const refreshProfile = async () => {
    if (user?.uid) {
      const p = await getUserProfile(user.uid);
      setProfile(p);
      setRole(p?.role || "customer");
    }
  };

  const canAccessDashboard = Boolean(role && DASHBOARD_ROLES.includes(role));

  const value = {
    user,
    profile,
    role,
    loading,
    canAccessDashboard,
    logout: handleLogout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

