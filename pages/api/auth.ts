// pages/api/auth.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { validateTelegramAuthData } from "../../utils/telegramAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.query;

  if (!validateTelegramAuthData(data)) {
    res.status(401).send("Unauthorized");
    return;
  }

  // Redirect back to the frontend, include user data in URL
  res.redirect(`/habits?${new URLSearchParams(data as any).toString()}`);
};
