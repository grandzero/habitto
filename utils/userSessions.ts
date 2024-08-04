// utils/userSessions.ts
interface SessionData {
  state: "idle" | "creatingHabit" | "connectingWallet";
  habits?: string[];
  walletAddress?: string;
}

// In-memory session storage
const sessions: Record<number, SessionData> = {};

export const getSession = async (chatId: number): Promise<SessionData> => {
  return sessions[chatId] || { state: "idle" };
};

export const setSession = async (
  chatId: number,
  data: SessionData
): Promise<void> => {
  sessions[chatId] = data;
};

export const deleteSession = async (chatId: number): Promise<void> => {
  delete sessions[chatId];
};
