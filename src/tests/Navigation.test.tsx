import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import {CityCard} from '@/components/CityCard';
import {CityList} from '@/components/CityList';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Navigation', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    pushMock.mockClear();
  });

  it('navigates to city page when clicking on CityCard', () => {
    render(<CityCard name="London" />);
    fireEvent.click(screen.getByText('London'));
    expect(pushMock).toHaveBeenCalledWith('/london');
  });

  it('navigates to correct page when selecting city in CityList', async () => {
    jest.useFakeTimers();
    render(<CityList />);
    jest.runAllTimers();
    
    await screen.findByText('London');
    fireEvent.click(screen.getByText('London'));
    
    expect(pushMock).toHaveBeenCalledWith('/london');
    jest.useRealTimers();
  });

  it('does not navigate when the city name is empty', () => {
    render(<CityCard name="" />);
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('converts city name to lowercase during navigation', () => {
    render(<CityCard name="New York" />);
    fireEvent.click(screen.getByText('New York'));
    expect(pushMock).toHaveBeenCalledWith('/new york');
  });
});