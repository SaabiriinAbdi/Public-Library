import express from "express";
import { db } from "../backend/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM copies");
  res.json(rows);
});

router.get("/book/:bookId", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM copies WHERE book_id = ?",
    [req.params.bookId]
  );
  res.json(rows);
});

export default router;
