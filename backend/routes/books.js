import express from "express";
import { db } from "../db.js";

const router = express.Router();

// GET all books
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM books ORDER BY title ASC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to load books" });
  }
});

// GET single book
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM books WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ error: "Book not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ error: "Failed to load book" });
  }
});

export default router;
