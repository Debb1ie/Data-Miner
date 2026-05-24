import { useState, useEffect } from "react";
import { tracks, stats, levels } from "./data.js";
import { CourseCard, TrackTab, StatCard } from "./components.jsx";

export default function App() {
  const [activeTrack, setActiveTrack] = useState(tracks[0]);
  const [levelFilter, setLevelFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css";
    document.head.appendChild(link);

    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
      "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(font);

    setTimeout(() => setMounted(true), 100);
  }, []);

  const filtered = activeTrack.courses.filter((c) => {
    const matchLevel = levelFilter === "All" || c.level === levelFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q));
    return matchLevel && matchSearch;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        fontFamily: "'DM Sans', sans-serif",
        color: "#f0f0f0",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          borderBottom: "1px solid #161616",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          position: "sticky",
          top: 0,
          background: "rgba(8,8,8,0.92)",
          backdropFilter: "blur(12px)",
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "#1D9E75",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="ti ti-hexagon-letter-d" style={{ fontSize: 16, color: "#fff" }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>
            DataCraft
          </span>
          <span
            style={{
              fontSize: 10,
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              color: "#666",
              padding: "2px 7px",
              borderRadius: 4,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginLeft: 4,
            }}
          >
            Beta
          </span>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              background: "transparent",
              border: "1px solid #252525",
              color: "#aaa",
              padding: "8px 18px",
              borderRadius: 8,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Sign in
          </button>
          <button
            style={{
              background: "#f0f0f0",
              border: "none",
              color: "#080808",
              padding: "8px 18px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Start free
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          padding: "80px 40px 60px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#111",
            border: "1px solid #222",
            borderRadius: 20,
            padding: "5px 14px",
            marginBottom: 28,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1D9E75", display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "#888", letterSpacing: "0.04em" }}>
            Built for practitioners. Grounded in real data.
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: "0 0 20px",
            maxWidth: 700,
          }}
        >
          Learn data skills
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #1D9E75, #378ADD)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            the way you'll use them.
          </span>
        </h1>

        <p
          style={{
            fontSize: 17,
            color: "#666",
            maxWidth: 520,
            lineHeight: 1.7,
            margin: "0 0 48px",
          }}
        >
          Courses for analysts, engineers, scientists, and AI specialists — built
          around real datasets, production scenarios, and tools you'll actually use
          at work.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 12,
            maxWidth: 680,
          }}
        >
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ borderTop: "1px solid #111", margin: "0 40px" }} />

      {/* COURSES SECTION */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "60px 40px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p style={{ margin: "0 0 6px", fontSize: 12, color: "#555", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Learning Tracks
            </p>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Choose your path
            </h2>
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <i
              className="ti ti-search"
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 15,
                color: "#555",
              }}
            />
            <input
              type="text"
              placeholder="Search courses or tools…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "#0f0f0f",
                border: "1px solid #222",
                borderRadius: 8,
                color: "#ddd",
                fontSize: 13,
                padding: "9px 14px 9px 36px",
                width: 240,
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
          </div>
        </div>

        {/* Track tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          {tracks.map((t) => (
            <TrackTab
              key={t.id}
              track={t}
              active={activeTrack.id === t.id}
              onClick={() => {
                setActiveTrack(t);
                setLevelFilter("All");
              }}
            />
          ))}
        </div>

        {/* Track header */}
        <div
          style={{
            background: "#0d0d0d",
            border: `1px solid ${activeTrack.color}22`,
            borderLeft: `3px solid ${activeTrack.color}`,
            borderRadius: 10,
            padding: "16px 20px",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <i
              className={`ti ${activeTrack.icon}`}
              style={{ fontSize: 22, color: activeTrack.color }}
            />
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "#e8e8e8" }}>
                {activeTrack.label}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
                {activeTrack.tagline}
              </p>
            </div>
          </div>

          {/* Level filters */}
          <div style={{ display: "flex", gap: 6 }}>
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                style={{
                  background: levelFilter === l ? activeTrack.color : "transparent",
                  color: levelFilter === l ? "#fff" : "#666",
                  border: `1px solid ${levelFilter === l ? activeTrack.color : "#252525"}`,
                  borderRadius: 6,
                  padding: "5px 12px",
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  transition: "all 0.15s",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Course grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#555",
              fontSize: 14,
            }}
          >
            <i className="ti ti-search-off" style={{ fontSize: 32, marginBottom: 12, display: "block" }} />
            No courses match your filters. Try a different search or level.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                trackColor={activeTrack.color}
                trackBg={activeTrack.bg}
                trackAccent={activeTrack.accent}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA FOOTER */}
      <section
        style={{
          background: "#0d0d0d",
          borderTop: "1px solid #161616",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            margin: "0 0 12px",
          }}
        >
          Ready to work with data?
        </h2>
        <p style={{ color: "#666", fontSize: 15, margin: "0 0 32px" }}>
          Start with a free course. No credit card required.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            style={{
              background: "#1D9E75",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "14px 32px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Browse free courses
          </button>
          <button
            style={{
              background: "transparent",
              color: "#aaa",
              border: "1px solid #252525",
              borderRadius: 10,
              padding: "14px 32px",
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            View learning paths
          </button>
        </div>

        <p style={{ color: "#333", fontSize: 12, marginTop: 48 }}>
          © 2025 DataCraft · Built for data practitioners
        </p>
      </section>
    </div>
  );
}
