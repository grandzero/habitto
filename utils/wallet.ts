// utils/wallet.ts
import axios from "axios";

const TON_API_URL = process.env.TON_API_URL;

interface WalletConnectResponse {
  success: boolean;
  message?: string;
}

export const connectWallet = async (
  walletAddress: string
): Promise<WalletConnectResponse> => {
  try {
    // Example check to validate wallet address
    if (!walletAddress || !walletAddress.startsWith("EQ")) {
      return { success: false, message: "Invalid wallet address format." };
    }

    // Simulate an API call to validate the wallet
    const response = await axios.get(
      `${TON_API_URL}/validateWallet?address=${walletAddress}`
    );

    if (response.data.isValid) {
      // Wallet is valid
      return { success: true };
    } else {
      // Wallet is invalid
      return {
        success: false,
        message: "The provided wallet address is invalid.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to connect to the wallet. Please try again later.",
    };
  }
};
