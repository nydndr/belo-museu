const fs = require("fs")
const path = require("path")
const Papa = require("papaparse")

const CSV_PATH = path.join(__dirname, "..", "Lista de Museus - Lista de Museus.csv")
const OUT_PATH = path.join(__dirname, "..", "public", "data", "museums.json")

const NULLISH = ["- NÃO INFORMADO -", "- NÃO POSSUI -", "- Não informado -", "- Não possui -", ""]

function toKey(header) {
  return header
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .map((word, i) =>
      i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("")
}

function normalize(val) {
  if (val === undefined || val === null) return null
  const trimmed = String(val).trim()
  if (NULLISH.includes(trimmed)) return null
  return trimmed
}

const raw = fs.readFileSync(CSV_PATH, "utf-8")

const { data, errors } = Papa.parse(raw, {
  header: true,
  skipEmptyLines: true,
})

if (errors.length > 0) {
  console.warn(`Parse warnings: ${errors.length}`)
}

// Build camelCase key map from first row's headers
const headers = Object.keys(data[0])
const keyMap = {}
const seen = {}
for (const h of headers) {
  let key = toKey(h)
  if (seen[key]) {
    // Deduplicate: append index
    let i = 2
    while (seen[`${key}${i}`]) i++
    key = `${key}${i}`
  }
  seen[key] = true
  keyMap[h] = key
}

const museums = data.map((row) => {
  const obj = {}
  for (const [orig, key] of Object.entries(keyMap)) {
    obj[key] = normalize(row[orig])
  }
  // Convenience aliases used by lib/data.js and chart components
  obj.municipio = normalize(row["Município"]) ?? normalize(row["Municipio"])
  obj.uf = normalize(row["UF"])
  return obj
})

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
fs.writeFileSync(OUT_PATH, JSON.stringify(museums), "utf-8")

console.log(`✓ ${museums.length} museus → ${OUT_PATH}`)
