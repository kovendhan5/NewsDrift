'use client';
import { NAVIGATION, USER } from '@/utils/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            {NAVIGATION.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <span className="text-gray-700">Welcome, {USER.name}</span>
          </div>
        </div>
      </div>
    </nav>
  );
} 