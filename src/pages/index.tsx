import { LocationsManager } from "@/features/location/components/LocationsManager/LocationsManager";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <article className="flex justify-center">
        <LocationsManager />
      </article>
    </Layout>
  );
}
