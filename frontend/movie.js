const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = "https://movie-review-app-1-g5e8.onrender.com";

const formSection = document.getElementById("form-section");
const reviewsSection = document.getElementById("reviews-section");
const title = document.getElementById("title");

title.innerText = movieTitle;


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


returnReviews(APILINK);


function returnReviews(url) {
    reviewsSection.innerHTML = ""; 
    
    if (!formSection.hasChildNodes()) {
        formSection.appendChild(createNewReviewForm());
    }

    fetch(url + "movie/" + movieId, { cache: "no-store" })
        .then(res => res.json())
        .then(data => {
            console.log("Fetched Reviews:", data);

            if (!data || data.length === 0) {
                const msg = document.createElement("h3");
                msg.innerText = "No reviews yet";
                reviewsSection.appendChild(msg);
                return;
            }

            data.forEach(review => {
                const div_card = document.createElement('div');
                div_card.innerHTML = `
                    <div class="row">
                        <div class="column">
                            <div class="card" id="${review._id}">
                                <p><strong>Review: </strong>${review.review}</p>
                                <p><strong>User: </strong>${review.user}</p>
                                <button
                                    class="edit-btn"
                                    data-id="${review._id}"
                                    data-review="${review.review.replace(/"/g, '&quot;')}"
                                    data-user="${review.user}">
                                    Edit
                                </button>
                                <button onclick="deleteReview('${review._id}')">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
                reviewsSection.appendChild(div_card);

                
                div_card.querySelector(".edit-btn").addEventListener("click", function() {
                    editReview(this.dataset.id, this.dataset.review, this.dataset.user);
                });
            });
        })
        .catch(err => console.error("Error fetching reviews:", err));
}


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


function saveReview(reviewInputId, userInputId, id = "") {
    console.log("Clicked Save");

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

    const url = id ? APILINK + id : APILINK + "new";
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
        returnReviews(APILINK); 
    })
    .catch(err => console.error("Error saving review:", err));
}


function deleteReview(id) {
    if (!confirm("Are you sure you want to delete this review?")) return;

    fetch(APILINK + id, { method: "DELETE" })
        .then(res => res.json())
        .then(res => {
            console.log("Deleted:", res);
            returnReviews(APILINK); 
        })
        .catch(err => console.error("Error deleting review:", err));
}