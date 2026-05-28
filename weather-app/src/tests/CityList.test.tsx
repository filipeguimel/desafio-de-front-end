import { render, screen, waitFor } from '@testing-library/react';
import { CityList } from '@/components/CityList';
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.useFakeTimers();

describe('CityList', () => {
  it('displays loading message initially', () => {
    render(<CityList />);
    expect(screen.getByText(/loading cities/i)).toBeInTheDocument();
  });

  it('renders all cities after loading', async () => {
    render(<CityList />);

    jest.runAllTimers();
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
    });

    const cities = ['Madrid', 'Fairbanks', 'London', 'Recife', 'Vancouver', 'Yakutsk'];
    cities.forEach(city => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('displays error if simulation fails', async () => {
    render(<CityList simulateError={true} />);
    jest.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText(/error loading cities/i)).toBeInTheDocument();
    });
  });
});
