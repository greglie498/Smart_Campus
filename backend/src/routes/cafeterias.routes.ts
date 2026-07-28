import { Router } from "express";
import { getAllCafeterias, getCafeteriaBySlug } from "../services/cafeterias.service";

export const cafeteriasRouter = Router();

cafeteriasRouter.get("/", (_req, res) => {
  res.json(getAllCafeterias());
});

cafeteriasRouter.get("/:slug", (req, res) => {
  const cafeteria = getCafeteriaBySlug(req.params.slug);

  if (!cafeteria) {
    return res.status(404).json({ error: `Cafeteria "${req.params.slug}" not found` });
  }

  res.json(cafeteria);
});