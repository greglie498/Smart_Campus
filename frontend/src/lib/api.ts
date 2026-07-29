import { School, Cafeteria, Location, SearchResult, Directions, SearchResultCategory } from "@shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}


async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/api${path}`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(
      res.status,
      body.error ?? `Request to ${path} failed with ${res.status}`,
    );
  }

  return res.json();
}

export const api = {
  getSchools: () => apiGet<School[]>("/schools"),
  getSchool: (slug: string) => apiGet<School>(`/schools/${slug}`),

  getCafeterias: () => apiGet<Cafeteria[]>("/cafeterias"),
  getCafeteria: (slug: string) => apiGet<Cafeteria>(`/cafeterias/${slug}`),

  getLocations: () => apiGet<Location[]>("/locations"),
  getLocation: (slug: string) => apiGet<Location>(`/locations/${slug}`),

  search: (query: string) =>
    apiGet<SearchResult[]>(`/search?q=${encodeURIComponent(query)}`),

  getDirections: (category: SearchResultCategory, slug: string) =>
    apiGet<Directions>(`/directions/${category}/${slug}`),
};