import { render, screen } from '@testing-library/react';
import CityPage from '@/app/[city]/page';
import { getWeather } from '@/services/weather';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

const mockWeatherData = {
  location: { name: 'Madrid', country: 'Spain' },
  current: {
    temp_c: 20,
    condition: { code: 1000, text: 'Sunny' },
    wind_mph: 5,
    humidity: 50
  },
  forecast: {
    forecastday: [{
      astro: {
        sunrise: '06:00 AM',
        sunset: '06:00 PM'
      },
      day: {
        maxtemp_c: 25,
        mintemp_c: 15
      },
      hour: []
    }]
  }
};

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock('@/services/weather', () => ({
  getWeather: jest.fn()
}));

describe('CityPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render weather client when city is valid', async () => {
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);
    
    const params = { city: 'Madrid' };
    const Page = await CityPage({ params: Promise.resolve(params) });
    render(Page);
    
    expect(screen.getByTestId('weather-client')).toBeInTheDocument();
    expect(screen.queryByTestId('not-found-message')).not.toBeInTheDocument();
  });

  it('should show not found message when city is invalid', async () => {
    (getWeather as jest.Mock).mockResolvedValue(null);
    
    const params = { city: 'InvalidCity' };
    const Page = await CityPage({ params: Promise.resolve(params) });
    render(Page);
    
    expect(screen.getByTestId('not-found-message')).toBeInTheDocument();
    expect(screen.queryByTestId('weather-client')).not.toBeInTheDocument();
  });

  it('should handle API errors gracefully', async () => {
    (getWeather as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    const params = { city: 'ErrorCity' };
    const Page = await CityPage({ params: Promise.resolve(params) });
    render(Page);
    
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Erro ao carregar dados')).toBeInTheDocument();
  });
});