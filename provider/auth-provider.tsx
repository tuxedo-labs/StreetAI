"use client";

import { createContext, useContext } from "react";

interface AuthContextType {
  userId: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, userId }: { children: React.ReactNode; userId: string | null }) => {
  return (
    <AuthContext.Provider value={{ userId, isAuthenticated: !!userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
