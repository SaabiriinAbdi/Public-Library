import express from "express";
import { db } from "../backend/db.js";

const router = express.Router();

// Patron login
router.post("/patron", async (req, res) => {
  const { cardNumber, pin } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM patrons WHERE card_number = ? AND pin = ?",
    [cardNumber, pin]
  );

  res.json(rows[0] || null);
});

// Staff login
router.post("/staff", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM staff WHERE email = ? AND password = ?",
    [email, password]
  );

  res.json(rows[0] || null);
});

export default router;
