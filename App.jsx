
import React, { useEffect, useState } from "react";
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";
import { getGoals } from "./services/api";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
      setError(null);
    } catch (err) {
      setError("Failed to load goals. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Smart Goal Planner</h1>
      {error && <p className="text-red-600">{error}</p>}
      {loading ? (
        <p>Loading goals...</p>
      ) : (
        <>
          <Overview goals={goals} />
          <GoalForm onGoalCreated={loadGoals} />
          <DepositForm goals={goals} onDepositMade={loadGoals} />
          <GoalList goals={goals} onUpdate={loadGoals} />
        </>
      )}
    </div>
  );
}
