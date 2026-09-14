import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, loading, logout } = useAuth();
    const location = useLocation();

    if (loading) return null;

    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">J</div>
                    <span>Job<span>Portal</span></span>
                </Link>

                {/* Navigation */}
                <div className="nav-links">

                    <Link
                        to="/"
                        className={isActive("/")}
                    >
                        Home
                    </Link>

                    <Link
                        to="/jobs"
                        className={isActive("/jobs")}
                    >
                        Find Jobs
                    </Link>

                    {!user && (
                        <>
                            <Link
                                to="/login"
                                className={isActive("/login")}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="nav-register-btn"
                            >
                                Get Started
                            </Link>
                        </>
                    )}

                    {user && user.role === "student" && (
                        <>
                            <Link
                                to="/dashboard"
                                className={isActive("/dashboard")}
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/applications"
                                className={isActive("/applications")}
                            >
                                Applications
                            </Link>

                            <Link
                                to="/profile"
                                className={isActive("/profile")}
                            >
                                Profile
                            </Link>

                            <button
                                className="nav-logout-btn"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {user && user.role === "recruiter" && (
                        <>
                            <Link
                                to="/recruiter/dashboard"
                                className={isActive("/recruiter/dashboard")}
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                className={isActive("/profile")}
                            >
                                Profile
                            </Link>

                            <button
                                className="nav-logout-btn"
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