import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
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

const CAMPUS_CENTER: [number, number] = [-1.218056, 36.879167];

function getApproxPosition(slug: string): [number, number] {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const angle = (hash % 360) * (Math.PI / 180);
  const radius = 0.0009;
  return [CAMPUS_CENTER[0] + radius * Math.sin(angle), CAMPUS_CENTER[1] + radius * Math.cos(angle)];
}

const CATEGORY_COLOR: Record<SearchResultCategory, string> = {
  school: "#000000",
  cafeteria: "#b45309",
  location: "#1d4ed8",
};

function makePinIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 0 1px ${color}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
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
            <Marker key={pin.path} position={[lat, lng]} icon={icons[pin.category]}>
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