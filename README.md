# 💼 MERN Job Portal

A full-stack **Job Portal web application** built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

The application provides separate experiences for **Job Seekers** and **Recruiters**, including authentication, job search, job creation, applications, applicant management, profile management, resume upload, and profile photo upload.

---

## 🚀 Live Project

> Coming soon

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page](screenshots/home.png)

### 🔎 Jobs Page

![Jobs Page](screenshots/jobs.png)

### 📄 Job Details

![Job Details](screenshots/job-details.png)

### 👤 Profile Page

![Profile Page](screenshots/profile.png)

### 🧑‍💼 Recruiter Dashboard

![Recruiter Dashboard](screenshots/recruiter-dashboard.png)

### 👥 Applicants Page

![Applicants Page](screenshots/applicants.png)

---

## ✨ Features

### 👨‍💻 Job Seeker

- User registration and login
- JWT-based authentication
- Browse available jobs
- Search jobs by keyword and location
- View complete job details
- Apply for jobs
- Prevent duplicate applications
- Track submitted applications
- View application status
- Update profile information
- Upload profile photo
- Upload resume
- Logout securely

### 🧑‍💼 Recruiter

- Recruiter registration and login
- JWT-based authentication
- Create job postings
- View created jobs
- Update job details
- Delete job postings
- View applicants for a job
- Update application status
- Manage recruiter profile/company information

---

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- React Router
- Axios
- Vite
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- CORS
- dotenv

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MongoDB Atlas

---

## 📂 Project Structure

```text
job-portal/
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── multer.js
│   │
│   ├── models/
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── user.route.js
│   │
│   ├── utils/
│   │   └── db.js
│   │
│   ├── uploads/
│   │
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   └── package.json
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│   ├── home.png
│   ├── jobs.png
│   ├── job-details.png
│   ├── profile.png
│   ├── recruiter-dashboard.png
│   └── applicants.png
│
├── .gitignore
└── README.md