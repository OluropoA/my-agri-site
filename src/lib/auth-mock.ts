"use client";

// Simple mock authentication utilities for development
import { useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

// Mock admin user
const mockAdmin: User = {
  id: "1",
  name: "Dr. Oluropo Apalowo",
  email: "oluropo.apalowo@unizik.edu.ng",
  role: "ADMIN"
};

// Since we're just mocking, we'll use simple functions without state management
export function useSession() {
  // In a real app, this would check localStorage or cookies
  // For now, let's just hardcode a session state
  const isAuthenticated = false;
  
  return {
    data: isAuthenticated ? { 
      user: mockAdmin,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() 
    } : null,
    status: isAuthenticated ? "authenticated" : "unauthenticated",
  };
}

export function signOut() {
  // In a real app, this would clear localStorage/cookies
  console.log('Mock sign out');
  return Promise.resolve();
}
