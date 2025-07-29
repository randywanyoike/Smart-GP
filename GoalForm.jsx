import React, { useState } from "react";
import { addGoal } from "../services/api";

export default function GoalForm({ onGoalCreated }) {
  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGoal = {
      ...form,
      targetAmount: parseFloat(form.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split("T")[0]
    };
    await addGoal(newGoal);
    setForm({ name: "", targetAmount: "", category: "", deadline: "" });
    onGoalCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-white">
      <h2 className="text-lg font-semibold mb-2">Add New Goal</h2>
      <div className="grid gap-2">
        <input
          type="text"
          name="name"
          placeholder="Goal Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="targetAmount"
          placeholder="Target Amount"
          value={form.targetAmount}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">
          Add Goal
        </button>
      </div>
    </form>
  );
}
