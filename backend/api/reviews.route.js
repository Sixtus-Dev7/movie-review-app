import express from "express";
import ReviewsDAO from "../dao/reviewsDAO.js";

const router = express.Router();

// GET reviews by movieId
router.get("/movie/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;

    const reviews = await ReviewsDAO.getReviewsByMovieId(movieId);

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE review
router.post("/", async (req, res) => {
  try {
    const { movieId, user, review } = req.body;

    const result = await ReviewsDAO.addReview(movieId, user, review);

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;