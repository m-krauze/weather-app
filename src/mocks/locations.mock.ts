import { Location } from "@/features/location/api/location.api";

export const locationsMock: Location[] = [
  {
    name: "Lisboa",
    local_names: { pl: "Lizbona" },
    lat: 10,
    lon: 10,
    country: "Portugal",
    state: "some pt state"
  },
  {
    name: "London",
    local_names: { en: "London" },
    lat: 20,
    lon: 20,
    country: "Great Britain",
    state: "some en state"
  }, {
    name: "Warsaw",
    local_names: { pl: "Warszawa" },
    lat: 30,
    lon: 30,
    country: "Poland",
    state: "masovia"
  },
  {
    name: "Gdansk",
    local_names: { pl: "Gdańsk" },
    lat: 40,
    lon: 40,
    country: "Poland",
    state: "masovia"
  }];
