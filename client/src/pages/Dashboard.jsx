import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, overdue: 0 });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await API.post("/projects", { title, description });
      setTitle("");
      setDescription("");
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e2e8f0" }}>
      {/* Navbar */}
      <div style={{ background: "#1a1d27", borderBottom: "1px solid #2d2f3e", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.5rem" }}>🚀</span>
          <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#22c55e" }}>TeamTask</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "#9ca3af" }}>👋 {user?.name}</span>
          <button onClick={logout} style={{ padding: "0.5rem 1rem", background: "transparent", color: "#ef4444", border: "1px solid #ef4444", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Tasks", value: stats.total, icon: "📋", color: "#3b82f6" },
            { label: "Completed", value: stats.completed, icon: "✅", color: "#22c55e" },
            { label: "Overdue", value: stats.overdue, icon: "⚠️", color: "#ef4444" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#1a1d27", border: "1px solid #2d2f3e", borderRadius: "12px", padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: stat.color, margin: "0.5rem 0" }}>{stat.value}</div>
              <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "700" }}>Your Projects</h2>
          <button onClick={() => setShowForm(!showForm)} style={{ padding: "0.6rem 1.2rem", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
            {showForm ? "Cancel" : "+ New Project"}
          </button>
        </div>

        {/* Create Project Form */}
        {showForm && (
          <div style={{ background: "#1a1d27", border: "1px solid #22c55e", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ marginBottom: "1rem", color: "#22c55e" }}>New Project</h3>
            <form onSubmit={createProject}>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project Title" required
                style={{ width: "100%", padding: "0.75rem", background: "#0f1117", border: "1px solid #2d2f3e", borderRadius: "8px", color: "#e2e8f0", marginBottom: "0.75rem", fontSize: "0.95rem" }} />
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)"
                style={{ width: "100%", padding: "0.75rem", background: "#0f1117", border: "1px solid #2d2f3e", borderRadius: "8px", color: "#e2e8f0", marginBottom: "0.75rem", fontSize: "0.95rem" }} />
              <button type="submit" style={{ padding: "0.75rem 1.5rem", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                Create Project
              </button>
            </form>
          </div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📂</div>
            <p>No projects yet. Create your first project!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {projects.map((project) => (
              <div key={project.id} style={{ background: "#1a1d27", border: "1px solid #2d2f3e", borderRadius: "12px", padding: "1.5rem", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#22c55e"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#2d2f3e"}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>📁</div>
                <h3 style={{ fontWeight: "700", marginBottom: "0.5rem" }}>{project.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "1rem" }}>{project.description || "No description"}</p>
                <p style={{ color: "#22c55e", fontSize: "0.85rem", marginBottom: "1rem" }}>{project.tasks?.length || 0} tasks</p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => navigate(`/projects/${project.id}`)}
                    style={{ flex: 1, padding: "0.6rem", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                    View
                  </button>
                  <button onClick={() => deleteProject(project.id)}
                    style={{ padding: "0.6rem 0.8rem", background: "transparent", color: "#ef4444", border: "1px solid #ef4444", borderRadius: "8px", cursor: "pointer" }}>
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;