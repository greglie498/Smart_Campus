import { SearchResult } from "@shared/types";
import { getAllSchools } from "./schools.service";
import { getAllCafeterias } from "./cafeterias.service";
import { getAllLocations } from "./locations.service";

export function search(query: string): SearchResult[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  const schoolResults: SearchResult[] = getAllSchools()
    .filter((school) => school.name.toLowerCase().includes(normalizedQuery))
    .map((school) => ({
      slug: school.slug,
      name: school.name,
      category: "school",
      path: `/schools/${school.slug}`,
    }));

  const cafeteriaResults: SearchResult[] = getAllCafeterias()
    .filter((cafeteria) => cafeteria.name.toLowerCase().includes(normalizedQuery))
    .map((cafeteria) => ({
      slug: cafeteria.slug,
      name: cafeteria.name,
      category: "cafeteria",
      path: `/cafeterias/${cafeteria.slug}`,
    }));

  const locationResults: SearchResult[] = getAllLocations()
    .filter((location) => location.name.toLowerCase().includes(normalizedQuery))
    .map((location) => ({
      slug: location.slug,
      name: location.name,
      category: "location",
      path: `/locations/${location.slug}`,
    }));

  return [...schoolResults, ...cafeteriaResults, ...locationResults];
}