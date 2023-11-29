import { LocationSearch } from "@/features/location/components/LocationSearch/LocationSearch";
import { useWebGeolocation } from "@/features/location/hooks/useWebGeolocation";
import { getLocationId } from "@/features/location/utils/getLocationId";
import { getLocationLabel } from "@/features/location/utils/getLocationLabel";
import { useUserLocationStorage } from "@/features/location/hooks/useUserLocationStorage";



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
                {userLocation.name}
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
