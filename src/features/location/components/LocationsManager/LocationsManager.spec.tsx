import { fireEvent, getByText, render, waitFor, screen, getByTestId, within } from "@testing-library/react";
import { LocationsManager } from "@/features/location/components/LocationsManager/LocationsManager";
import { renderWithProviders } from "@/utils/testUtils";
import selectEvent from "react-select-event";
import { mswServer } from "@/mocks/mswServer";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("LocationsManager component", () => {
  it("renders without errors", () => {
    renderWithProviders(<LocationsManager />);
  });

  it("adds location to list after select", async () => {
    const { getByRole, getByText, getAllByRole } = renderWithProviders(
      <form data-testid="form">
        <LocationsManager />
      </form>
    );

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

    const items = getAllByRole("listitem");
    expect(items.length).toBe(1);
    getByText("Lisboa");
  });
});
