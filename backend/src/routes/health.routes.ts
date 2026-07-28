import { Router } from "express";

export const healthRouter = Router();

// GET /api/health — used to confirm the backend process is alive,
// independent of any data/business logic. Handy once frontend and
// backend are deployed separately and you need to check "is the API up?"
healthRouter.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "smart-campus-navigation-backend",
    timestamp: new Date().toISOString(),
  });
});
