import { render, screen } from '@testing-library/react';
import WeatherClient from '@/components/WeatherClient';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

const mockWeather = {
  location: { name: 'Madrid', country: 'Spain' },
  current: {
    temp_c: 20,
    condition: { code: 1000, text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
    wind_kph: 5,
    wind_mph: 3.1,
    humidity: 40,
  },
  forecast: {
    forecastday: [
      {
        astro: {
          sunrise: '06:30 AM',
          sunset: '09:00 PM',
          moonrise: '10:00 PM',
          moonset: '06:00 AM',
          moon_phase: 'Lua Nova',
          moon_illumination: '0',
          is_sun_up: 1,
          is_moon_up: 0,
        },
        day: {
          mintemp_c: 15,
          maxtemp_c: 25,
        },
        hour: [
          {
            time: '2025-05-19 12:00',
            temp_c: 22,
            condition: {
              code: 1000,
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
            },
          },
        ],
      },
    ],
  },
};

test('displays weather icon correctly', () => {
  render(<WeatherClient initialWeather={mockWeather} />);

  expect(screen.getByText(/Sunny/i)).toBeInTheDocument();

 const icons = screen.getAllByLabelText(/weather icon/i);
    expect(icons.length).toBeGreaterThan(0);
    expect(icons[0]).toBeInTheDocument();

});

