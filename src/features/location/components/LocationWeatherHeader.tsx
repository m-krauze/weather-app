import { Location } from "@/features/location/api/location.api";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addNotification } from "@/features/notification/notification.slice";
import { CurrentWeather } from "@/features/weather/api/weather.api";

interface LocationWeatherHeaderProps {
  location: Location;
  currentWeather: Pick<CurrentWeather, "main" | "sys" | "timezone">
}

export function LocationWeatherHeader(props: LocationWeatherHeaderProps) {
  const { location, currentWeather } = props;
  const dispatch = useAppDispatch();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(document.URL);
    dispatch(addNotification({ text: "Link copied to clipboard", type: "success" }));
  };

  const sunriseDate = new Date((currentWeather.sys.sunrise + currentWeather.timezone)*1000);
  const sunsetDate = new Date((currentWeather.sys.sunset + currentWeather.timezone)*1000);

  return (
    <div className="w-full ">
      <div className="navbar flex justify-between lg:hidden">
        <Link
          href="/"
          className="btn"
        >
          {"<"} Back to list
        </Link>
        <button
          type="button"
          className="btn btn-neutral"
          onClick={handleCopyLink}
        >
          Copy link
        </button>
      </div>
      <div className="hero bg-neutral">
        <div className="hero-content text-center max-w-screen-lg lg:flex lg:w-full">
          <div className="max-w-screen-lg flex flex-col gap-2 lg:flex-row lg:items-center lg:grow lg:gap-12">
            <div className="hidden lg:flex">
              <Link
                href="/"
                className="btn"
              >
                {"<"} Back to list
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-bold text-primary">{location.name}</h1>
              <h2 className="text-xl font-semibold text-secondary">{location.country}{location.state ? `, ${location.state}` : ""}</h2>
            </div>
            <button
              type="button"
              className="btn btn hidden lg:flex"
              onClick={handleCopyLink}
            >
              Copy link
            </button>
            <div className="text-xl flex flex-wrap justify-center gap-5 lg:flex-col lg:grow lg:items-end">
              <div className="font-bold flex gap-1 textlin nowrap">
                <span className="text-neutral-content">Temp :</span>
                <span className={`${currentWeather.main.temp > 0 ? "text-warning":"text-info"}`}>{currentWeather.main.temp} <i className="wi wi-celsius text-2xl text-inherit leading-none" /></span>
              </div>
              <div className="font-bold flex gap-1 nowrap">
                <span className="text-neutral-content">Pressure:</span>
                <span className="text-base-100">{currentWeather.main.pressure} hPa</span>
              </div>
              <div className="font-bold flex gap-1 nowrap">
                <span className="text-neutral-content">Humidity:</span>
                <span className="text-base-100">{currentWeather.main.humidity}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero bg-accent flex justify-center">
        <div className="hero-content max-w-screen-lg gap-6 lg:w-full lg:flex lg:justify-end">
          <span className="text-base-100 text-lg">
            Sunrise <i className="wi wi-sunrise" /> {sunriseDate.getHours()}:{sunriseDate.getMinutes()}
          </span>
          <span className="text-base-100 text-lg">
            Sunset <i className="wi wi-sunset" /> {sunsetDate.getHours()}:{sunsetDate.getMinutes()}
          </span>
        </div>
      </div>
    </div>
  );
}
