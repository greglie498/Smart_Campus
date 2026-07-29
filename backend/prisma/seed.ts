import "dotenv/config"
import { PrismaClient } from "../generated/prisma/client";
import { locations } from "../src/data/locations.data";
import { PrismaPg } from "@prisma/adapter-pg";
import {Pool} from "pg";

console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.building.createMany({
    data: locations.map((location) => ({
      slug: location.slug,
      name: location.name,

      image: location.image,
      tagline: location.tagline,
      intro: location.intro,

      location: location.location,
      hours: location.hours,
      accessibility: location.accessibility,
      details: location.details,

      latitude: location.latitude,
      longitude: location.longitude,

      features: location.features,
      nearby: location.nearby,
    })),
  });

  console.log("Buildings seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });