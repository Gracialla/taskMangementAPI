import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { protectedAction } from "../middleware/protected.js";

const router = express.Router();

router.use(protectedAction); // protect all task routes

router.post("/", protectedAction, createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id",protectedAction, updateTask);
router.delete("/:id", deleteTask);

export default router;
