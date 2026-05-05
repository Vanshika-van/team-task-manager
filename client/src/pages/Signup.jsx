import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "2rem", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;