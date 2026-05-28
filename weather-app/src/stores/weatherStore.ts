import { create } from 'zustand';
import { WeatherData } from '@/types/weather';

interface WeatherState {
  weatherData: WeatherData | null;
  currentCity: string;
  setWeatherData: (data: WeatherData) => void;
  setCurrentCity: (city: string) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: null,
  currentCity: '',
  setWeatherData: (data) => set({ weatherData: data }),
  setCurrentCity: (city) => set({ currentCity: city }),
}));