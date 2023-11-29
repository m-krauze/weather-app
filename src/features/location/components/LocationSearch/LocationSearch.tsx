import Select from "react-select";
import { Location, useGetLocationListQuery } from "@/features/location/api/location.api";
import { useState } from "react";
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

  return (
    <Select
      instanceId="location-search"
      placeholder={placeholder}
      value={selectedOption}
      options={locationOptions}
      filterOption={() => {
        return true;
      }}
      onChange={(newOption) => {

        if (onSelect && data && newOption) {
          const allLocations = webGeolocation ? [...data, webGeolocation] : data;
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
    />
  );
}

//  Utils
function getGeolocationLabel(webGeolocation: Location) {
  return `Your location: ${getLocationLabel(webGeolocation)}`;
}
