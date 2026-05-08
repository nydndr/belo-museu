"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  total: { label: "Museus", color: "hsl(var(--chart-1))" },
}

export default function MuseumTypeChart({ data }) {
  const counts = {}
  for (const m of data) {
    const tipo = m.tipoDoMuseu ?? "Não informado"
    counts[tipo] = (counts[tipo] ?? 0) + 1
  }

  const chartData = Object.entries(counts)
    .map(([tipo, total]) => ({ tipo, total }))
    .sort((a, b) => b.total - a.total)

  return (
    <div>
      <h2 className="text-sm font-semibold mb-3">Tipo de Museu</h2>
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
          <CartesianGrid horizontal={false} />
          <XAxis type="number" tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="tipo"
            tickLine={false}
            axisLine={false}
            width={160}
            tick={{ fontSize: 11 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total" fill="var(--color-total)" radius={3} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
