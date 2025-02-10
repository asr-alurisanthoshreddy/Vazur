import { NextResponse } from "next/server"
import { fetchFromMLBApi } from "@/app/utils/mlbApi"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teamId = searchParams.get("teamId")
  const season = searchParams.get("season") || new Date().getFullYear().toString()

  if (!teamId) {
    return NextResponse.json({ error: "Team ID is required" }, { status: 400 })
  }

  try {
    const data = await fetchFromMLBApi(`/teams/${teamId}/roster?season=${season}`)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching team roster:", error)
    return NextResponse.json({ error: "Failed to fetch team roster" }, { status: 500 })
  }
}

