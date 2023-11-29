export function getLocationParams(slug: string) {
  const slugParts = slug.split("-");

  return {
    lat: parseFloat(slugParts[slugParts.length - 2]),
    lon: parseFloat(slugParts[slugParts.length - 1])
  };
}
