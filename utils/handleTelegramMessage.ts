// utils/handleTelegramMessage.ts
import axios from "axios";
import { getSession, setSession } from "./userSessions";
import { mainMenu, connectWalletInstructions } from "../components/messages";

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

export const handleTelegramMessage = async (message: any) => {
  const chatId = message.chat.id;
  const text = message.text.toLowerCase().trim();
  let session = await getSession(chatId);

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
        const habits = session.habits || [];
        await sendMessage(
          chatId,
          habits.length
            ? `Your habits:\n${habits
                .map((habit, index) => `${index + 1}. ${habit}`)
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
      const habit = text;
      session.habits = session.habits || [];
      session.habits.push(habit);
      await sendMessage(chatId, `Habit "${habit}" added.`);
      session.state = "idle";
      await setSession(chatId, session);
      break;

    case "connectingWallet":
      const walletAddress = text;
      // Simulate wallet connection success
      await sendMessage(chatId, "Wallet connected successfully!");
      session.walletAddress = walletAddress;
      session.state = "idle";
      await setSession(chatId, session);
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
    default:
      await sendMessage(chatId, "Unknown action.");
  }
};
