import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { ...form, projectId: id });
      setForm({ title: "", description: "", dueDate: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await API.patch(`/tasks/${taskId}/status`, { status });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    if (status === "TODO") return "#fef9c3";
    if (status === "IN_PROGRESS") return "#dbeafe";
    if (status === "DONE") return "#dcfce7";
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom: "1rem", padding: "8px 16px", background: "#6b7280", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        ← Back to Dashboard
      </button>

      <h2>Project Tasks</h2>

      {/* Create Task Form */}
      <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "2rem" }}>
        <h3>Add Task</h3>
        <form onSubmit={createTask}>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Task Title" required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description (optional)"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
          <input value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} type="date"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
          <button type="submit" style={{ padding: "10px 20px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Add Task
          </button>
        </form>
      </div>

      {/* Tasks List */}
      {tasks.length === 0 && <p>No tasks yet. Add one above!</p>}
      {tasks.map((task) => (
        <div key={task.id} style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem", background: getStatusColor(task.status) }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3>{task.title}</h3>
              <p style={{ color: "#666" }}>{task.description}</p>
              {task.dueDate && <p style={{ fontSize: "0.8rem" }}>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <select value={task.status} onChange={(e) => updateStatus(task.id, e.target.value)}
                style={{ padding: "6px", borderRadius: "6px" }}>
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
              <button onClick={() => deleteTask(task.id)} style={{ padding: "6px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectDetail;