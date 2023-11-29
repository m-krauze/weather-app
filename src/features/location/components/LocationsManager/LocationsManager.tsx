import { LocationSearch } from "@/features/location/components/LocationSearch/LocationSearch";
import { useWebGeolocation } from "@/features/location/hooks/useWebGeolocation";
import { getLocationId } from "@/features/location/utils/getLocationId";
import { useUserLocationStorage } from "@/features/location/hooks/useUserLocationStorage";
import { getLocationSlug } from "@/features/location/utils/getLocationSlug";
import Link from "next/link";


export function LocationsManager() {
  const { webGeolocation, isLoading: isWebGeolocationLoading } = useWebGeolocation();
  const { locations, addLocation } = useUserLocationStorage();

  return (
    <div>
      <h2>Add a City</h2>
      {isWebGeolocationLoading ?
        (
          <div>Loader</div>
        ) : (
          <LocationSearch
            placeholder="Type in a city name"
            webGeolocation={webGeolocation || undefined}
            onSelect={(newLocation) => {
              if (newLocation) {
                addLocation(newLocation);
              }
            }}
          />
        )}
      <div>
        <h2>Your cities</h2>
        {locations ? (
          <ul>
            {locations.map((userLocation) => (
              <li key={`ml_${getLocationId(userLocation)}`}>
                <Link href={`location/${getLocationSlug(userLocation)}`}>
                  {userLocation.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h3>You currently have no cities stored</h3>
        )}
      </div>
    </div>
  );
}
