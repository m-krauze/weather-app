import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLocationParams } from "@/features/location/utils/getLocationParams";
import { GetWeatherPayload, useGetCurrentWeatherQuery, useGetFutureWeatherQuery } from "@/features/weather/api/weather.api";

interface LocationPageQuery {
  slug?: string;
}

export function LocationWeather() {
  const { query } = useRouter();
  const [locationParams, setLocationParams] = useState<GetWeatherPayload>({ lat: 0, lon: 0 });
  const isLocationEmpty = locationParams.lat === 0 && locationParams.lon === 0;
  const { data: currentWeather } = useGetCurrentWeatherQuery(locationParams, { skip: isLocationEmpty });
  const routerQuery = query as unknown as LocationPageQuery;
  const { data: futureWeather } = useGetFutureWeatherQuery(locationParams, { skip: isLocationEmpty });

  useEffect(() => {
    if (routerQuery.slug) {
      setLocationParams(getLocationParams(routerQuery.slug));
    }
  }, [routerQuery.slug]);

  return (
    <div>
      Location weather
    </div>
  );
}
