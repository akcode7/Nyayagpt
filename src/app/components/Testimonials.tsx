import { motion } from "motion/react";
import BorderGlow from "./BorderGlow";
import GradualBlur from "./GradualBlur";
import { useLanguage } from "../context/LanguageContext";

const avatars = [
  "https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1659355894391-a86ee16e10c4?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1578069244640-976a4135fada?w=80&h=80&fit=crop&crop=face",
];

export function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      quote: t("test1Quote"),
      name: t("test1Name"),
      designation: t("test1Des"),
      avatar: avatars[0],
    },
    {
      id: 2,
      quote: t("test2Quote"),
      name: t("test2Name"),
      designation: t("test2Des"),
      avatar: avatars[1],
    },
    {
      id: 3,
      quote: t("test3Quote"),
      name: t("test3Name"),
      designation: t("test3Des"),
      avatar: avatars[2],
    },
  ];

  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "96px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial */}
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 350,
          background: "radial-gradient(ellipse, rgba(0,0,0,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span
            className="dm-sans"
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "#9A9590",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 12,
            }}
          >
            {t("testimonialsLabel")}
          </span>
          <h2 className="nyaya-h2" style={{ color: "#0D0D0D", margin: 0 }}>
            {t("testimonialsHeading")}
          </h2>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <BorderGlow
                backgroundColor="#FAFAF8"
                borderRadius={16}
                glowRadius={36}
                glowIntensity={0.9}
                coneSpread={20}
                edgeSensitivity={28}
                colors={['#2a2520', '#8a8278', '#d4cfc5']}
                glowColor="30 10 45"
                fillOpacity={0.35}
                style={{
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {/* Opening quote mark */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 72,
                    color: "#0D0D0D",
                    opacity: 0.1,
                    lineHeight: 0.7,
                    marginBottom: 14,
                    userSelect: "none",
                  }}
                >
                  "
                </div>

                {/* Quote */}
                <p
                  className="dm-sans"
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#5A5550",
                    lineHeight: 1.75,
                    margin: "0 0 24px 0",
                    flex: 1,
                  }}
                >
                  {item.quote}
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: "rgba(0,0,0,0.07)",
                    marginBottom: 18,
                  }}
                />

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid rgba(0,0,0,0.1)",
                    }}
                  />
                  <div>
                    <div className="dm-sans" style={{ fontSize: 14, fontWeight: 600, color: "#0D0D0D" }}>
                      {item.name}
                    </div>
                    <div className="dm-sans" style={{ fontSize: 12, color: "#9A9590", marginTop: 2 }}>
                      {item.designation}
                    </div>
                  </div>
                </div>

                {/* Star rating */}
                <div style={{ marginTop: 14, display: "flex", gap: 2 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: "#0D0D0D", fontSize: 12 }}>
                      ★
                    </span>
                  ))}
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
      <GradualBlur position="bottom" strength={2} height="5rem" divCount={6} curve="ease-out" zIndex={10} />
    </section>
  );
}