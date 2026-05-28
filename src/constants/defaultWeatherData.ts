import { WeatherData } from '../types/weather';

export const defaultWeatherData: WeatherData = {
  current: {
    wind_kph: 0,
    wind_mph: 0,
    humidity: 0,
    temp_c: 0,
    condition: {
      code: 0,
      icon: '',
      text: 'Carregando...',
    },
  },
  location: {
    name: 'Carregando...',
    country: 'Carregando...',
  },
  forecast: {
    forecastday: [
      {
        astro: {
          sunrise: '00:00',
          sunset: '00:00',
          moonrise: '00:00',
          moonset: '00:00',
          moon_phase: '',
          moon_illumination: '',
          is_sun_up: 0,
          is_moon_up: 0,
        },
        day: {
          mintemp_c: 0,
          maxtemp_c: 0,
        },
        hour: [
          {
            time: '00:00',
            temp_c: 0,
            condition: {
              code: 0,
              text: 'Carregando...',
              icon: '',
            },
          },
        ],
      },
    ],
  },
};