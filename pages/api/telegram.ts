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
      console.log("Incoming message:", message);
      await handleTelegramMessage(message);
    } else if (callback_query) {
      console.log("Incoming callback query:", callback_query);
      await handleCallbackQuery(callback_query);
    }

    res.status(200).end();
  } else {
    res.status(200).send("Use POST method to interact with this bot.");
  }
};
