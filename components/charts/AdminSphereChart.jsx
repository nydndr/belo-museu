"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  total: { label: "Museus", color: "hsl(var(--chart-3))" },
}

export default function AdminSphereChart({ data }) {
  const counts = {}
  for (const m of data) {
    const esfera = m.esferaAdministrativa ?? "Não informado"
    counts[esfera] = (counts[esfera] ?? 0) + 1
  }

  const chartData = Object.entries(counts)
    .map(([esfera, total]) => ({ esfera, total }))
    .sort((a, b) => b.total - a.total)

  return (
    <div>
      <h2 className="text-sm font-semibold mb-3">Esfera Administrativa</h2>
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
          <CartesianGrid horizontal={false} />
          <XAxis type="number" tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="esfera"
            tickLine={false}
            axisLine={false}
            width={180}
            tick={{ fontSize: 10 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total" fill="var(--color-total)" radius={3} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
