import { NextResponse } from "next/server"
import { fetchFromMLBApi } from "@/app/utils/mlbApi"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const playerId = searchParams.get("playerId")
  const season = searchParams.get("season")

  if (!playerId) {
    return NextResponse.json({ error: "Player ID is required" }, { status: 400 })
  }

  try {
    let endpoint = `/people/${playerId}`
    if (season) {
      endpoint += `?season=${season}`
    }
    const data = await fetchFromMLBApi(endpoint)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching player info:", error)
    return NextResponse.json({ error: "Failed to fetch player info" }, { status: 500 })
  }
}

