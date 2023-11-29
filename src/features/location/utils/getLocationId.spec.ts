import { Location } from "@/features/location/api/location.api";
import { getLocationId } from "@/features/location/utils/getLocationId";

describe("getLocationId", () => {
  it("creates location id abstraction", () => {
    const mockedLocation: Location = {
      name: "A Location",
      country: "PT",
      local_names: { pl: "Portugalia" },
      state: "Some state",
      lat: 12,
      lon: 12
    };

    expect(getLocationId(mockedLocation)).toBe("A Location_12_12");
  });
});
