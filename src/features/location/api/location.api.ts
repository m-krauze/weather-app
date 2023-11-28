import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Location {
  name: string;
  local_names: {
    [name: string]: string
  },
  lat: number,
  lon: number,
  country: string,
  state: string
}

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "api/openweather/geo/1.0/" }),
  endpoints: (build) => ({
    getLocationList: build.query<Location[], string>({
      query: (locationName) => ({
        url: `direct`,
        params: {
          q: locationName,
          limit: 5
        }
      }),
    })
  })
});

export const { useGetLocationListQuery } = locationApi;
