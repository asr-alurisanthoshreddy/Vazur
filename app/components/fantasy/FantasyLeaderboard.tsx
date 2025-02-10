"use client";
import React from "react";

const leaderboardData = [
  { id: 1, user: "User1", points: 300 },
  { id: 2, user: "User2", points: 280 },
  { id: 3, user: "User3", points: 270 },
];

const FantasyLeaderboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-bold">Leaderboard</h2>
      <ul>
        {leaderboardData.map((entry) => (
          <li key={entry.id} className="p-2 border-b">
            {entry.user}: {entry.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FantasyLeaderboard;
