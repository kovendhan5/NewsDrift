import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-4">Page Not Found</h2>
        <p className="mt-4 text-gray-500">The page you're looking for doesn't exist.</p>
        <Link 
          href="/"
          className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 