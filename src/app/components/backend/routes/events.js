import express from "express";
import { db } from "../backend/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM events");
  res.json(rows);
});

export default router;
