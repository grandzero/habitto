// pages/api/telegram.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { handleTelegramMessage } from "../../utils/handleTelegramMessage";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { message, callback_query } = req.body;
    if (message) {
      await handleTelegramMessage(message);
    } else if (callback_query) {
      // Handle callback queries from inline buttons
    }
    res.status(200).end();
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
