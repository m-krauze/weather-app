import { fireEvent, waitFor } from "@testing-library/react";
import { LocationSearch } from "@/features/location/components/LocationSearch/LocationSearch";
import { mswServer } from "@/mocks/mswServer";
import { renderWithProviders } from "@/utils/testUtils";
import { Location } from "@/features/location/api/location.api";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("LocationSearch component", () => {
  it("renders without error, with placeholder", () => {
    const placeholder = "Test placeholder";
    const { getByText } = renderWithProviders(<LocationSearch placeholder={placeholder} />);

    getByText(placeholder);
  });

  it("calls provided onChange callback", async () => {
    const onSelectMock = jest.fn();
    const { getByText, getByRole } = renderWithProviders(<LocationSearch onSelect={onSelectMock} />);

    await waitFor(() => {
      const textInput = getByRole('combobox');
      fireEvent.change(textInput, {
        target: {
          value: "L",
        },
      });

      getByText("Lisboa, Portugal, some pt state");
    });

    const element = getByText("Lisboa, Portugal, some pt state");
    fireEvent.click(element);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });

  it("always shows webGeolocation when provided", async () => {
    const webGeolocationMock: Location = {
      name: "A Location",
      country: "PT",
      local_names: { pl: "Portugalia" },
      state: "Some state",
      lat: 12,
      lon: 12
    };

    const { getByText, getByRole } = renderWithProviders(<LocationSearch webGeolocation={webGeolocationMock} />);

    await waitFor(async () => {
      const textInput = getByRole('combobox');
      fireEvent.change(textInput, {
        target: {
          value: "123Uglyvalue",
        },
      });

      await getByText("Your location: A Location, PT, Some state");
    });
  });
});
