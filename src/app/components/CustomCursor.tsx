import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  return (
    <div
      className="nyaya-cursor"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Outer ring — greyish, clearly visible */}
      <div
        style={{
          position: "fixed",
          left: pos.x - 16,
          top: pos.y - 16,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(100, 100, 100, 0.65)",
          background: "rgba(160, 155, 150, 0.12)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "left 0.04s linear, top 0.04s linear",
        }}
      />
      {/* Inner dot */}
      <div
        style={{
          position: "fixed",
          left: pos.x - 3,
          top: pos.y - 3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(80, 78, 76, 0.75)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </div>
  );
}