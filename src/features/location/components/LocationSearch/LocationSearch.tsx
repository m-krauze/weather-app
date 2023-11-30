import Select from "react-select";
import { Location, useGetLocationListQuery } from "@/features/location/api/location.api";
import { useId, useState } from "react";
import { getLocationId } from "@/features/location/utils/getLocationId";
import { getLocationLabel } from "@/features/location/utils/getLocationLabel";

interface LocationSearchProps {
  placeholder?: string;
  selectedOption?: LocationSearchValue | null;
  onSelect?: (newOption: Location | null) => void;
  webGeolocation?: Location;
}

export interface LocationSearchValue {
  value: string,
  label: string
}

export function LocationSearch(props: LocationSearchProps) {
  const { placeholder, selectedOption, onSelect, webGeolocation } = props;
  const [inputValue, setInputValue] = useState("");

  const { data } = useGetLocationListQuery(inputValue || "", { skip: !inputValue });

  const locationOptions: LocationSearchValue[] = (data || []).map((location) => ({
    value: getLocationId(location),
    label: getLocationLabel(location)
  }));

  if (webGeolocation) {
    locationOptions.push({
      value: getLocationId(webGeolocation),
      label: getGeolocationLabel(webGeolocation)
    });
  }

  const componentId = useId();

  return (
    <Select
      id={componentId}
      instanceId={componentId}
      placeholder={placeholder}
      value={selectedOption}
      options={locationOptions}
      filterOption={() => {
        return true;
      }}
      onChange={(newOption) => {
        if (onSelect && newOption) {
          const apiLocations = data || [];
          const allLocations = webGeolocation ? [...apiLocations, webGeolocation] : apiLocations;

          const newLocation = allLocations.find((location) => {
            const locationId = getLocationId(location);
            return locationId === newOption.value;
          });

          onSelect(newLocation || null);
        }
      }}
      onInputChange={(newValue) => {
        setInputValue(newValue);
      }}
      classNames={{
        container: () => "w-full",
      }}
    />
  );
}

//  Utils
function getGeolocationLabel(webGeolocation: Location) {
  return `Your location: ${getLocationLabel(webGeolocation)}`;
}
