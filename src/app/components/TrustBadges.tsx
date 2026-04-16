import { motion } from "motion/react";
import { AshokChakra } from "./AshokChakra";
import GradualBlur from "./GradualBlur";

const knowledgeSources = [
  "The Constitution of India (as amended up to 2023)",
  "All 104 Constitutional Amendments",
  "Supreme Court landmark judgments (1950–present)",
  "Law Commission Reports",
  "Legal Aid Guidelines",
];

const badges = [
  {
    id: 1,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="2" width="6" height="16" rx="1" stroke="#0D0D0D" strokeWidth="1.5" />
        <rect x="11" y="2" width="6" height="16" rx="1" stroke="#0D0D0D" strokeWidth="1.5" />
        <path d="M5 7h2M5 10h2M5 13h2M13 7h2M13 10h2M13 13h2" stroke="#0D0D0D" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Constitutionally Sourced",
    body: "Only government-verified legal text — no third-party opinions or blogs.",
    bgColor: "rgba(0,0,0,0.04)",
    borderColor: "rgba(0,0,0,0.1)",
  },
  {
    id: 2,
    icon: <AshokChakra size={20} color="#0D0D0D" />,
    title: "No Hallucinations",
    body: "Answers only if source exists; otherwise clearly states 'I don't know'.",
    bgColor: "rgba(0,0,0,0.04)",
    borderColor: "rgba(0,0,0,0.1)",
  },
  {
    id: 3,
    icon: <AshokChakra size={20} color="#0D0D0D" />,
    title: "Data Privacy",
    body: "Your queries are never stored, sold, or shared with third parties.",
    bgColor: "rgba(0,0,0,0.04)",
    borderColor: "rgba(0,0,0,0.1)",
  },
];

export function TrustBadges() {
  return (
    <section
      style={{
        background: "#F7F4EE",
        padding: "96px 20px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          gap: 64,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ flex: "1 1 280px", minWidth: 0 }}
        >
          <span
            className="dm-sans"
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 500,
              color: "#9A9590",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Why Trust NyayaBot
          </span>

          <h2 className="nyaya-h2" style={{ color: "#0D0D0D", margin: "0 0 20px 0", lineHeight: 1.2 }}>
            Built on constitutional truth.
            <br />
            <span style={{ color: "#7A7570" }}>Not opinions.</span>
          </h2>

          <p
            className="dm-sans"
            style={{
              fontSize: 16,
              color: "#7A7570",
              lineHeight: 1.75,
              marginBottom: 28,
            }}
          >
            NyayaBot's knowledge base is trained exclusively on verified sources of Indian law:
          </p>

          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {knowledgeSources.map((src) => (
              <li
                key={src}
                className="dm-sans"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  fontSize: 14,
                  color: "#5A5550",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#0D0D0D",
                    flexShrink: 0,
                    marginTop: 7,
                    opacity: 0.5,
                  }}
                />
                {src}
              </li>
            ))}
          </ul>

          {/* Ashoka Chakra decoration */}
          <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                height: 1,
                flex: 1,
                background: "linear-gradient(90deg, #0D0D0D, transparent)",
                borderRadius: 1,
                opacity: 0.25,
              }}
            />
            <span className="dm-sans" style={{ fontSize: 12, color: "#9A9590", whiteSpace: "nowrap" }}>
              Verified &amp; Accurate
            </span>
          </div>
        </motion.div>

        {/* Right — badges */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ flex: "1 1 280px", minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.id}
              className="trust-badge"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              style={{
                background: badge.bgColor,
                border: `1px solid ${badge.borderColor}`,
                borderRadius: 14,
                padding: "22px 24px",
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: "rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {badge.icon}
              </div>

              {/* Content */}
              <div>
                <div
                  className="dm-sans"
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#0D0D0D",
                    marginBottom: 5,
                  }}
                >
                  {badge.title}
                </div>
                <div
                  className="dm-sans"
                  style={{
                    fontSize: 13,
                    color: "#7A7570",
                    lineHeight: 1.6,
                  }}
                >
                  {badge.body}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}