"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function DigestPreferences() {
  const [preferences, setPreferences] = useState({
    audio: false,
    video: false,
    text: false,
  })

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Digest Preferences</h2>
      <div className="space-y-2">
        {Object.entries(preferences).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={key}
              checked={value}
              onCheckedChange={() => handlePreferenceChange(key as keyof typeof preferences)}
            />
            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)} Digest</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

