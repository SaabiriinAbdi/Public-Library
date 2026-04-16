import express from "express";
import { db } from "../backend/db.js";

const router = express.Router();

router.get("/metrics", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM staff_metrics");
  res.json(rows);
});

export default router;
