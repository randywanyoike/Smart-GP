import React from "react";
import GoalCard from "./GoalCard";

export default function GoalList({ goals, onUpdate }) {
  return (
    <div className="mt-6 grid gap-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onUpdate={onUpdate} />
      ))}
    </div>
  );
}