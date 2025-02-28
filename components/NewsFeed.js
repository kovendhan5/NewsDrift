import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {news.map((article, index) => (
        <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
          {article.urlToImage && (
            <div className="relative h-48">
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          <div className="p-4">
            <h2 className="font-bold text-xl mb-2">{article.title}</h2>
            <p className="text-gray-700">{article.description}</p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
} 