import { configureStore } from "@reduxjs/toolkit";
import { locationApi } from "@/features/location/api/location.api";
import { weatherApi } from "@/features/weather/api/weather.api";

export const createStore = () => configureStore({
  reducer: {
    [locationApi.reducerPath]: locationApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer
  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat([locationApi.middleware, weatherApi.middleware])
});
