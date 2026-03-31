import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {

  static async injectDB(conn) {
    if (reviews) return;

    try {
      reviews = await conn.db(process.env.DATABASE_NAME)
        .collection("reviews");
    } catch (e) {
      console.error("DB connection error:", e);
    }
  }

  static async addReview(movieId, user, review) {
    return await reviews.insertOne({
      movieId: movieId.toString(),
      user,
      review,
      date: new Date()
    });
  }

  static async getReviewsByMovieId(movieId) {
    return await reviews.find({ movieId: movieId.toString() }).toArray();
  }

  static async deleteReview(id) {
    return await reviews.deleteOne({ _id: new ObjectId(id) });
  }
}