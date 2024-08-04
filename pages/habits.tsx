// pages/habits.tsx
import { useState } from "react";
import axios from "axios";

interface HabitProps {
  habits: string[];
}

const Habits = () => {
  const [chatId, setChatId] = useState<string>("");
  const [habits, setHabits] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = async () => {
    try {
      setError(null);
      const response = await axios.get<HabitProps>(
        `/api/habits?chatId=${chatId}`
      );
      setHabits(response.data.habits);
    } catch (error) {
      setError(
        "Failed to fetch habits. Please check the chat ID and try again."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>View Your Habits</h1>
      <div>
        <label htmlFor="chatId">Enter your Telegram chat ID:</label>
        <input
          type="text"
          id="chatId"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
          placeholder="Your Telegram chat ID"
        />
        <button onClick={fetchHabits}>Fetch Habits</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h2>Your Habits:</h2>
        {habits.length > 0 ? (
          <ul>
            {habits.map((habit, index) => (
              <li key={index}>{habit}</li>
            ))}
          </ul>
        ) : (
          <p>No habits found. Try creating some with the bot!</p>
        )}
      </div>
    </div>
  );
};

export default Habits;
