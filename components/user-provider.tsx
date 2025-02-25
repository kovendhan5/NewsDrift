"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import type { IUser } from '@/models/user';

interface UserContextType {
  user: IUser | null;
  loading: boolean;
  error: Error | null;
  syncUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
  syncUser: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: auth0User, isLoading: auth0Loading } = useAuth0();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const syncUser = async () => {
    if (!auth0User) return;

    try {
      const response = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to sync user data');
      }

      const userData = await response.json();
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      console.error('Error syncing user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth0Loading && auth0User) {
      syncUser();
    } else if (!auth0Loading) {
      setLoading(false);
    }
  }, [auth0User, auth0Loading]);

  return (
    <UserContext.Provider value={{ user, loading: loading || auth0Loading, error, syncUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};