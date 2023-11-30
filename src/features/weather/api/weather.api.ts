import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { openweatherApiPath } from "@/constants/apiPaths";
import { universalEnvs } from "@/utils/universalEnvs";

export interface CurrentWeather {
  dt: number;
  weather: {
    id: number,
    main: string,
    description: string,
    icon: string
  }[],
  main: {
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number
  }
  visibility:number;
  rain?: {
    "1h"?: number;
    "3h"?: number
  },
  snow?: {
    "1h"?: number;
    "3h"?: number
  }
  clouds: {
    all: number
  };
  sys: {
    sunrise: number,
    sunset: number,
  }
  timezone: number
}

export interface DailyWeatherData {
  city: {
    timezone: number;
  };
  list: {
    dt: number;
    dt_txt: string;
    main: {
      temp: number
    }
  }[];
}

export interface GetWeatherPayload {
  lat: number;
  lon: number
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${universalEnvs.appDomain}/${openweatherApiPath}/data/2.5/` }),
  endpoints: (build) => ({
    getCurrentWeather: build.query<CurrentWeather, GetWeatherPayload>({
      query: ({ lat, lon }) => ({
        url: `weather`,
        params: {
          lat,
          lon,
          units: "metric"
        }
      }),
    }),
    getFutureWeather: build.query<DailyWeatherData, GetWeatherPayload>({
      query: ({ lat, lon }) => ({
        url: 'forecast',
        params: {
          lat,
          lon,
          units: "metric"
        }
      })
    })
  })
});

export const { useGetCurrentWeatherQuery, useGetFutureWeatherQuery } = weatherApi;
