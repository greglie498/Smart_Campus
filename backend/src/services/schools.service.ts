import { School } from "@shared/types"; 
import { schools } from "../data/schools.data";
import { findBySlug } from "../data/lookup.util";


export function getAllSchools(): School[] {
  return schools;
}

/** Returns one school by slug, or undefined if no school has that slug. */
export function getSchoolBySlug(slug: string): School | undefined {
  return findBySlug(schools, slug);
}