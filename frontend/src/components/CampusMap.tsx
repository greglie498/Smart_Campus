import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  CAMPUS_CENTER,
  getApproxPosition,
  CATEGORY_COLOR,
} from "@shared/campus-geo";
import { makePinIcon } from "@/lib/campus-geo";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { SearchResultCategory } from "@shared/types";

export interface MapPin {
  slug: string;
  name: string;
  category: SearchResultCategory;
  path: string;
}

export default function CampusMap({ pins }: { pins: MapPin[] }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const tileUrl = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const tileAttribution = isDark
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const icons = useMemo(
    () => ({
      school: makePinIcon(CATEGORY_COLOR.school),
      cafeteria: makePinIcon(CATEGORY_COLOR.cafeteria),
      location: makePinIcon(CATEGORY_COLOR.location),
    }),
    [],
  );

  return (
    <div className="campus-map">
      <MapContainer
        center={CAMPUS_CENTER}
        zoom={16}
        scrollWheelZoom={false}
        className="h-[360px] w-full overflow-hidden rounded-2xl border border-slate-700/70 sm:h-[420px]"
        aria-label="Approximate map of USIU-Africa campus locations"
      >
        <TileLayer
          url={tileUrl}
          attribution={tileAttribution}
        />

        {pins.map((pin) => {
          const [lat, lng] = getApproxPosition(pin.slug);

          return (
            <Marker
              key={pin.path}
              position={[lat, lng]}
              icon={icons[pin.category] as any}
            >
              <Popup>
                <div className="min-w-[150px]">
                  <p className="font-semibold text-slate-900">{pin.name}</p>

                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                    {pin.category}
                  </p>

                  <Link
                    to={pin.path}
                    className="mt-2 inline-block text-sm font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
                  >
                    View details
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <p className="mt-3 px-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        Pin positions are approximate and for illustration — USIU-Africa doesn't
        publish per-building coordinates. The map is centered on the real campus
        location.
      </p>
    </div>
  );
}