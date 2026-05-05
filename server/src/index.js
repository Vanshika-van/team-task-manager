import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js"
import taskRoutes from "./routes/tasks.js";
import auth from "./middleware/auth.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/api/dashboard", auth, async (req, res) => {
  try {
    const { PrismaClient } = await import("@prisma/client");
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

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});