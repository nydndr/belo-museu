# Belo Museu

Data visualization website for Brazilian museum registry data, scoped to Belo Horizonte vs. Minas Gerais vs. Brazil.

## Pages

| Route | Purpose |
|---|---|
| `/` | **História** — static narrative with chart components embedded inline between text |
| `/dashboard` | **Dashboard** — scope selector (BH / MG / Brasil) filters all charts in real time |

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Standard for React, works well with static data |
| Styling | Tailwind CSS v4 | Utility-first, pairs naturally with Next.js |
| UI components | shadcn/ui | Consistent design system, no extra runtime |
| Charts | shadcn/ui chart (Recharts) | Recharts power + shadcn theming out of the box. Raw Recharts props still available when wrapper limits |
| CSV parsing | PapaParse | Handles quoted fields with embedded newlines (present in this dataset) |
| Deploy | Vercel | Native Next.js host |
| Language | JavaScript (no TypeScript) | — |
| UI language | PT-BR | Target audience is Brazilian |

## Data Pipeline

The CSV (`Lista de Museus - Lista de Museus.csv`, 6.8 MB, 4,105 museums, 70 columns) is **never sent to the browser raw**. At build time a Node script parses it into a lean JSON file.

```
scripts/parse-csv.js  →  public/data/museums.json
```

The script:
1. Reads the UTF-8 CSV with PapaParse
2. Keeps **all 70 columns** (columns to drop will be decided after exploring the data)
3. Normalizes Portuguese null placeholders (`"- NÃO INFORMADO -"`, `"- NÃO POSSUI -"`) → `null`
4. Converts column headers to camelCase keys (e.g. `"Tipo do Museu"` → `tipoDoMuseu`)
5. Adds `municipio` and `uf` convenience aliases used by filters

`public/data/museums.json` is gitignored — regenerated on every build via the `prebuild` npm hook.

### Scope filtering

`lib/data.js` exports `getMuseums({ municipio?, uf? })` which filters the JSON at runtime:

```js
getMuseums({ municipio: "Belo Horizonte" })  // 68 museums
getMuseums({ uf: "MG" })                     // Minas Gerais
getMuseums()                                 // all Brazil
```

## Chart Components

All charts live in `components/charts/` and follow one rule: **they receive a `data` prop and know nothing about scope**. Filtering always happens at the page level before passing data down.

| Component | Chart type | Data key |
|---|---|---|
| `MuseumTypeChart` | Horizontal bar | `tipoDoMuseu` |
| `WebsitePresenceChart` | Donut | `site` (null = no website) |
| `AdminSphereChart` | Horizontal bar | `esferaAdministrativa` |
| `MuseumsByYearChart` | Area chart | `anoDeAbertura` |

### Using a chart in the Story page

```jsx
import MuseumTypeChart from "@/components/charts/MuseumTypeChart"
import { getMuseums } from "@/lib/data"

const bh = getMuseums({ municipio: "Belo Horizonte" })

// Drop anywhere in the narrative:
<MuseumTypeChart data={bh} />
```

### Adding a new chart

1. Create `components/charts/YourChart.jsx`
2. Accept a `data` prop (array of museum objects)
3. Aggregate/transform inside the component
4. Use shadcn's `ChartContainer` + a Recharts primitive
5. Import it in Dashboard and/or Story — no other wiring needed

## Project Structure

```
belo-museu/
├── app/
│   ├── globals.css           # Tailwind + shadcn CSS variables (chart colors, theme)
│   ├── layout.jsx            # Root layout with nav
│   ├── page.jsx              # História (Story) page
│   └── dashboard/
│       └── page.jsx          # Dashboard page
├── components/
│   ├── charts/
│   │   ├── AdminSphereChart.jsx
│   │   ├── MuseumsByYearChart.jsx
│   │   ├── MuseumTypeChart.jsx
│   │   └── WebsitePresenceChart.jsx
│   └── ui/                   # shadcn/ui components (auto-generated, do not edit)
├── lib/
│   ├── data.js               # getMuseums() filter helper
│   └── utils.js              # cn() Tailwind class merge helper
├── public/
│   └── data/
│       └── museums.json      # generated — gitignored
├── scripts/
│   └── parse-csv.js          # CSV → JSON build script
├── Lista de Museus - Lista de Museus.csv
├── components.json           # shadcn/ui config
└── jsconfig.json             # path aliases (@/*)
```

## Running Locally

**Requirements:** Node.js 18+, the CSV file present at the project root.

```bash
# 1. Install dependencies
npm install

# 2. Generate the data file from the CSV
npm run data

# 3. Start the dev server
npm run dev
```

Open http://localhost:3000 (or the port shown in the terminal if 3000 is in use).

### Build for production

```bash
npm run build   # runs parse-csv.js automatically via prebuild hook, then builds Next.js
npm start
```

### npm scripts

| Script | What it does |
|---|---|
| `npm run data` | Parse CSV → `public/data/museums.json` |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Parse CSV + production build |
| `npm start` | Serve the production build |
