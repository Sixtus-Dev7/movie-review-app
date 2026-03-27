import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {

  static async apiPostReview(req, res) {
    try {
      const { movieId, review, user } = req.body;

      await ReviewsDAO.addReview(movieId, user, review);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReview(req, res) {
    try {
      const id = req.params.id;

      const review = await ReviewsDAO.getReview(id);

      if (!review) {
        return res.status(404).json({ error: "Not found" });
      }

      res.json(review);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res) {
    try {
      const reviewId = req.params.id;
      const { review, user } = req.body;

      const response = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      );

      if (response.modifiedCount === 0) {
        throw new Error("Unable to update review");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      const reviewId = req.params.id;

      await ReviewsDAO.deleteReview(reviewId);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReviews(req, res) {
    try {
      const id = req.params.id;

      const reviews = await ReviewsDAO.getReviewsByMovieId(id);

      res.json(reviews || []);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}