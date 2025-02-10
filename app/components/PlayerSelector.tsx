"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PlayerSelector() {
  const [players, setPlayers] = useState<string[]>([])
  const [newPlayer, setNewPlayer] = useState("")

  const addPlayer = () => {
    if (newPlayer && !players.includes(newPlayer)) {
      setPlayers([...players, newPlayer])
      setNewPlayer("")
    }
  }

  const removePlayer = (player: string) => {
    setPlayers(players.filter((p) => p !== player))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Players to Follow</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Enter player name"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
        />
        <Button onClick={addPlayer}>Add</Button>
      </div>
      <div className="space-y-2">
        {players.map((player) => (
          <div key={player} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{player}</span>
            <Button variant="destructive" size="sm" onClick={() => removePlayer(player)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

