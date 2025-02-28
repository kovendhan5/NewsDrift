import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome back, kovendhan!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/calculator" 
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Carbon Calculator</h2>
          <p className="text-gray-600">Calculate your carbon footprint and track your progress.</p>
        </Link>

        <Link href="/suggestions" 
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Eco Suggestions</h2>
          <p className="text-gray-600">Get personalized suggestions to reduce your carbon footprint.</p>
        </Link>

        <Link href="/news" 
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Environmental News</h2>
          <p className="text-gray-600">Stay updated with the latest environmental news.</p>
        </Link>
      </div>
    </div>
  );
}