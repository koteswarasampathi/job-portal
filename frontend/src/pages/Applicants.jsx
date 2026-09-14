import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Applicants() {

    const { jobId } = useParams();

    const [applicants, setApplicants] = useState([]);
    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const getApplicants = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await API.get(
                `/application/${jobId}/applicants`
            );

            setApplicants(
                response.data.applications || []
            );

            setJob(response.data.job || null);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load applicants."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        getApplicants();

    }, [jobId]);


    const updateStatus = async (applicationId, status) => {

        try {

            setError("");
            setMessage("");

            const response = await API.put(
                `/application/${applicationId}/status`,
                {
                    status
                }
            );

            setMessage(
                response.data.message ||
                `Application ${status} successfully.`
            );

            // Reload applicants
            getApplicants();

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to update application status."
            );
        }
    };


    return (
        <div className="applicants-page">

            <div className="applicants-container">

                {/* Header */}

                <div className="applicants-header">

                    <div>

                        <h1>
                            Applicants
                        </h1>

                        {job && (
                            <p>
                                Applications for{" "}
                                <strong>
                                    {job.title}
                                </strong>
                            </p>
                        )}

                    </div>

                </div>


                {/* Messages */}

                {message && (
                    <p className="applicants-success">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="applicants-error">
                        {error}
                    </p>
                )}


                {/* Loading */}

                {loading && (
                    <p className="applicants-message">
                        Loading applicants...
                    </p>
                )}


                {/* No applicants */}

                {!loading &&
                    !error &&
                    applicants.length === 0 && (

                        <div className="no-applicants">

                            <h2>
                                No Applicants Yet
                            </h2>

                            <p>
                                Nobody has applied for this job yet.
                            </p>

                        </div>
                    )}


                {/* Applicants */}

                {!loading &&
                    applicants.length > 0 && (

                        <div className="applicants-list">

                            {applicants.map((application) => {

                                const applicant =
                                    application.applicant ||
                                    application.user ||
                                    application.student;

                                return (

                                    <div
                                        className="applicant-card"
                                        key={application._id}
                                    >

                                        <div className="applicant-info">

                                            <h2>
                                                {applicant?.fullname ||
                                                    "Student"}
                                            </h2>

                                            <p>
                                                📧{" "}
                                                {applicant?.email ||
                                                    "Email not available"}
                                            </p>

                                            {applicant?.phoneNumber && (
                                                <p>
                                                    📱{" "}
                                                    {applicant.phoneNumber}
                                                </p>
                                            )}

                                            {applicant?.profile?.skills?.length > 0 && (
                                                <p>
                                                    🛠️{" "}
                                                    {applicant.profile.skills.join(
                                                        ", "
                                                    )}
                                                </p>
                                            )}

                                            <p className="application-date">
                                                Applied on:{" "}
                                                {application.createdAt
                                                    ? new Date(
                                                        application.createdAt
                                                    ).toLocaleDateString()
                                                    : "N/A"}
                                            </p>

                                        </div>


                                        <div className="applicant-actions">

                                            <span
                                                className={`applicant-status ${
                                                    application.status?.toLowerCase() ||
                                                    "pending"
                                                }`}
                                            >
                                                {application.status ||
                                                    "Pending"}
                                            </span>


                                            <div className="status-buttons">

                                                <button
                                                    className="accept-button"
                                                    onClick={() =>
                                                        updateStatus(
                                                            application._id,
                                                            "Accepted"
                                                        )
                                                    }
                                                    disabled={
                                                        application.status?.toLowerCase() ===
                                                        "Accepted"
                                                    }
                                                >
                                                    Accept
                                                </button>


                                                <button
                                                    className="reject-button"
                                                    onClick={() =>
                                                        updateStatus(
                                                            application._id,
                                                            "Rejected"
                                                        )
                                                    }
                                                    disabled={
                                                        application.status?.toLowerCase() ===
                                                        "Rejected"
                                                    }
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                );
                            })}

                        </div>
                    )}

            </div>

        </div>
    );
}

export default Applicants;