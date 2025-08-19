import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["backlog", "todo", "inprogress", "completed"],
      default: "todo",
    },
    order: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "#F87171",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
