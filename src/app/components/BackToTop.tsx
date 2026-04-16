import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .btt-button {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #0D0D0D;
          border: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0px 0px 0px 4px rgba(200, 195, 184, 0.32);
          cursor: pointer;
          transition-duration: 0.3s;
          overflow: hidden;
          position: relative;
          font-family: 'DM Sans', system-ui, sans-serif;
          letter-spacing: 0.01em;
        }

        .btt-svgIcon {
          width: 12px;
          transition-duration: 0.3s;
          flex-shrink: 0;
        }

        .btt-svgIcon path {
          fill: #F7F4EE;
        }

        .btt-button:hover {
          width: 148px;
          border-radius: 50px;
          transition-duration: 0.3s;
          background-color: #3D3830;
          align-items: center;
        }

        .btt-button:hover .btt-svgIcon {
          transition-duration: 0.3s;
          transform: translateY(-200%);
        }

        .btt-button::before {
          position: absolute;
          bottom: -20px;
          content: "Back to Top";
          color: #F7F4EE;
          font-size: 0px;
          white-space: nowrap;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-weight: 600;
        }

        .btt-button:hover::before {
          font-size: 13px;
          opacity: 1;
          bottom: unset;
          transition-duration: 0.3s;
        }
      `}</style>

      <button
        className="btt-button"
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 999,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.35s ease, transform 0.35s ease, width 0.3s ease, border-radius 0.3s ease, background-color 0.3s ease",
        }}
      >
        <svg className="btt-svgIcon" viewBox="0 0 384 512">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </button>
    </>
  );
}
