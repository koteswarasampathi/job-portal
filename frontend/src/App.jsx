import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Dashboard from "./pages/Dashboard";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import Applicants from "./pages/Applicants";
import Profile from "./pages/Profile";
import EditJob from "./pages/EditJob";
import AddCompany from "./pages/AddCompany";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================== */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/jobs"
                    element={<Jobs />}
                />

                <Route
                    path="/jobs/:id"
                    element={<JobDetails />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    PROTECTED ROUTES
                ========================== */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/applications"
                        element={<MyApplications />}
                    />

                    <Route
                        path="/recruiter/dashboard"
                        element={<RecruiterDashboard />}
                    />

                    <Route
                        path="/recruiter/create-job"
                        element={<CreateJob />}
                    />

                    <Route path="/recruiter/add-company" element={<AddCompany />} />

                    <Route
                        path="/recruiter/edit-job/:id"
                        element={<EditJob />}
                    />

                    <Route
                        path="/recruiter/applicants/:jobId"
                        element={<Applicants />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;