import { render, screen } from '@testing-library/react';
import { WeatherIcon } from '@/components/WeatherIcon';
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('WeatherIcon', () => {
  it('renders sunny icon for sunny weather during the day', () => {
    render(<WeatherIcon condition="Sunny" timeOfDay="day" />);
    expect(screen.getByLabelText('sunny icon')).toBeInTheDocument();
  });

  it('renders rainy icon for rainy weather', () => {
    render(<WeatherIcon condition="Rain" timeOfDay="day" />);
    expect(screen.getByLabelText('rainy icon')).toBeInTheDocument();
  });

  it('renders cloudy icon for cloudy weather', () => {
    render(<WeatherIcon condition="Cloudy" timeOfDay="day" />);
    expect(screen.getByLabelText('cloudy icon')).toBeInTheDocument();
  });

  it('renders moon icon for clear weather at night', () => {
    render(<WeatherIcon condition="Clear" timeOfDay="night" />);
    expect(screen.getByLabelText('moon icon')).toBeInTheDocument();
  });

  it('renders default icon for unknown condition', () => {
    render(<WeatherIcon condition="Unknown" timeOfDay="day" />);
    expect(screen.getByLabelText('default weather icon')).toBeInTheDocument();
  });
});