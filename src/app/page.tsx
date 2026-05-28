import { CityList } from '@/components/CityList';
import './globals.css'


export default function Home() {
  return (
    <main className="min-h-screen  flex items-center justify-center">
      <div className="  ">
        <CityList />
      </div>
    </main>
  );
}
