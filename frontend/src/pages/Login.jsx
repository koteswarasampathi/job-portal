import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { getUser } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await API.post("/user/login", {
                email,
                password
            });

            setMessage(
                response.data.message || "Login successful!"
            );

            await getUser();

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Invalid email or password."
            );
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>Welcome Back</h1>

                <p className="login-subtitle">
                    Login to your JobPortal account
                </p>

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

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="login-submit"
                    >
                        Login
                    </button>

                </form>

                <p className="register-link">
                    Don't have an account?
                    {" "}
                    <Link to="/register">
                        Create Account
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;