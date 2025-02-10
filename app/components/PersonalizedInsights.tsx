"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function PersonalizedInsights() {
  const [insights, setInsights] = useState<string | null>(null)
  const [customInsight, setCustomInsight] = useState("")
  const [loading, setLoading] = useState(false)
  const [showInsights, setShowInsights] = useState(false)  // State to control toggle visibility
  const { toast } = useToast()
  const insightsRef = useRef<HTMLDivElement | null>(null)

  const generateInsights = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulating API call
      setInsights(`Based on your viewing history and favorite team (New York Yankees), here are some personalized insights:

1. Player Performance: Aaron Judge has hit 15% more home runs in night games this season compared to day games.
2. Team Trends: The Yankees' pitching staff has shown a 12% improvement in strikeout rate over the last month.
3. Upcoming Games: Your favorite player, Gerrit Cole, is scheduled to pitch in the upcoming series against the Red Sox. Based on his recent performance and historical data against the Red Sox, he has a 68% chance of a quality start.
4. Fantasy Baseball Tip: Consider picking up the Yankees' rookie reliever who has shown a significant increase in spin rate, potentially indicating a breakout performance coming soon.
5. Stadium Experience: Based on your seating preferences, we recommend sections 223-225 for optimal viewing angles for infield plays in your next visit to Yankee Stadium.`)

      setTimeout(() => {
        if (showInsights) {
          insightsRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      }, 300)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate insights. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('your-image-url.jpg')" }}>
      <Card className="w-full max-w-full mx-auto p-6 rounded-lg bg-black text-white mt-6">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-left">Personalized Insights</CardTitle>
      </CardHeader>
      <CardContent>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                setShowInsights((prev) => !prev)
                if (!showInsights) {
                  generateInsights() // Trigger insights generation if the menu is being opened
                }
              }}
              disabled={loading}
              className="w-full flex items-center justify-center bg-white text-black hover:bg-gray-300"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : showInsights ? "Hide Insights" : "Generate Insights"}
            </Button>
          </div>

          {showInsights && insights && (
            <div
              ref={insightsRef}
              className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow-sm text-sm whitespace-pre-wrap"
            >
              {insights}
            </div>
          )}

          {/* User Input for Custom Insights */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-white">
              Add Your Own Insight:
            </label>
            <Textarea
              value={customInsight}
              onChange={(e) => setCustomInsight(e.target.value)}
              placeholder="Type here..."
              className="mt-2 w-full p-2 bg-gray-800 text-white border-gray-700 rounded-md"
            />
            <Button
              onClick={() => {
                if (customInsight.trim() === "") {
                  toast({ title: "Warning", description: "Insight cannot be empty!", variant: "destructive" })
                  return
                }
                setInsights((prev) => (prev ? `${prev}\n\nCustom Insight: ${customInsight}` : `Custom Insight: ${customInsight}`))
                setCustomInsight("")
              }}
              className="mt-2 w-full bg-white text-black hover:bg-gray-300"
            >
              Add Insight
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
