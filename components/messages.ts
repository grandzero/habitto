// components/messages.ts
import { InlineKeyboardButton } from "node-telegram-bot-api";

// Main Menu Message
export const mainMenu = {
  text: "Welcome to the Habit Tracking Bot! Please choose an option:",
  options: [
    [{ text: "Create Habit", callback_data: "create_habit" }],
    [{ text: "View Habits", callback_data: "view_habits" }],
    [{ text: "Connect Wallet", callback_data: "connect_wallet" }],
    [{ text: "View Progress", callback_data: "view_progress" }],
  ] as InlineKeyboardButton[][],
};

// Create Habit Instructions
export const createHabitInstructions = {
  text: "Please describe the new habit you want to create.",
};

// View Habits Message
export const viewHabits = (habits: string[]) => ({
  text: habits.length
    ? `Your current habits:\n${habits
        .map((habit, index) => `${index + 1}. ${habit}`)
        .join("\n")}`
    : 'You have no habits currently. Use the "Create Habit" option to add one.',
  options: [
    [{ text: "Back to Main Menu", callback_data: "main_menu" }],
  ] as InlineKeyboardButton[][],
});

// Habit Created Message
export const habitCreated = (habit: string) => ({
  text: `Habit "${habit}" has been created successfully!`,
  options: [
    [{ text: "Create Another Habit", callback_data: "create_habit" }],
    [{ text: "View Habits", callback_data: "view_habits" }],
    [{ text: "Back to Main Menu", callback_data: "main_menu" }],
  ] as InlineKeyboardButton[][],
});

// Connect Wallet Instructions
export const connectWalletInstructions = {
  text: "Please enter your TON wallet address to connect it with your account.",
};

// Wallet Connected Message
export const walletConnected = {
  text: "Your wallet has been successfully connected!",
  options: [
    [{ text: "View Balance", callback_data: "view_balance" }],
    [{ text: "Back to Main Menu", callback_data: "main_menu" }],
  ] as InlineKeyboardButton[][],
};

// View Progress Message
export const viewProgress = {
  text: "Here is your progress summary:",
  options: [
    [{ text: "View Habit Streaks", callback_data: "view_streaks" }],
    [{ text: "View Token Earnings", callback_data: "view_earnings" }],
    [{ text: "Back to Main Menu", callback_data: "main_menu" }],
  ] as InlineKeyboardButton[][],
};

// Error Message
export const errorMessage = {
  text: "An error occurred. Please try again later.",
  options: [
    [{ text: "Back to Main Menu", callback_data: "main_menu" }],
  ] as InlineKeyboardButton[][],
};

// Utility function to generate inline keyboards
export const generateInlineKeyboard = (buttons: InlineKeyboardButton[][]) => ({
  reply_markup: { inline_keyboard: buttons },
});
