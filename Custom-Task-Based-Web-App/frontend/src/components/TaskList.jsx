import React, { useEffect, useState } from "react";
import API from "../api";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addOrUpdateTask = async (taskData) => {
    try {
      if (editing) {
        const res = await API.put(`/tasks/${editing._id}`, taskData);
        setTasks(tasks.map((t) => (t._id === editing._id ? res.data : t)));
        setEditing(null);
      } else {
        const res = await API.post("/tasks", taskData);
        setTasks([...tasks, res.data]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const handleEdit = (task) => {
    setEditing(task);
  };

  const toggleStatus = async (task) => {
    const updatedStatus = task.status === "completed" ? "pending" : "completed";
    const res = await API.put(`/tasks/${task._id}`, {
      ...task,
      status: updatedStatus,
    });
    setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  return (
    <div className="container">
      <h2>📝 Task List</h2>

      <input
        type="text"
        placeholder="Filter tasks..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
      </button>

      <TaskForm onSubmit={addOrUpdateTask} editingTask={editing} />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.status === "completed"}
              onChange={() => toggleStatus(task)}
            />
            <strong>{task.title}</strong>{" "}
            {task.deadline && (
              <span style={{ color: "#888" }}>
  Date: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No deadline set"}
</span>

            )}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
