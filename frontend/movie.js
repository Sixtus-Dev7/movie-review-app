const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const API_URL = import.meta.env.VITE_API_URL;

const formSection = document.getElementById("form-section");
const reviewsSection = document.getElementById("reviews-section");
const title = document.getElementById("title");

title.innerText = movieTitle || "Movie Title";


// Create New Review Formcon
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
async function returnReviews(movieId) {
    try {
        const res = await fetch(`${API_URL}/movie/${movieId}`, {
            cache: "no-store"
        });

        const data = await res.json();

        console.log("Fetched Reviews:", data);

        reviewsSection.innerHTML = "";

        if (!data || data.length === 0) {
            reviewsSection.innerHTML = "<h3>No reviews yet</h3>";
            return;
        }

        data.forEach(review => {
            const div = document.createElement("div");

            div.innerHTML = `
                <p><strong>Review:</strong> ${review.review}</p>
                <p><strong>User:</strong> ${review.user}</p>
            `;

            reviewsSection.appendChild(div);
        });

    } catch (err) {
        console.error("Error fetching reviews:", err);
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
function saveReview(reviewInputId, userInputId, id = "") {
    const reviewEl = document.getElementById(reviewInputId);
    const userEl = document.getElementById(userInputId);

    if (!reviewEl || !userEl) {
        console.error("Input elements not found");
        return;
    }

    const review = reviewEl.value.trim();
    const user = userEl.value.trim();

    if (!review || !user) {
        alert("Both fields are required!");
        return;
    }

    const url = id ? API_URL + "/" + id : API_URL + "/new";
    const method = id ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, review, movieId })
    })
    .then(res => res.json())
    .then(res => {
        console.log("Saved:", res);
        returnReviews(API_URL); 
    })
    .catch(err => console.error("Error saving review:", err));
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