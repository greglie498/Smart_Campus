import { Router } from "express";
import { getAllLocations, getLocationBySlug } from "../services/locations.service";

export const locationsRouter = Router();

locationsRouter.get("/", (_req, res) => {
  res.json(getAllLocations());
});

locationsRouter.get("/:slug", (req, res) => {
  const location = getLocationBySlug(req.params.slug);

  if (!location) {
    return res.status(404).json({ error: `Location "${req.params.slug}" not found` });
  }

  res.json(location);
});