import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [experience, setExperience] = useState("");
    const [position, setPosition] = useState("");

    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // Get job details
    const getJob = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await API.get(`/job/${id}`);

            const job = response.data.job;

            setTitle(job.title || "");
            setDescription(job.description || "");
            setRequirements(job.requirements || "");
            setSalary(job.salary || "");
            setLocation(job.location || "");
            setJobType(job.jobType || "");
            setExperience(job.experience || "");
            setPosition(job.position || "");

            setCompanyId(
                job.company?._id ||
                job.company ||
                ""
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load job."
            );

        } finally {

            setLoading(false);
        }
    };


    // Get companies
    const getCompanies = async () => {

        try {

            const response = await API.get("/company");

            setCompanies(
                response.data.companies || []
            );

        } catch (error) {

            console.log(
                "Company loading error:",
                error
            );
        }
    };


    useEffect(() => {

        getJob();
        getCompanies();

    }, [id]);


    // Update job
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setMessage("");
            setError("");

            const response = await API.put(
                `/job/${id}`,
                {
                    title,
                    description,
                    requirements,
                    salary: Number(salary),
                    location,
                    jobType,
                    experience,
                    position: Number(position),
                    companyId
                }
            );

            setMessage(
                response.data.message ||
                "Job updated successfully!"
            );

            setTimeout(() => {

                navigate("/recruiter/dashboard");

            }, 1200);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to update job."
            );

        } finally {

            setSaving(false);
        }
    };


    if (loading) {

        return (
            <div className="edit-job-page">
                <p className="edit-job-message">
                    Loading job...
                </p>
            </div>
        );
    }


    return (

        <div className="edit-job-page">

            <div className="edit-job-container">

                <h1>Edit Job</h1>

                <p className="edit-job-subtitle">
                    Update your job posting.
                </p>


                {message && (
                    <div className="edit-job-success">
                        {message}
                    </div>
                )}


                {error && (
                    <div className="edit-job-error">
                        {error}
                    </div>
                )}


                <form
                    className="edit-job-form"
                    onSubmit={handleSubmit}
                >

                    {/* Job Title */}

                    <div className="edit-job-field">

                        <label>
                            Job Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Company */}

                    <div className="edit-job-field">

                        <label>
                            Company
                        </label>

                        <select
                            value={companyId}
                            onChange={(e) =>
                                setCompanyId(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select Company
                            </option>

                            {companies.map((company) => (

                                <option
                                    key={company._id}
                                    value={company._id}
                                >
                                    {company.name}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Description */}

                    <div className="edit-job-field">

                        <label>
                            Job Description
                        </label>

                        <textarea
                            rows="6"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Requirements */}

                    <div className="edit-job-field">

                        <label>
                            Requirements
                        </label>

                        <textarea
                            rows="5"
                            value={requirements}
                            onChange={(e) =>
                                setRequirements(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="edit-job-row">

                        {/* Salary */}

                        <div className="edit-job-field">

                            <label>
                                Salary
                            </label>

                            <input
                                type="number"
                                value={salary}
                                onChange={(e) =>
                                    setSalary(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* Position */}

                        <div className="edit-job-field">

                            <label>
                                Number of Positions
                            </label>

                            <input
                                type="number"
                                value={position}
                                onChange={(e) =>
                                    setPosition(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>


                    {/* Location */}

                    <div className="edit-job-field">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Job Type */}

                    <div className="edit-job-field">

                        <label>
                            Job Type
                        </label>

                        <select
                            value={jobType}
                            onChange={(e) =>
                                setJobType(e.target.value)
                            }
                        >

                            <option value="">
                                Select Job Type
                            </option>

                            <option value="Full Time">
                                Full Time
                            </option>

                            <option value="Part Time">
                                Part Time
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                            <option value="Contract">
                                Contract
                            </option>

                        </select>

                    </div>


                    {/* Experience */}

                    <div className="edit-job-field">

                        <label>
                            Experience
                        </label>

                        <input
                            type="text"
                            value={experience}
                            onChange={(e) =>
                                setExperience(e.target.value)
                            }
                            placeholder="Example: 0-2 years"
                        />

                    </div>


                    <div className="edit-job-buttons">

                        <button
                            type="button"
                            className="cancel-job-button"
                            onClick={() =>
                                navigate(
                                    "/recruiter/dashboard"
                                )
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="update-job-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Job"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditJob;