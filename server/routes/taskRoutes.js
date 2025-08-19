import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getTaskController,
  updateTaskController,
} from "../controller/taskController.js";

const router = Router();

router.get("/tasks", getTaskController);
router.post("/tasks", createTaskController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;
