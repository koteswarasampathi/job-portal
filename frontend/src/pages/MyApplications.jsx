import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function MyApplications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await API.get("/application/my");

            setApplications(response.data.applications || []);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load applications."
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        getApplications();
    }, []);


    return (
        <div className="applications-page">

            <div className="applications-container">

                <div className="applications-header">

                    <div>
                        <h1>My Applications</h1>

                        <p>
                            Track the jobs you have applied for.
                        </p>
                    </div>

                    <Link
                        to="/jobs"
                        className="browse-jobs-button"
                    >
                        Browse Jobs
                    </Link>

                </div>


                {loading && (
                    <p className="applications-message">
                        Loading applications...
                    </p>
                )}


                {error && (
                    <p className="applications-error">
                        {error}
                    </p>
                )}


                {!loading && !error && applications.length === 0 && (

                    <div className="no-applications">

                        <h2>No Applications Yet</h2>

                        <p>
                            You haven't applied for any jobs yet.
                        </p>

                        <Link
                            to="/jobs"
                            className="browse-jobs-button"
                        >
                            Find Jobs
                        </Link>

                    </div>

                )}


                {!loading && !error && applications.length > 0 && (

                    <div className="applications-list">

                        {applications.map((application) => (

                            <div
                                className="my-application-card"
                                key={application._id}
                            >

                                <div className="application-main">

                                    <h2>
                                        {application.job?.title ||
                                            "Job Title"}
                                    </h2>

                                    <p className="application-company">
                                        {application.job?.company?.name ||
                                            "Company"}
                                    </p>

                                    <div className="application-details">

                                        <span>
                                            📍{" "}
                                            {application.job?.location ||
                                                "Location not specified"}
                                        </span>

                                        <span>
                                            💰 ₹
                                            {application.job?.salary ||
                                                "Not specified"}
                                        </span>

                                        <span>
                                            💼{" "}
                                            {application.job?.jobType ||
                                                "Full Time"}
                                        </span>

                                    </div>

                                    {application.createdAt && (
                                        <p className="applied-date">
                                            Applied on:{" "}
                                            {new Date(
                                                application.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    )}

                                </div>


                                <div className="application-side">

                                    <span
                                        className={`application-status ${
                                            application.status?.toLowerCase() ||
                                            "pending"
                                        }`}
                                    >
                                        {application.status || "Pending"}
                                    </span>

                                    {application.job?._id && (
                                        <Link
                                            to={`/jobs/${application.job._id}`}
                                            className="view-application-job"
                                        >
                                            View Job
                                        </Link>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default MyApplications;