import { getLocationParams } from "@/features/location/utils/getLocationParams";

describe("getLocationParams", () => {
  it("creates Location params from slug", () => {
    expect(getLocationParams("a-location-12.12312312312-11.678")).toStrictEqual({
      lat: 12.12312312312,
      lon: 11.678
    });
  });

  it("creates Location parms with negative values", () => {
    expect(getLocationParams("a-location-m12.12312312312-11.678")).toStrictEqual({
      lat: -12.12312312312,
      lon: 11.678
    });
  });
});
