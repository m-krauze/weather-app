import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { openweatherApiPath } from "@/constants/apiPaths";

export interface Location {
  name: string;
  local_names: {
    [name: string]: string
  },
  lat: number,
  lon: number,
  country: string,
  state?: string
}

type GetLocationListPayload = string;

interface GetReverseLocationListPayload {
  lat: number;
  lon: number
}

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/${openweatherApiPath}/geo/1.0/` }),
  endpoints: (build) => ({
    getLocationList: build.query<Location[], GetLocationListPayload>({
      query: (locationName) => ({
        url: `direct`,
        params: {
          q: locationName,
          limit: 5
        }
      }),
    }),
    getReverseLocationList: build.query<Location[], GetReverseLocationListPayload>({
      query: (locationParams) => ({
        url: `reverse`,
        params: locationParams
      }),
    })
  })
});

export const { useGetLocationListQuery, useGetReverseLocationListQuery } = locationApi;
