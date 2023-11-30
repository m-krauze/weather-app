import { WeatherInfoBox } from "@/features/weather/components/WeatherInfoBox";

interface RainInfoProps {
  rainVolume: number;
}
export function RainInfo(props: RainInfoProps) {
  const { rainVolume } = props;

  return (
    <WeatherInfoBox
      icon={<i className="wi wi-rain" />}
      name="Rain"
      value={`${rainVolume}mm`}
    />
  );
}

