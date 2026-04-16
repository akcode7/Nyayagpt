import { motion } from "motion/react";
import { AshokChakra } from "./AshokChakra";
import GradualBlur from "./GradualBlur";
import { useLanguage } from "../context/LanguageContext";
import type { TranslationKey } from "../context/LanguageContext";

const knowledgeSourceKeys: TranslationKey[] = [
  "tbSrc1", "tbSrc2", "tbSrc3", "tbSrc4", "tbSrc5",
];

const badgeIcons = [
  (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="6" height="16" rx="1" stroke="#0D0D0D" strokeWidth="1.5" />
      <rect x="11" y="2" width="6" height="16" rx="1" stroke="#0D0D0D" strokeWidth="1.5" />
      <path d="M5 7h2M5 10h2M5 13h2M13 7h2M13 10h2M13 13h2" stroke="#0D0D0D" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  <AshokChakra size={20} color="#0D0D0D" />,
  <AshokChakra size={20} color="#0D0D0D" />,
];

const badgeKeys: { title: TranslationKey; body: TranslationKey }[] = [
  { title: "tb1Title", body: "tb1Body" },
  { title: "tb2Title", body: "tb2Body" },
  { title: "tb3Title", body: "tb3Body" },
];

export function TrustBadges() {
  const { t } = useLanguage();
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
            {t("tbWhy")}
          </span>

          <h2 className="nyaya-h2" style={{ color: "#0D0D0D", margin: "0 0 20px 0", lineHeight: 1.2 }}>
            {t("tbH1")}
            <br />
            <span style={{ color: "#7A7570" }}>{t("tbH2")}</span>
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
            {t("tbSub")}
          </p>

          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {knowledgeSourceKeys.map((key) => (
              <li
                key={key}
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
                {t(key)}
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
              {t("tbVerified")}
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
          {badgeKeys.map(({ title, body }, i) => (
            <motion.div
              key={i}
              className="trust-badge"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              style={{
                background: "rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.1)",
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
                {badgeIcons[i]}
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
                  {t(title)}
                </div>
                <div
                  className="dm-sans"
                  style={{
                    fontSize: 13,
                    color: "#7A7570",
                    lineHeight: 1.6,
                  }}
                >
                  {t(body)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}