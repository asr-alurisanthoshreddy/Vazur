"use client";

import { TeamSelector } from "../components/TeamSelector";
import { PlayerSelector } from "../components/PlayerSelector";
import { LanguageSelector } from "../components/LanguageSelector";
import { DigestPreferences } from "../components/DigestPreferences";
import { Reviews } from "../components/Reviews";
import FantasyTeamSelection from "../components/fantasy/FantasyTeamSelection";
import FantasyLeaderboard from "../components/fantasy/FantasyLeaderboard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-800 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Your MLB FanFeed Dashboard
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            Manage your preferences and stay updated on your favorite teams, players, and news.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Team Selector</h2>
            <TeamSelector />
          </div>
          <div className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Player Selector</h2>
            <PlayerSelector />
          </div>
          <div className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Language Selector</h2>
            <LanguageSelector />
          </div>

          {/* Digest Preferences */}
          <div className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 col-span-2 sm:col-span-1 lg:col-span-3">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Digest Preferences</h2>
            <DigestPreferences />
          </div>

          {/* Reviews Section */}
          <div className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 col-span-2 sm:col-span-1 lg:col-span-3">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Reviews by our Fans</h2>
            <Reviews />
          </div>

          {/* 🚀 Dream11 Fantasy Feature */}
          <div className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 col-span-2 sm:col-span-1 lg:col-span-3">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Dream11 Fantasy Team Selection</h2>
            <FantasyTeamSelection />
          </div>
          <div className="bg-gray-700 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 col-span-2 sm:col-span-1 lg:col-span-3">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Dream11 Leaderboard</h2>
            <FantasyLeaderboard />
          </div>

        </div>
      </div>
    </div>
  );
}
