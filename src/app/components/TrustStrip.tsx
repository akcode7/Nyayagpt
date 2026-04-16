import { ScrollVelocity } from "./ScrollVelocity";

// ── Separator dot ──────────────────────────────────────────────────────────

function Dot() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <circle cx="6" cy="6" r="5" stroke="#0D0D0D" strokeWidth="1" />
      <circle cx="6" cy="6" r="2" fill="#0D0D0D" />
    </svg>
  );
}

// ── Single institution label ───────────────────────────────────────────────

function Chip({ name }: { name: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Dot />
      <span
        className="dm-sans"
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#0D0D0D",
          letterSpacing: "0.025em",
        }}
      >
        {name}
      </span>
    </span>
  );
}

// ── Row of chips (one full "copy") ─────────────────────────────────────────

const row1Names = [
  "National Law University",
  "Bar Council of India",
  "Supreme Court of India",
  "Daksh India",
  "PRS Legislative Research",
  "CLAT Consortium",
  "Law Commission of India",
  "Legal Services Authority",
];

const row2Names = [
  "Ministry of Law & Justice",
  "India Legal Aid Forum",
  "NALSA",
  "High Court of Delhi",
  "Vidhi Centre for Legal Policy",
  "Commonwealth Legal Education",
  "IBA Human Rights Institute",
  "Nyaya Deep Foundation",
];

function Row({ names }: { names: string[] }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 36 }}>
      {names.map((name, i) => (
        <Chip key={i} name={name} />
      ))}
    </span>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export function TrustStrip() {
  return (
    <section
      style={{
        background: "#F7F4EE",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "26px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Label */}
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span
          className="dm-sans"
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "#9A9590",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Trusted by students, lawyers &amp; citizens across India
        </span>
      </div>

      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 0 0",
          pointerEvents: "none",
          zIndex: 2,
          background:
            "linear-gradient(to right, #F7F4EE 0%, transparent 8%, transparent 92%, #F7F4EE 100%)",
        }}
      />

      {/* Two-row scroll velocity marquee */}
      <div style={{ opacity: 0.45 }}>
        <ScrollVelocity
          texts={[
            <Row key="r1" names={row1Names} />,
            <Row key="r2" names={row2Names} />,
          ]}
          velocity={55}
          damping={40}
          stiffness={300}
          numCopies={4}
          velocityMapping={{ input: [0, 1000], output: [0, 4] }}
          parallaxStyle={{ marginBottom: 10 }}
          scrollerStyle={{ alignItems: "center", gap: 36 }}
        />
      </div>
    </section>
  );
}
