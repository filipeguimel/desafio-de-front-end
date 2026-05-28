import { WeatherData } from '@/types/weather';

const API_KEY = process.env.WEATHER_API_KEY;


export const getWeather = async (city: string): Promise<WeatherData | null> => {
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      console.error(`Error in API response for city: ${city} - Status: ${res.status}`);
      return null;
    }

    const data = await res.json();

    if (!data?.location || !data?.current) {
      console.warn(`Incomplete data for city: ${city}`);
      return null;
    }

    return data as WeatherData;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    return null;
  }
};

