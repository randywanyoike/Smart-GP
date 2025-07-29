import { formatDistanceToNowStrict, isPast, differenceInDays } from "date-fns";

export const getDaysLeft = (deadline) => {
  return differenceInDays(new Date(deadline), new Date());
};

export const isGoalOverdue = (goal) => {
  return isPast(new Date(goal.deadline)) && goal.savedAmount < goal.targetAmount;
};

export const isGoalInWarning = (goal) => {
  const daysLeft = getDaysLeft(goal.deadline);
  return daysLeft <= 30 && !isGoalOverdue(goal) && goal.savedAmount < goal.targetAmount;
};

export const formatDeadlineDistance = (deadline) => {
  return formatDistanceToNowStrict(new Date(deadline), { addSuffix: true });
};
