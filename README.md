:::writing{variant=“standard” id=“48291”}


Movie Review App

<p align="center">
  A full-stack movie review application where users can explore movies and share their opinions.
</p>


Live Demo 

Coming soon (deployment in progress)

Features
	•	🎥 Browse movies
	•	📝 Add, update, and delete reviews
	•	📅 Reviews stored with timestamps
	•	⚡ Fast and responsive UI
	•	🔗 Backend API integration


Tech Stack

Frontend
	•	HTML
	•	CSS
	•	JavaScript

Backend
	•	Node.js
	•	Express.js

Database
	•	MongoDB


Folder Structure

movie-review-app/
│
├── frontend/
│   ├── index.html
│   ├── movie.html
│   ├── script.js
│   └── style.css
│
├── backend/
│   ├── api/
│   ├── dao/
│   ├── server.js
│   └── package.json
│
└── README.md

Installation & Setup
|
|
|__ Clone The Repository
|
|
|__ git clone https://github.com/Sixtus-Dev7/movie-review-app.git
|
|
|__ cd movie-review-app


Install Backend Dependencies
|
|
|__ cd backend
|
|
|__ npm install

Start The Server
|
|
|__ node server.js


API Endpoints

Method     Endpoint                       Description
GET        /api/v1/reviews/movie/:id      Get reviews by movie

POST      /api/v1/reviews                 Add a review

PUT       /api/v1/reviews/:id             Update a review

DELETE   /api/v1/reviews/:id              Delete a review


Author
Sixtus Dev
GitHub: https://github.com/Sixtus-Dev7

Support
If you like this project, give it a star on GitHub!

Future Improvements

  •	🔐 User authentication
	•	❤️ Like/Dislike reviews
	•	🌍 Deploy to cloud (Render / Vercel)
	•	🎨 UI redesign

  :::