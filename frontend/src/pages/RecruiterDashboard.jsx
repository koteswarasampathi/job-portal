import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function RecruiterDashboard() {

    const { user } = useAuth();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleDeleteJob = async (jobId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await API.delete(`/job/${jobId}`);

            setJobs((previousJobs) =>
                previousJobs.filter(
                    (job) => job._id !== jobId
                )
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to delete job."
            );
        }
    };

    const getMyJobs = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await API.get("/job/recruiter/my-jobs");

            setJobs(response.data.jobs || []);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load your jobs."
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        getMyJobs();
    }, []);


    return (
        <div className="recruiter-dashboard-page">

            <div className="recruiter-dashboard-container">

                {/* Header */}

                <div className="recruiter-header">

                    <div>
                        <h1>
                            Recruiter Dashboard
                        </h1>

                        <p>
                            Welcome, {user?.fullname || "Recruiter"} 👋
                        </p>
                    </div>

                    <Link
                        to="/recruiter/create-job"
                        className="create-job-button"
                    >
                        + Create Job
                    </Link>

                </div>


                {/* Loading */}

                {loading && (
                    <p className="recruiter-message">
                        Loading your jobs...
                    </p>
                )}


                {/* Error */}

                {error && (
                    <p className="recruiter-error">
                        {error}
                    </p>
                )}


                {/* Jobs */}

                {!loading && !error && (

                    <>

                        <div className="recruiter-summary">

                            <div className="recruiter-stat">

                                <h3>
                                    Total Jobs
                                </h3>

                                <p>
                                    {jobs.length}
                                </p>

                            </div>

                        </div>


                        <div className="posted-jobs-section">

                            <h2>
                                My Posted Jobs
                            </h2>


                            {jobs.length === 0 ? (

                                <div className="no-jobs">

                                    <h3>
                                        No Jobs Posted Yet
                                    </h3>

                                    <p>
                                        Create your first job
                                        opportunity.
                                    </p>

                                    <Link
                                        to="/recruiter/create-job"
                                        className="create-job-button"
                                    >
                                        Create Job
                                    </Link>

                                </div>

                            ) : (

                                <div className="recruiter-jobs-grid">

                                    {jobs.map((job) => (

                                        <div
                                            className="recruiter-job-card"
                                            key={job._id}
                                        >

                                            <div className="recruiter-job-content">

                                                <h3>
                                                    {job.title}
                                                </h3>

                                                <p className="recruiter-company">
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

                                                <p>
                                                    👨‍💻{" "}
                                                    {job.experience ||
                                                        "Not specified"}
                                                </p>

                                            </div>


                                            <div className="recruiter-job-actions">

                                                <Link
                                                    to={`/jobs/${job._id}`}
                                                    className="view-job-button"
                                                >
                                                    View Job
                                                </Link>

                                                <Link
                                                    to={`/recruiter/edit-job/${job._id}`}
                                                    className="edit-job-button"
                                                >
                                                    Edit
                                                </Link>

                                                <Link
                                                    to={`/recruiter/applicants/${job._id}`}
                                                    className="applicants-button"
                                                >
                                                    View Applicants
                                                </Link>

                                                <button
                                                    className="delete-job-button"
                                                    onClick={() =>
                                                        handleDeleteJob(job._id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </>

                )}

            </div>

        </div>
    );
}

export default RecruiterDashboard;