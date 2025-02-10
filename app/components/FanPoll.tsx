"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FanPoll({ gameId }: { gameId: string }) {
  const [votes, setVotes] = useState({ home: 0, away: 0 })

  const handleVote = (team: "home" | "away") => {
    setVotes((prev) => ({
      ...prev,
      [team]: prev[team] + 1,
    }))
    // In a real app, you'd send this vote to your backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fan Poll: Who will win?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <Button onClick={() => handleVote("home")}>Home Team</Button>
          <Button onClick={() => handleVote("away")}>Away Team</Button>
        </div>
        <div className="mt-4">
          <p>Home Team Votes: {votes.home}</p>
          <p>Away Team Votes: {votes.away}</p>
        </div>
      </CardContent>
    </Card>
  )
}

