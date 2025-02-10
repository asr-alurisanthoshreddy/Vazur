"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Spinner } from "@/components/ui/spinner"

interface Highlight {
  id: string
  title: string
  url: string
  analysis: string
  teams: string[]
  timestamp: string
}

export function AIHighlightReel() {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)  // Added for pagination
  const { toast } = useToast()

  const fetchHighlights = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch the current day's schedule
      const scheduleResponse = await fetch("https://statsapi.mlb.com/api/v1/schedule?sportId=1&season=2024&gameType=R")
      const scheduleData = await scheduleResponse.json()

      // Get a random game from today's schedule
      const todaysGames = scheduleData.dates[0].games
      const randomGame = todaysGames[Math.floor(Math.random() * todaysGames.length)]

      // Fetch live game data
      const gameResponse = await fetch(`/api/live-game?gamePk=${randomGame.gamePk}`)
      const gameData = await gameResponse.json()

      // Process game data to create highlights
      const newHighlights = processGameDataForHighlights(gameData)
      setHighlights(newHighlights)
    } catch (error) {
      console.error("Error fetching highlights:", error)
      toast({
        title: "Error",
        description: "Failed to fetch highlights. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchHighlights()
  }, [fetchHighlights])

  // This function would process the game data to create highlight objects
  function processGameDataForHighlights(gameData: any): Highlight[] {
    return gameData.liveData.plays.allPlays
      .filter((play: any) => play.about.isComplete && play.result.rbi > 0)
      .map((play: any, index: number) => ({
        id: `${gameData.gameData.game.pk}-${index}`,
        title: `${play.result.description}`,
        url: `https://example.com/highlight-${gameData.gameData.game.pk}-${index}.mp4`, // Use a real video URL
        analysis: `This play resulted in ${play.result.rbi} RBI(s). The batter was ${play.matchup.batter.fullName}.`,
        teams: [gameData.gameData.teams.home.name, gameData.gameData.teams.away.name],
        timestamp: `Inning: ${play.about.inning}, Time: ${play.about.startTime}`,
      }))
      .slice(0, 5) // Limit to 5 highlights per page
  }

  // Pagination Logic: Load more highlights
  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
    fetchHighlights()  // Fetch new highlights based on page
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Highlight Reel</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={fetchHighlights} disabled={loading} className="mb-4 w-full">
          {loading ? <Spinner /> : "Refresh Highlights"}
        </Button>

        <div className="mt-4 space-y-6">
          {highlights.length > 0 ? (
            highlights.map((highlight) => (
              <div key={highlight.id} className="border p-4 rounded-lg hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                <div className="flex items-center space-x-4 mb-2 text-sm text-gray-500">
                  <span>{highlight.teams.join(" vs ")}</span>
                  <span>{highlight.timestamp}</span>
                </div>
                <video src={highlight.url} controls className="w-full mb-2" poster={`https://example.com/poster-${highlight.id}.jpg`}>
                  Your browser does not support the video tag.
                </video>
                <p className="text-sm text-gray-600">{highlight.analysis}</p>
              </div>
            ))
          ) : (
            <p>No highlights available for this game.</p>
          )}
        </div>

        {/* Show Load More Button */}
        <Button onClick={loadMore} className="mt-4" disabled={loading}>
          {loading ? <Spinner /> : "Load More Highlights"}
        </Button>
      </CardContent>
    </Card>
  )
}
