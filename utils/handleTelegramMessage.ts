// utils/handleTelegramMessage.ts
import axios from "axios";
import { addHabit, listHabits } from "./habitManager";
import { connectWallet } from "./wallet";
import { getSession, setSession } from "./userSessions";
import {
  mainMenu,
  connectWalletInstructions,
  viewProgress,
} from "../components/messages";

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

const sendMessage = async (
  chatId: number,
  text: string,
  options: object = {}
) => {
  await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
    chat_id: chatId,
    text,
    ...options,
  });
};

export const handleTelegramMessage = async (message: any, command?: string) => {
  const chatId = message.chat.id;
  const text = command ? command : message.text;
  let session = (await getSession(chatId)) || { state: "idle" };

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
            ? `Your habits:\n${habits
                .map((habit: any, index: number) => `${index + 1}. ${habit}`)
                .join("\n")}`
            : "You have no habits."
        );
      } else if (text === "/connect") {
        session.state = "connectingWallet";
        await setSession(chatId, session);
        await sendMessage(chatId, connectWalletInstructions.text);
      } else {
        await sendMessage(
          chatId,
          "Unrecognized command. Please use /start to see available options."
        );
      }
      break;

    case "creatingHabit":
      const addHabitResponse = await addHabit(chatId, text);
      await sendMessage(chatId, addHabitResponse);
      session.state = "idle";
      await setSession(chatId, session);
      break;

    case "connectingWallet":
      const walletAddress = text;
      const connectWalletResponse = await connectWallet(walletAddress);
      if (connectWalletResponse.success) {
        await sendMessage(chatId, "Wallet connected successfully!");
        session = { ...session, state: "idle", walletAddress };
        await setSession(chatId, session);
      } else {
        await sendMessage(chatId, `Error: ${connectWalletResponse.message}`);
        session.state = "idle";
        await setSession(chatId, session);
      }
      break;

    default:
      await sendMessage(
        chatId,
        "Unrecognized command or invalid state. Please use /start."
      );
      session.state = "idle";
      await setSession(chatId, session);
  }
};

export const handleCallbackQuery = async (callbackQuery: any) => {
  const { data, message } = callbackQuery;
  const chatId = message.chat.id;

  // Handle the callback data from the inline keyboards
  switch (data) {
    case "create_habit":
      await handleTelegramMessage({ chat: { id: chatId }, text: "/newhabit" });
      break;
    case "view_habits":
      await handleTelegramMessage({
        chat: { id: chatId },
        text: "/listhabits",
      });
      break;
    case "connect_wallet":
      await handleTelegramMessage({ chat: { id: chatId }, text: "/connect" });
      break;
    case "view_progress":
      await sendMessage(chatId, viewProgress.text, {
        reply_markup: { inline_keyboard: viewProgress.options },
      });
      break;
    default:
      await sendMessage(chatId, "Unknown action.");
  }
};
