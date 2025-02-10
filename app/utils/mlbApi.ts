export async function fetchFromMLBApi(endpoint: string) {
  const baseUrl = "https://statsapi.mlb.com/api/v1.1"
  const response = await fetch(`${baseUrl}${endpoint}`)

  if (!response.ok) {
    throw new Error(`MLB API request failed: ${response.status}`)
  }

  return response.json()
}

