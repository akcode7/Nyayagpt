import { AshokChakra } from "./AshokChakra";
import GradualBlur from "./GradualBlur";
import { Link } from "react-router";
import logoImg from "../../imports/new_logo.png";
import { useLanguage } from "../context/LanguageContext";
import type { TranslationKey } from "../context/LanguageContext";

type FooterLinkSection = {
  label: TranslationKey;
  links: TranslationKey[];
};

const footerSections: FooterLinkSection[] = [
  { label: "footerProduct",   links: ["flHowItWorks", "flFeatures", "flTryNow", "flPricing", "flApi"] },
  { label: "footerResources", links: ["flConstitution", "flRights", "flGlossary", "flBlog"] },
  { label: "footerCompany",   links: ["flAbout", "flContact", "flPrivacy", "flTerms"] },
];

const routeMap: Record<string, string> = {
  flHowItWorks: "/how-it-works",
  flFeatures: "/features",
  flTryNow: "/",
  flPricing: "/",
  flApi: "/",
  flConstitution: "/",
  flRights: "/",
  flGlossary: "/",
  flBlog: "/blog",
  flAbout: "/about",
  flContact: "/",
  flPrivacy: "/",
  flTerms: "/",
};

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function Footer() {
  const { lang, setLang, t } = useLanguage();

  return (
    <footer
      style={{
        background: "#0D0D0D",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Main footer grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 20px 44px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
          gap: 40,
        }}
        className="footer-grid"
      >
        {/* Col 1 — Brand */}
        <div>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14, textDecoration: "none" }}>
            <img
              src={logoImg}
              alt="NyayaBot Logo"
              style={{ width: 30, height: 30, objectFit: "contain", display: "block", filter: "brightness(0) invert(1)" }}
            />
            <span
              className="dm-sans"
              style={{ fontSize: 17, fontWeight: 700, color: "#FFFFFF" }}
            >
              NyayaBot
            </span>
          </Link>
          <p
            className="dm-sans"
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              marginBottom: 22,
              maxWidth: 200,
            }}
          >
            {t("footerTagline")}{" "}
            <span className="devanagari-font" style={{ fontSize: 13 }}>
              {t("footerTaglineHi")}
            </span>
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 14 }}>
            {[
              { icon: <TwitterIcon />, label: "Twitter", href: "https://twitter.com" },
              { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://linkedin.com" },
              { icon: <InstagramIcon />, label: "Instagram", href: "https://instagram.com" },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "rgba(255,255,255,0.3)",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)")}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Cols 2–4 — Links */}
        {footerSections.map(({ label, links }) => (
          <div key={label}>
            <div
              className="dm-sans"
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              {t(label)}
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
              {links.map((linkKey) => (
                <li key={linkKey}>
                  <Link
                    to={routeMap[linkKey] || "/"}
                    className="dm-sans"
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.35)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)")}
                  >
                    {t(linkKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Col 5 — Language */}
        <div>
          <div
            className="dm-sans"
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {t("footerLanguage")}
          </div>
          {/* Toggle pill */}
          <div
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 9999,
              padding: 3,
              gap: 0,
            }}
          >
            {(["en", "hi"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="dm-sans"
                style={{
                  padding: "6px 16px",
                  borderRadius: 9999,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  background: lang === l ? "#FFFFFF" : "transparent",
                  color: lang === l ? "#0D0D0D" : "rgba(255,255,255,0.4)",
                  transition: "all 0.2s ease",
                }}
              >
                {l === "en" ? "English" : "हिंदी"}
              </button>
            ))}
          </div>

          <p
            className="dm-sans"
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              marginTop: 14,
              lineHeight: 1.6,
            }}
          >
            {t("footerLangAvail")}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}