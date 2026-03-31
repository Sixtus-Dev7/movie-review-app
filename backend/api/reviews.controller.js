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

  static async apiGetReviews(req, res) {
    try {
      const movieId = req.params.movieId;

      const reviews = await ReviewsDAO.getReviewsByMovieId(movieId);

      res.json(reviews);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res) {
    try {
      const id = req.params.id;
      const { review, user } = req.body;

      const response = await ReviewsDAO.updateReview(id, user, review);

      if (response.modifiedCount === 0) {
        throw new Error("Update failed");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      const id = req.params.id;

      await ReviewsDAO.deleteReview(id);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}