import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

function TaskModel({ setIsOpen, getTask }) {
  const modalRef = useRef();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({
    name: "",
    description: "",
    status: "todo",
    color: "#DA3A3A",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInput = (e) => {
    setTask((prevTask) => ({ ...prevTask, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/tasks`, task);
      if (response) setLoading(false);
      setIsOpen(false);
      getTask();
      toast.success("Task created Successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Error creating task");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
      <div className="fixed inset-0 flex items-center justify-center z-50 px-2 sm:px-4">
        <div
          ref={modalRef}
          className="bg-white text-black w-full max-w-sm sm:max-w-md lg:max-w-xl rounded-2xl shadow-2xl p-5 sm:p-8 relative"
        >
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-black text-3xl sm:text-4xl"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>

          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
            Create Task
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="name"
                type="text"
                placeholder="Task title..."
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-black text-sm sm:text-base"
                onChange={handleInput}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Add details..."
                rows="3"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-black text-sm sm:text-base"
                onChange={handleInput}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-black text-sm sm:text-base"
                onChange={handleInput}
              >
                <option value="todo">To Do</option>
                <option value="backlog">Backlog</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex gap-3 flex-wrap">
              {["#DA3A3A", "#7678D1", "#00B294", "#C94AAB", "#3F88E4"].map(
                (c) => (
                  <button
                    name="color"
                    key={c}
                    type="button"
                    onClick={() =>
                      setTask((prevTask) => ({ ...prevTask, color: c }))
                    }
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border ${
                      task.color === c ? "ring-2 ring-offset-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: c }}
                  />
                )
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 mt-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors text-sm sm:text-base"
            >
              {loading ? <Loading /> : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TaskModel;
