# 💼 Job Portal - MERN Stack

A full-stack Job Portal web application built using the MERN stack.

The application allows job seekers to search and apply for jobs, while recruiters can create jobs, manage their job postings, and manage applications.

---

## 🚀 Features

### 👨‍💻 Job Seeker

- User registration and login
- JWT-based authentication
- Browse available jobs
- Search jobs by keyword and location
- View detailed job information
- Apply for jobs
- Track job applications
- View application status
- Update profile information
- Upload profile photo
- Upload resume
- Student dashboard
- Logout functionality

### 🏢 Recruiter

- Recruiter registration and login
- Create job postings
- View recruiter jobs
- Edit job postings
- Delete job postings
- View applicants
- Accept or reject applications
- Manage company information
- Recruiter dashboard
- Logout functionality

---

## 🛠️ Technologies Used

### Frontend

- React.js
- React Router
- Axios
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- CORS

---

## 📁 Project Structure

```text
job-portal/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md