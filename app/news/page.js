async function getNews() {
  const dummyNews = [
    {
      title: "Climate Change Impact on Global Ecosystems",
      description: "New research reveals the extensive impact of climate change on worldwide ecosystems...",
      url: "https://example.com/news/1"
    },
    {
      title: "Renewable Energy Breakthrough",
      description: "Scientists develop more efficient solar panels that could revolutionize clean energy...",
      url: "https://example.com/news/2"
    },
    {
      title: "Ocean Conservation Efforts Show Promise",
      description: "Recent marine conservation initiatives demonstrate positive results in protecting ocean life...",
      url: "https://example.com/news/3"
    }
  ];

  return dummyNews;
}

export default async function News() {
  const articles = await getNews();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Environmental News</h1>
      
      <div className="grid gap-6">
        {articles.map((article, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 