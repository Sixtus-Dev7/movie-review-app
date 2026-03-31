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

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// ENV CHECK
const mongoURI = process.env.DATABASE_URL;

if (!mongoURI) {
  console.error(" DATABASE_URL is missing in .env");
  process.exit(1);
}

// CONNECTION

// CONNECTION
const connectDB = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(" Database connected");
  } catch (error) {
    console.error(" DB error:", error);
  }
};

// CALL IT HERE
connectDB();

// ROUTES
app.use("/api/v1/reviews", reviews);

app.get("/api", (req, res) => {
  res.send("API is working ");
});

// SERVE FRONTEND
app.use(express.static(path.join(__dirname, "../frontend")));

// If using index.html
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});