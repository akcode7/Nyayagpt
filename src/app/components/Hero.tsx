import { motion } from "motion/react";
import { useRef } from "react";
import { Mic, Send, Minus, Maximize2, PlayCircle } from "lucide-react";
import { AshokChakra } from "./AshokChakra";
import BorderGlow from "./BorderGlow";
import GradualBlur from "./GradualBlur";
import BlurText from "./BlurText";
import DarkVeil from "./DarkVeil";
import logoImg from "../../imports/Gemini_Generated_Image_z8chg2z8chg2z8ch.png";
import { useLanguage } from "../context/LanguageContext";

const avatar1 = "https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=80&h=80&fit=crop&crop=face";
const avatar2 = "https://images.unsplash.com/photo-1659355894391-a86ee16e10c4?w=80&h=80&fit=crop&crop=face";
const avatar3 = "https://images.unsplash.com/photo-1578069244640-976a4135fada?w=80&h=80&fit=crop&crop=face";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function ChatMockup({ t }: { t: (k: string) => string }) {
  return (
    <BorderGlow
      backgroundColor="#FAFAF8"
      borderRadius={18}
      glowRadius={48}
      glowIntensity={1.2}
      coneSpread={22}
      edgeSensitivity={25}
      animated={true}
      colors={['#2a2520', '#7a7268', '#c8c3b8']}
      glowColor="30 12 40"
      fillOpacity={0.4}
      style={{ width: "100%", maxWidth: 440 }}
    >
      {/* Chat Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          background: "#F0EDE6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
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
            <img src={logoImg} alt="NyayaBot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div>
            <div className="dm-sans" style={{ fontSize: 13, fontWeight: 600, color: "#0D0D0D" }}>
              {t("heroChatHeader")}
            </div>
            <div className="dm-sans" style={{ fontSize: 11, color: "#7A7570", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ color: "#3A7D44", fontSize: 8 }}>●</span> {t("heroChatOnline")}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, color: "#B0AAA4" }}>
          <Minus size={13} />
          <Maximize2 size={13} />
        </div>
      </div>

      {/* Chat Body */}
      <div style={{ padding: "18px 14px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* User bubble */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <div
            className="dm-sans"
            style={{
              background: "#0D0D0D",
              color: "#FFFFFF",
              borderRadius: "16px 16px 4px 16px",
              padding: "10px 14px",
              maxWidth: "85%",
              fontSize: 13,
              lineHeight: 1.55,
            }}
          >
            {t("heroChatUserMsg")}
          </div>
          <span
            className="dm-sans"
            style={{
              fontSize: 10,
              color: "#9A9590",
              background: "rgba(0,0,0,0.04)",
              borderRadius: 4,
              padding: "2px 6px",
            }}
          >
            {t("heroChatUserMsgSub")}
          </span>
        </div>

        {/* Bot response */}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 4,
              padding: 2,
              overflow: "hidden",
            }}
          >
            <img src={logoImg} alt="NyayaBot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              className="dm-sans"
              style={{
                background: "#EDE9E0",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: "4px 14px 14px 14px",
                padding: "10px 14px",
                fontSize: 13,
                lineHeight: 1.65,
                color: "#0D0D0D",
                marginBottom: 8,
              }}
            >
              {t("heroChatBotReply")}
            </div>
            {/* Source badge */}
            <div
              className="dm-sans"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: 11,
                color: "#3D3830",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 2h8M1 5h5M1 8h7" stroke="#0D0D0D" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {t("heroChatSource")}
            </div>
          </div>
        </div>

        {/* Typing indicator */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", paddingLeft: 36 }}>
          <div className="dm-sans" style={{ fontSize: 11, color: "#9A9590", fontStyle: "italic" }}>
            {t("heroChatTyping")}
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#0D0D0D",
                  animation: `blink 1.2s ease-in-out ${i * 0.25}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Input bar */}
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
        <Mic size={15} color="#9A9590" style={{ flexShrink: 0 }} />
        <div
          className="dm-sans"
          style={{
            flex: 1,
            background: "#FAFAF8",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 9,
            padding: "7px 12px",
            fontSize: 13,
            color: "#9A9590",
          }}
        >
          {t("heroChatPlaceholder")}
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#0D0D0D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
          }}
        >
          <Send size={13} color="#fff" />
        </div>
      </div>
    </BorderGlow>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { t } = useLanguage();

  return (
    <section
      ref={heroRef as React.RefObject<HTMLElement>}
      className="hero-noise"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #FFFFFF 0%, #F7F4EE 55%, #EDE9E0 100%)",
        display: "flex",
        alignItems: "center",
        paddingTop: 68,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── OGL Shader Background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.13,
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }}
      >
        <DarkVeil
          hueShift={18}
          noiseIntensity={0.02}
          scanlineIntensity={0}
          speed={0.28}
          warpAmount={0.4}
          resolutionScale={0.75}
        />
      </div>

      {/* Devanagari watermark */}
      <div
        className="devanagari-font"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(140px, 28vw, 380px)",
          fontWeight: 700,
          color: "#0D0D0D",
          opacity: 0.03,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        न्याय
      </div>

      {/* Subtle radial bg */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.025) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ashoka watermark — top right */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: -60,
          width: 260,
          height: 260,
          opacity: 0.035,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <AshokChakra size={260} color="#0D0D0D" />
      </div>

      <div
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "72px 20px 80px",
          display: "flex",
          alignItems: "center",
          gap: 56,
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
        }}
      >
        {/* ─── LEFT COLUMN ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ flex: "1 1 320px", minWidth: 0 }}
        >
          {/* Eyebrow tag */}
          <motion.div variants={lineVariants}>
            <span
              className="dm-sans"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.14)",
                borderRadius: 9999,
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 500,
                color: "#3D3830",
                marginBottom: 26,
              }}
            >
              {t("heroEyebrow")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={lineVariants}>
            <h1
              className="nyaya-h1"
              style={{
                color: "#0D0D0D",
                margin: 0,
                marginBottom: 6,
                fontFamily: '"Cormorant Garamond", "Cormorant", serif',
              }}
            >
              {t("heroHeadline1")}
            </h1>
          </motion.div>
          <motion.div variants={lineVariants} style={{ marginBottom: 26 }}>
            <span className="brush-underline" style={{ display: "inline-block" }}>
              <h1
                className="nyaya-h1"
                style={{
                  color: "#0D0D0D",
                  margin: 0,
                  fontFamily: '"Cormorant Garamond", "Cormorant", serif',
                }}
              >
                {t("heroHeadline2")}
              </h1>
            </span>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={lineVariants}
            className="dm-sans"
            style={{
              fontSize: "clamp(15px, 1.5vw, 19px)",
              fontWeight: 400,
              color: "#7A7570",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 500,
            }}
          >
            {t("heroSub")}
          </motion.p>

          {/* CTA Group */}
          <motion.div
            variants={lineVariants}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 44 }}
          >
            <a
              href="#"
              className="primary-btn cta-glow dm-sans"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                height: 52,
                padding: "0 30px",
                borderRadius: 9999,
                background: "#0D0D0D",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <span className="text-container">
                <span className="text">{t("heroCta1")}</span>
              </span>
            </a>
            <a
              href="#"
              className="ghost-btn dm-sans"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 52,
                padding: "0 26px",
                borderRadius: 9999,
                color: "#0D0D0D",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <span className="text-container">
                <span className="text" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <PlayCircle size={17} color="currentColor" />
                  {t("heroCta2")}
                </span>
              </span>
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={lineVariants}
            style={{ display: "flex", alignItems: "center", gap: 14 }}
          >
            {/* Stacked avatars */}
            <div style={{ display: "flex" }}>
              {[avatar1, avatar2, avatar3].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="user"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "2px solid #FFFFFF",
                    objectFit: "cover",
                    marginLeft: i === 0 ? 0 : -8,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span className="dm-sans" style={{ fontSize: 13, fontWeight: 500, color: "#0D0D0D" }}>
                {t("heroSocialQueries")}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "#0D0D0D", fontSize: 13 }}>★★★★★</span>
                <span className="dm-sans" style={{ fontSize: 12, color: "#9A9590" }}>
                  {t("heroSocialRating")}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT COLUMN — Chat Mockup ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            flex: "1 1 300px",
            minWidth: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="chat-float" style={{ width: "100%", maxWidth: 440 }}>
            <ChatMockup t={t} />
          </div>
        </motion.div>
      </div>

      <GradualBlur position="bottom" strength={2} height="5rem" divCount={6} curve="ease-out" zIndex={10} />
    </section>
  );
}