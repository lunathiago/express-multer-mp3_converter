Simple Backend API - File Upload & User Management

This is a simple backend API built with Node.js, Express, and MongoDB (GridFS) to:

Upload and retrieve files (max size: 5MB)

Add and fetch user details (name & email)

Uses MongoDB GridFS for file storage

🚀 Getting Started

1️⃣ Install Dependencies

Run the following command in your project directory:

npm install

2️⃣ Set Up Environment Variables

Create a .env file in the root folder and add:

MONGO_URI=mongodb://localhost:27017/gridfs_db
PORT=3000

3️⃣ Start the Server

node index.ts

📂 API Endpoints

🔹 Upload a File

POST /uploadUpload a file (max size: 5MB)

Content-Type: multipart/form-data

Key: file

Example using cURL:

curl -X POST -F "file=@path/to/file.jpg" http://localhost:3000/upload

🔹 Get File Metadata

GET /files/{filename}Returns metadata of the uploaded file.

curl -X GET http://localhost:3000/files/myfile.jpg

🔹 Download a File

GET /files/download/{filename}Streams the file from GridFS for download.

curl -X GET http://localhost:3000/files/download/myfile.jpg -o myfile.jpg

🔹 Add a New User

POST /users/add

Body (JSON):

{
  "name": "John Doe",
  "email": "johndoe@example.com"
}

Example using cURL:

curl -X POST http://localhost:3000/users/add \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"johndoe@example.com"}'

🔹 Get Users with Pagination

GET /users/add?page=1&limit=1

curl -X GET http://localhost:3000/users/add?page=1&limit=1

🛠 Technologies Used

Node.js + Express.js (Backend Framework)

MongoDB + GridFS (File Storage)

Multer (Handling File Uploads)

📝 Notes

Files must not exceed 5MB.

Make sure MongoDB is running before starting the server.

The API does not have a frontend/UI.

📜 License

This project is open-source and can be modified as needed