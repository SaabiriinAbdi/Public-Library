import express from "express";
import { db } from "../db.js";

const router = express.Router();

// GET /events — return all events
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        title,
        description,
        date,
        time,
        location,
        category,
        ageGroup,
        capacity,
        registered,
        isFeatured
      FROM events
      ORDER BY date ASC;
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to load events" });
  }
});

// GET /events/:id — single event
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM events WHERE id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ error: "Failed to load event" });
  }
});

export default router;
