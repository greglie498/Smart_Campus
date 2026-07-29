import "dotenv/config";
import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health.routes";
import { schoolsRouter } from "./routes/schools.routes";
import { cafeteriasRouter } from "./routes/cafeterias.routes";
import { locationsRouter } from "./routes/locations.routes";
import { searchRouter } from "./routes/search.routes";
import { directionsRouter } from "./routes/directions.routes";


export function createApp() {
  const app = express();

  // --- Global middleware -------------------------------------------------
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // --- Routes --------------------------------------------------------------
  // Every route module owns one resource / concern.
  app.use("/api/health", healthRouter);
  app.use("/api/schools", schoolsRouter);
  app.use("/api/cafeterias", cafeteriasRouter);
  app.use("/api/locations", locationsRouter);
  app.use("/api/search", searchRouter);
  app.use("/api/directions", directionsRouter);
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  return app;
}