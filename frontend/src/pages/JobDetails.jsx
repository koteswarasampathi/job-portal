import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function JobDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const getJobDetails = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await API.get(`/job/${id}`);

            setJob(response.data.job);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load job details."
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        getJobDetails();
    }, [id]);


    const handleApply = async () => {

        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role !== "student") {
            setError("Only students can apply for jobs.");
            return;
        }

        try {

            setError("");
            setMessage("");

            const response = await API.post(`/application/${id}`);

            setMessage(
                response.data.message ||
                "Application submitted successfully!"
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to apply for this job."
            );
        }
    };


    if (loading) {
        return (
            <div className="job-details-page">
                <p className="jobs-message">
                    Loading job details...
                </p>
            </div>
        );
    }


    if (error && !job) {
        return (
            <div className="job-details-page">
                <p className="jobs-error">
                    {error}
                </p>
            </div>
        );
    }


    return (
        <div className="job-details-page">

            <div className="job-details-card">

                <h1>{job.title}</h1>

                <p className="job-details-company">
                    {job.company?.name || "Company"}
                </p>

                <div className="job-info">

                    <p>
                        📍 <strong>Location:</strong> {job.location}
                    </p>

                    <p>
                        💰 <strong>Salary:</strong> ₹{job.salary}
                    </p>

                    <p>
                        💼 <strong>Job Type:</strong>{" "}
                        {job.jobType || "Full Time"}
                    </p>

                    <p>
                        👨‍💻 <strong>Experience:</strong>{" "}
                        {job.experience || "Not specified"}
                    </p>

                    <p>
                        👥 <strong>Positions:</strong>{" "}
                        {job.position || "Not specified"}
                    </p>

                </div>


                <div className="job-section">

                    <h2>Job Description</h2>

                    <p>
                        {job.description}
                    </p>

                </div>


                <div className="job-section">

                    <h2>Requirements</h2>

                    <p>
                        {job.requirements}
                    </p>

                </div>


                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}


                <button
                    className="apply-button"
                    onClick={handleApply}
                >
                    Apply Now
                </button>

            </div>

        </div>
    );
}

export default JobDetails;