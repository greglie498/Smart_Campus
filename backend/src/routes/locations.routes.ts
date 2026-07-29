import { Router } from "express";
import { getAllLocations, getLocationBySlug } from "../services/locations.service";

export const locationsRouter = Router();

locationsRouter.get("/", async (_req, res) => {
  const locations = await getAllLocations();
  res.json(locations);
});

locationsRouter.get("/:slug", async (req, res) => {
  const location = await getLocationBySlug(req.params.slug);

  if (!location) {
    return res.status(404).json({ 
      error: `Location "${req.params.slug}" not found` });
  }

  res.json(location);
});