import { useEffect, useState } from "react";
import lscache from "lscache";
import { Location } from "@/features/location/api/location.api";
import { getLocationId } from "@/features/location/utils/getLocationId";

const locationStorageKey = "userLocations";

export function useUserLocationStorage() {
  const [locations, setLocations] = useState<null | Location[]>(null);

  useEffect(() => {
    const userLocations = getLocations();
    setLocations(userLocations);
  }, []);

  return {
    locations,
    addLocation: (newLocation: Location, onError?: (error: string) => void) => {
      if (locations && locations.find((location) => getLocationId(location) === getLocationId(newLocation))) {
        onError && onError(`Cannot add ${newLocation.name}, it is already in a list`);
      } else {
        const newLocations = locations ? [...locations, newLocation] : [newLocation];
        lscache.set(locationStorageKey, newLocations);
        setLocations(newLocations);
      }
    }
  };
}

//  Utils
function getLocations(): null | Location[] {
  return lscache.get(locationStorageKey);
}
