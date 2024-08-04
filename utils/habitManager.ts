// utils/habitManager.ts
import { getSession, setSession } from "./userSessions";

export const addHabit = async (chatId: number, habit: string) => {
  const session = (await getSession(chatId)) || { habits: [] };
  if (session.habits.length >= 5) {
    return "You can only track up to 5 habits.";
  }
  session.habits.push(habit);
  await setSession(chatId, session);
  return `Habit "${habit}" added.`;
};

export const removeHabit = async (chatId: number, index: number) => {
  const session = await getSession(chatId);
  if (session && session.habits[index]) {
    session.habits.splice(index, 1);
    await setSession(chatId, session);
    return "Habit removed.";
  }
  return "Habit not found.";
};

export const listHabits = async (chatId: number) => {
  const session = await getSession(chatId);
  return session?.habits || [];
};
