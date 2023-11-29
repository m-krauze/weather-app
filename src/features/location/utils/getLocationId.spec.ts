import { Location } from "@/features/location/api/location.api";
import { getLocationId } from "@/features/location/utils/getLocationId";

describe("getLocationId", () => {
  it("creates location id abstraction", () => {
    const mockedLockation: Location = {
      name: "A Location",
      country: "PT",
      local_names: { pl: "Portugalia" },
      state: "Some state",
      lat: 12,
      lon: 12
    };

    expect(getLocationId(mockedLockation)).toBe("A Location_12_12");
  });
});
