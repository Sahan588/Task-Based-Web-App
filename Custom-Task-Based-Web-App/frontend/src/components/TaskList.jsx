import React, { useEffect, useState } from "react";
import API from "../api";
import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";
import "./TaskList.css"; // 👈 make sure you create this file

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  return (
    <div className="task-container">
      <div className="header">
        <h2>📝 Task Manager</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="🔍 Filter tasks..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
        </button>
      </div>

      <TaskForm onSubmit={addOrUpdateTask} editingTask={editing} />

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-top">
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => toggleStatus(task)}
              />
              <h3 className={task.status === "completed" ? "completed" : ""}>
                {task.title}
              </h3>
            </div>
            {task.deadline && (
              <p className="deadline">
                📅 {new Date(task.deadline).toLocaleDateString()}
              </p>
            )}
            <div className="task-actions">
              <button className="edit-btn" onClick={() => handleEdit(task)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTask(task._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
