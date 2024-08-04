// pages/api/telegram.ts

import type { NextApiRequest, NextApiResponse } from "next";
import {
  handleTelegramMessage,
  handleCallbackQuery,
} from "../../utils/handleTelegramMessage";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { message, callback_query } = req.body;

    if (message) {
      const text = message.text.toLowerCase();

      // Handling /start and /connect commands explicitly
      switch (text) {
        case "/start":
          await handleTelegramMessage(message, "start");
          break;
        case "/connect":
          await handleTelegramMessage(message, "connect");
          break;
        default:
          await handleTelegramMessage(message);
          break;
      }
    } else if (callback_query) {
      // Handle callback queries from inline buttons
      await handleCallbackQuery(callback_query);
    }

    res.status(200).end();
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
