import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";
import prisma from "./prisma.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  credentials: false
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api/dashboard", async (req, res) => {
  try {
    const total = await prisma.task.count();
    const completed = await prisma.task.count({ where: { status: "DONE" } });
    const overdue = await prisma.task.count({
      where: { dueDate: { lt: new Date() }, status: { not: "DONE" } },
    });
    res.json({ total, completed, overdue });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});