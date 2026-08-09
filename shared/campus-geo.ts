import { SearchResultCategory } from "@shared/types";

export const CAMPUS_CENTER: [number, number] = [-1.21968, 36.87938];

const KNOWN_COORDINATES: Partial<Record<string, [number, number]>> = {
    "chandaria-business": [-1.2173109543868676, 36.879473066195615],
    "science-technology": [-1.2183511475123772, 36.879086244141625],
    "humanities-social-sciences": [-1.2141061005171332, 36.87865516459066],
    "communication-cinematic-creative-arts": [-1.2196, 36.8793],
    "pharmacy-health-sciences": [-1.2147641266583349, 36.878693657606505],
    "graduate-studies": [-1.2170021537804585, 36.879118513797636],

    "usiu-main-cafeteria": [-1.219000, 36.879150],
    "sironi": [-1.2189, 36.8801],
    "caffe-latta": [-1.2177, 36.8777],

    "library": [-1.2166587049545177, 36.87890086556817],
    "auditorium": [-1.21708, 36.87914],
    "freida-brown": [-1.2155780889401622, 36.87772221376227],
    "athletic-facilities": [-1.2100270591007551, 36.87997271289017],
};

export function getApproxPosition(slug: string): [number, number] {
  const known = KNOWN_COORDINATES[slug];
  if (known) return known;

  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const angle = (hash % 360) * (Math.PI / 180);
  const radius = 0.0009;
  return [CAMPUS_CENTER[0] + radius * Math.sin(angle), CAMPUS_CENTER[1] + radius * Math.cos(angle)];
}

export const CATEGORY_COLOR: Record<SearchResultCategory, string> = {
  school: "#000000",
  cafeteria: "#b45309",
  location: "#1d4ed8",
};

export function distanceMeters(a: [number, number], b: [number, number]): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const [lat1, lon1] = a;
  const [lat2, lon2] = b;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
 
/** Initial compass bearing from point a to point b, in degrees (0 = north). */
function bearingDegrees(a: [number, number], b: [number, number]): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const [lat1, lon1] = a;
  const [lat2, lon2] = b;
  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lon2 - lon1));
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}
 
const COMPASS_POINTS = [
  "north", "north-east", "east", "south-east",
  "south", "south-west", "west", "north-west",
];
 
/** Converts a bearing in degrees to a plain-language compass direction. */
export function compassDirection(a: [number, number], b: [number, number]): string {
  const bearing = bearingDegrees(a, b);
  return COMPASS_POINTS[Math.round(bearing / 45) % 8];
}
