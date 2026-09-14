import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

    const { user } = useAuth();

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


    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
        (application) =>
            application.status?.toLowerCase() === "pending"
    ).length;

    const acceptedApplications = applications.filter(
        (application) =>
            application.status?.toLowerCase() === "accepted"
    ).length;

    const rejectedApplications = applications.filter(
        (application) =>
            application.status?.toLowerCase() === "rejected"
    ).length;


    return (
        <div className="dashboard-page">

            <div className="dashboard-container">

                <div className="dashboard-header">

                    <div>
                        <h1>
                            Welcome, {user?.fullname || "Student"} 👋
                        </h1>

                        <p>
                            Track your job applications and discover
                            new opportunities.
                        </p>
                    </div>

                </div>


                {loading && (
                    <p className="dashboard-message">
                        Loading dashboard...
                    </p>
                )}


                {error && (
                    <p className="dashboard-error">
                        {error}
                    </p>
                )}


                {!loading && !error && (
                    <>
                        <div className="stats-grid">

                            <div className="stat-card">
                                <h3>Total Applications</h3>
                                <p>{totalApplications}</p>
                            </div>

                            <div className="stat-card">
                                <h3>Pending</h3>
                                <p>{pendingApplications}</p>
                            </div>

                            <div className="stat-card">
                                <h3>Accepted</h3>
                                <p>{acceptedApplications}</p>
                            </div>

                            <div className="stat-card">
                                <h3>Rejected</h3>
                                <p>{rejectedApplications}</p>
                            </div>

                        </div>


                        <div className="dashboard-actions">

                            <Link
                                to="/jobs"
                                className="dashboard-button primary"
                            >
                                Browse Jobs
                            </Link>

                            <Link
                                to="/applications"
                                className="dashboard-button secondary"
                            >
                                My Applications
                            </Link>

                        </div>


                        <div className="recent-applications">

                            <h2>Recent Applications</h2>

                            {applications.length === 0 ? (

                                <p className="dashboard-message">
                                    You haven't applied for any jobs yet.
                                </p>

                            ) : (

                                <div className="application-list">

                                    {applications
                                        .slice(0, 5)
                                        .map((application) => (

                                            <div
                                                className="application-card"
                                                key={application._id}
                                            >

                                                <div>

                                                    <h3>
                                                        {application.job?.title ||
                                                            "Job"}
                                                    </h3>

                                                    <p>
                                                        {application.job?.company?.name ||
                                                            "Company"}
                                                    </p>

                                                </div>

                                                <span
                                                    className={`status ${application.status?.toLowerCase()}`}
                                                >
                                                    {application.status ||
                                                        "Pending"}
                                                </span>

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

export default Dashboard;