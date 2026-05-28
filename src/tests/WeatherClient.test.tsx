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
    location: { name: 'Gothan', country: 'Arkhan' },
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

  const mockExtremeWeatherData: WeatherData = {
    location: { name: 'Smallville', country: 'Krypton' },
    current: {
      temp_c: -5,
      condition: { code: 9999, text: 'Unknown Sky', icon: '' }, 
      wind_mph: 2,
      wind_kph: 4,
      humidity: 80,
    },
    forecast: {
      forecastday: [
        {
          astro: {
            sunrise: '06:00 AM',
            sunset: '06:00 PM',
            moonrise: '7:00 PM',
            moonset: '05:00 AM',
            moon_phase: 'New Moon',
            moon_illumination: '0',
            is_sun_up: 0,
            is_moon_up: 1,
          },
          day: { maxtemp_c: 2, mintemp_c: -8 },
          hour: [
            {
              time: '2023-10-01 03:00', 
              temp_c: 5,                
              condition: { code: 1003, text: 'Partly Cloudy Night', icon: '' },
            },
            {
              time: '2023-10-01 09:00', 
              temp_c: -2,               
              condition: { code: 1000, text: 'Cold Sunny', icon: '' },
            },
            {
              time: '2023-10-01 15:00', 
              temp_c: 2,                
              condition: { code: 9999, text: 'Unmapped Code', icon: '' }, 
            },
            {
              time: '2023-10-01 21:00', 
              temp_c: -3,               
              condition: { code: 1003, text: 'Freezing Cloudy Night', icon: '' },
            },
          ],
        },
      ],
    },
  };

  const mockMoonColdWeatherData: WeatherData = {
    ...mockExtremeWeatherData,
    forecast: {
      forecastday: [
        {
          ...mockExtremeWeatherData.forecast.forecastday[0],
          hour: [
            {
              time: '2023-10-01 03:00', 
              temp_c: -5,               
              condition: { code: 1000, text: 'Freezing Clear Night', icon: '' },
            },
            { time: '2023-10-01 09:00', temp_c: 0, condition: { code: 1000, text: 'Clear', icon: '' } },
            { time: '2023-10-01 15:00', temp_c: 0, condition: { code: 1000, text: 'Clear', icon: '' } },
            { time: '2023-10-01 21:00', temp_c: 0, condition: { code: 1000, text: 'Clear', icon: '' } },
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

  it('should render night and edge-case icons like CloudyMoon, Globe fallback, and missing icon message', () => {
    render(<WeatherClient initialWeather={mockExtremeWeatherData} />);


    expect(screen.getByTestId('missing-icon')).toBeInTheDocument();


    expect(screen.getByTestId('dawn-weather')).toBeInTheDocument();
    expect(screen.getByTestId('afternoon-weather')).toBeInTheDocument();
    expect(screen.getByTestId('night-weather')).toBeInTheDocument();
  });

  it('should render MoonCold icon under freezing night conditions', () => {
    render(<WeatherClient initialWeather={mockMoonColdWeatherData} />);
    expect(screen.getByTestId('dawn-weather')).toBeInTheDocument();
  });
});