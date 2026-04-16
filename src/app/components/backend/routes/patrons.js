import express from "express";
import { db } from "../backend/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM patrons");
  res.json(rows);
});

router.get("/:id", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM patrons WHERE id = ?", [
    req.params.id,
  ]);
  res.json(rows[0] || null);
});

export default router;
