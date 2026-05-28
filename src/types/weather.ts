export interface WeatherData {
  current: {
    wind_kph: number;
    wind_mph: number;
    humidity: number;
    temp_c: number;
    condition: {

      code: number;
      icon: string;
      text: string;
    }
  };
  location: {
    name: string;
    country: string;
  };
  forecast: {
    forecastday: {
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
        is_sun_up: number;
        is_moon_up: number;
      };
      day: {
        mintemp_c: number;
        maxtemp_c: number;
      }
      hour: {
        time: string;
        temp_c: number;
        condition: {
          code: number;
          text: string;
          icon: string;
        };
      }[];
    }[];
  };
}

