import { createContext, useContext, type ReactNode } from "react";
import type { User } from "@/types/user";
import { useProfileQuery } from "./hooks/useProfile";
import { useQueryClient } from "@tanstack/react-query";
import { clearAuth } from "@/stores/authStore";

type UserContextValue = {
  user?: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: unknown;
  refreshUserInfo: () => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();

  const { data, isLoading, error } = useProfileQuery();

  const refreshUserInfo = async () => {
    await qc.invalidateQueries({
      queryKey: ["user", "profile"],
    });
  };

  const logout = () => {
    clearAuth();
    qc.clear();
    window.location.href = "/auth/login";
  };

  const value = {
    user: data ?? null,
    isAuthenticated: !!data,
    isLoading,
    error,
    refreshUserInfo,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
}
