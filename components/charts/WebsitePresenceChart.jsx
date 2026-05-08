"use client"

import { Pie, PieChart, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartConfig = {
  comSite: { label: "Com site", color: "hsl(var(--chart-1))" },
  semSite: { label: "Sem site", color: "hsl(var(--chart-2))" },
}

export default function WebsitePresenceChart({ data }) {
  const comSite = data.filter((m) => m.site).length
  const semSite = data.length - comSite

  const chartData = [
    { name: "comSite", value: comSite },
    { name: "semSite", value: semSite },
  ]

  return (
    <div>
      <h2 className="text-sm font-semibold mb-3">Presença na Web</h2>
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50}>
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={chartConfig[entry.name].color}
              />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="name" />} />
        </PieChart>
      </ChartContainer>
    </div>
  )
}
