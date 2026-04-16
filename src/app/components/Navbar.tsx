import { useState, useEffect } from "react";
import logoImg from "../../imports/Gemini_Generated_Image_z8chg2z8chg2z8ch.png";
import { useLanguage } from "../context/LanguageContext";
import type { TranslationKey } from "../context/LanguageContext";

const navLinkKeys: TranslationKey[] = [
  "navHome",
  "navHowItWorks",
  "navFeatures",
  "navAbout",
  "navBlog",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="dm-sans"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 68,
        display: "flex",
        alignItems: "center",
        backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        background: scrolled
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.85)",
        borderBottom: scrolled
          ? "1px solid rgba(0,0,0,0.1)"
          : "1px solid rgba(0,0,0,0.04)",
        transition: "all 0.35s ease",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <img
            src={logoImg}
            alt="NyayaBot Logo"
            style={{ width: 32, height: 32, objectFit: "contain", display: "block" }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#0D0D0D",
              letterSpacing: "-0.02em",
            }}
          >
            NyayaBot
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div
          style={{ gap: 28, alignItems: "center" }}
          className="hidden md:flex"
        >
          {navLinkKeys.map((key) => (
            <a
              key={key}
              href="#"
              className="nav-link dm-sans"
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#7A7570",
                textDecoration: "none",
              }}
            >
              {t(key)}
            </a>
          ))}
        </div>

        {/* CTA Group */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a
            href="#"
            className="ghost-btn dm-sans hidden md:flex"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#0D0D0D",
              textDecoration: "none",
              padding: "8px 20px",
              borderRadius: 9999,
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="text-container">
              <span className="text">{t("navLogin")}</span>
            </span>
          </a>
          <a
            href="#"
            className="primary-btn dm-sans cta-glow"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#FFFFFF",
              textDecoration: "none",
              padding: "0 20px",
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              background: "#0D0D0D",
              whiteSpace: "nowrap",
            }}
          >
            <span className="text-container">
              <span className="text">{t("navTryFree")}</span>
            </span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{
              background: "none",
              border: "none",
              color: "#0D0D0D",
              cursor: "pointer",
              padding: 4,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            top: 68,
            left: 0,
            right: 0,
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          {navLinkKeys.map((key) => (
            <a
              key={key}
              href="#"
              className="dm-sans"
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#3D3830",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              {t(key)}
            </a>
          ))}
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <a
              href="#"
              className="dm-sans"
              style={{
                flex: 1,
                fontSize: 15,
                fontWeight: 600,
                color: "#0D0D0D",
                textDecoration: "none",
                padding: "12px 20px",
                border: "1px solid rgba(0,0,0,0.18)",
                borderRadius: 9999,
                textAlign: "center",
              }}
            >
              {t("navLogin")}
            </a>
            <a
              href="#"
              className="dm-sans"
              style={{
                flex: 1,
                fontSize: 15,
                fontWeight: 600,
                color: "#FFFFFF",
                textDecoration: "none",
                padding: "12px 20px",
                background: "#0D0D0D",
                borderRadius: 9999,
                textAlign: "center",
              }}
            >
              {t("navTryFreeMobile")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}