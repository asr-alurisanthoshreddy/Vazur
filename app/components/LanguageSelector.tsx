"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const languages = [
  { id: "en", name: "English" },
  { id: "es", name: "Spanish" },
  { id: "ja", name: "Japanese" },
]

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Your Preferred Language</h2>
      <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage}>
        {languages.map((language) => (
          <div key={language.id} className="flex items-center space-x-2">
            <RadioGroupItem value={language.id} id={language.id} />
            <Label htmlFor={language.id}>{language.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

