import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from '../../contexts/UserContext';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3030/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Login failed");
            }

            const data = await res.json();

            login({
                _id: data._id,
                username: data.username,
                accessToken: data.accessToken
            });

            navigate("/"); // redirect to home after login
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                {error && <p className="error">{error}</p>}

                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button type="submit" disabled={loading} className="save-button" style={{ width: 'auto' }}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
