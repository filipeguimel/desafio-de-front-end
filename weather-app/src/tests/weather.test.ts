import { getWeather } from '@/services/weather';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});


global.fetch = jest.fn();
jest.spyOn(console, 'error').mockImplementation(() => {});
jest.spyOn(console, 'warn').mockImplementation(() => {});

const mockWeatherData = {
  location: { name: 'London', country: 'UK' },
  current: {
    temp_c: 20,
    condition: { text: 'Sunny' },
    wind_kph: 15,
    humidity: 65
  },
  forecast: {
    forecastday: [{
      hour: [{ time: '2023-01-01 12:00', temp_c: 20 }]
    }]
  }
};

describe('Weather Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return weather data when the API is successful', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockWeatherData),
    });

    const result = await getWeather('london');
    expect(result).toEqual(mockWeatherData);
  });

  it('should return null when the API returns 404', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await getWeather('invalid-city');
    expect(result).toBeNull();
  });

  it('should return null when the weather data is incomplete', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const result = await getWeather('london');
    expect(result).toBeNull();
  });

  it('should return null when there is a network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await getWeather('london');
    expect(result).toBeNull();
  });
});