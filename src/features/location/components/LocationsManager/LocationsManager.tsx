import { LocationSearch } from "@/features/location/components/LocationSearch/LocationSearch";
import { useWebGeolocation } from "@/features/location/hooks/useWebGeolocation";
import { getLocationId } from "@/features/location/utils/getLocationId";
import { useUserLocationStorage } from "@/features/location/hooks/useUserLocationStorage";
import { getLocationSlug } from "@/features/location/utils/getLocationSlug";
import Link from "next/link";
import { addNotification } from "@/features/notification/notification.slice";
import { getLocationLabel } from "@/features/location/utils/getLocationLabel";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export function LocationsManager() {
  const { webGeolocation, isLoading: isWebGeolocationLoading } = useWebGeolocation();
  const { locations, addLocation } = useUserLocationStorage();
  const dispatch = useAppDispatch();

  return (
    <div className="grow flex flex-col gap-8 p-4 max-w-screen-lg">

      <h2 className="text-4xl font-bold text-center mt-4 text-info">Add a City</h2>
      <div className="card shadow bg-base-100 p-4 flex text-center justify-center items-center">
        {isWebGeolocationLoading ?
          (
            <span className="loading loading-bars loading-lg" />
          ) : (
            <LocationSearch
              placeholder="Type in a city name"
              webGeolocation={webGeolocation || undefined}
              onSelect={(newLocation) => {
                const allLocations = webGeolocation && locations ? [...locations, webGeolocation] : [];

                const isDuplicate = Boolean(newLocation && allLocations.find((location) => getLocationId(location) === getLocationId(newLocation)));

                if (newLocation && isDuplicate) {
                  dispatch(addNotification({ type: "error", text: `Location ${getLocationLabel(newLocation)} is already in your list` }));
                }

                if (newLocation && !isDuplicate) {
                  addLocation(newLocation);
                }
              }}
            />
          )}
      </div>
      <div className="card shadow bg-base-100 p-4">
        <h2 className="text-center font-bold text-xl">Your cities</h2>
        <div className="divider" />
        {locations ? (
          <ul className="list-none flex justify-center gap-8 flex-wrap">
            {locations.map((userLocation) => (
              <li
                key={`ml_${getLocationId(userLocation)}`}
                className="flex-shrink-0"
              >
                <Link
                  href={`location/${getLocationSlug(userLocation)}`}
                  className="text-lg font-semibold btn btn-neutral nowrap"
                >
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
