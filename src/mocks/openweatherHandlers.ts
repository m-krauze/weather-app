import { http, HttpResponse } from "msw";
import { openweatherApiPath } from "@/constants/apiPaths";
import { locationsMock } from "@/mocks/locations.mock";

const locationHandler = http.get(`*/${openweatherApiPath}/geo/1.0/direct*`, () => {
  return HttpResponse.json(locationsMock);
});

export const openweatherHandlers = [locationHandler];
