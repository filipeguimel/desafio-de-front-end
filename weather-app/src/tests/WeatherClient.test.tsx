import { render, screen } from '@testing-library/react';
import WeatherClient from '@/components/WeatherClient';
import { WeatherData } from '@/types/weather';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});


describe('WeatherClient Component', () => {
  const mockWeatherData: WeatherData = {
    location: { name: 'Test City', country: 'Test Country' },
    current: {
      temp_c: 10,
      condition: { code: 1000, text: 'Sunny', icon: 'some-icon-url' },
      wind_mph: 5,
      wind_kph: 8,
      humidity: 50,
    },
    forecast: {
      forecastday: [
        {
          astro: {
            sunrise: '6:00 AM',
            sunset: '6:00 PM',
            moonrise: '7:00 PM',
            moonset: '5:00 AM',
            moon_phase: 'Waning Crescent',
            moon_illumination: '30',
            is_sun_up: 1,
            is_moon_up: 0,
          },
          day: {
            maxtemp_c: 15,
            mintemp_c: 5,
          },
          hour: [
            {
              time: '2023-10-01 03:00',
              temp_c: 8,
              condition: { code: 1000, text: 'Clear', icon: '' },
            },
            {
              time: '2023-10-01 09:00',
              temp_c: 10,
              condition: { code: 1003, text: 'Partly Cloudy', icon: '' },
            },
            {
              time: '2023-10-01 15:00',
              temp_c: 12,
              condition: { code: 1006, text: 'Cloudy', icon: '' },
            },
            {
              time: '2023-10-01 21:00',
              temp_c: 7,
              condition: { code: 1009, text: 'Overcast', icon: '' },
            },
          ],
        },
      ],
    },
  };

it('should render temperature correctly according to design', () => {
  render(<WeatherClient initialWeather={mockWeatherData} />);

  const tempValue = screen.getByTestId('current-temp');
  const tempUnit = screen.getByText('° C');
  
  expect(tempValue).toHaveTextContent('10');
  expect(tempUnit).toBeInTheDocument();
  
  expect(tempValue.parentElement).toContainElement(tempUnit);
});

  it('should render all weather icons', () => {
    render(<WeatherClient initialWeather={mockWeatherData} />);
    
    const weatherIcons = screen.getAllByLabelText('weather icon');
    expect(weatherIcons.length).toBeGreaterThanOrEqual(6);
    
    expect(screen.getByTestId('main-weather-icon')).toBeInTheDocument();
  });
});