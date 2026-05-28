import React from 'react';

type WeatherIconProps = {
  condition: string;
  timeOfDay: 'day' | 'night';
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, timeOfDay }) => {
  const getIcon = () => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return timeOfDay === 'day' ? (
        <svg aria-label="sunny icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 1V3M12 21V23M4 12H2M22 12H20M5.6 5.6L7 7M17 17L18.4 18.4M5.6 18.4L7 17M17 7L18.4 5.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg aria-label="moon icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12C20 15.5 17 18 13.5 18C13.5835 18 13.6665 17.999 13.75 17.997C13.888 17.993 14.0245 17.9855 14.1595 17.9745C16.1875 17.7845 17.75 16.1725 17.75 14.25C17.75 12.4275 16.3225 10.8835 14.4325 10.521C14.2875 10.4945 14.1425 10.4755 14 10.464C14 10.309 14 10.1545 14 10C14 6.5 16.5 4 20 4C20 6 20 8 20 10C20 10.682 20 11.3415 20 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    
    if (conditionLower.includes('rain')) {
      return (
        <svg aria-label="rainy icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 15C7 15 8 17 6 19C4 21 6 23 8 21C10 19 9 17 9 15M15 15C15 15 16 17 14 19C12 21 14 23 16 21C18 19 17 17 17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15V3M18 3H16.5M6 3H7.5M16.5 6L15 7.5M7.5 6L9 7.5M12 3C10.5 3 10.5 4.5 12 4.5C13.5 4.5 13.5 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    
    if (conditionLower.includes('cloud')) {
      return (
        <svg aria-label="cloudy icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19C3.8 19 2 17.2 2 15C2 13.1 3.2 11.5 5 11M6 19H19C20.7 19 22 17.7 22 16C22 14.3 20.7 13 19 13H18.5M6 19C6.6 19 7.1 18.9 7.5 18.7M5 11C5.2 11 5.3 11 5.5 11C7.4 11 9 9.4 9 7.5C9 5.6 7.4 4 5.5 4C5.3 4 5.2 4 5 4.1M5 11C4.2 11 3.5 10.7 3 10.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    
    return (
      <svg aria-label="default weather icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  return (
    <div className="weather-icon">
      {getIcon()}
    </div>
  );
};