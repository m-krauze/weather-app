import { configureStore } from "@reduxjs/toolkit";
import { locationApi } from "@/features/location/api/location.api";
import { weatherApi } from "@/features/weather/api/weather.api";
import { notificationsSlice } from "@/features/notification/notification.slice";

export const createStore = () => configureStore({
  reducer: {
    [notificationsSlice.name]: notificationsSlice.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer
  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat([locationApi.middleware, weatherApi.middleware])
});
