import { Location } from "@/features/location/api/location.api";
import { getLocationSlug } from "@/features/location/utils/getLocationSlug";

describe("getLocationSlug", () => {
  it("returns location slug abstraction", () => {
    const mockedLocation: Location = {
      name: "A Location",
      country: "PT",
      local_names: { pl: "Portugalia" },
      state: "Some state",
      lat: 12.12312312312,
      lon: 11.678
    };

    expect(getLocationSlug(mockedLocation)).toBe("a-location-12.12312312312-11.678");
  });

  it("returns location slug abstraction with negative params", () => {
    const mockedLocation: Location = {
      name: "A Location",
      country: "PT",
      local_names: { pl: "Portugalia" },
      state: "Some state",
      lat: -12.12312312312,
      lon: 11.678
    };

    expect(getLocationSlug(mockedLocation)).toBe("a-location-m12.12312312312-11.678");
  });
});
