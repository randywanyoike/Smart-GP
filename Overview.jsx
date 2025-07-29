import React from "react";
import { differenceInDays, isPast } from "date-fns";

export default function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter((g) => g.savedAmount >= g.targetAmount);
  const now = new Date();

  return (
    <div className="mb-6 p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Completed Goals: {completedGoals.length}</p>
      <ul className="mt-2 list-disc list-inside">
        {goals.map((g) => {
          const deadline = new Date(g.deadline);
          const daysLeft = differenceInDays(deadline, now);
          const overdue = isPast(deadline) && g.savedAmount < g.targetAmount;
          const warning = daysLeft <= 30 && !overdue && g.savedAmount < g.targetAmount;

          return (
            <li key={g.id} className={overdue ? "text-red-600" : warning ? "text-orange-600" : ""}>
              {g.name} – {overdue ? "Overdue" : warning ? `${daysLeft} days left` : `${daysLeft} days left`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
