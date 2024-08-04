// utils/habitManager.ts
import { getSession, setSession } from "./userSessions";

export const addHabit = async (
  chatId: number,
  habit: string
): Promise<string> => {
  const session = await getSession(chatId);
  session.habits = session.habits || [];

  if (session.habits.length >= 5) {
    return "You can only track up to 5 habits.";
  }

  session.habits.push(habit);
  await setSession(chatId, session);
  return `Habit "${habit}" added successfully.`;
};

export const listHabits = async (chatId: number): Promise<string[]> => {
  const session = await getSession(chatId);
  return session.habits || [];
};

export const removeHabit = async (
  chatId: number,
  index: number
): Promise<string> => {
  const session = await getSession(chatId);

  if (!session.habits || session.habits.length === 0) {
    return "You have no habits to remove.";
  }

  if (index < 0 || index >= session.habits.length) {
    return "Invalid habit index.";
  }

  const removedHabit = session.habits.splice(index, 1);
  await setSession(chatId, session);
  return `Habit "${removedHabit}" removed successfully.`;
};
