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
      console.error(`Erro na resposta da API para cidade: ${city} - Status: ${res.status}`);
      return null;
    }

    const data = await res.json();

    if (!data?.location || !data?.current) {
      console.warn(`Dados incompletos para a cidade: ${city}`);
      return null;
    }

    return data as WeatherData;
  } catch (error) {
    console.error(`Erro ao buscar dados do clima para ${city}:`, error);
    return null;
  }
};

