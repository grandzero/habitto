// utils/telegramAuth.ts
import crypto from "crypto";

export const validateTelegramAuthData = (data: any): boolean => {
  const secret = crypto
    .createHash("sha256")
    .update(process.env.TELEGRAM_BOT_TOKEN!)
    .digest();
  const checkString = Object.keys(data)
    .filter((key) => key !== "hash")
    .map((key) => `${key}=${data[key]}`)
    .sort()
    .join("\n");
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(checkString)
    .digest("hex");

  return hmac === data.hash;
};
