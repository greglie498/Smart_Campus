import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";
import { CAMPUS_CENTER, getApproxPosition, CATEGORY_COLOR } from "@shared/campus-geo";
import { makePinIcon } from "@/lib/campus-geo";
import { SearchResultCategory } from "@shared/types";

const START_ICON = L.divIcon({
  className: "",
  html: `<div style="width:14px;height:14px;border-radius:9999px;background:#16a34a;border:2px solid white;box-shadow:0 0 0 1px #16a34a"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function FitRouteBounds({ start, end }: { start: [number, number]; end: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([start, end], { padding: [40, 40] });
  }, [map, start, end]);
  return null;
}

interface RouteMapProps {
  destinationSlug: string;
  destinationName: string;
  category: SearchResultCategory;
}

export default function RouteMap({ destinationSlug, destinationName, category }: RouteMapProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const destination = getApproxPosition(destinationSlug);

  const tileUrl = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileAttribution = isDark
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div>
      <MapContainer
        center={CAMPUS_CENTER}
        zoom={16}
        scrollWheelZoom={false}
        className="h-[280px] w-full sm:h-[320px]"
        aria-label={`Map showing the route from the campus entrance to ${destinationName}`}
      >
        <TileLayer url={tileUrl} attribution={tileAttribution} />
        <FitRouteBounds start={CAMPUS_CENTER} end={destination} />

        <Marker position={CAMPUS_CENTER} icon={START_ICON}>
          <Popup>USIU-Africa Main Gate (start)</Popup>
        </Marker>

        <Marker position={destination} icon={makePinIcon(CATEGORY_COLOR[category]) as any }>
          <Popup>{destinationName}</Popup>
        </Marker>

        <Polyline
          positions={[CAMPUS_CENTER, destination]}
          pathOptions={{ color: isDark ? "#ffffff" : "#000000", dashArray: "6 8", weight: 2 }}
        />
      </MapContainer>
      <p className="mt-2 text-xs text-black/50 dark:text-white/50">
        Straight-line bearing, not a routed footpath — USIU doesn't publish
        campus walkway data. Use alongside the steps above for the actual walk.
      </p>
    </div>
  );
}