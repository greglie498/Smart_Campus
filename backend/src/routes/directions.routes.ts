import { Router } from "express";
import { SearchResultCategory } from "@shared/types";
import { getDirections } from "../services/directions.service";

export const directionsRouter = Router();

const VALID_CATEGORIES: SearchResultCategory[] = ["school", "cafeteria", "location"];

// GET /api/directions/school/chandaria-business
directionsRouter.get("/:category/:slug", (req, res) => {
  const { category, slug } = req.params;

  if (!VALID_CATEGORIES.includes(category as SearchResultCategory)) {
    return res.status(400).json({
      error: `Unknown category "${category}". Expected one of: ${VALID_CATEGORIES.join(", ")}`,
    });
  }

  const directions = getDirections(category as SearchResultCategory, slug);

  if (!directions) {
    return res
      .status(404)
      .json({ error: `No ${category} found with slug "${slug}"` });
  }

  res.json(directions);
});