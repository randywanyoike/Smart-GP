import React from "react";
import { deleteGoal, updateGoal } from "../services/api";
import { formatDistanceToNowStrict, isPast, differenceInDays } from "date-fns";

export default function GoalCard({ goal, onUpdate }) {
  const {
    id,
    name,
    targetAmount,
    savedAmount,
    category,
    deadline,
    createdAt,
  } = goal;

  const progress = Math.min((savedAmount / targetAmount) * 100, 100);
  const remaining = targetAmount - savedAmount;
  const daysLeft = differenceInDays(new Date(deadline), new Date());
  const overdue = isPast(new Date(deadline)) && savedAmount < targetAmount;
  const completed = savedAmount >= targetAmount;

  const handleDelete = async () => {
    if (window.confirm("Delete this goal?")) {
      await deleteGoal(id);
      onUpdate();
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{name}</h2>
        <button
          className="text-red-600 hover:underline"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      <p className="text-sm text-gray-500">Category: {category}</p>
      <p className="text-sm text-gray-500">
        Deadline: {new Date(deadline).toLocaleDateString()} ({
          overdue
            ? "Overdue"
            : daysLeft <= 30 && !completed
            ? `⚠️ ${daysLeft} days left`
            : `${daysLeft} days left`
        })
      </p>

      <div className="mt-2">
        <progress
          className="w-full h-4"
          value={progress}
          max="100"
        ></progress>
        <p>
          ${savedAmount} saved / ${targetAmount} target
          <br />
          ${remaining} remaining
        </p>
      </div>
    </div>
  );
}
