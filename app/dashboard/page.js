 'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/user');
        const data = await response.json();
        
        if (data.error) {
          router.push('/login');
          return;
        }
        
        setUser(data.user);
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h1>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}