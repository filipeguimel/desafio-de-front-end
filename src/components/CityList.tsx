'use client';

import { useEffect, useState } from 'react';
import { CityCard } from './CityCard';
import { Globe } from './icons/Globe';

type City = {
  name: string;
  country: string;
};

export function CityList({ simulateError = false }: { simulateError?: boolean }) {
  const [cities, setCities] = useState<City[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

 useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(false);

        await new Promise(res => setTimeout(res, 500));

        if (simulateError) throw new Error('Erro simulado');

        const data = [
          { name: 'Madrid', country: 'ES' },
          { name: 'Fairbanks', country: 'US' },
          { name: 'London', country: 'GB' },
          { name: 'Recife', country: 'BR' },
          { name: 'Vancouver', country: 'CA' },
          { name: 'Yakutsk', country: 'RU' },
        ];

        setCities(data);
      } catch (err) {
        console.log(err)
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [simulateError]);

  return (
    <div className="flex flex-col items-center justify-start mt-8 md:mt-37.5 min-h-screen bg-black text-white w-93.75 md:w-128">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-semibold m-0">Weather</h1>
        <p className="text-s extra-light m-0">Select a city</p>
      </div>

      <div className="mt-6 mb-6">
        <Globe aria-label="Globe Icon" width={176} height={176} />
      </div>

      {loading && <p>Loading cities...</p>}
      {error && <p>Error loading cities.</p>}

      {cities && (
        <div className="mt-8 grid grid-cols-3 gap-x-8 gap-y-8">
          {cities.map((city) => (
            <CityCard key={city.name} name={city.name} />
          ))}
        </div>
      )}
    </div>
  );
}
