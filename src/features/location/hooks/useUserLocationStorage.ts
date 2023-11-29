import { useEffect, useState } from "react";
import lscache from "lscache";
import { Location } from "@/features/location/api/location.api";

const locationStorageKey = "userLocations";

export function useUserLocationStorage() {
  const [locations, setLocations] = useState<null | Location[]>(null);

  useEffect(() => {
    const userLocations = lscache.get(locationStorageKey);
    setLocations(userLocations);
  }, []);

  return {
    locations,
    addLocation: (newLocation: Location) => {
      const newLocations = locations ? [...locations, newLocation] : [newLocation];
      lscache.set(locationStorageKey, newLocations);
      setLocations(newLocations);
    }
  };
}
