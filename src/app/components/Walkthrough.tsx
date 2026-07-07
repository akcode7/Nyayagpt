import { motion } from "motion/react";
import { AshokChakra } from "./AshokChakra";
import GradualBlur from "./GradualBlur";
import PixelBlast from "./PixelBlast";
import logoImg from "../../imports/new_logo.png";
import { useLanguage } from "../context/LanguageContext";

function ChatWindowMockup({ t }: { t: (k: string) => string }) {
  return (
    <div
      style={{
        background: "#FAFAF8",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 14px",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          background: "#F0EDE6",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: 2,
          }}
        >
          <img src={logoImg} alt="NyayaGPT" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div>
          <div className="dm-sans" style={{ fontSize: 12, fontWeight: 600, color: "#0D0D0D" }}>
            {t("walkCitHeader")}
          </div>
          <div className="dm-sans" style={{ fontSize: 10, color: "#9A9590", display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ color: "#3A7D44", fontSize: 7 }}>●</span> {t("walkCitOnline")}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          className="dm-sans"
          style={{
            background: "#0D0D0D",
            color: "#fff",
            borderRadius: "14px 14px 4px 14px",
            padding: "10px 13px",
            fontSize: 13,
            lineHeight: 1.55,
            alignSelf: "flex-end",
            maxWidth: "80%",
          }}
        >
          {t("walkChatUserMsg")}
        </div>
        <div
          className="dm-sans"
          style={{
            background: "#EDE9E0",
            border: "1px solid rgba(0,0,0,0.07)",
            color: "#0D0D0D",
            borderRadius: "4px 14px 14px 14px",
            padding: "10px 13px",
            fontSize: 13,
            lineHeight: 1.65,
            maxWidth: "85%",
          }}
        >
          {t("walkChatBotReply")}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: "rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 6,
            padding: "3px 9px",
            fontSize: 11,
            color: "#3D3830",
            alignSelf: "flex-start",
          }}
          className="dm-sans"
        >
          {t("walkChatCitation")}
        </div>
      </div>

      {/* Input */}
      <div
        style={{
          padding: "10px 12px",
          borderTop: "1px solid rgba(0,0,0,0.07)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#F0EDE6",
        }}
      >
        <div
          className="dm-sans"
          style={{
            flex: 1,
            background: "#FAFAF8",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 8,
            padding: "7px 12px",
            fontSize: 12,
            color: "#9A9590",
          }}
        >
          {t("walkChatPlaceholder")}
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#0D0D0D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 6 2 2v3.5l5.5.5L2 6.5V10z" fill="#fff" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CitationMockup({ t }: { t: (k: string) => string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "stretch",
        flexWrap: "wrap",
      }}
    >
      {/* Main response */}
      <div
        style={{
          flex: "1 1 200px",
          background: "#FAFAF8",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 14,
          padding: 18,
          boxShadow: "0 16px 48px rgba(0,0,0,0.07)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
            paddingBottom: 10,
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              padding: 2,
            }}
          >
            <img src={logoImg} alt="NyayaGPT" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <span className="dm-sans" style={{ fontSize: 12, fontWeight: 600, color: "#0D0D0D" }}>
            {t("walkCitHeader")}
          </span>
        </div>
        <p className="dm-sans" style={{ fontSize: 13, lineHeight: 1.7, color: "#0D0D0D", margin: 0 }}>
          {t("walkCitBody")}
        </p>
        <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Article 21A", "RTE Act 2009", "86th Amendment"].map((tag) => (
            <span
              key={tag}
              className="dm-sans"
              style={{
                background: "rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 5,
                padding: "2px 8px",
                fontSize: 10,
                color: "#3D3830",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Citation panel */}
      <div
        style={{
          width: 150,
          minWidth: 130,
          background: "#EDE9E0",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 14,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          boxShadow: "0 16px 48px rgba(0,0,0,0.06)",
        }}
      >
        <div className="dm-sans" style={{ fontSize: 10, fontWeight: 600, color: "#7A7570", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {t("walkCitSources")}
        </div>
        {[
          { label: "Article 21A", sub: "Constitution of India" },
          { label: "RTE Act, 2009", sub: "Parliament Act" },
          { label: "86th Amendment", sub: "Dec 12, 2002" },
        ].map((src) => (
          <div
            key={src.label}
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: 8,
              padding: "7px 9px",
            }}
          >
            <div className="dm-sans" style={{ fontSize: 11, fontWeight: 600, color: "#0D0D0D" }}>
              {src.label}
            </div>
            <div className="dm-sans" style={{ fontSize: 10, color: "#9A9590", marginTop: 2 }}>
              {src.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Walkthrough() {
  const { t } = useLanguage();

  const steps = [
    {
      step: t("walk1Step"),
      headline: t("walk1Headline"),
      body: t("walk1Body"),
      visual: <ChatWindowMockup t={t} />,
      reverse: false,
    },
    {
      step: t("walk2Step"),
      headline: t("walk2Headline"),
      body: t("walk2Body"),
      visual: <CitationMockup t={t} />,
      reverse: true,
    },
  ];

  return (
    <section
      style={{
        background: "#F7F4EE",
        padding: "96px 20px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* PixelBlast full-section background — ink dots, very subtle */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.18,
        }}
      >
        <PixelBlast
          variant="circle"
          color="#0D0D0D"
          pixelSize={3}
          patternScale={2.5}
          patternDensity={0.55}
          speed={0.18}
          enableRipples={false}
          edgeFade={0.22}
          pixelSizeJitter={0.4}
          transparent={true}
          autoPauseOffscreen={true}
        />
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 80,
          position: "relative",
          zIndex: 1,
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className={step.reverse ? "walkthrough-row-reverse" : "walkthrough-row"}
            style={{
              display: "flex",
              gap: 60,
              alignItems: "center",
              flexDirection: step.reverse ? "row-reverse" : "row",
            }}
          >
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: step.reverse ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ flex: "0 0 42%", minWidth: 0 }}
            >
              <span
                className="dm-sans"
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#3D3830",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.14)",
                  borderRadius: 9999,
                  padding: "3px 12px",
                  marginBottom: 18,
                }}
              >
                {step.step}
              </span>
              <h3 className="nyaya-step-headline" style={{ color: "#0D0D0D", margin: "0 0 16px 0" }}>
                {step.headline}
              </h3>
              <p
                className="dm-sans"
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#7A7570",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {step.body}
              </p>

              {/* Decorative rule */}
              <div
                style={{
                  marginTop: 28,
                  height: 2,
                  width: 56,
                  background: "#0D0D0D",
                  borderRadius: 1,
                  opacity: 0.5,
                }}
              />
            </motion.div>

            {/* Visual — wrapped with PixelBlast interactive panel */}
            <motion.div
              initial={{ opacity: 0, x: step.reverse ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{ flex: 1, minWidth: 0, position: "relative" }}
            >
              {/* PixelBlast click-ripple panel behind the mockup */}
              <div
                style={{
                  position: "absolute",
                  inset: "-28px -24px",
                  borderRadius: 24,
                  overflow: "hidden",
                  pointerEvents: "auto",
                  zIndex: 0,
                  opacity: 0.55,
                }}
              >
                <PixelBlast
                  variant="circle"
                  color="#0D0D0D"
                  pixelSize={4}
                  patternScale={2}
                  patternDensity={0.45}
                  speed={0.12}
                  enableRipples={true}
                  rippleSpeed={0.28}
                  rippleThickness={0.09}
                  rippleIntensityScale={0.85}
                  edgeFade={0.35}
                  pixelSizeJitter={0.5}
                  transparent={true}
                  autoPauseOffscreen={true}
                />
              </div>

              {/* Actual mockup content on top */}
              <div style={{ position: "relative", zIndex: 1 }}>
                {step.visual}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}