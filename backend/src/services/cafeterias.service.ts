import { Cafeteria } from "@shared/types";
import { cafeterias } from "../data/cafeterias.data";
import { findBySlug } from "../data/lookup.util";

export function getAllCafeterias(): Cafeteria[] {
  return cafeterias;
}

export function getCafeteriaBySlug(slug: string): Cafeteria | undefined {
  return findBySlug(cafeterias, slug);
}