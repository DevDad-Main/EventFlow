import { useEffect, useState } from "react";
import { useAuth as useClerkAuth, useUser as useClerkUser } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface BackendUser {
  clerkUserId: string;
  email: string;
  name: string;
  role: string;
}

export function useAuthSync() {
  const { isLoaded, isSignedIn, getToken } = useClerkAuth();
  const { user } = useClerkUser();
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      setBackendUser(null);
      return;
    }

    const syncUser = async () => {
      setIsSyncing(true);
      setError(null);

      try {
        console.log("🔄 Starting auth sync for user:", user.id);
        
        const token = await getToken();
        console.log("🔑 Got Clerk token:", token ? "yes" : "no");

        if (!token) {
          console.error("❌ No Clerk token available");
          setError("No token available");
          return;
        }

        console.log("📡 Calling backend /current-user...");
        const response = await fetch(`${API_URL}/current-user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📬 Backend response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("❌ Backend error:", errorData);
          setError(errorData.message || "Failed to sync user");
          return;
        }

        const data = await response.json();
        console.log("✅ Backend user synced:", data);
        setBackendUser(data.user);
      } catch (err) {
        console.error("❌ Sync error:", err);
        setError(err instanceof Error ? err.message : "Sync failed");
      } finally {
        setIsSyncing(false);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user, getToken]);

  return {
    isLoaded,
    isSignedIn,
    backendUser,
    isSyncing,
    error,
    refetch: () => {
      if (isSignedIn) {
        setIsSyncing(true);
        getToken().then(async (token) => {
          if (!token) return;
          try {
            const response = await fetch(`${API_URL}/current-user`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
              const data = await response.json();
              setBackendUser(data.user);
            }
          } finally {
            setIsSyncing(false);
          }
        });
      }
    },
  };
}

export async function getBackendUser(): Promise<BackendUser | null> {
  try {
    // @ts-ignore - Clerk is available globally
    const token = await window.Clerk?.session?.getToken();
    if (!token) return null;

    const response = await fetch(`${API_URL}/current-user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.user;
  } catch (err) {
    console.error("Failed to get backend user:", err);
    return null;
  }
}
