import { motion } from "motion/react";
import { AshokChakra } from "./AshokChakra";
import BorderGlow from "./BorderGlow";
import GradualBlur from "./GradualBlur";
import PixelTransition from "./PixelTransition";
import TrueFocus from "./TrueFocus";

// ── Shared button inner layouts ─────────────────────────────────────────────

const PrimaryFirst = () => (
  <div style={{
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "#FFFFFF", borderRadius: 9999,
    boxShadow: "0 4px 24px rgba(255,255,255,0.15)",
  }}>
    <span className="dm-sans" style={{ fontWeight: 700, fontSize: 15, color: "#0D0D0D", whiteSpace: "nowrap" }}>
      Ask Your First Question →
    </span>
  </div>
);

const PrimarySecond = () => (
  <div style={{
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "#0D0D0D", borderRadius: 9999,
    border: "1.5px solid rgba(255,255,255,0.3)",
  }}>
    <span className="dm-sans" style={{ fontWeight: 700, fontSize: 15, color: "#FFFFFF", whiteSpace: "nowrap" }}>
      Access Your Rights →
    </span>
  </div>
);

const DemoFirst = () => (
  <div style={{
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "transparent", borderRadius: 9999,
    border: "1px solid rgba(255,255,255,0.22)",
  }}>
    <span className="dm-sans" style={{ fontWeight: 600, fontSize: 15, color: "#FFFFFF", whiteSpace: "nowrap" }}>
      See Demo
    </span>
  </div>
);

const DemoSecond = () => (
  <div style={{
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(255,255,255,0.1)", borderRadius: 9999,
    border: "1px solid rgba(255,255,255,0.5)",
  }}>
    <span className="dm-sans" style={{ fontWeight: 600, fontSize: 15, color: "#FFFFFF", whiteSpace: "nowrap" }}>
      ▶ Watch 2-min tour
    </span>
  </div>
);

// ── Component ────────────────────────────────────────────────────────────────

export function CTABlock() {
  return (
    <section
      style={{
        background: "#0D0D0D",
        padding: "120px 20px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Subtle paper texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Large chakra watermark */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 380,
          height: 380,
          opacity: 0.06,
          pointerEvents: "none",
        }}
      >
        <AshokChakra size={380} color="#FFFFFF" />
      </div>

      {/* Devanagari watermark */}
      <div
        className="devanagari-font"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(120px, 20vw, 260px)",
          fontWeight: 700,
          color: "#FFFFFF",
          opacity: 0.03,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        न्याय
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 740, margin: "0 auto" }}>
        <BorderGlow
          backgroundColor="#161310"
          borderRadius={28}
          glowRadius={56}
          glowIntensity={1.1}
          coneSpread={22}
          edgeSensitivity={25}
          animated={true}
          colors={['#c8c3b8', '#8a8278', '#3d3830']}
          glowColor="35 15 65"
          fillOpacity={0.3}
          style={{ padding: "52px 48px 44px" }}
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
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
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 9999,
                padding: "5px 16px",
                fontSize: 12,
                fontWeight: 500,
                color: "#FFFFFF",
                marginBottom: 28,
              }}
            >
              For every citizen. For free.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ marginBottom: 28 }}
          >
            <TrueFocus
              sentence="Know the law.|Exercise your rights."
              separator="|"
              blurAmount={5}
              borderColor="rgba(255,255,255,0.6)"
              glowColor="rgba(255,255,255,0.18)"
              animationDuration={0.6}
              pauseBetweenAnimations={2.2}
              containerClassName="!flex-col !items-start !gap-2"
              containerStyle={{ textAlign: "left" }}
              wordStyle={{
                fontFamily: '"Cormorant Garamond", "Cormorant", serif',
                fontSize: "clamp(36px, 5.5vw, 60px)",
                fontWeight: 300,
                lineHeight: 1.2,
                color: "#FFFFFF",
                display: "block",
                whiteSpace: "nowrap",
              }}
            />
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="dm-sans"
            style={{
              fontSize: 17,
              fontWeight: 400,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              marginBottom: 44,
            }}
          >
            Start asking NyayaBot — no signup needed to try.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}
          >
            {/* Primary CTA */}
            <PixelTransition
              firstContent={<PrimaryFirst />}
              secondContent={<PrimarySecond />}
              gridSize={9}
              pixelColor="#0D0D0D"
              animationStepDuration={0.25}
              aspectRatio="20%"
              style={{
                width: 270,
                borderRadius: 9999,
              }}
            />

            {/* Ghost CTA */}
            <PixelTransition
              firstContent={<DemoFirst />}
              secondContent={<DemoSecond />}
              gridSize={9}
              pixelColor="rgba(255,255,255,0.75)"
              animationStepDuration={0.25}
              aspectRatio="38.6%"
              style={{
                width: 140,
                borderRadius: 9999,
              }}
            />
          </motion.div>

          {/* Micro-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="dm-sans"
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            NyayaBot is an informational tool. It does not constitute legal advice.
            <br />
            For legal matters, always consult a qualified advocate.
          </motion.p>
        </BorderGlow>
      </div>
      <GradualBlur position="bottom" strength={2} height="6rem" divCount={8} curve="ease-out" zIndex={10} />
    </section>
  );
}