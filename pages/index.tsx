// pages/index.tsx
import { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

interface HabitProps {
  habits: string[];
}

const Home = () => {
  const [chatId, setChatId] = useState<string>("");
  const [habits, setHabits] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHabits = async () => {
    setLoading(true);
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
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Habit Tracking Bot</h1>
        <p className={styles.description}>
          This Telegram bot helps you track your daily habits and rewards you
          with tokens on the TON blockchain.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>View Your Habits</h3>
            <div>
              <label htmlFor="chatId">Enter your Telegram chat ID:</label>
              <input
                type="text"
                id="chatId"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                placeholder="Your Telegram chat ID"
                className={styles.input}
              />
              <button
                onClick={fetchHabits}
                disabled={loading}
                className={styles.button}
              >
                {loading ? "Loading..." : "Fetch Habits"}
              </button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div>
              <h3>Your Habits:</h3>
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
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/your-github-repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open-source on GitHub
        </a>
      </footer>
    </div>
  );
};

export default Home;
