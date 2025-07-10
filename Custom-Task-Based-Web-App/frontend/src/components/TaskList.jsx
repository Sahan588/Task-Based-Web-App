import React, { useEffect, useState } from "react";
import API from "../api";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // or "desc"

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

  const addOrUpdateTask = async (title) => {
    if (editing) {
      const res = await API.put(`/tasks/${editing._id}`, { title });
      setTasks(tasks.map((t) => (t._id === editing._id ? res.data : t)));
      setEditing(null);
    } else {
      const res = await API.post("/tasks", { title });
      setTasks([...tasks, res.data]);
    }
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const handleEdit = (task) => {
    setEditing(task);
  };

  //  Filter and Sort
  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  return (
    <div className="container">
      <h2>Task List</h2>

      {/* Filter Input */}
      <input
        type="text"
        placeholder="Filter tasks..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      {/*  Sort Button */}
      <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
      </button>

      <TaskForm onSubmit={addOrUpdateTask} editingTask={editing} />

      {/*  Render Filtered and Sorted Tasks */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => handleEdit(task)}>✏️</button>
            <button onClick={() => deleteTask(task._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
