import { useState } from "react";
import { postRequest } from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import "../../styles/loginsignup.css";

export default function Login() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.identifier || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await postRequest("/auth/login", {
        identifier: form.identifier,
        password: form.password,
      });

      navigate("/adminDashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">Login</h2>

        {error && <p className="error">{error}</p>}

      <div className="login-input">
        <div className="input-group">
          <label>User ID or Email</label>
          <input
            type="text"
            name="identifier"
            placeholder="Enter your ID or email"
            value={form.identifier}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

        <button type="submit" disabled={loading} className="button">
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="signup-redirect">
          <p>
            <span
              onClick={() => navigate("/signupPage")}
              style={{ cursor: "pointer" }}
            >
              Sign up Page
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}