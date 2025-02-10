"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  venue: string
}

export function GamePrediction({ game }: { game: Game }) {
  const [prediction, setPrediction] = useState<string>("")

  useEffect(() => {
    const predictGame = async () => {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPrediction(`Based on recent performance and historical data, 
        ${game.homeTeam} has a 60% chance of winning against ${game.awayTeam}.`)
    }

    predictGame()
  }, [game])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Game Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          {game.homeTeam} vs {game.awayTeam}
        </p>
        <p>Date: {new Date(game.date).toLocaleDateString()}</p>
        <p>Venue: {game.venue}</p>
        <p className="mt-4 font-bold">{prediction}</p>
      </CardContent>
    </Card>
  )
}

