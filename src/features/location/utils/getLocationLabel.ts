import { Location } from "@/features/location/api/location.api";

export function getLocationLabel(location: Location) {
  return `${location.name}, ${location.country}${location.state ? `, ${location.state}` : ""}`;
}
