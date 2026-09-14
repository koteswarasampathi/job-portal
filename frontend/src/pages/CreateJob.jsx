import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateJob() {

    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("Full Time");
    const [experience, setExperience] = useState("");
    const [position, setPosition] = useState("");
    const [companyId, setCompanyId] = useState("");

    const [loading, setLoading] = useState(false);
    const [companiesLoading, setCompaniesLoading] = useState(true);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // Get recruiter's companies
    const getCompanies = async () => {

        try {

            setCompaniesLoading(true);

            const response = await API.get("/company");

            setCompanies(response.data.companies || []);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load companies."
            );

        } finally {

            setCompaniesLoading(false);

        }
    };


    useEffect(() => {
        getCompanies();
    }, []);


    const handleCreateJob = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            setLoading(true);

            const response = await API.post("/job", {
                title,
                description,
                requirements,
                salary: Number(salary),
                location,
                jobType,
                experience,
                position: Number(position),
                companyId
            });

            setMessage(
                response.data.message ||
                "Job created successfully!"
            );

            // Clear form
            setTitle("");
            setDescription("");
            setRequirements("");
            setSalary("");
            setLocation("");
            setJobType("Full Time");
            setExperience("");
            setPosition("");
            setCompanyId("");

            // Go to dashboard after 1.5 seconds
            setTimeout(() => {
                navigate("/recruiter/dashboard");
            }, 1500);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to create job."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="create-job-page">

            <div className="create-job-container">

                <div className="create-job-header">

                    <h1>Create New Job</h1>

                    <p>
                        Post a new job opportunity for job seekers.
                    </p>

                </div>


                {message && (
                    <p className="create-job-success">
                        {message}
                    </p>
                )}


                {error && (
                    <p className="create-job-error">
                        {error}
                    </p>
                )}


                <form
                    className="create-job-form"
                    onSubmit={handleCreateJob}
                >

                    {/* Job Title */}

                    <div className="form-group">

                        <label>
                            Job Title
                        </label>

                        <input
                            type="text"
                            placeholder="Example: MERN Stack Developer"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Company */}

                    <div className="form-group">

                        <label>
                            Company
                        </label>

                        {companiesLoading ? (

                            <p>
                                Loading companies...
                            </p>

                        ) : (

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

                        )}

                    </div>


                    {/* Description */}

                    <div className="form-group">

                        <label>
                            Job Description
                        </label>

                        <textarea
                            placeholder="Describe the job role..."
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            rows="5"
                            required
                        />

                    </div>


                    {/* Requirements */}

                    <div className="form-group">

                        <label>
                            Requirements
                        </label>

                        <textarea
                            placeholder="Example: React, Node.js, MongoDB..."
                            value={requirements}
                            onChange={(e) =>
                                setRequirements(e.target.value)
                            }
                            rows="4"
                            required
                        />

                    </div>


                    {/* Salary + Location */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Salary
                            </label>

                            <input
                                type="number"
                                placeholder="600000"
                                value={salary}
                                onChange={(e) =>
                                    setSalary(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                placeholder="Hyderabad"
                                value={location}
                                onChange={(e) =>
                                    setLocation(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>


                    {/* Job Type + Experience */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Job Type
                            </label>

                            <select
                                value={jobType}
                                onChange={(e) =>
                                    setJobType(e.target.value)
                                }
                            >

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


                        <div className="form-group">

                            <label>
                                Experience
                            </label>

                            <input
                                type="text"
                                placeholder="0-2 years"
                                value={experience}
                                onChange={(e) =>
                                    setExperience(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>


                    {/* Positions */}

                    <div className="form-group">

                        <label>
                            Number of Positions
                        </label>

                        <input
                            type="number"
                            min="1"
                            placeholder="2"
                            value={position}
                            onChange={(e) =>
                                setPosition(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="create-job-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Job..."
                            : "Create Job"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateJob;