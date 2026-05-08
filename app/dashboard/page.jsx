"use client"

import { useState, useMemo } from "react"
import { getMuseums } from "@/lib/data"
import MuseumTypeChart from "@/components/charts/MuseumTypeChart"
import WebsitePresenceChart from "@/components/charts/WebsitePresenceChart"
import AdminSphereChart from "@/components/charts/AdminSphereChart"
import MuseumsByYearChart from "@/components/charts/MuseumsByYearChart"

const SCOPES = [
  { label: "Belo Horizonte", filter: { municipio: "Belo Horizonte" } },
  { label: "Minas Gerais", filter: { uf: "MG" } },
  { label: "Brasil", filter: {} },
]

export default function Dashboard() {
  const [scope, setScope] = useState(0)
  const data = useMemo(() => getMuseums(SCOPES[scope].filter), [scope])

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="flex gap-2 mb-10">
        {SCOPES.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setScope(i)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              scope === i
                ? "bg-black text-white border-black dark:bg-white dark:text-black"
                : "border-neutral-300 hover:border-neutral-500"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-neutral-500 mb-10">
        {data.length} museus encontrados
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <MuseumTypeChart data={data} />
        <WebsitePresenceChart data={data} />
        <AdminSphereChart data={data} />
        <MuseumsByYearChart data={data} />
      </div>
    </div>
  )
}
