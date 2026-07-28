import { CampusEntity } from "@shared/types";

export function findBySlug<T extends CampusEntity>(
  items: T[],
  slug: string,
): T | undefined {
  return items.find((item) => item.slug === slug);
}