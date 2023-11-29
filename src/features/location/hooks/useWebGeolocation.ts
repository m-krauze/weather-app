import { useEffect, useState } from "react";
import { useGetReverseLocationListQuery } from "@/features/location/api/location.api";

interface WebGeolocation {
  lat: number;
  lon: number;
}

export function useWebGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [geolocation, setGeolocation] = useState<WebGeolocation>({ lat: 0, lon: 0 });
  const isLocationEmpty = geolocation.lat === 0 && geolocation.lon === 0;
  const { data } = useGetReverseLocationListQuery(geolocation, { skip: isLocationEmpty });

  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition((pos) => {
        setIsLoading(false);
        setGeolocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
      });
      //TODO maybe error handling notification
    }
  }, []);

  return {
    webGeolocation: isLocationEmpty ? null : data ? data[0] : null,
    isLoading
  };
}
