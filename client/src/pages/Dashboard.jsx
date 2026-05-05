import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, overdue: 0 });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      {/* Navbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>👋 Welcome, {user?.name}</h1>
        <button onClick={logout} style={{ padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ flex: 1, padding: "1rem", background: "#e0f2fe", borderRadius: "8px", textAlign: "center" }}>
          <h3>{stats.total}</h3>
          <p>Total Tasks</p>
        </div>
        <div style={{ flex: 1, padding: "1rem", background: "#dcfce7", borderRadius: "8px", textAlign: "center" }}>
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>
        <div style={{ flex: 1, padding: "1rem", background: "#fee2e2", borderRadius: "8px", textAlign: "center" }}>
          <h3>{stats.overdue}</h3>
          <p>Overdue</p>
        </div>
      </div>

      {/* Create Project */}
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>Create Project</h2>
        <form onSubmit={createProject}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project Title" required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
          <button type="submit" style={{ padding: "10px 20px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Create
          </button>
        </form>
      </div>

      {/* Projects List */}
      <h2>Your Projects</h2>
      {projects.length === 0 && <p>No projects yet. Create one above!</p>}
      {projects.map((project) => (
        <div key={project.id} style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3>{project.title}</h3>
            <p style={{ color: "#666" }}>{project.description}</p>
            <p style={{ fontSize: "0.8rem", color: "#999" }}>{project.tasks?.length || 0} tasks</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={() => navigate(`/projects/${project.id}`)} style={{ padding: "8px 16px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              View
            </button>
            <button onClick={() => deleteProject(project.id)} style={{ padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;