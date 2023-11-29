import { Location } from "@/features/location/api/location.api";

export function getLocationSlug(location: Location) {
  const slugName = location.name.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  return `${slugName}-${location.lat}-${location.lon}`;
}
