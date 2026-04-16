import express from "express";
import cors from "cors";
import { db } from "./db.js"; // <-- IMPORTANT: ensures DB connects on startup

import books from "../routes/books.js";
import copies from "../routes/copies.js";
import patrons from "../routes/patrons.js";
import loans from "../routes/loans.js";
import holds from "../routes/holds.js";
import events from "../routes/events.js";
import staff from "../routes/staff.js";
import auth from "../routes/auth.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check (Railway uses this to verify service is alive)
app.get("/", (req, res) => {
  res.json({ status: "Backend is running on Railway" });
});

// API routes
app.use("/api/books", books);
app.use("/api/copies", copies);
app.use("/api/patrons", patrons);
app.use("/api/loans", loans);
app.use("/api/holds", holds);
app.use("/api/events", events);
app.use("/api/staff", staff);
app.use("/api/auth", auth);

// Railway assigns PORT automatically
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
});
