"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios";

export function VirtualDugout() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{ question: string; answer: string }>>([])
  const { toast } = useToast()

  const askCoach = async () => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      var newAnswer = (await axios.post("/api/ask-coach", { question: question })).data.answer
      newAnswer = newAnswer.replace(/##|\*\*/g, '');
      setAnswer(newAnswer)
      setChatHistory(prev => [...prev, { question, answer: newAnswer }])
      setQuestion("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get an answer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      <Card className="min-h-[80vh] flex flex-col bg-gradient-to-b from-background to-secondary/5">
        <CardHeader className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl animate-bounce-slow">⚾</span>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Virtual Dugout</CardTitle>
                <p className="text-sm text-muted-foreground">Your Personal Baseball AI Coach</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <span className="text-lg">🔄</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 space-y-6">
            {chatHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="p-6 rounded-full bg-primary/5 animate-pulse">
                  <span className="text-5xl">⚾</span>
                </div>
                <div className="max-w-md">
                  <h3 className="text-2xl font-semibold mb-4">Welcome to the Dugout!</h3>
                  <p className="text-muted-foreground mb-8">Select a question or ask your own to get started:</p>
                  <div className="grid gap-3">
                    {[
                      "How can I improve my batting average?",
                      "What's the best way to field ground balls?",
                      "Tips for pitching accuracy?",
                      "How to read a pitcher's tells?"
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuestion(suggestion)}
                        className="p-4 text-left hover:bg-primary/5 rounded-xl transition-all duration-200 border border-border/50 hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              chatHistory.map((chat, index) => (
                <div key={index} className="space-y-4 animate-in slide-in-from-bottom-4">
                  <div className="flex items-start gap-3 max-w-[85%]">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center ring-2 ring-blue-500/20">
                      <span className="text-lg">👤</span>
                    </div>
                    <div className="flex-1 bg-blue-500/10 rounded-2xl rounded-tl-none p-4 text-blue-900 dark:text-blue-100">
                      {chat.question}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 max-w-[85%] ml-auto">
                    <div className="flex-1 bg-primary/10 rounded-2xl rounded-tr-none p-4">
                      <pre className="whitespace-pre-wrap font-sans">{chat.answer}</pre>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                      <span className="text-lg">⚾</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 sm:p-6 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex gap-3 max-w-3xl mx-auto">
              <Input
                placeholder="Ask your baseball question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && askCoach()}
                disabled={loading}
                className="flex-1 rounded-full px-6 border-primary/20 focus-visible:ring-primary/30"
              />
              <Button 
                onClick={askCoach} 
                disabled={loading}
                className="rounded-full px-6 min-w-[120px] bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin">⚾</span>
                    <span>Thinking</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Ask Coach</span>
                    <span>→</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

