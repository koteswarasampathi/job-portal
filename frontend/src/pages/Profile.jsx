import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = "https://job-portal-x61w.onrender.com";

const getPhotoUrl = (photo) => {
    if (!photo) return "";

    if (photo.startsWith("http")) {
        return photo;
    }

    return `${BACKEND_URL}${photo.startsWith("/") ? photo : `/${photo}`}`;
};

function Profile() {
    const { user, getUser } = useAuth();

    const [fullname, setFullname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState("");

    const [resume, setResume] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const [photoPreview, setPhotoPreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Backend URL
    const BACKEND_URL = "http://localhost:9000";

    // Load user information
    useEffect(() => {
        if (user) {
            setFullname(user.fullname || "");
            setPhoneNumber(user.phoneNumber || "");
            setBio(user.profile?.bio || "");

            setSkills(
                user.profile?.skills?.join(", ") || ""
            );
        }
    }, [user]);

    // Create profile photo URL
    const getPhotoUrl = (photo) => {
        if (!photo) {
            return "";
        }

        if (photo.startsWith("http")) {
            return photo;
        }

        return `${BACKEND_URL}${photo.startsWith("/") ? photo : `/${photo}`}`;
    };

    // Select profile photo
    const handlePhotoSelect = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        setProfilePhoto(file);

        // Preview selected image
        const previewUrl = URL.createObjectURL(file);
        setPhotoPreview(previewUrl);
    };

    // Update profile
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");
            setError("");

            const skillsArray = skills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill !== "");

            const response = await API.put(
                "/user/profile/update",
                {
                    fullname,
                    phoneNumber,
                    bio,
                    skills: skillsArray
                }
            );

            setMessage(
                response.data.message ||
                "Profile updated successfully!"
            );

            await getUser();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update profile."
            );
        } finally {
            setLoading(false);
        }
    };

    // Upload resume
    const handleResumeUpload = async () => {
        if (!resume) {
            setError("Please select a resume first.");
            return;
        }

        try {
            setUploadingResume(true);
            setMessage("");
            setError("");

            const formData = new FormData();

            formData.append("resume", resume);

            const response = await API.post(
                "/user/resume",
                formData
            );

            setMessage(
                response.data.message ||
                "Resume uploaded successfully!"
            );

            setResume(null);

            await getUser();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to upload resume."
            );
        } finally {
            setUploadingResume(false);
        }
    };

    // Upload profile photo
    const handlePhotoUpload = async () => {
        if (!profilePhoto) {
            setError("Please select a profile photo first.");
            return;
        }

        try {
            setUploadingPhoto(true);
            setMessage("");
            setError("");

            const formData = new FormData();

            formData.append(
                "profilePhoto",
                profilePhoto
            );

            const response = await API.post(
                "/user/profile-photo",
                formData
            );

            setMessage(
                response.data.message ||
                "Profile photo uploaded successfully!"
            );

            setProfilePhoto(null);
            setPhotoPreview("");

            // Get updated user including new photo
            await getUser();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to upload profile photo."
            );
        } finally {
            setUploadingPhoto(false);
        }
    };

    return (
        <div className="profile-page">

            <div className="profile-container">

                <h1>My Profile</h1>

                <p className="profile-subtitle">
                    Manage your personal information and documents.
                </p>

                {/* Messages */}

                {message && (
                    <div className="profile-success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="profile-error">
                        {error}
                    </div>
                )}

                <div className="profile-grid">

                    {/* Profile Information */}

                    <div className="profile-card">

                        <h2>Profile Information</h2>

                        <form onSubmit={handleUpdateProfile}>

                            <div className="profile-field">

                                <label>Full Name</label>

                                <input
                                    type="text"
                                    value={fullname}
                                    onChange={(e) =>
                                        setFullname(e.target.value)
                                    }
                                    placeholder="Enter your full name"
                                />

                            </div>

                            <div className="profile-field">

                                <label>Email</label>

                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                />

                                <small>
                                    Email cannot be changed.
                                </small>

                            </div>

                            <div className="profile-field">

                                <label>Phone Number</label>

                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    placeholder="Enter phone number"
                                />

                            </div>

                            <div className="profile-field">

                                <label>Bio</label>

                                <textarea
                                    value={bio}
                                    onChange={(e) =>
                                        setBio(e.target.value)
                                    }
                                    placeholder="Tell us about yourself"
                                    rows="5"
                                />

                            </div>

                            <div className="profile-field">

                                <label>Skills</label>

                                <input
                                    type="text"
                                    value={skills}
                                    onChange={(e) =>
                                        setSkills(e.target.value)
                                    }
                                    placeholder="Python, React, MongoDB"
                                />

                                <small>
                                    Separate skills using commas.
                                </small>

                            </div>

                            <button
                                type="submit"
                                className="save-profile-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                        </form>

                    </div>


                    {/* Profile Photo */}

                    <div className="profile-card">
                        <h2>Profile Photo</h2>

                        <div className="profile-photo-section">

                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Selected profile"
                                    className="profile-image"
                                />
                            ) : user?.profile?.profilePhoto ? (
                                <img
                                    src={getPhotoUrl(user.profile.profilePhoto)}
                                    alt="Profile"
                                    className="profile-image"
                                />
                            ) : (
                                <div className="profile-placeholder">
                                    👤
                                </div>
                            )}

                            <p>Upload a professional profile photo.</p>
                        </div>

                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handlePhotoSelect}
                        />

                        {profilePhoto && (
                            <p className="selected-file">
                                Selected: {profilePhoto.name}
                            </p>
                        )}

                        <button
                            type="button"
                            className="upload-button"
                            onClick={handlePhotoUpload}
                            disabled={uploadingPhoto}
                        >
                            {uploadingPhoto ? "Uploading..." : "Upload Photo"}
                        </button>
                    </div>

                    {/* Resume */}

                    <div className="profile-card resume-card">

                        <h2>Resume</h2>

                        <div className="resume-info">

                            <div className="resume-icon">
                                📄
                            </div>

                            <div>

                                <h3>
                                    {user?.profile?.resumeOriginalName ||
                                        "No resume uploaded"}
                                </h3>

                                {user?.profile?.resume && (
                                    <p>
                                        Resume uploaded
                                    </p>
                                )}

                            </div>

                        </div>

                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) =>
                                setResume(e.target.files[0])
                            }
                        />

                        {resume && (
                            <p className="selected-file">
                                Selected: {resume.name}
                            </p>
                        )}

                        <button
                            type="button"
                            className="upload-button"
                            onClick={handleResumeUpload}
                            disabled={uploadingResume}
                        >
                            {uploadingResume
                                ? "Uploading..."
                                : "Upload Resume"}
                        </button>

                    </div>


                    {/* Account Information */}

                    <div className="profile-card account-card">

                        <h2>Account Information</h2>

                        <div className="account-row">
                            <span>Role</span>

                            <strong>
                                {user?.role || "Student"}
                            </strong>
                        </div>

                        <div className="account-row">
                            <span>Account Email</span>

                            <strong>
                                {user?.email}
                            </strong>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;