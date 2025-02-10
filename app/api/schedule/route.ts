import { NextResponse } from "next/server"
import { fetchFromMLBApi } from "@/app/utils/mlbApi"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const season = searchParams.get("season") || new Date().getFullYear().toString()
  const gameType = searchParams.get("gameType") || "R"

  try {
    const data = await fetchFromMLBApi(`/schedule?sportId=1&season=${season}&gameType=${gameType}`)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching schedule:", error)
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 })
  }
}

