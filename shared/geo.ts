import L from "leaflet";
import { SearchResultCategory } from "@shared/types";

export { CAMPUS_CENTER, getApproxPosition } from "@shared/campus-geo";

export const CATEGORY_COLOR: Record<SearchResultCategory, string> = {
  school: "#000000",
  cafeteria: "#b45309",
  location: "#1d4ed8",
};

export function makePinIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 0 1px ${color}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}