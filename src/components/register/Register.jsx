import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from '../../contexts/UserContext';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useUserContext();
    const navigate = useNavigate();

    const { icon } = '/pictures/user-solid-full.svg';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!username || !email || !password || !confirm) {
            setError("All fields are required");
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3030/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, username, icon }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Registration failed");
            }

            const data = await res.json();
            console.log(data);
            login({
                _id: data._id,
                username: data.username,
                accessToken: data.accessToken
            });

            navigate("/"); // redirect to home after registration
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                {error && <p className="error">{error}</p>}

                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

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

                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirm}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                </label>

                <button type="submit" disabled={loading} className="save-button" style={{ width: 'auto' }}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}
