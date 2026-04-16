import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT holds.*, books.title, patrons.firstName, patrons.lastName
      FROM holds
      JOIN books ON holds.bookId = books.id
      JOIN patrons ON holds.patronId = patrons.id
      ORDER BY holds.requestDate DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching holds:", err);
    res.status(500).json({ error: "Failed to load holds" });
  }
});

export default router;
