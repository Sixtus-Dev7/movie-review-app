import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import reviews from "./api/reviews.route.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  app.use(cors()); // will restrict later if needed
  app.use(express.json());

const mongoURI = process.env.DATABASE_URL;

// CONNECTION
mongoose.connect(mongoURI)
  .then(async (conn) => {
    console.log("Database connected");

    await ReviewsDAO.injectDB(conn);
  })
  .catch(err => console.error("DB connection error:", err));

// ROUTES
app.use("/api/v1/reviews", reviews);

app.get("/api", (req, res) => {
  res.send("API is working ");
});

// SERVE FRONTEND
app.use(express.static(path.join(__dirname, "../frontend")));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});