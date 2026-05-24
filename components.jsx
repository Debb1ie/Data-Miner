export function Badge({ text, level }) {
  const map = {
    Beginner: { bg: "#E1F5EE", color: "#0F6E56" },
    Intermediate: { bg: "#E6F1FB", color: "#185FA5" },
    Advanced: { bg: "#FBEAF0", color: "#993556" },
  };
  const style = map[level] || { bg: "#F1EFE8", color: "#5F5E5A" };
  return (
    <span
      style={{
        background: style.bg,
        color: style.color,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: 4,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

export function Tag({ text }) {
  return (
    <span
      style={{
        background: "#1a1a1a",
        color: "#aaa",
        fontSize: 11,
        padding: "3px 8px",
        borderRadius: 4,
        border: "1px solid #2e2e2e",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

export function CourseCard({ course, trackColor, trackBg, trackAccent }) {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: 12,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        position: "relative",
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = trackColor;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#222";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {course.popular && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: trackColor,
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 4,
          }}
        >
          Popular
        </div>
      )}

      <div>
        <h3
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: "#f0f0f0",
            lineHeight: 1.4,
            paddingRight: course.popular ? 64 : 0,
          }}
        >
          {course.title}
        </h3>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 13,
            color: "#888",
            lineHeight: 1.6,
          }}
        >
          {course.desc}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {course.tags.map((t) => (
          <Tag key={t} text={t} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingTop: 8,
          borderTop: "1px solid #1e1e1e",
          marginTop: "auto",
        }}
      >
        <Badge text={course.level} level={course.level} />
        <span style={{ color: "#666", fontSize: 12 }}>
          <i className="ti ti-clock" style={{ fontSize: 13, marginRight: 3 }} />
          {course.duration}
        </span>
        <span style={{ color: "#666", fontSize: 12 }}>
          <i className="ti ti-list" style={{ fontSize: 13, marginRight: 3 }} />
          {course.lessons} lessons
        </span>
      </div>
    </div>
  );
}

export function TrackTab({ track, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? track.color : "transparent",
        color: active ? "#fff" : "#777",
        border: `1px solid ${active ? track.color : "#2a2a2a"}`,
        borderRadius: 8,
        padding: "10px 20px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = track.color;
          e.currentTarget.style.color = track.color;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = "#2a2a2a";
          e.currentTarget.style.color = "#777";
        }
      }}
    >
      <i className={`ti ${track.icon}`} style={{ fontSize: 16 }} />
      {track.label}
    </button>
  );
}

export function StatCard({ stat }) {
  return (
    <div
      style={{
        background: "#0e0e0e",
        border: "1px solid #1e1e1e",
        borderRadius: 10,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <i
        className={`ti ${stat.icon}`}
        style={{ fontSize: 20, color: "#555", marginBottom: 8 }}
      />
      <span
        style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", lineHeight: 1 }}
      >
        {stat.value}
      </span>
      <span style={{ fontSize: 13, color: "#666" }}>{stat.label}</span>
    </div>
  );
}
