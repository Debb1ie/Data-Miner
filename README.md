# DataCraft

A dark-themed, interactive course catalog for data practitioners, covering Analytics, Data Engineering, Data Science, and AI. Built with React, no backend required

![DataCraft preview](https://placehold.co/1200x600/080808/1D9E75?text=DataCraft+Platform)

---

## What it is

DataCraft is a frontend-only course discovery platform built around real tools that data practitioners use at work — SQL, dbt, Spark, Airflow, Kafka, scikit-learn, LangChain, MLflow, and more. Each course includes difficulty levels, estimated duration, lesson count, and tool tags so learners can quickly find what's relevant to their stack.

---

## File structure

```
datacraft/
├── App.jsx          # Main page layout, routing logic, search + filter state
├── components.jsx   # Reusable UI: CourseCard, TrackTab, StatCard, Badge, Tag
└── data.js          # All course content, track definitions, stats, and level constants
```

### App.jsx

The root component. Handles:

- Active track state (Analytics / Engineering / Science / AI)
- Level filter (Beginner / Intermediate / Advanced)
- Live search across course titles and tool tags
- Sticky nav, hero section, course grid, and CTA footer
- Loads DM Sans font and Tabler Icons on mount

### components.jsx

Stateless, prop-driven UI components:

| Component | Props | Purpose |
|---|---|---|
| `CourseCard` | `course`, `trackColor`, `trackBg`, `trackAccent` | Individual course tile with hover state |
| `TrackTab` | `track`, `active`, `onClick` | Navigation tab per learning track |
| `StatCard` | `stat` | Hero metric (courses, projects, datasets, job-readiness) |
| `Badge` | `text`, `level` | Colored difficulty label |
| `Tag` | `text` | Monospace tool/topic tag |

### data.js

Single source of truth for all content. Exports:

- `tracks` — 4 learning tracks, each with 6 courses
- `stats` — 4 hero statistics
- `levels` — filter options: All, Beginner, Intermediate, Advanced

To add a course, append an object to the relevant track's `courses` array:

```js
{
  id: "e7",
  title: "Great Lakes Iceberg Tables",
  level: "Advanced",
  duration: "9h",
  lessons: 34,
  tags: ["Iceberg", "Delta Lake", "Lakehouse"],
  desc: "Manage ACID transactions and time travel on open table formats.",
  popular: false,   // set true to show the Popular pill
}
```

---

## Getting started

### Prerequisites

- Node.js 18+
- A React project scaffolded with Vite or Create React App

### With Vite (recommended)

```bash
npm create vite@latest datacraft -- --template react
cd datacraft
npm install
```

Replace `src/App.jsx` with `App.jsx`, then add `components.jsx` and `data.js` to `src/`. Update the import paths:

```js
// In App.jsx
import { tracks, stats, levels } from "./data.js";
import { CourseCard, TrackTab, StatCard } from "./components.jsx";
```

Then run:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### External dependencies

Both are loaded via CDN at runtime — no npm install needed:

```
https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css
https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700
```

If you're working offline or behind a firewall, install them locally:

```bash
npm install @tabler/icons-webfont
```

Then import in `App.jsx`:

```js
import "@tabler/icons-webfont/tabler-icons.min.css";
```

---

## Tracks

| Track | Icon | Accent | Courses |
|---|---|---|---|
| Data Analytics | chart-bar | `#1D9E75` | SQL, Excel, Tableau, dbt, KPIs, Stats |
| Data Engineering | server | `#378ADD` | Python, Spark, Airflow, Kafka, Warehouse, Docker |
| Data Science | atom | `#BA7517` | ML, Pandas, Feature Eng, Time Series, Plotly, Causal |
| AI Specialist | brain | `#D4537E` | LLMs, RAG, Fine-tuning, Agents, CV, MLOps |

---

## Customization

### Add a new track

In `data.js`, push a new object to `tracks`:

```js
{
  id: "cloud",
  label: "Cloud & Infrastructure",
  icon: "ti-cloud",
  color: "#534AB7",
  bg: "#EEEDFE",
  accent: "#3C3489",
  tagline: "Deploy and scale data infrastructure",
  courses: [ /* ... */ ],
}
```

The tab and header render automatically — no changes needed in `App.jsx`.

### Change the color theme

Each track has three color values used across its tab, header border, popular pills, hover states, and active level buttons:

```js
color:  "#1D9E75"   // primary accent — tabs, pills, active states
bg:     "#E1F5EE"   // light tint — badge backgrounds
accent: "#0F6E56"   // darker shade — hover text.
```

### Swap fonts

Replace the Google Fonts URL in the `useEffect` inside `App.jsx`. The font family is applied inline via `fontFamily: "'DM Sans', sans-serif"` on the root div — update that string to match.

---

## Design decisions.

- **No routing library** — track and filter state lives in `useState`; the URL doesn't change. Add React Router if you need shareable filtered URLs.
- **No CSS files** — all styles are inline objects or applied via className strings with injected `<style>`. This keeps the component files self-contained and portable.
- **No external data fetching** — content lives in `data.js`. Swap it for an API call or CMS if needed.
- **Dark-only** — the palette is calibrated for dark backgrounds. Light mode support would require a second set of color values per component.

---

## License

MIT
