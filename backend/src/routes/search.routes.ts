import { Router } from "express";
import { search } from "../services/search.service";

export const searchRouter = Router();

// GET /api/search?q=library
searchRouter.get("/", (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : "";
  res.json(search(query));
});