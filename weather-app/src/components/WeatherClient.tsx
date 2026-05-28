"use client"
import { useEffect } from 'react';
import { useWeatherStore } from '../stores/weatherStore';
import { WeatherData } from '@/types/weather';
import { defaultWeatherData } from '../constants/defaultWeatherData';

import { SunHot, SunCold } from './icons/Sun';
import { CloudyHot, CloudyCold } from './icons/Cloudy';
import { OvercastHot, OvercastCold } from './icons/Overcast';
import { MistHot, MistCold } from './icons/Mist';
import { PartlyCloudyHot, PartlyCloudyCold } from './icons/PartlyCloudy';
import { DrizzleHot, DrizzleCold } from './icons/Drizzle';
import { RainHot, RainCold } from './icons/Rain';
import { RainHeavyHot, RainHeavyCold } from './icons/RainHeavy';
import { SnowHot, SnowCold } from './icons/Snow';
import { HailHot, HailCold } from './icons/Hail';
import { SleetHot, SleetCold } from './icons/Sleet';
import { ThunderyHot, ThunderyCold } from './icons/Thundery';
import { RainThunderHot, RainThunderCold } from './icons/RainThunder';
import { FogHot, FogCold } from './icons/Fog';
import { CloudySunnyHot, CloudySunnyCold } from './icons/CloudySunny';
import { MoonCold, MoonHot } from './icons/Moon';
import { CloudyMoonCold, CloudyMoonHot } from './icons/CloudyMoon';
import { ArrowUp } from './icons/ArrowUp';
import { ArrowDown } from './icons/ArrowDown';
import { Line } from './icons/Line';
import { Globe } from './icons/Globe';

function timeStringToMinutes(timeStr: string) {
  const [time, modifier] = timeStr.split(' ');
  let [hours] = time.split(':').map(Number);
  const [minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

const weatherIconMap: Record<
  number,
  {
    iconHot: React.FC<{ className?: string }>;
    iconCold: React.FC<{ className?: string }>;
  }
> = {
  1000: { iconHot: SunHot, iconCold: SunCold },
  1003: { iconHot: PartlyCloudyHot, iconCold: PartlyCloudyCold },
  1006: { iconHot: CloudyHot, iconCold: CloudyCold },
  1009: { iconHot: OvercastHot, iconCold: OvercastCold },
  1030: { iconHot: MistHot, iconCold: MistCold },
  1063: { iconHot: RainHot, iconCold: RainCold },
  1066: { iconHot: SnowHot, iconCold: SnowCold },
  1069: { iconHot: HailHot, iconCold: HailCold },
  1072: { iconHot: DrizzleHot, iconCold: DrizzleCold },
  1087: { iconHot: ThunderyHot, iconCold: ThunderyCold },
  1114: { iconHot: SnowHot, iconCold: SnowCold },
  1117: { iconHot: SnowHot, iconCold: SnowCold },
  1135: { iconHot: FogHot, iconCold: FogCold },
  1147: { iconHot: FogHot, iconCold: FogCold },
  1150: { iconHot: DrizzleHot, iconCold: DrizzleCold },
  1153: { iconHot: DrizzleHot, iconCold: DrizzleCold },
  1168: { iconHot: DrizzleHot, iconCold: DrizzleCold },
  1171: { iconHot: DrizzleHot, iconCold: DrizzleCold },
  1180: { iconHot: RainHot, iconCold: RainCold },
  1183: { iconHot: RainHot, iconCold: RainCold },
  1186: { iconHot: RainHot, iconCold: RainCold },
  1189: { iconHot: RainHot, iconCold: RainCold },
  1192: { iconHot: RainHeavyHot, iconCold: RainHeavyCold },
  1195: { iconHot: RainHeavyHot, iconCold: RainHeavyCold },
  1198: { iconHot: RainHeavyHot, iconCold: RainHeavyCold },
  1201: { iconHot: RainHeavyHot, iconCold: RainHeavyCold },
  1249: { iconHot: SleetHot, iconCold: SleetCold },
  1252: { iconHot: SleetHot, iconCold: SleetCold },
  1255: { iconHot: SnowHot, iconCold: SnowCold },
  1258: { iconHot: SnowHot, iconCold: SnowCold },
  1261: { iconHot: SnowHot, iconCold: SnowCold },
  1264: { iconHot: SnowHot, iconCold: SnowCold },
  1273: { iconHot: RainThunderHot, iconCold: RainThunderCold },
};

export default function WeatherClient({ initialWeather }: { initialWeather?: WeatherData }) {
  const { weatherData, setWeatherData } = useWeatherStore();

  useEffect(() => {
    setWeatherData(initialWeather || defaultWeatherData);
  }, [initialWeather, setWeatherData]);

  if (!weatherData?.forecast?.forecastday?.[0]?.astro) {
    return <div>Dados incompletos</div>;
  }
  if (!weatherData) return <p data-testid="loading-message">Carregando...</p>;

  const temp = Math.round(weatherData.current.temp_c);
  const conditionCode = weatherData.current.condition.code;

  const sunriseMinutes = timeStringToMinutes(weatherData.forecast.forecastday[0].astro.sunrise);
  const sunsetMinutes = timeStringToMinutes(weatherData.forecast.forecastday[0].astro.sunset);
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const isDaytime = currentMinutes >= sunriseMinutes && currentMinutes < sunsetMinutes;

  let IconComponent: React.FC<{ className?: string }> | undefined;

  if (conditionCode === 1000) {
    IconComponent = isDaytime
      ? (temp <= 0 ? SunCold : SunHot)
      : (temp <= 0 ? MoonCold : MoonHot);
  } else if (conditionCode === 1003) {
    IconComponent = isDaytime
      ? (temp <= 0 ? CloudySunnyCold : CloudySunnyHot)
      : (temp <= 0 ? CloudyMoonCold : CloudyMoonHot);
  } else {
    IconComponent =
      temp <= 0
        ? weatherIconMap[conditionCode]?.iconCold
        : weatherIconMap[conditionCode]?.iconHot;
  }

  const bgColor = temp <= 0 ? 'bg-gray' : 'bg-blue';
  const iconColor = temp <= 0 ? 'text-dark' : 'text-white';

  const hours = [3, 9, 15, 21];
  const hourPeriods = {
    3: 'Dawn',
    9: 'Morning',
    15: 'Afternoon',
    21: 'Night',
  };

  return (
    <div 
      className={`min-h-screen ${bgColor} flex items-start justify-center py-8 md:pt-37.5`}
      data-testid="weather-client-container"
    >
      <div className="flex-wrap rounded-xl text-center w-93.75 sm:w-135 md:w-128">
        <h1 className="text-2xl  m-0 font-light" data-testid="city-name">
          {weatherData.location.name}
        </h1>
        <p className="text-sm m-0 font-extralight" data-testid="weather-condition">
          {weatherData.current.condition.text}
        </p>

        <div className="text-9xl my-6 font-extralight flex items-start justify-center gap-2">
          <span data-testid="current-temp">{temp}</span>
          <div className='flex flex-col gap-4'>
            <div className='' style={{fontSize: '2.625rem'}}>° C</div>
            <div>
              {weatherData?.forecast?.forecastday?.[0]?.day?.maxtemp_c !== undefined && (
                <div 
                  className="text-base flex items-end justify-start"
                  data-testid="max-temp"
                >
                  <ArrowUp aria-label="weather icon"/> 
                  {Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}°
                </div>
              )}
              {weatherData?.forecast?.forecastday?.[0]?.day?.mintemp_c !== undefined && (
                <div 
                  className="text-base flex items-end justify-start"
                  data-testid="min-temp"
                >
                  <ArrowDown aria-label="weather icon"/> 
                  {Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}°
                </div>
              )}
            </div>
          </div>
        </div>

        {IconComponent ? (
          <IconComponent 
            className={`${iconColor} mx-auto w-44 h-44`}
            aria-label="weather icon"
            data-testid="main-weather-icon"
          />
        ) : (
          <p data-testid="missing-icon">Icon not available</p>
        )}

        <div className="flex items-center justify-center md:justify-between flex-wrap gap-6 my-4 text-xs">
          {weatherData.forecast.forecastday[0].hour
            .filter((h) => hours.includes(new Date(h.time).getHours()))
            .map((h, index) => {
              const period = ['dawn', 'morning', 'afternoon', 'night'][index];
              const hourTemp = Math.round(h.temp_c);
              const code = h.condition.code;
              const date = new Date(h.time);
              const hour = date.getHours();
              const minutes = date.getMinutes();
              const totalMinutes = hour * 60 + minutes;
              const isHourDaytime = totalMinutes >= sunriseMinutes && totalMinutes < sunsetMinutes;

              let HourIcon: React.FC<{ className?: string }> | undefined;

              if (code === 1000) {
                HourIcon = isHourDaytime
                  ? (hourTemp <= 0 ? SunCold : SunHot)
                  : (hourTemp <= 0 ? MoonCold : MoonHot);
              } else if (code === 1003) {
                HourIcon = isHourDaytime
                  ? (hourTemp <= 0 ? CloudySunnyCold : CloudySunnyHot)
                  : (hourTemp <= 0 ? CloudyMoonCold : CloudyMoonHot);
              } else {
                HourIcon =
                  hourTemp <= 0
                    ? weatherIconMap[code]?.iconCold
                    : weatherIconMap[code]?.iconHot;
              }

              return (
                <div 
                  key={h.time} 
                  className="flex flex-col items-center gap-3 justify-center w-23"
                  data-testid={`${period}-weather`}
                >
                  <span className='text-xl font-extralight'>{hourPeriods[hour as keyof typeof hourPeriods]}</span>
                  {HourIcon ? (
                    <HourIcon 
                      className={`${hourTemp <= 0 ? 'text-dark' : 'text-white'} w-12 h-12`} 
                      aria-label="weather icon"
                      data-testid={`${period}-icon`}
                    />
                  ) : (
                    <Globe  className={`${hourTemp <= 0 ? 'text-dark' : 'text-white'} w-12 h-12`} 
                      aria-label="weather icon"
                      data-testid={`${period}-icon`}/>
                  )}
                  <span 
                    className='text-xl font-extralight'
                    data-testid={`${period}-temp`}
                  >
                    {hourTemp}°C
                  </span>
                </div>
              );
            })}
        </div>

        <div className="flex gap-4 text-left flex-wrap md:flex-nowrap items-center justify-center text-xs mt-6">
          <div 
            className='flex flex-col items-center justify-center w-28.8 md:w-33 left-2'
            data-testid="wind-speed"
          > 
            <p className='font-extralight'>Wind speed: </p>
            <p className='font-extralight'>{weatherData.current.wind_mph} m/h</p>
          </div>

          <Line aria-label="weather icon"/>

          <div 
            className='flex flex-col items-center justify-center w-27.5'
            data-testid="humidity"
          >
            <p className='font-extralight'>Humidity: </p>
            <p className='font-extralight'>{weatherData.current.humidity}%</p>
          </div>

          <Line className='hidden sm:hidden md:block' aria-label="weather icon"/>

          <div 
            className='flex flex-col items-center justify-center w-27.5'
            data-testid="sunrise"
          >
            <p className='font-extralight'>Sunrise: </p>
            <p className='font-extralight'>{weatherData.forecast.forecastday[0].astro.sunrise}</p>
          </div>

          <Line aria-label="weather icon"/>
          
          <div 
            className='flex flex-col items-center justify-center w-27.5'
            data-testid="sunset"
          >
            <p className='font-extralight'>Sunset: </p>
            <p className='font-extralight'>{weatherData.forecast.forecastday[0].astro.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
}