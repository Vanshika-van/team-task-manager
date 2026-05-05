import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f1117" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#1a1d27", borderRadius: "16px", padding: "2.5rem", boxShadow: "0 0 40px rgba(34,197,94,0.1)", border: "1px solid #2d2f3e" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem" }}>🔐</div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#22c55e", marginTop: "0.5rem" }}>Welcome Back</h2>
          <p style={{ color: "#6b7280", marginTop: "0.3rem" }}>Login to your account</p>
        </div>
        {error && (
          <div style={{ background: "#2d1b1b", border: "1px solid #ef4444", color: "#ef4444", padding: "0.75rem", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.9rem" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {["email", "password"].map((field) => (
            <div key={field} style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.4rem", color: "#9ca3af", fontSize: "0.85rem", textTransform: "capitalize" }}>{field}</label>
              <input
                name={field}
                type={field === "password" ? "password" : "email"}
                placeholder={`Enter your ${field}`}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.75rem 1rem", background: "#0f1117", border: "1px solid #2d2f3e", borderRadius: "8px", color: "#e2e8f0", outline: "none", fontSize: "0.95rem" }}
              />
            </div>
          ))}
          <button type="submit" style={{ width: "100%", padding: "0.85rem", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "1rem", cursor: "pointer", marginTop: "0.5rem", letterSpacing: "0.5px" }}>
            Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#6b7280", fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#22c55e", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;