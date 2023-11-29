import { setupServer } from "msw/node";
import { openweatherHandlers } from "@/mocks/openweatherHandlers";

export const mswServer = setupServer(...openweatherHandlers);
