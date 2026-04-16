import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT loans.*, books.title, patrons.firstName, patrons.lastName
      FROM loans
      JOIN books ON loans.bookId = books.id
      JOIN patrons ON loans.patronId = patrons.id
      ORDER BY loans.dueDate ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching loans:", err);
    res.status(500).json({ error: "Failed to load loans" });
  }
});

export default router;
