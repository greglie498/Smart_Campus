import { Directions, SearchResultCategory } from "@shared/types";
import { getSchoolBySlug } from "./schools.service";
import { getCafeteriaBySlug } from "./cafeterias.service";
import { getLocationBySlug } from "./locations.service";

const CAMPUS_ENTRANCE = "the USIU-Africa Main Gate on Thika Road";


function estimateWalkMinutes(slug: string): number {
  return 4 + (slug.length % 9);
}


function buildSteps(name: string, location: string, waypoints: string[]): string[] {
  const steps = [`Start at ${CAMPUS_ENTRANCE}.`];

  waypoints.slice(0, 2).forEach((waypoint) => {
    steps.push(`Continue past ${waypoint}.`);
  });

  steps.push(`Arrive at ${name}, located at ${location}.`);
  return steps;
}


export function getDirections(
  category: SearchResultCategory,
  slug: string,
): Directions | undefined {
  if (category === "school") {
    const school = getSchoolBySlug(slug);
    if (!school) return undefined;
    return {
      destinationName: school.name,
      steps: buildSteps(school.name, school.location, school.facilities),
      estimatedMinutes: estimateWalkMinutes(slug),
    };
  }

  if (category === "cafeteria") {
    const cafeteria = getCafeteriaBySlug(slug);
    if (!cafeteria) return undefined;
    return {
      destinationName: cafeteria.name,
      steps: buildSteps(cafeteria.name, cafeteria.location, cafeteria.facilities),
      estimatedMinutes: estimateWalkMinutes(slug),
    };
  }

  if (category === "location") {
    const location = getLocationBySlug(slug);
    if (!location) return undefined;
    return {
      destinationName: location.name,
      steps: buildSteps(location.name, location.location, location.nearby),
      estimatedMinutes: estimateWalkMinutes(slug),
    };
  }

  return undefined;
}