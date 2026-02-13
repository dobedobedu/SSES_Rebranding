import { useState, useEffect, useCallback } from 'react';
import { generateUserId, saveUserName, getUserName } from '../lib/storage';

interface User {
  id: string;
  name: string;
  email?: string;
}

// Simple admin check - in production this would be server-side
const ADMIN_EMAILS = ['charles@', 'admin@', 'cdo@'];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for existing user
    const userId = localStorage.getItem('sst_user_id');
    const userName = getUserName();
    
    if (userId) {
      setUser({ id: userId, name: userName || 'User' });
      
      // Check if admin based on email
      const email = localStorage.getItem('sst_user_email');
      if (email) {
        const isAdminUser = ADMIN_EMAILS.some(prefix => email.toLowerCase().includes(prefix));
        setIsAdmin(isAdminUser);
      }
    }
    setLoading(false);
  }, []);

  const signInWithName = useCallback(async (firstName: string, lastName: string, email?: string) => {
    const userId = generateUserId();
    const fullName = `${firstName} ${lastName}`;
    
    saveUserName(fullName);
    if (email) {
      localStorage.setItem('sst_user_email', email);
    }
    
    setUser({ id: userId, name: fullName, email });
    
    // Check if admin
    if (email) {
      const isAdminUser = ADMIN_EMAILS.some(prefix => email.toLowerCase().includes(prefix));
      setIsAdmin(isAdminUser);
    }
    
    return { id: userId, name: fullName };
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('sst_user_name');
    localStorage.removeItem('sst_user_email');
    setUser(null);
    setIsAdmin(false);
  }, []);

  return {
    user,
    loading,
    isAdmin,
    signInWithName,
    signOut
  };
}
