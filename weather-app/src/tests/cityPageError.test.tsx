import { render, screen } from '@testing-library/react';
import CityPage from '@/app/[city]/page';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock('@/services/weather', () => ({
  getWeather: jest.fn(() => Promise.resolve(null)),
}));

describe('CityPage', () => {
  it('renders not found message if API returns null', async () => {
    const params = Promise.resolve({ city: 'Narnia' });
    const jsx = await CityPage({ params });

    render(jsx);

    expect(await screen.findByText(/city not found/i)).toBeInTheDocument();
  });
});
