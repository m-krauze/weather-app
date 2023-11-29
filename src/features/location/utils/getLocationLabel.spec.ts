import { Location } from "@/features/location/api/location.api";
import { getLocationLabel } from "@/features/location/utils/getLocationLabel";

describe("getLocationLabel", () => {
  it("creates location label", () => {
    const mockedLockation: Location = {
      name: "A Location",
      country: "PT",
      local_names: { pl: "Portugalia" },
      state: "Some state",
      lat: 12,
      lon: 12
    };

    expect(getLocationLabel(mockedLockation)).toBe("A Location, PT, Some state");
  });
});
