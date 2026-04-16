import { motion } from "motion/react";
import CardSwap, { Card } from "./CardSwap";
import { AshokChakra } from "./AshokChakra";
import BorderGlow from "./BorderGlow";
import GradualBlur from "./GradualBlur";
import { useLanguage } from "../context/LanguageContext";

/* ─── Parchment tones for card depth ─── */
const CARD_COLORS = [
  { bg: "#FFFFFF", border: "rgba(0,0,0,0.08)" },   // front – pure white
  { bg: "#F4F1EB", border: "rgba(0,0,0,0.07)" },   // mid – warm parchment
  { bg: "#E9E4DA", border: "rgba(0,0,0,0.1)" },    // back – deepest parchment
];

/* ─── Feature card content — icons only (titles/bodies come from translations) ─── */
const featureIcons = [
  (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <path d="M14 4C8.5 4 4 8.5 4 14s4.5 10 10 10 10-4.5 10-10S19.5 4 14 4z" stroke="#0D0D0D" strokeWidth="1.8" />
      <path d="M10 14h8M14 10v8" stroke="#0D0D0D" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 9l2 2M19 9l-2 2M9 19l2-2M19 19l-2-2" stroke="#0D0D0D" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="3" width="16" height="22" rx="2" stroke="#0D0D0D" strokeWidth="1.8" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="#0D0D0D" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18 20l2 2 4-4" stroke="#0D0D0D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke="#0D0D0D" strokeWidth="1.8" />
      <path d="M4 14h20M14 4c-3 3-5 6-5 10s2 7 5 10M14 4c3 3 5 6 5 10s-2 7-5 10" stroke="#0D0D0D" strokeWidth="1.6" />
      <circle cx="14" cy="14" r="2.5" fill="#0D0D0D" />
    </svg>
  ),
];

const featureDevanagari = ["प्रश्न पूछें", "स्रोत सहित", "द्विभाषी"];
const featureTags = ["01", "02", "03"];

/* ─── Individual card inner content ─── */
function FeatureCardContent({
  feature,
  cardColor,
}: {
  feature: { id: number; icon: React.ReactNode; title: string; body: string; devanagari: string; tag: string };
  cardColor: { bg: string; border: string };
}) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "28px 28px 24px",
        background: cardColor.bg,
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
      }}
    >
      {/* Watermark Devanagari */}
      <div
        className="devanagari-font"
        style={{
          position: "absolute",
          bottom: -10,
          right: 16,
          fontSize: 72,
          fontWeight: 700,
          color: "#0D0D0D",
          opacity: 0.04,
          userSelect: "none",
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        {feature.devanagari}
      </div>

      {/* Top row: icon + tag number */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {feature.icon}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <AshokChakra size={18} color="#0D0D0D" style={{ opacity: 0.25 }} />
          <span
            className="dm-sans"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(0,0,0,0.2)",
              letterSpacing: "0.12em",
            }}
          >
            {feature.tag}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="dm-sans"
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#0D0D0D",
          margin: "0 0 12px 0",
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </h3>

      {/* Body */}
      <p
        className="dm-sans"
        style={{
          fontSize: 14,
          color: "#7A7570",
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
        }}
      >
        {feature.body}
      </p>

      {/* Bottom rule */}
      <div
        style={{
          marginTop: 20,
          height: 1,
          background: "rgba(0,0,0,0.07)",
          borderRadius: 1,
        }}
      />

      {/* Bottom label */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          className="dm-sans"
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(0,0,0,0.3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          NyayaBot
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.06)" }} />
      </div>
    </div>
  );
}

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      id: 1, tag: featureTags[0], icon: featureIcons[0],
      title: t("feat1Title"), body: t("feat1Body"), devanagari: featureDevanagari[0],
    },
    {
      id: 2, tag: featureTags[1], icon: featureIcons[1],
      title: t("feat2Title"), body: t("feat2Body"), devanagari: featureDevanagari[1],
    },
    {
      id: 3, tag: featureTags[2], icon: featureIcons[2],
      title: t("feat3Title"), body: t("feat3Body"), devanagari: featureDevanagari[2],
    },
  ];
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "96px 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Ashoka Chakra — faint watermark */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 520,
          height: 520,
          opacity: 0.025,
          pointerEvents: "none",
        }}
      >
        <AshokChakra size={520} color="#0D0D0D" />
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: 0,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* ─── LEFT: Text Content ─── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            flex: "0 0 46%",
            minWidth: 280,
            paddingBottom: 96,
            paddingRight: 40,
          }}
          className="features-text"
        >
          {/* Section tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="dm-sans"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 9999,
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 500,
                color: "#3D3830",
                marginBottom: 24,
              }}
            >
              {t("featuresTag")}
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="nyaya-h2-light" style={{ color: "#0D0D0D", margin: "0 0 20px 0", lineHeight: 1.12 }}>
            {t("featuresH1")}
            <br />
            <span style={{ color: "#9A9590" }}>{t("featuresH2")}</span>
          </h2>

          <p
            className="dm-sans"
            style={{
              fontSize: 16,
              color: "#7A7570",
              lineHeight: 1.75,
              margin: "0 0 40px 0",
              maxWidth: 400,
            }}
          >
            {t("featuresSub")}
          </p>

          {/* Feature list — concise bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {features.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <BorderGlow
                  backgroundColor="#FAFAF8"
                  borderRadius={12}
                  glowRadius={28}
                  glowIntensity={0.85}
                  coneSpread={18}
                  edgeSensitivity={30}
                  colors={['#2a2520', '#7a7268', '#c8c3b8']}
                  glowColor="30 10 45"
                  fillOpacity={0.3}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.05)",
                      border: "1px solid rgba(0,0,0,0.09)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div
                      className="dm-sans"
                      style={{ fontSize: 14, fontWeight: 600, color: "#0D0D0D", marginBottom: 3 }}
                    >
                      {f.title}
                    </div>
                    <div
                      className="dm-sans"
                      style={{ fontSize: 13, color: "#9A9590", lineHeight: 1.55 }}
                    >
                      {f.body}
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── RIGHT: CardSwap 3D Stack ─── */}
        <div
          style={{
            flex: "0 0 54%",
            minWidth: 300,
            position: "relative",
            height: 520,
            minHeight: 520,
          }}
          className="features-cards"
        >
          {/* Subtle parchment gradient behind the cards */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "85%",
              height: "85%",
              background:
                "radial-gradient(ellipse at 60% 60%, rgba(237,233,224,0.6) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <CardSwap
            width={360}
            height={240}
            cardDistance={55}
            verticalDistance={65}
            delay={3800}
            pauseOnHover
            skewAmount={5}
            easing="elastic"
          >
            {features.map((f, i) => (
              <Card
                key={f.id}
                style={{
                  background: CARD_COLORS[i].bg,
                  border: `1px solid ${CARD_COLORS[i].border}`,
                  boxShadow:
                    i === 0
                      ? "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"
                      : i === 1
                      ? "0 10px 32px rgba(0,0,0,0.08)"
                      : "0 6px 20px rgba(0,0,0,0.06)",
                }}
              >
                <FeatureCardContent feature={f} cardColor={CARD_COLORS[i]} />
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>

      {/* Bottom border fade */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.08) 80%, transparent)",
          marginTop: 0,
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          .features-text {
            flex: 1 1 100% !important;
            padding-right: 0 !important;
            padding-bottom: 0 !important;
          }
          .features-cards {
            flex: 1 1 100% !important;
            height: 380px !important;
            min-height: 380px !important;
          }
        }
        @media (max-width: 480px) {
          .features-cards {
            height: 300px !important;
            min-height: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}