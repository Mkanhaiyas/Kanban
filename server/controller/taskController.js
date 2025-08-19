import Task from "../models/taskSchema.js";

export const getTaskController = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTaskController = async (req, res) => {
  const { name, description, status, color } = req.body;
  try {
    const lastTask = await Task.findOne({ status }).sort({ order: -1 }).exec();
    const newOrder = lastTask ? lastTask.order + 1 : 1;
    const task = new Task({
      name,
      description,
      status,
      order: newOrder,
      color,
    });
    await task.save();
    res.status(201).json("Task created Successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskController = async (req, res) => {
  const { id } = req.params;
  const { status, order } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { status, order },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTaskController = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json("Task not found");
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json("Task deleted Successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
