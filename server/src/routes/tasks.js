import express from "express";
import prisma from "../prisma.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create Task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, projectId, assignedToId, dueDate } = req.body;
    const task = await prisma.task.create({
      data: { title, description, projectId, assignedToId, dueDate: dueDate ? new Date(dueDate) : null },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Tasks by Project
router.get("/:projectId", auth, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: req.params.projectId },
      include: { assignedTo: true },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Task Status
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Assign Task
router.patch("/:id/assign", auth, async (req, res) => {
  try {
    const { assignedToId } = req.body;
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { assignedToId },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;