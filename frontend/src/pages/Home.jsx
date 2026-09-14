import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { user } = useAuth();

    return (
        <div className="hp-page">

            {/* HERO SECTION */}
            <section className="hp-hero">

                <div className="hp-hero-container">

                    {/* LEFT SIDE */}
                    <div className="hp-hero-left">

                        <div className="hp-badge">
                            🚀 FIND YOUR NEXT OPPORTUNITY
                        </div>

                        <h1>
                            Everything you need
                            <br />
                            to <span>find the right job.</span>
                        </h1>

                        <p>
                            We make your job search easier, faster and more effective.
                            Discover opportunities that match your skills and career goals.
                        </p>

                        <div className="hp-buttons">
                            <Link to="/jobs" className="hp-primary-btn">
                                Find Jobs →
                            </Link>

                            {!user && (
                                <Link to="/register" className="hp-secondary-btn">
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
                                    className="hp-secondary-btn"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>

                        <div className="hp-stats">
                            <div>
                                <strong>10K+</strong>
                                <span>Active Jobs</span>
                            </div>

                            <div>
                                <strong>5K+</strong>
                                <span>Companies</span>
                            </div>

                            <div>
                                <strong>25K+</strong>
                                <span>Job Seekers</span>
                            </div>

                            <div>
                                <strong>95%</strong>
                                <span>Success Rate</span>
                            </div>
                        </div>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="hp-hero-right">

                        <div className="hp-main-card">

                            <div className="hp-card-top">
                                <span className="hp-card-icon">💼</span>

                                <div>
                                    <small>READY TO START?</small>
                                    <h2>Your next opportunity is waiting.</h2>
                                </div>
                            </div>

                            <p>
                                Join thousands of professionals and companies
                                building their future with JobPortal.
                            </p>

                            <Link to="/jobs" className="hp-card-button">
                                Explore Jobs →
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* FEATURES */}
            <section className="hp-features">

                <div className="hp-section-heading">
                    <small>WHY JOBPORTAL</small>
                    <h2>Everything you need to find the right job.</h2>
                    <p>
                        Simple tools for job seekers and recruiters.
                    </p>
                </div>

                <div className="hp-feature-grid">

                    <div className="hp-feature-card">
                        <div className="hp-feature-icon">🔎</div>
                        <h3>Find the right jobs</h3>
                        <p>
                            Search thousands of jobs using keywords,
                            location and job preferences.
                        </p>
                        <Link to="/jobs">Explore Jobs →</Link>
                    </div>

                    <div className="hp-feature-card">
                        <div className="hp-feature-icon">⚡</div>
                        <h3>Apply in seconds</h3>
                        <p>
                            Create your profile once and apply to
                            opportunities quickly and easily.
                        </p>
                        <Link to="/jobs">Start Applying →</Link>
                    </div>

                    <div className="hp-feature-card">
                        <div className="hp-feature-icon">📊</div>
                        <h3>Track applications</h3>
                        <p>
                            Keep track of your applications and know
                            exactly where you stand.
                        </p>
                        <Link to="/applications">View Dashboard →</Link>
                    </div>

                    <div className="hp-feature-card">
                        <div className="hp-feature-icon">🏢</div>
                        <h3>Hire great talent</h3>
                        <p>
                            Recruiters can post jobs and connect with
                            talented candidates.
                        </p>
                        <Link to="/recruiter/dashboard">Start Hiring →</Link>
                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="hp-cta">

                <div className="hp-cta-container">

                    <div>
                        <small>READY TO START?</small>

                        <h2>
                            Your next opportunity
                            <br />
                            is waiting for you.
                        </h2>

                        <p>
                            Join JobPortal and take the next step in your career.
                        </p>
                    </div>

                    <Link to="/jobs" className="hp-cta-button">
                        Get Started →
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Home;