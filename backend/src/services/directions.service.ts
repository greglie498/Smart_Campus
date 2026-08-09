import { Directions, SearchResultCategory } from "@shared/types";
import { getSchoolBySlug } from "./schools.service";
import { getCafeteriaBySlug } from "./cafeterias.service";
import { getLocationBySlug } from "./locations.service";
import { CAMPUS_CENTER, getApproxPosition, distanceMeters, compassDirection } from "@shared/campus-geo";

const CAMPUS_ENTRANCE = "the USIU-Africa Main Gate on Thika Road";
const WALK_METERS_PER_MINUTE = 70;

function estimateWalkMinutes(distance: number): number {
  return Math.max(2, Math.round(distance / WALK_METERS_PER_MINUTE));
}

function computeDirections(name: string, location: string, slug: string) {
  const destination = getApproxPosition(slug);
  const distance = distanceMeters(CAMPUS_CENTER, destination);
  const direction = compassDirection(CAMPUS_CENTER, destination);

  return {
    steps: [
      `Start at ${CAMPUS_ENTRANCE}.`,
      `Head ${direction} for about ${Math.round(distance)} meters.`,
      `Arrive at ${name}, located at ${location}.`,
    ],
    estimatedMinutes: estimateWalkMinutes(distance),
  };
}

export function getDirections(
  category: SearchResultCategory,
  slug: string,
): Directions | undefined {
  if (category === "school") {
    const school = getSchoolBySlug(slug);
    if (!school) return undefined;
    return { destinationName: school.name, ...computeDirections(school.name, school.location, slug) };
  }
  if (category === "cafeteria") {
    const cafeteria = getCafeteriaBySlug(slug);
    if (!cafeteria) return undefined;
    return { destinationName: cafeteria.name, ...computeDirections(cafeteria.name, cafeteria.location, slug) };
  }
  if (category === "location") {
    const location = getLocationBySlug(slug);
    if (!location) return undefined;
    return { destinationName: location.name, ...computeDirections(location.name, location.location, slug) };
  }
  return undefined;
}