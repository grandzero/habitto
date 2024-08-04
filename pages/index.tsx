import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

interface HabitProps {
  habits: string[];
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

const Home = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [habits, setHabits] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Only run this code on the client side
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("tgUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const params = new URLSearchParams(window.location.search);
        if (params.has("id")) {
          const userData = Object.fromEntries(params.entries()) as any;
          localStorage.setItem("tgUser", JSON.stringify(userData));
          setUser(userData);
        }
      }
    }
  }, []);

  const fetchHabits = async (chatId: number) => {
    setLoading(true);
    try {
      setError(null);
      const response = await axios.get<HabitProps>(
        `/api/habits?chatId=${chatId}`
      );
      setHabits(response.data.habits);
    } catch (error) {
      setError("Failed to fetch habits.");
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHabits(user.id);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Habit Tracking Bot</h1>
        <p className={styles.description}>
          This Telegram bot helps you track your daily habits and rewards you
          with tokens on the TON blockchain.
        </p>

        <div className={styles.grid}>
          {!user ? (
            <div className={styles.card}>
              <h3>Login with Telegram</h3>
              {/* Conditionally render the script only on the client side */}
              {typeof window !== "undefined" && (
                <script
                  async
                  src="https://telegram.org/js/telegram-widget.js?7"
                  data-telegram-login="your_bot_username" // replace with your bot's username
                  data-size="large"
                  data-radius="10"
                  data-auth-url="/api/auth"
                  data-request-access="write"
                ></script>
              )}
            </div>
          ) : (
            <div className={styles.card}>
              <h3>Hello, {user.first_name}!</h3>
              <button
                onClick={() => fetchHabits(user.id)}
                className={styles.button}
              >
                {loading ? "Loading..." : "View Habits"}
              </button>
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
          )}
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
