"use client";
import React, { useState } from "react";

interface Player {
  id: number;
  name: string;
  role: string;
  credits: number;
}

const baseballTeams = {
  "New York Yankees": [
    { id: 1, name: "Aaron Judge", role: "Outfielder", credits: 10 },
    { id: 2, name: "Gerrit Cole", role: "Pitcher", credits: 9 },
    { id: 3, name: "Giancarlo Stanton", role: "Batsman", credits: 8.5 },
    { id: 4, name: "Anthony Rizzo", role: "First Baseman", credits: 8 },
  ],
  "Los Angeles Dodgers": [
    { id: 5, name: "Mookie Betts", role: "Outfielder", credits: 10 },
    { id: 6, name: "Clayton Kershaw", role: "Pitcher", credits: 9 },
    { id: 7, name: "Freddie Freeman", role: "First Baseman", credits: 8.5 },
    { id: 8, name: "Max Muncy", role: "Third Baseman", credits: 8 },
  ],
  "Boston Red Sox": [
    { id: 9, name: "Rafael Devers", role: "Third Baseman", credits: 10 },
    { id: 10, name: "Chris Sale", role: "Pitcher", credits: 9 },
    { id: 11, name: "Xander Bogaerts", role: "Shortstop", credits: 8.5 },
    { id: 12, name: "JD Martinez", role: "Outfielder", credits: 8 },
  ],
  "Chicago Cubs": [
    { id: 13, name: "Cody Bellinger", role: "Outfielder", credits: 10 },
    { id: 14, name: "Marcus Stroman", role: "Pitcher", credits: 9 },
    { id: 15, name: "Dansby Swanson", role: "Shortstop", credits: 8.5 },
    { id: 16, name: "Nico Hoerner", role: "Second Baseman", credits: 8 },
  ],
};

const FantasyTeamSelection: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [team, setTeam] = useState<Player[]>([]);
  const [creditsLeft, setCreditsLeft] = useState<number>(100);

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teamName = event.target.value;
    setSelectedTeam(teamName);
    setPlayersList(baseballTeams[teamName as keyof typeof baseballTeams] || []);
  };

  const handleSelectPlayer = (player: Player) => {
    if (team.length >= 11 || creditsLeft < player.credits) return;
    setTeam([...team, player]);
    setCreditsLeft(creditsLeft - player.credits);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-lg font-bold mb-2">Select Your Team</h2>

      {/* Dropdown for selecting a team */}
      <select
        onChange={handleTeamChange}
        className="mb-4 p-2 w-full bg-gray-700 border border-gray-600 rounded"
      >
        <option value="">Select a Baseball Team</option>
        {Object.keys(baseballTeams).map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>

      {selectedTeam && (
        <>
          <h3 className="text-md font-semibold mb-2">Players from {selectedTeam}</h3>
          <p>Credits Left: {creditsLeft}</p>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {playersList.map((player) => (
              <button
                key={player.id}
                onClick={() => handleSelectPlayer(player)}
                className="p-2 border rounded bg-gray-200 text-black"
              >
                {player.name} - {player.role} - {player.credits} Cr
              </button>
            ))}
          </div>

          {/* Selected Players */}
          {team.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Your Selected Players:</h3>
              <ul>
                {team.map((p) => (
                  <li key={p.id} className="text-sm">{p.name} ({p.role})</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FantasyTeamSelection;
