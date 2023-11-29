import { configureStore } from "@reduxjs/toolkit";
import { locationApi } from "@/features/location/api/location.api";

export const createStore = () => configureStore({
  reducer: {
    [locationApi.reducerPath]: locationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat([locationApi.middleware])
});
