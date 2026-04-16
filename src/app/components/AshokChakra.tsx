import type { CSSProperties } from "react";

interface AshokChakraProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function AshokChakra({ size = 32, color = "#0D0D0D", className = "", style }: AshokChakraProps) {
  const cx = 50, cy = 50;
  const outerR = 44;
  const innerHubR = 7;
  const spokeInnerR = 10;
  const spokeOuterR = 40;
  const dotR = 2.2;

  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angleDeg = (i * 360) / 24 - 90;
    const angle = angleDeg * (Math.PI / 180);
    return {
      x1: cx + spokeInnerR * Math.cos(angle),
      y1: cy + spokeInnerR * Math.sin(angle),
      x2: cx + spokeOuterR * Math.cos(angle),
      y2: cy + spokeOuterR * Math.sin(angle),
      dotX: cx + outerR * Math.cos(angle),
      dotY: cy + outerR * Math.sin(angle),
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={outerR} stroke={color} strokeWidth="2.8" />
      {/* Middle ring (subtle) */}
      <circle cx={cx} cy={cy} r={outerR * 0.62} stroke={color} strokeWidth="0.8" opacity="0.35" />
      {/* Hub */}
      <circle cx={cx} cy={cy} r={innerHubR} fill={color} />
      <circle cx={cx} cy={cy} r={innerHubR - 3} fill="none" stroke={color} strokeWidth="0.6" opacity="0.4" />
      {/* Spokes + dots */}
      {spokes.map((s, i) => (
        <g key={i}>
          <line
            x1={s.x1} y1={s.y1}
            x2={s.x2} y2={s.y2}
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx={s.dotX} cy={s.dotY} r={dotR} fill={color} />
        </g>
      ))}
    </svg>
  );
}
