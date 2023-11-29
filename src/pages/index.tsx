import { Inter } from 'next/font/google';
import { LocationsManager } from "@/features/location/components/LocationsManager/LocationsManager";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <LocationsManager />
      <div>Test</div>
    </main>
  );
}
