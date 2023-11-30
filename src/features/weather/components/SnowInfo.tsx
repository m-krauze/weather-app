import { WeatherInfoBox } from "@/features/weather/components/WeatherInfoBox";

interface SnowInfoProps {
  snowVolume: number;
}
export function SnowInfo(props: SnowInfoProps) {
  const { snowVolume } = props;

  return (
    <WeatherInfoBox
      icon={<i className="wi wi-snow" />}
      name="Snow"
      value={`${snowVolume}mm`}
    />
  );
}

