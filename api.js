const BASE_URL = "http://localhost:3001/goals";

export const getGoals = async () => fetch(BASE_URL).then(res => res.json());
export const addGoal = async (goal) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });

export const updateGoal = async (id, updates) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

export const deleteGoal = async (id) =>
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
