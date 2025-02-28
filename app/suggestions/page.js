export default function Suggestions() {
  const suggestions = [
    {
      title: 'Reduce Energy Consumption',
      tips: [
        'Use LED light bulbs',
        'Turn off unused electronics',
        'Use energy-efficient appliances',
        'Install a programmable thermostat'
      ]
    },
    {
      title: 'Transportation',
      tips: [
        'Use public transportation when possible',
        'Consider carpooling',
        'Maintain proper tire pressure',
        'Consider an electric or hybrid vehicle'
      ]
    },
    {
      title: 'Daily Habits',
      tips: [
        'Reduce meat consumption',
        'Use reusable bags and containers',
        'Compost organic waste',
        'Reduce water consumption'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Eco-Friendly Suggestions</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
            <ul className="space-y-2">
              {category.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 