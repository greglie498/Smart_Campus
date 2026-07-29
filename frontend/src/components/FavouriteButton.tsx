import { Star } from "lucide-react";
import { useFavourites, FavouriteItem } from "@/hooks/use-favourites";

export default function FavouriteButton({ item }: { item: FavouriteItem }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const active = isFavourite(item.slug);

  return (
    <button
      type="button"
      onClick={() => toggleFavourite(item)}
      aria-pressed={active}
      aria-label={active ? `Remove ${item.name} from favourites` : `Save ${item.name} to favourites`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black text-black transition-colors duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <Star className={`h-5 w-5 ${active ? "fill-current" : ""}`} aria-hidden="true" />
    </button>
  );
}