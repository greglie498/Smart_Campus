import { Router } from "express";
import { getAllSchools, getSchoolBySlug } from "../services/schools.service";

export const schoolsRouter = Router();

// GET /api/schools — list every school (used by the campus map / dropdown menu)
schoolsRouter.get("/", (_req, res) => {
  res.json(getAllSchools());
});

// GET /api/schools/:slug — one school's detail page data
schoolsRouter.get("/:slug", (req, res) => {
  const school = getSchoolBySlug(req.params.slug);

  if (!school) {
    return res.status(404).json({ error: `School "${req.params.slug}" not found` });
  }

  res.json(school);
});