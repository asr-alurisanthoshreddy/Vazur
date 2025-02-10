"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HighlightVideo() {
  const [analysis, setAnalysis] = useState<string>("")
  const [highlightData, setHighlightData] = useState<{
    title: string
    url: string
    thumbnail: string
    players: string[]
    id: string
  }>({
    title: "Sample Highlight",
    url: "https://example.com/video.mp4", // Placeholder URL
    thumbnail: "https://example.com/thumbnail.jpg", // Placeholder thumbnail
    players: ["Player1", "Player2"], // Example players
    id: "716463", // Example game ID
  })

  const [gameDetails, setGameDetails] = useState<{
    homeTeam: string
    awayTeam: string
    homeScore: number
    awayScore: number
    highlightPlayers: string
  }>({
    homeTeam: "",
    awayTeam: "",
    homeScore: 0,
    awayScore: 0,
    highlightPlayers: "",
  })

  useEffect(() => {
    const fetchGumboData = async () => {
      try {
        const response = await fetch(
          `https://statsapi.mlb.com/api/v1.1/game/${highlightData.id}/feed/live`
        )
        if (!response.ok) throw new Error("Failed to fetch GUMBO data")

        const gumboData = await response.json()
        const homeTeam = gumboData.gameData.teams.home.name
        const awayTeam = gumboData.gameData.teams.away.name
        const homeScore = gumboData.liveData.linescore.teams.home.runs
        const awayScore = gumboData.liveData.linescore.teams.away.runs
        const highlightPlayers = highlightData.players.join(", ")

        setGameDetails({
          homeTeam,
          awayTeam,
          homeScore,
          awayScore,
          highlightPlayers,
        })

        setAnalysis(
          `This highlight features ${highlightPlayers} making an impressive play. The current score is ${awayTeam} ${awayScore} - ${homeTeam} ${homeScore}.`
        )
      } catch (error) {
        console.error("Error fetching GUMBO data:", error)
        setAnalysis("Failed to load game analysis.")
      }
    }

    fetchGumboData()
  }, [highlightData.id]) // Fetch again if the game ID changes

  return (
    <Card>
      <CardHeader>
        <CardTitle>{highlightData.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <video
          src={highlightData.url}
          poster={highlightData.thumbnail}
          controls
          className="w-full"
        />
        <p className="mt-4">{analysis}</p>

        {/* Displaying the game details */}
        <div className="mt-4">
          <p className="font-bold text-lg">{gameDetails.homeTeam} vs {gameDetails.awayTeam}</p>
          <p>
            Score: {gameDetails.awayTeam} {gameDetails.awayScore} - {gameDetails.homeTeam} {gameDetails.homeScore}
          </p>
          <p className="mt-2">
            Players involved in the highlight: {gameDetails.highlightPlayers}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
