// pages/api/telegram.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { message, callback_query } = req.body;

    if (message) {
      console.log("Received message:", message);
      // Handle the message (e.g., reply to the user)
      // await handleTelegramMessage(message);
    } else if (callback_query) {
      console.log("Received callback query:", callback_query);
      // Handle the callback query
      // await handleCallbackQuery(callback_query);
    }

    res.status(200).end();
  } else {
    console.log(`Received a non-POST request: ${req.method}`);
    res.status(404).end();
  }
};
