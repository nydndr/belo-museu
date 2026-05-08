import museums from "@/public/data/museums.json"

export function getMuseums({ municipio, uf } = {}) {
  if (municipio) return museums.filter((m) => m.municipio === municipio)
  if (uf) return museums.filter((m) => m.uf === uf)
  return museums
}
