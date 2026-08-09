import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CAMPUS_CENTER, getApproxPosition, CATEGORY_COLOR } from "@shared/campus-geo";
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
    <div>
      <MapContainer
        center={CAMPUS_CENTER}
        zoom={16}
        scrollWheelZoom={false}
        className="h-[360px] w-full sm:h-[420px]"
        aria-label="Approximate map of USIU-Africa campus locations"
      >
        <TileLayer url={tileUrl} attribution={tileAttribution} />
        {pins.map((pin) => {
          const [lat, lng] = getApproxPosition(pin.slug);
          return (
            <Marker key={pin.path} position={[lat, lng]} icon={icons[pin.category] as any}>
              <Popup>
                <p className="font-semibold">{pin.name}</p>
                <p className="text-xs uppercase tracking-wide text-black/60">{pin.category}</p>
                <Link to={pin.path} className="mt-1 inline-block underline">
                  View details
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <p className="mt-2 text-xs text-black/50 dark:text-white/50">
        Pin positions are approximate and for illustration — USIU-Africa doesn't
        publish per-building coordinates. The map is centered on the real campus
        location.
      </p>
    </div>
  );
}