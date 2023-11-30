export function getLocationParams(slug: string) {
  const slugParts = slug.split("-");

  return {
    lat: getParamFromSlug(slugParts[slugParts.length - 2]),
    lon: getParamFromSlug(slugParts[slugParts.length - 1])
  };
}

function getParamFromSlug(slugValue: string) {
  if (slugValue.includes("m")) {
    return parseFloat(slugValue.replace("m", "-"));
  }

  return parseFloat(slugValue);
}
