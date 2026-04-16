import express from "express";
import cors from "cors";
import eventsRouter from "./routes/events.js";
import booksRouter from "./routes/books.js";
import branchesRouter from "./routes/branches.js";
import copiesRouter from "./routes/copies.js";
import patronsRouter from "./routes/patrons.js";
import staffRouter from "./routes/staff.js";
import loansRouter from "./routes/loans.js";
import holdsRouter from "./routes/holds.js";
import metricsRouter from "./routes/metrics.js";
import eventsRouter from "./routes/events.js";
import authRouter from "./routes/auth.js";

app.use("/books", booksRouter);
app.use("/branches", branchesRouter);
app.use("/copies", copiesRouter);
app.use("/patrons", patronsRouter);
app.use("/staff", staffRouter);
app.use("/loans", loansRouter);
app.use("/holds", holdsRouter);
app.use("/metrics", metricsRouter);
app.use("/events", eventsRouter);
app.use("/auth", authRouter);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventsRouter);

app.get("/", (req, res) => {
  res.send("Library API is running");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
