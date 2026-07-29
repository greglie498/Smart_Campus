import {prisma} from "../lib/prisma";

export function getAllLocations() {
  return prisma.building.findMany();
}

export function getLocationBySlug(slug: string) {
  return prisma.building.findUnique({
    where:{slug},
  });
}