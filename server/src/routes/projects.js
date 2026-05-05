import express from "express";
import prisma from "../prisma.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create Project
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const project = await prisma.project.create({
      data: { title, description, ownerId: req.user.id },
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Projects
router.get("/", auth, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: req.user.id },
      include: { tasks: true },
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Project
router.delete("/:id", auth, async (req, res) => {
  try {
    await prisma.task.deleteMany({ where: { projectId: req.params.id } });
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;