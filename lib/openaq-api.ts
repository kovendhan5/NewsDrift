import { cacheData, getCachedData } from './redis';

const OPENAQ_API_KEY = process.env.OPENAQ_API_KEY;
const BASE_URL = 'https://api.openaq.org/v2';

interface AirQualityData {
  location: string;
  city: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  measurements: Array<{
    parameter: string;
    value: number;
    unit: string;
    lastUpdated: string;
  }>;
}

export async function getAirQuality(params: {
  city?: string;
  country?: string;
  coordinates?: { lat: number; lon: number };
  radius?: number;
}) {
  const { city, country, coordinates, radius = 10000 } = params;
  const cacheKey = `airquality:${city || ''}:${country || ''}:${coordinates?.lat || ''}:${coordinates?.lon || ''}`;

  // Try to get from cache first
  const cached = await getCachedData<AirQualityData[]>(cacheKey);
  if (cached) return cached;

  const queryParams = new URLSearchParams({
    limit: '10',
    ...(city && { city }),
    ...(country && { country }),
    ...(coordinates && {
      coordinates: `${coordinates.lat},${coordinates.lon}`,
      radius: radius.toString(),
    }),
  });

  try {
    const response = await fetch(`${BASE_URL}/latest?${queryParams}`, {
      headers: {
        'X-API-Key': OPENAQ_API_KEY!,
      },
    });

    if (!response.ok) throw new Error('OpenAQ API request failed');
    
    const data = await response.json();
    const formattedData: AirQualityData[] = data.results.map((result: any) => ({
      location: result.location,
      city: result.city,
      country: result.country,
      coordinates: {
        latitude: result.coordinates.latitude,
        longitude: result.coordinates.longitude,
      },
      measurements: result.measurements.map((m: any) => ({
        parameter: m.parameter,
        value: m.value,
        unit: m.unit,
        lastUpdated: m.lastUpdated,
      })),
    }));

    // Cache the results for 1 hour
    await cacheData(cacheKey, formattedData, 3600);
    
    return formattedData;
  } catch (error) {
    console.error('OpenAQ API Error:', error);
    throw error;
  }
}

export async function getHistoricalAirQuality(location: string, params: {
  parameter?: string;
  startDate?: string;
  endDate?: string;
}) {
  const { parameter = 'pm25', startDate, endDate } = params;
  const cacheKey = `airquality:historical:${location}:${parameter}:${startDate || ''}:${endDate || ''}`;

  // Try to get from cache first
  const cached = await getCachedData(cacheKey);
  if (cached) return cached;

  const queryParams = new URLSearchParams({
    location,
    parameter,
    ...(startDate && { date_from: startDate }),
    ...(endDate && { date_to: endDate }),
    limit: '100',
  });

  try {
    const response = await fetch(`${BASE_URL}/measurements?${queryParams}`, {
      headers: {
        'X-API-Key': OPENAQ_API_KEY!,
      },
    });

    if (!response.ok) throw new Error('OpenAQ Historical API request failed');
    
    const data = await response.json();
    
    // Cache the results for 6 hours since historical data doesn't change often
    await cacheData(cacheKey, data.results, 21600);
    
    return data.results;
  } catch (error) {
    console.error('OpenAQ Historical API Error:', error);
    throw error;
  }
}