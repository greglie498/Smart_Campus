import { useCallback, useEffect, useState } from "react";
import { SearchResultCategory } from "@shared/types";

export interface FavouriteItem {
  slug: string;
  name: string;
  category: SearchResultCategory;
  path: string;
}

const STORAGE_KEY = "campus-favourites";

function readFavourites(): FavouriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFavourites() {
  const [favourites, setFavourites] = useState<FavouriteItem[]>(() => readFavourites());

  useEffect(() => {
    function handleChange() {
      setFavourites(readFavourites());
    }
    window.addEventListener("favourites-changed", handleChange);
    window.addEventListener("storage", handleChange);
    return () => {
      window.removeEventListener("favourites-changed", handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  const isFavourite = useCallback(
    (slug: string) => favourites.some((item) => item.slug === slug),
    [favourites],
  );

  const toggleFavourite = useCallback((item: FavouriteItem) => {
    const current = readFavourites();
    const exists = current.some((existing) => existing.slug === item.slug);
    const next = exists
      ? current.filter((existing) => existing.slug !== item.slug)
      : [...current, item];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("favourites-changed"));
  }, []);

  return { favourites, isFavourite, toggleFavourite };
}