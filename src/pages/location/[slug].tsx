import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useGetCurrentWeatherQuery, useGetFutureWeatherQuery } from "@/features/weather/api/weather.api";
import { useGetReverseLocationListQuery } from "@/features/location/api/location.api";
import { getLocationParams } from "@/features/location/utils/getLocationParams";
import { LocationWeatherHeader } from "@/features/location/components/LocationWeatherHeader";
import { CloudsInfo } from "@/features/weather/components/CloudsInfo";
import { VisibilityInfo } from "@/features/weather/components/VisibilityInfo";
import { RainInfo } from "@/features/weather/components/RainInfo";
import { SnowInfo } from "@/features/weather/components/SnowInfo";
import Link from "next/link";
import { Layout } from "@/components/Layout";

interface LocationPageQuery {
  slug: string;
}

export default function LocationPage() {
  const { query } = useRouter();
  const routerQuery = query as unknown as LocationPageQuery;
  const locationParams = routerQuery.slug ? getLocationParams(routerQuery.slug) : { lat: 0, lon: 0 };
  const isLocationEmpty = locationParams.lat === 0 && locationParams.lon === 0;

  const { data: locationList } = useGetReverseLocationListQuery(locationParams, { skip: isLocationEmpty });
  const { data: currentWeather } = useGetCurrentWeatherQuery(locationParams, { skip: isLocationEmpty });
  const { data: futureWeather } = useGetFutureWeatherQuery(locationParams, { skip: isLocationEmpty });

  const rainVolume = currentWeather?.rain ? (currentWeather.rain["1h"] || currentWeather.rain["3h"]) : null;
  const snowVolume = currentWeather?.snow ? (currentWeather.snow["1h"] || currentWeather.snow["3h"]) : null;

  return (
    <Layout
      footerContent={(
        <nav>
          <Link
            href="/"
            className="btn"
          >
            {"<"} Back to list
          </Link>
        </nav>
      )}
    >
      <article className="flex flex-col items-center">
        {(currentWeather && locationList && futureWeather) && (
          <>
            <LocationWeatherHeader
              location={locationList[0]}
              currentWeather={currentWeather}
            />
            <div className="p-4 grow flex flex-col gap-12">
              <ul className="list-none flex justify-center flex-wrap gap-8">
                <ListCard>
                  <CloudsInfo clouds={currentWeather.clouds} />
                </ListCard>
                <ListCard>
                  <VisibilityInfo visibility={currentWeather.visibility} />
                </ListCard>
                {rainVolume && (
                  <ListCard>
                    <RainInfo rainVolume={rainVolume} />
                  </ListCard>
                )}
                {snowVolume && (
                  <ListCard>
                    <SnowInfo snowVolume={snowVolume} />
                  </ListCard>
                )}
              </ul>
              <div className="card bg-base-100 p-4 shadow max-w-screen-md">
                <h3 className="text-center font-bold text-xl">Forecast</h3>
                <div className="divider" />
                <table className="table">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Temperature</th>
                    </tr>
                    {futureWeather.list.map((day) => (
                      <tr
                        key={`fi_${day.dt}`}
                        className="text-sm"
                      >
                        <td>{day.dt_txt}</td>
                        <td className={`${day.main.temp > 0 ? "text-warning" : "text-info"}`}>{day.main.temp} <i className="wi wi-celsius" /></td>
                      </tr>
                    ))}
                  </thead>
                </table>
              </div>
            </div>
          </>
        )}
      </article>
    </Layout>
  );
}

function ListCard(props: {children: ReactNode}) {
  return <li className="card bg-base-100 p-4 shadow w-80">{props.children}</li>;
}
