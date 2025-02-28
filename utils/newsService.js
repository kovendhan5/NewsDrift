import mongoose, { Schema } from 'mongoose';

// News Schema
const newsSchema = new Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  source: {
    name: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create model if it doesn't exist
const News = mongoose.models.News || mongoose.model('News', newsSchema);

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Fetch and store news
export async function fetchAndStoreNews() {
  await connectDB();
  
  try {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_API_KEY);
    const data = await response.json();
    
    if (data.articles) {
      // Clear existing news
      await News.deleteMany({});
      
      // Store new articles
      await News.insertMany(data.articles);
      return { success: true };
    }
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
}

// Get stored news
export async function getStoredNews() {
  await connectDB();
  try {
    const news = await News.find({}).sort({ publishedAt: -1 });
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
} 