import { TrustBadges } from "../components/TrustBadges";
import { Testimonials } from "../components/Testimonials";
import { CTABlock } from "../components/CTABlock";

export default function About() {
  return (
    <>
      <TrustBadges />
      <section
        style={{
          padding: "96px 20px",
          background: "linear-gradient(180deg, #F8F5EF 0%, #F1ECE3 100%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              border: "1px solid rgba(13, 13, 13, 0.12)",
              borderRadius: 28,
              background: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 24px 80px rgba(13, 13, 13, 0.08)",
              padding: "40px 28px",
              backdropFilter: "blur(10px)",
            }}
          >
            <p
              className="dm-sans"
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#5A544B",
              }}
            >
              Created by
            </p>
            <h2
              className="nyaya-h3"
              style={{
                margin: "12px 0 22px",
                color: "#0D0D0D",
              }}
            >
              BBD UNIVERSITY BATCH 2026
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 14,
              }}
            >
              {[
                "Vishal Singh",
                "Ankit Sharma",
                "Dishambha Awasthi",
                "Abhishek Singh",
              ].map((name) => (
                <div
                  key={name}
                  className="dm-sans"
                  style={{
                    padding: "16px 18px",
                    borderRadius: 18,
                    background: "#F8F5EF",
                    border: "1px solid rgba(13, 13, 13, 0.08)",
                    color: "#1E1B17",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
      <CTABlock />
    </>
  );
}
