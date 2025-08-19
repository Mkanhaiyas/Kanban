import { useState, useEffect } from "react";
import axios from "axios";
import TaskModel from "../models/TaskModel";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

function Kanban() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const columns = {
    backlog: "Backlog",
    todo: "To Do",
    inprogress: "In Progress",
    completed: "Completed",
  };

  const getTask = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.log(`Failed to fetch task: ${error.message}`);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const getTasksByStatus = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .sort((a, b) => a.order - b.order);
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const activeTask = tasks.find((t) => t._id === draggableId);
    if (!activeTask) return;

    const newStatus = destination.droppableId;

    const updatedColumnTasks = tasks
      .filter((t) => t.status === newStatus && t._id !== activeTask._id)
      .sort((a, b) => a.order - b.order);

    updatedColumnTasks.splice(destination.index, 0, {
      ...activeTask,
      status: newStatus,
    });

    updatedColumnTasks.forEach((task, index) => {
      task.order = index + 1;
    });

    const otherTasks = tasks.filter(
      (t) => t._id !== activeTask._id && t.status !== newStatus
    );

    setTasks([...otherTasks, ...updatedColumnTasks]);

    await Promise.all(
      updatedColumnTasks.map((task) =>
        axios.put(`${API_URL}/api/${task._id}`, {
          status: task.status,
          order: task.order,
        })
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success(`Deleted task successfully`);
    } catch (error) {
      toast.error(`Error deleting task`);
    }
  };

  return (
    <>
      <div className="bg-black py-6 px-4 md:px-10 lg:px-24 text-white min-h-screen overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-14 gap-4">
          <h1 className="text-3xl md:text-5xl font-semibold">Kanban Board</h1>
          <button
            className="border rounded-md px-4 h-9 bg-white text-black text-sm font-medium hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Create Task
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.keys(columns).map((col) => (
              <ColumnDropZone
                key={col}
                id={col}
                label={columns[col]}
                tasks={getTasksByStatus(col)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
      {isOpen && <TaskModel setIsOpen={setIsOpen} getTask={getTask} />}
    </>
  );
}

export default Kanban;

function ColumnDropZone({ id, tasks, label, onDelete }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-neutral-800 p-5 rounded-2xl min-h-[12rem] flex flex-col"
        >
          <h2 className="text-xl md:text-2xl mb-3">{label}</h2>
          {tasks.map((task, index) => (
            <SortableTask
              key={task._id}
              task={task}
              index={index}
              onDelete={onDelete}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function SortableTask({ task, index, onDelete }) {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: task.color || "#DA3A3A",
          }}
          className={`relative pt-3 pb-4 px-5 rounded-xl mt-4 text-black shadow cursor-grab ${
            snapshot.isDragging ? "opacity-80" : ""
          }`}
        >
          <button
            className="absolute top-1 right-3 text-black hover:text-gray-700 text-xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task._id);
            }}
          >
            &times;
          </button>
          <h3 className="text-md font-semibold">{task.name}</h3>
          <p className="text-sm text-gray-900 mt-1">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
}
