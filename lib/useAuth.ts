"use client";

import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('adminAuth');
    setIsAuthenticated(auth === 'true');
    setIsLoading(false);
  }, []);

  const login = (password: string) => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'qwe';
    if (password === adminPassword) {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
}
