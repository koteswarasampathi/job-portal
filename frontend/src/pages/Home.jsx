import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {

    const { user } = useAuth();

    return (
        <div className="home-page">

            <div className="home-container">

                <section className="hero-section">

                    <div className="hero-content">

                        <span className="hero-badge">
                            🚀 Find your next opportunity
                        </span>

                        <h1>
                            Find Your
                            <span> Dream Job</span>
                        </h1>

                        <p>
                            Discover job opportunities, connect with
                            companies, and take the next step in your career.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/jobs"
                                className="hero-primary-button"
                            >
                                Browse Jobs
                            </Link>

                            {!user && (
                                <Link
                                    to="/register"
                                    className="hero-secondary-button"
                                >
                                    Create Account
                                </Link>
                            )}

                            {user && (
                                <Link
                                    to={
                                        user.role === "recruiter"
                                            ? "/recruiter/dashboard"
                                            : "/dashboard"
                                    }
                                    className="hero-secondary-button"
                                >
                                    Go to Dashboard
                                </Link>
                            )}

                        </div>

                    </div>


                    <div className="hero-visual">

                        <div className="hero-card">

                            <div className="hero-card-icon">
                                💼
                            </div>

                            <h3>
                                Thousands of Opportunities
                            </h3>

                            <p>
                                Find jobs that match your skills and
                                career goals.
                            </p>

                        </div>


                        <div className="hero-floating-card">

                            <span>✓</span>

                            <div>
                                <strong>
                                    Easy Applications
                                </strong>

                                <small>
                                    Apply in just a few clicks
                                </small>
                            </div>

                        </div>

                    </div>

                </section>


                <section className="features-section">

                    <div className="feature">

                        <div className="feature-icon">
                            🔎
                        </div>

                        <h3>
                            Find Jobs
                        </h3>

                        <p>
                            Search jobs by title, skills and location.
                        </p>

                    </div>


                    <div className="feature">

                        <div className="feature-icon">
                            📝
                        </div>

                        <h3>
                            Easy Apply
                        </h3>

                        <p>
                            Apply to your favorite jobs quickly.
                        </p>

                    </div>


                    <div className="feature">

                        <div className="feature-icon">
                            📊
                        </div>

                        <h3>
                            Track Applications
                        </h3>

                        <p>
                            Monitor your application status easily.
                        </p>

                    </div>


                    <div className="feature">

                        <div className="feature-icon">
                            🏢
                        </div>

                        <h3>
                            Hire Talent
                        </h3>

                        <p>
                            Recruiters can post jobs and find candidates.
                        </p>

                    </div>

                </section>

            </div>

        </div>
    );
}

export default Home;