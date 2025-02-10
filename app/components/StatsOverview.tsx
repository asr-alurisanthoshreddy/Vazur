import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Stat {
  label: string
  value: string
  stat: string
}

export function StatsOverview({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.stat}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

