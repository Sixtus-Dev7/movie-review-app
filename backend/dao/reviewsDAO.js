import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {

  static async injectDB(conn) {
    if (reviews) return;

    try {
      reviews = await conn.connection.db.collection("reviews");
    } catch (e) {
      console.error(`Unable to connect: ${e}`);
    }
  }

  static async addReview(movieId, user, review) {
    try {
      const doc = {
        movieId: movieId.toString(),
        user,
        review,
        date: new Date()
      };

      return await reviews.insertOne(doc);
    } catch (e) {
      return { error: e };
    }
  }

  static async getReview(id) {
    try {
      return await reviews.findOne({ _id: new ObjectId(id) });
    } catch (e) {
      return { error: e };
    }
  }

  static async updateReview(id, user, review) {
    try {
      return await reviews.updateOne(
        { _id: new ObjectId(id) },
        { $set: { user, review } }
      );
    } catch (e) {
      return { error: e };
    }
  }

  static async deleteReview(id) {
    try {
      return await reviews.deleteOne({
        _id: new ObjectId(id)
      });
    } catch (e) {
      return { error: e };
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      return await reviews
        .find({ movieId: movieId.toString() })
        .toArray();
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}