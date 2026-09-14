import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, loading, logout } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link to="/" className="logo">
                    JobPortal
                </Link>

                <div className="nav-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/jobs">
                        Jobs
                    </Link>

                    {!user && (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="register-btn"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {user && user.role === "student" && (
                        <>
                            <Link to="/dashboard">
                                Dashboard
                            </Link>

                            <Link to="/applications">
                                My Applications
                            </Link>

                            <Link to="/profile">
                                Profile
                            </Link>

                            <button
                                className="logout-btn"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {user && user.role === "recruiter" && (
                        <>
                            <Link to="/recruiter/dashboard">
                                Recruiter Dashboard
                            </Link>

                            <Link to="/profile">
                                Profile
                            </Link>

                            <button
                                className="logout-btn"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;