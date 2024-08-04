// utils/userSessions.ts
import redisClient from "./redisClient";

const getSessionKey = (chatId: number) => `session:${chatId}`;

export const getSession = async (chatId: number) => {
  const data = await redisClient.get(getSessionKey(chatId));
  return data ? JSON.parse(data) : null;
};

export const setSession = async (chatId: number, data: object) => {
  await redisClient.set(getSessionKey(chatId), JSON.stringify(data));
};

export const deleteSession = async (chatId: number) => {
  await redisClient.del(getSessionKey(chatId));
};
