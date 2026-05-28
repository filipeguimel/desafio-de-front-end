'use client';

import { useRouter } from 'next/navigation';

type CityCardProps = {
  name: string;
};

export function CityCard({ name }: CityCardProps) {
  const router = useRouter();

  if (!name) return null;

  const handleCitySelect = () => {
    router.push(`/${name.toLowerCase()}`);
  };

  return (
    <div onClick={handleCitySelect} className="cursor-pointer">
      <h2 className="text-lg font-semibold text-center">{name}</h2>
    </div>
  );
}
