import React, { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, editingTask }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      // deadline date to yyyy-mm-dd format for input value
      setDeadline(editingTask.deadline ? editingTask.deadline.substring(0, 10) : "");
    } else {
      setTitle("");
      setDeadline("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, deadline });  // Pass both title and deadline to parent
    setTitle("");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
