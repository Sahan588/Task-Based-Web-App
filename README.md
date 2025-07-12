"# Task-Based-Web-App" 
# 📝 Task-Based Web App

This is a simple and responsive **Full-Stack Task Management Web Application** built with **React**, **Node.js (Express)**, and **MongoDB**.

---

## 🚀 Features

- 🔐 User Registration & Login with JWT Authentication
- 🗃️ Create, View, Update, and Delete Tasks
- 🕓 Add Task Deadlines
- ✅ Mark Tasks as Completed
- 🔍 Filter & Sort Tasks
- 📱 Responsive UI with CSS
- 🧠 Secure backend & clean structure

---

## 📷 Screenshots

### 🔐 Login Page
![Login](./screenshots/login.JPG)

### 📝 Register Page
![Register](./screenshots/register.JPG)

### 📋 Task List
![Task List](./screenshots/task%20list.JPG)

### 🧩 Full Task Web App
![Task App](./screenshots/task%20web%20app.JPG)

---

## 🛠️ Tech Stack

**Frontend:**

- React
- Axios for API calls
- CSS

**Backend:**

- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Mongoose

---

##  Project Structure

Task-Based-Web-App/
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── README.md


## 01. Go to the backend folder:

   ```bash
   cd backend

## 02.Install dependencies:
    npm install

## 03.Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_link_here
JWT_SECRET=your_jwt_secret_key

## 04.Start the backend server:
  npm run dev
  or
  npm start


  💻 Frontend Setup

## 01.Open a new terminal and navigate to frontend folder:
    cd frontend

## 02.Install dependencies:
    npm install

## 03.Start the frontend server:
    npm start


🌐 How to Use
Register a new user.

Login to your account.

Add new tasks with optional deadline.

Mark tasks as completed ✅.

Edit, delete, sort or filter your task list.

👨‍💻 Author
Developed by Sahan Jayamal — GitHub

📄 License
This project is licensed for educational and testing purposes only.


### 📌 Tips:

- Make sure `screenshots/` folder is inside your project root with image files:
  - `login.JPG`
  - `register.JPG`
  - `task list.JPG`
  - `task web app.JPG`
- Replace `your_mongodb_atlas_connection_link_here` with the **MongoDB Atlas URI**
- Replace `your_jwt_secret_key` with a **secure random string**

