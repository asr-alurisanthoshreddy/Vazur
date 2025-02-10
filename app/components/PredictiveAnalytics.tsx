"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"

interface Team {
  id: number
  name: string
}

export function PredictiveAnalytics() {
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>("")
  const [prediction, setPrediction] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch("https://statsapi.mlb.com/api/v1/teams/")
        if (!response.ok) {
          throw new Error("Failed to fetch teams")
        }

        const data = await response.json()

        if (!data.teams || !Array.isArray(data.teams)) {
          throw new Error("Invalid data format received")
        }

        const uniqueTeams = data.teams.map((team: { id: number; name: string }) => ({
          id: team.id,
          name: team.name,
        }))

        setTeams(uniqueTeams)

      } catch (error) {
        console.error("Error fetching teams:", error)
        toast({
          title: "Error",
          description: "Failed to fetch teams. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchTeams()
  }, []) 

  const generatePrediction = async () => {
    if (!selectedTeam) {
      toast({
        title: "Error",
        description: "Please select a team.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const rosterResponse = await fetch(`https://statsapi.mlb.com/api/v1/teams/${selectedTeam}/roster?season=2025`);
      if (!rosterResponse.ok) throw new Error("Failed to fetch roster")
      
      const rosterData = await rosterResponse.json()

      await new Promise((resolve) => setTimeout(resolve, 1500))
      const question= `Take this Dataset about the team \n ${rosterData} \n, Generate stats in the format
                       1. Playoff Chances: (prob)}% probability of making the playoffs
                      2. World Series Odds: % chance of winning the World Series
                      3. Key Player Performance:
                        - Top pitcher is projected to achieve x strikeouts this season
                        - Lead batter has a  x% chance of hitting over 30 home runs

                      4. Team Strengths: "Deep roster with versatile players" or "Core group of high-performing players"
                      5. Areas for Improvement: "Building depth in the roster" or "Maintaining consistency throughout the season"
                        
                      You can add anything more if you find

`

      var newAnswer = (await axios.post("/api/season-qualify", { question: question })).data.answer
      newAnswer = newAnswer.replace(/##|\*\*/g, '');

      setPrediction(newAnswer)

    } catch (error) {
      console.error("Error generating prediction:", error)
      toast({
        title: "Error",
        description: "Failed to generate prediction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      <Card className="min-h-[80vh] flex flex-col bg-gradient-to-b from-background to-secondary/5 rounded-xl shadow-lg">
        <CardHeader className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl animate-bounce-slow">⚾</span>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-black">AI-Powered Predictive Analytics</CardTitle>
                <p className="text-sm text-muted-foreground text-black">Predict the outcome of your team’s performance</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <span className="text-lg text-white">🔄</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 space-y-6">
            <div className="flex space-x-2 mb-8">
              <Select onValueChange={setSelectedTeam}>
                <SelectTrigger className="w-[180px] bg-background/90 text-black">
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent className="bg-background/90 text-black">
                  {teams.length === 0 ? (
                    <SelectItem value=" " disabled>Loading teams...</SelectItem>
                  ) : (
                    teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>{team.name}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <Button 
                onClick={generatePrediction} 
                disabled={loading} 
                className="bg-blue-500 hover:bg-blue-600 text-black rounded-full px-6 min-w-[150px]"
              >
                {loading ? "Analyzing..." : "Generate Prediction"}
              </Button>
            </div>
            {prediction && (
              <div className="p-4 bg-primary/10 rounded-lg">
                <pre className="whitespace-pre-wrap text-black">{prediction}</pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
