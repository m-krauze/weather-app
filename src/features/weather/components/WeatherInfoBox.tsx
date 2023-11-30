import { ReactNode } from "react";

interface WeatherInfoBoxProps {
  icon: ReactNode,
  name: string,
  value: string | number,
  className?: string
}

export function WeatherInfoBox(props: WeatherInfoBoxProps) {
  const { icon, name, value, className } = props;

  return (
    <div className={`flex gap-4 items-center justify-center${className ? ` ${className}` : ""}`}>
      <div className="avatar mask mask-squircle bg-neutral flex items-center justify-center w-24 h-24">
        <span className="[&>i]:text-6xl text-secondary">
          {icon}
        </span>
      </div>
      <div className="flex flex-col align-center gap-1 grow">
        <span className="text-2xl font-bold text-center">
          {name}
        </span>
        <span className="text-center text-xl font-bold text-info">
          {value}
        </span>
      </div>
    </div>
  );
}
