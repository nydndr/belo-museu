"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  total: { label: "Museus abertos", color: "hsl(var(--chart-4))" },
}

export default function MuseumsByYearChart({ data }) {
  const counts = {}
  for (const m of data) {
    const ano = m.anoDeAbertura
    if (!ano || isNaN(Number(ano))) continue
    const year = Number(ano)
    if (year < 1800 || year > 2030) continue
    counts[year] = (counts[year] ?? 0) + 1
  }

  const chartData = Object.entries(counts)
    .map(([ano, total]) => ({ ano: Number(ano), total }))
    .sort((a, b) => a.ano - b.ano)

  return (
    <div className="md:col-span-2">
      <h2 className="text-sm font-semibold mb-3">Museus por Ano de Abertura</h2>
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <AreaChart data={chartData} margin={{ left: 8, right: 16 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="ano"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11 }}
          />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="total"
            fill="var(--color-total)"
            stroke="var(--color-total)"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
