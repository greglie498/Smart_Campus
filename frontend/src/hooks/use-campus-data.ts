import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { SearchResultCategory } from "@shared/types";


export function useSchools() {
  return useQuery({
    queryKey: ["schools"],
    queryFn: api.getSchools,
  });
}

export function useSchool(slug: string | undefined) {
  return useQuery({
    queryKey: ["schools", slug],
    queryFn: () => api.getSchool(slug as string),
    enabled: Boolean(slug),
  });
}

export function useCafeterias() {
  return useQuery({
    queryKey: ["cafeterias"],
    queryFn: api.getCafeterias,
  });
}

export function useCafeteria(slug: string | undefined) {
  return useQuery({
    queryKey: ["cafeterias", slug],
    queryFn: () => api.getCafeteria(slug as string),
    enabled: Boolean(slug),
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: api.getLocations,
  });
}

export function useCampusLocation(slug: string | undefined) {
  return useQuery({
    queryKey: ["locations", slug],
    queryFn: () => api.getLocation(slug as string),
    enabled: Boolean(slug),
  });
}

export function useCampusSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => api.search(query),
    enabled: query.trim().length > 0,
    staleTime: 0,
  });
}

export function useDirections(
  category: SearchResultCategory,
  slug: string,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["directions", category, slug],
    queryFn: () => api.getDirections(category, slug),
    enabled,
  });
}