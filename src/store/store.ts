import { createStore } from "@/store/createStore";

export const store = createStore();

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
