import { Location } from "@/features/location/api/location.api";

export function getLocationId(location: Location) {
  return `${location.name}_${location.lat}_${location.lon}`;
}
