import express from "express";
import { db } from "../backend/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM holds");
  res.json(rows);
});

router.get("/patron/:id", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM holds WHERE patron_id = ?",
    [req.params.id]
  );
  res.json(rows);
});

export default router;
