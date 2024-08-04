// utils/handleTelegramMessage.ts
import axios from "axios";
import { addHabit, listHabits, removeHabit } from "./habitManager";
import { connectWallet, getTokenBalance, transferTokens } from "./wallet";
import { getSession, setSession } from "./userSessions";
import { mainMenu, viewProgress } from "../components/messages";

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

const sendMessage = async (chatId: number, text: string, options?: object) => {
  await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
    chat_id: chatId,
    text,
    ...options,
  });
};

export const handleTelegramMessage = async (message: any) => {
  const chatId = message.chat.id;
  const text = message.text;
  const session = (await getSession(chatId)) || { state: "idle" };

  switch (session.state) {
    case "idle":
      if (text === "/start") {
        await sendMessage(chatId, mainMenu.text, {
          reply_markup: { inline_keyboard: mainMenu.options },
        });
      } else if (text === "/newhabit") {
        session.state = "creatingHabit";
        await setSession(chatId, session);
        await sendMessage(chatId, "Please describe your new habit:");
      } else if (text === "/listhabits") {
        const habits = await listHabits(chatId);
        await sendMessage(
          chatId,
          habits.length
            ? `Your habits:\n${habits.join("\n")}`
            : "You have no habits."
        );
      }
      break;

    case "creatingHabit":
      const addHabitResponse = await addHabit(chatId, text);
      await sendMessage(chatId, addHabitResponse);
      session.state = "idle";
      await setSession(chatId, session);
      break;

    // Additional cases for other states and commands

    default:
      await sendMessage(chatId, "Unrecognized command.");
  }
};
