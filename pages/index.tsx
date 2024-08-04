// pages/index.tsx
import { GetServerSideProps } from "next";
import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

interface HomeProps {
  botStatus: string;
  usersCount: number;
}

const Home: React.FC<HomeProps> = ({ botStatus, usersCount }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Habit Tracking Bot</title>
        <meta
          name="description"
          content="A Telegram bot for tracking habits and earning rewards."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Habit Tracking Bot</h1>
        <p className={styles.description}>
          This Telegram bot helps you track your daily habits and rewards you
          with tokens on the TON blockchain.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Bot Status &rarr;</h3>
            <p>{botStatus}</p>
          </div>

          <div className={styles.card}>
            <h3>Total Users &rarr;</h3>
            <p>{usersCount}</p>
          </div>

          <div className={styles.card}>
            <h3>How to Use &rarr;</h3>
            <p>
              Start by chatting with the bot on Telegram. Use the /start command
              to begin tracking your habits and earning rewards.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Features &rarr;</h3>
            <p>
              <ul>
                <li>Create and track daily habits</li>
                <li>Earn tokens for consistency</li>
                <li>Connect your TON wallet</li>
                <li>Monitor your progress</li>
              </ul>
            </p>
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

// Fetch bot status and other data server-side
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch bot status and users count (dummy data for example)
  const botStatus = "Online";
  const usersCount = 123; // Replace with actual user count logic

  return {
    props: {
      botStatus,
      usersCount,
    },
  };
};

export default Home;
