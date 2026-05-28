import { getWeather } from '@/services/weather';
import WeatherClient from '@/components/WeatherClient';

type Props = {
  params: Promise<{ city: string }>;
};

export default async function CityPage({ params }: Props) {
  const { city } = await params;

  try {
    const weather = await getWeather(city);

    if (!weather) {
      return (
        <main className="min-h-screen flex items-center justify-center" data-testid="not-found-container">
          <h1 className="text-2xl font-bold" data-testid="not-found-message">
            Cidade não encontrada
          </h1>
        </main>
      );
    }

    return (
      <div data-testid="weather-client">
        <WeatherClient initialWeather={weather} />
      </div>
    );
  }  catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Failed to load weather data:', error.message);
  } else {
    console.error('Unknown error occurred:', error);
  }
    return (
      <main className="min-h-screen flex items-center justify-center" data-testid="error-container">
        <h1 className="text-2xl font-bold" data-testid="error-message">
          Erro ao carregar dados
        </h1>
      </main>
    );
  }
}
