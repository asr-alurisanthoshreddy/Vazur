"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"

interface Poll {
  question: string
  options: string[]
}

export function FanInteractionHub() {
  const [poll, setPoll] = useState<Poll | null>(null)
  const [userPoll, setUserPoll] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [finalAnswer, setFinalAnswer] = useState("Jasson Domínguez (NYY)")
  const ResetColor = () => {
    var x = document.getElementsByClassName("w-full p-4 text-left rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 group relative mb-2 last:mb-0");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "white";
      x[i].style.color = "black";
    }
  }
  
  const ChangeColor = (option: string)=> {
      var x= document.getElementsByClassName("w-full p-4 text-left rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 group relative mb-2 last:mb-0");
    
      console.log(finalAnswer);
      for (var i = 0; i < x.length; i++) {
        if(x[i].textContent==null) continue;
        if (x[i].textContent?.includes(finalAnswer.replace(/^[A-D]\.\s*/, ""))){
          x[i].style.backgroundColor = "green";
          x[i].style.color = "white";
        }
        else if (x[i].textContent.includes(option)){
          x[i].style.backgroundColor = "red";
          x[i].style.color = "white";
        }
      
    }
  }

  const createPoll = async () => {
    setLoading(true)
    try {
      // In a real application, this would call a Google Cloud Function
      // that uses Vertex AI to generate engaging poll questions based on current MLB trends
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulating API call
      setPoll({
        question: "Which rookie do you think will have the biggest impact this season?",
        options: ["Jasson Domínguez (NYY)", "Elly De La Cruz (CIN)", "Gunnar Henderson (BAL)", "Corbin Carroll (ARI)"],
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create poll. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateUserPoll = async () => {
    ResetColor();
    if (!userPoll.trim()) {
      toast({
        title: "Error",
        description: "Please enter a poll topic.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // In a real application, this would use Vertex AI to generate a poll based on the user's input
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulating API call

      var newAnswer = (await axios.post("/api/live-poll", { question: userPoll })).data.answer;
      let lines = newAnswer.split("\n").map((line: string) => line.trim()).filter((line: any) => line);

      // The first line should be the question
      let question = lines[0];

      // The next lines should be the answer choices
      let answers = lines.slice(1, 5).map((option: string) => option.replace(/^[A-D]\.\s*/, "").trim(" "));
      
      let finalAnswer = lines[5].slice(13).replace(/^[A-D]\.\s*/, "").trim();

     
      setFinalAnswer(finalAnswer);
      setPoll({
        question: `Q) ${question}`,
        options: answers, // Ensure only first 4 options are used
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate poll. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto bg-gradient-to-b from-background to-muted/20">
      <CardHeader className="text-center border-b bg-muted/10">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Fan Interaction Hub
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Create and participate in AI-powered baseball polls
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="flex flex-col items-center">
            <Button 
              onClick={createPoll} 
              disabled={loading}
              className="w-full md:w-auto min-w-[250px] transition-all hover:scale-102 shadow-lg hover:shadow-primary/20 bg-gradient-to-r from-primary to-primary/90"
              size="lg"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Poll...
                </>
              ) : (
                "✨ Create AI-Generated Poll"
              )}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or create your own</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                placeholder="Enter your poll topic..."
                value={userPoll}
                onChange={(e) => setUserPoll(e.target.value)}
                className="flex-1 h-11 shadow-sm"
              />
              <Button 
                onClick={generateUserPoll} 
                disabled={loading}
                className="h-11 px-6 font-medium shadow-sm"
                variant="outline"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate Custom Poll"
                )}
              </Button>
            </div>
          </div>

          {poll && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-card border rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 bg-muted/50">
                  <h3 className="text-xl font-semibold">{poll.question}</h3>
                </div>
                <div className="p-4">
                  {poll.options.map((option, index) => (
                    <button
                      key={index}
                      className="w-full p-4 text-left rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 group relative mb-2 last:mb-0"
                     onClick={() => ChangeColor(option)}>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold group-hover:bg-primary group-hover:text-white transition-colors">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="font-medium">{option}</span>
                      </div>
                      <div className="absolute inset-0 border rounded-lg group-hover:border-primary/50 transition-colors"></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

