"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Customer } from "@/lib/mock-data";

interface AuthState {
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    customer: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      setState({ customer: data.customer, isAuthenticated: true, isLoading: false });
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw new Error("Invalid email or password");
    }
  }, []);

  const logout = useCallback(() => {
    setState({ customer: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
