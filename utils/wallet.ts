// utils/wallet.ts
import axios from "axios";

const TON_API_URL = process.env.TON_API_URL;

export const connectWallet = async (walletAddress: string) => {
  // Logic to validate and connect the wallet address
  // Additional logic as needed
};

export const getTokenBalance = async (walletAddress: string) => {
  const response = await axios.get(
    `${TON_API_URL}/getBalance?address=${walletAddress}`
  );
  return response.data.balance;
};

export const transferTokens = async (
  fromAddress: string,
  toAddress: string,
  amount: number
) => {
  const response = await axios.post(`${TON_API_URL}/transfer`, {
    fromAddress,
    toAddress,
    amount,
  });
  return response.data;
};
