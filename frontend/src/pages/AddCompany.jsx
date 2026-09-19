import { useState } from "react";
import API from "../services/api";

function AddCompany() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: ""
    });

    const [logo, setLogo] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("website", formData.website);
            data.append("location", formData.location);

            if (logo) {
                data.append("logo", logo);
            }

            console.log("FORM DATA:");

            for (let pair of data.entries()) {
                console.log(pair[0], pair[1]);
            }
            
            const response = await API.post(
                "/company/register",
                data
            );

            setMessage(response.data.message);

            setFormData({
                name: "",
                description: "",
                website: "",
                location: ""
            });

            setLogo(null);

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Company registration failed"
            );
        }
    };

    return (
        <div className="add-company-page">

            <div className="add-company-card">

                <h2>Add Company</h2>

                <form
                    className="company-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Company Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Company Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="website"
                        placeholder="Company Website"
                        value={formData.website}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Company Location"
                        value={formData.location}
                        onChange={handleChange}
                    />

                    <label className="logo-label">
                        Company Logo
                    </label>

                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => {
                            setLogo(e.target.files[0]);
                        }}
                    />

                    <button
                        type="submit"
                        className="register-company-btn"
                    >
                        Register Company
                    </button>

                </form>

                {message && (
                    <p className="company-message">
                        {message}
                    </p>
                )}

            </div>

        </div>
    );
}

export default AddCompany;