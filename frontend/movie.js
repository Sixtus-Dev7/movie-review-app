const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const API_URL = "https://movie-review-app.onrender.com/api/v1/reviews";

const formSection = document.getElementById("form-section");
const reviewsSection = document.getElementById("reviews-section");
const title = document.getElementById("title");

title.innerText = movieTitle || "Movie Title";


// Create New Review Form
function createNewReviewForm() {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="row">
            <div class="column">
                <div class="card">
                    <h3>New Review</h3>
                    <p><strong>Review: </strong>
                        <input type="text" id="new_review">
                    </p>
                    <p><strong>User: </strong>
                        <input type="text" id="new_user">
                    </p>
                    <button onclick="saveReview('new_review','new_user')">Save</button>
                </div>
            </div>
        </div>
    `;
    return div;
}


// Load Reviews

async function returnReviews() {
  try {
    const res = await fetch(`https://movie-review-app.onrender.com/api/v1/reviews/movie/${movieId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const data = await res.json();
    console.log("Reviews:", data);

    reviewsSection.innerHTML = "";

    if (!data || data.length === 0) {
      reviewsSection.innerHTML = "<h3>No reviews yet</h3>";
      return;
    }

    data.forEach(review => {
      const div = document.createElement("div");
      div.classList.add("review-card");

      div.innerHTML = `
        <p><strong>User:</strong> ${review.user}</p>
        <p><strong>Review:</strong> ${review.review}</p>
      `;

      reviewsSection.appendChild(div);
    });

  } catch (err) {
    console.error("Fetch error:", err);
    reviewsSection.innerHTML = "<h3>Error loading reviews</h3>";
  }
}


// Edit Review
function editReview(id, review, user) {
    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = `
        <p><strong>Review: </strong>
            <input type="text" id="${reviewInputId}" value="${review}">
        </p>
        <p><strong>User: </strong>
            <input type="text" id="${userInputId}" value="${user}">
        </p>
        <button onclick="saveReview('${reviewInputId}','${userInputId}','${id}')">Save</button>
    `;
}


// Save Review (POST / PUT)


async function saveReview() {
  const user = document.getElementById("user").value;
  const review = document.getElementById("review").value;

  if (!user || !review) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId, user, review })
    });

    const data = await res.json();
    console.log("Saved:", data);

    returnReviews();

  } catch (err) {
    console.error("Save error:", err);
  }
}

// Delete Review
function deleteReview(id) {
    if (!confirm("Are you sure you want to delete this review?")) return;

    fetch(API_URL + "/" + id, { method: "DELETE" })
        .then(res => res.json())
        .then(res => {
            console.log("Deleted:", res);
            returnReviews(API_URL); 
        })
        .catch(err => console.error("Error deleting review:", err));
}


// INITIAL LOAD
returnReviews(API_URL);