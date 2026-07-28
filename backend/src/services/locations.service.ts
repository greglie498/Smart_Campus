import { Location } from "@shared/types";
import { locations } from "../data/locations.data";
import { findBySlug } from "../data/lookup.util";

export function getAllLocations(): Location[] {
  return locations;
}

export function getLocationBySlug(slug: string): Location | undefined {
  return findBySlug(locations, slug);
}