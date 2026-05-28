import { render, screen } from '@testing-library/react';
import { CityNotFoundMessage } from '@/components/CityNotFoundMessage';
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('renders not found message', () => {
  render(<CityNotFoundMessage />);
  expect(screen.getByText(/city not found/i)).toBeInTheDocument();
});
