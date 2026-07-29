import { useState, useEffect, useCallback } from "react";
import { SearchResultCategory } from "@shared/types"; 

export interface FavouriteItem {
  slug: string;
  name: string;
  category: SearchResultCategory;
  path: string; // Included path!
}

const STORAGE_KEY = "campus_favourites";

export function useFavorites() {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavourites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favourites from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  const saveFavourites = (updated: FavouriteItem[]) => {
    setFavourites(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving favourites to localStorage:", error);
    }
  };

  // Check if an item is favourited by slug
  const isFavourite = useCallback(
    (slug: string) => favourites.some((item) => item.slug === slug),
    [favourites]
  );

  // Toggle favourite on/off
  const toggleFavourite = useCallback(
    (item: FavouriteItem) => {
      const exists = favourites.some((fav) => fav.slug === item.slug);
      const updated = exists
        ? favourites.filter((fav) => fav.slug !== item.slug)
        : [...favourites, item];

      saveFavourites(updated);
    },
    [favourites]
  );

  return {
    favourites,
    isLoaded,
    isFavourite,
    toggleFavourite,
  };
}