import { CurrentWeather } from "@/features/weather/api/weather.api";
import { WeatherInfoBox } from "@/features/weather/components/WeatherInfoBox";

interface VisibilityInfoProps {
  visibility: CurrentWeather["visibility"];
}
export function VisibilityInfo(props: VisibilityInfoProps) {
  const { visibility } = props;

  return (
    <WeatherInfoBox
      icon={<i className="wi wi-dust" />}
      name="Visibility"
      value={`${visibility}m`}
    />
  );
}

