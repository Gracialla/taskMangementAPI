import Task from "../models/task.model.js";

// Create task
export const createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      userId: req.user.id, // user comes from auth middleware
    });

    res.status(201).json({ status: true, data: task });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Get all tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json({ status: true, data: tasks });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Get single task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ status: true, data: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    console.log("Updating task with ID:", req.params.id);
    console.log("User  ID:", req.user.id);

    const [updated] = await Task.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Task.findByPk(req.params.id);
    res.json({ status: true, data: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ status: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
