import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Jobs() {

    const [jobs, setJobs] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getJobs = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await API.get("/job", {
                params: {
                    keyword,
                    location
                }
            });

            setJobs(response.data.jobs || []);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load jobs."
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    const handleSearch = (e) => {

        e.preventDefault();

        getJobs();
    };

    return (
        <div className="jobs-page">

            <div className="jobs-container">

                <h1>Find Your Dream Job</h1>

                <p className="jobs-subtitle">
                    Search and discover the latest job opportunities.
                </p>

                {/* SEARCH */}

                <form
                    className="job-search"
                    onSubmit={handleSearch}
                >

                    <input
                        type="text"
                        placeholder="Job title or keyword"
                        value={keyword}
                        onChange={(e) =>
                            setKeyword(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) =>
                            setLocation(e.target.value)
                        }
                    />

                    <button type="submit">
                        Search
                    </button>

                </form>

                {/* LOADING */}

                {loading && (
                    <p className="jobs-message">
                        Loading jobs...
                    </p>
                )}

                {/* ERROR */}

                {error && (
                    <p className="jobs-error">
                        {error}
                    </p>
                )}

                {/* JOBS */}

                {!loading && !error && (
                    <div className="jobs-grid">

                        {jobs.length === 0 ? (

                            <p className="jobs-message">
                                No jobs found.
                            </p>

                        ) : (

                            jobs.map((job) => (

                                <div
                                    className="job-card"
                                    key={job._id}
                                >

                                    <h2>
                                        {job.title}
                                    </h2>

                                    <p className="job-company">
                                        {job.company?.name ||
                                            "Company"}
                                    </p>

                                    <p>
                                        📍 {job.location}
                                    </p>

                                    <p>
                                        💰 ₹{job.salary}
                                    </p>

                                    <p>
                                        💼 {job.jobType ||
                                            "Full Time"}
                                    </p>

                                    <Link
                                        to={`/jobs/${job._id}`}
                                        className="view-job-btn"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            ))

                        )}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Jobs;