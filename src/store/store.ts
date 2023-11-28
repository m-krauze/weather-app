import { configureStore } from '@reduxjs/toolkit';
import { locationApi } from "@/features/location/api/location.api";

export const store = configureStore({
  reducer: {
    [locationApi.reducerPath]: locationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat([locationApi.middleware])
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
