import React, { useState } from "react";
import { updateGoal } from "../services/api";

export default function DepositForm({ goals, onDepositMade }) {
  const [goalId, setGoalId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedGoal = goals.find((g) => g.id === goalId);
    if (!selectedGoal) return;

    const newAmount = selectedGoal.savedAmount + parseFloat(amount);

    await updateGoal(goalId, { savedAmount: newAmount });
    setMessage(`Deposited $${amount} to "${selectedGoal.name}"`);
    setGoalId("");
    setAmount("");
    onDepositMade();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-white">
      <h2 className="text-lg font-semibold mb-2">Make a Deposit</h2>
      <div className="flex flex-col gap-2">
        <select
          value={goalId}
          onChange={(e) => setGoalId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Goal</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Deposit
        </button>
        {message && <p className="text-green-600 text-sm">{message}</p>}
      </div>
    </form>
  );
}
