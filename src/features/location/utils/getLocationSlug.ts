import { Location } from "@/features/location/api/location.api";

export function getLocationSlug(location: Location) {
  const slugName = location.name.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  return `${slugName}-${getParamText(location.lat)}-${getParamText(location.lon)}`;
}

function getParamText(param: number) {
  if (param < 0) {
    return `m${param * -1}`;
  }

  return param;
}
