import { CurrentWeather } from "@/features/weather/api/weather.api";
import { WeatherInfoBox } from "@/features/weather/components/WeatherInfoBox";

interface CloudsInfoProps {
  clouds: CurrentWeather["clouds"];
}
export function CloudsInfo(props: CloudsInfoProps) {
  const { clouds } = props;

  return (
    <WeatherInfoBox
      icon={clouds.all < 50 ? (
        <i className="wi wi-cloud" />
      ) : (
        <i className="wi wi-cloudy" />
      )}
      name="Clouds Coverage"
      value={`${clouds.all}%`}
    />
  );
}

