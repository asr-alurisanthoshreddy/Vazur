import { NextResponse } from "next/server"
import { fetchFromMLBApi } from "@/app/utils/mlbApi"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const gamePk = searchParams.get("gamePk")

  if (!gamePk) {
    return NextResponse.json({ error: "Game PK is required" }, { status: 400 })
  }

  try {
    const data = await fetchFromMLBApi(`/game/${gamePk}/feed/live`)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching live game data:", error)
    return NextResponse.json({ error: "Failed to fetch live game data" }, { status: 500 })
  }
}

