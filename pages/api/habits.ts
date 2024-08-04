// pages/api/habits.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../utils/userSessions";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { chatId } = req.query;

    if (!chatId) {
      return res
        .status(400)
        .json({ error: "chatId query parameter is required." });
    }

    const session = await getSession(Number(chatId));
    const habits = session.habits || [];

    return res.status(200).json({ habits });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
