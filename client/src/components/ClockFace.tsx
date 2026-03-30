/**
 * ClockFace — SVG analog clock component
 * Design: Honeycomb Kingdom theme (amber/honey palette)
 * Renders a clean analog clock face for a given time string "H:MM" or "HH:MM"
 */

interface ClockFaceProps {
  time: string; // e.g. "3:15" or "10:30"
  size?: number; // diameter in px, default 200
}

export default function ClockFace({ time, size = 200 }: ClockFaceProps) {
  const [hourStr, minuteStr] = time.split(":");
  const hours = parseInt(hourStr, 10) % 12;
  const minutes = parseInt(minuteStr, 10);

  // Angles in degrees (0 = 12 o'clock position, clockwise)
  // Hour hand: each hour = 30°, each minute moves hour hand 0.5°
  const hourAngle = hours * 30 + minutes * 0.5;
  // Minute hand: each minute = 6°
  const minuteAngle = minutes * 6;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4; // outer radius with small padding

  // Hand lengths as fraction of radius
  const hourLen = r * 0.55;
  const minuteLen = r * 0.78;

  // Convert angle to x,y endpoint (angle 0 = top = 12 o'clock)
  const toXY = (angle: number, length: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + length * Math.cos(rad),
      y: cy + length * Math.sin(rad),
    };
  };

  const hourEnd = toXY(hourAngle, hourLen);
  const minuteEnd = toXY(minuteAngle, minuteLen);

  // Tick marks for 12 hours
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const isHour = i % 5 === 0;
    const tickAngle = i * 6;
    const outerR = r;
    const innerR = isHour ? r - size * 0.08 : r - size * 0.04;
    const start = toXY(tickAngle + 90, outerR); // +90 to offset toXY's -90
    const end = toXY(tickAngle + 90, innerR);
    // Actually use direct trig without the -90 offset trick
    const rad = ((tickAngle - 90) * Math.PI) / 180;
    const sx = cx + outerR * Math.cos(rad);
    const sy = cy + outerR * Math.sin(rad);
    const ex = cx + innerR * Math.cos(rad);
    const ey = cy + innerR * Math.sin(rad);
    return { sx, sy, ex, ey, isHour };
  });

  // Hour number positions
  const hourNumbers = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const angle = num * 30;
    const rad = ((angle - 90) * Math.PI) / 180;
    const numR = r - size * 0.18;
    return {
      num,
      x: cx + numR * Math.cos(rad),
      y: cy + numR * Math.sin(rad),
    };
  });

  const fontSize = size * 0.1;
  const hourStrokeWidth = size * 0.045;
  const minuteStrokeWidth = size * 0.03;
  const centerDotR = size * 0.04;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block" }}
      aria-label={`Analog clock showing ${time}`}
    >
      {/* Clock face background */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#fffbf0"
        stroke="#d97706"
        strokeWidth={size * 0.025}
      />

      {/* Subtle honeycomb-style outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r - size * 0.01}
        fill="none"
        stroke="#fbbf24"
        strokeWidth={size * 0.01}
        opacity={0.4}
      />

      {/* Tick marks */}
      {ticks.map((tick, i) => (
        <line
          key={i}
          x1={tick.sx}
          y1={tick.sy}
          x2={tick.ex}
          y2={tick.ey}
          stroke={tick.isHour ? "#92400e" : "#d97706"}
          strokeWidth={tick.isHour ? size * 0.018 : size * 0.008}
          strokeLinecap="round"
        />
      ))}

      {/* Hour numbers */}
      {hourNumbers.map(({ num, x, y }) => (
        <text
          key={num}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={fontSize}
          fontWeight="700"
          fontFamily="'Fredoka One', 'Nunito', sans-serif"
          fill="#78350f"
        >
          {num}
        </text>
      ))}

      {/* Hour hand */}
      <line
        x1={cx}
        y1={cy}
        x2={hourEnd.x}
        y2={hourEnd.y}
        stroke="#1e1b4b"
        strokeWidth={hourStrokeWidth}
        strokeLinecap="round"
      />

      {/* Minute hand */}
      <line
        x1={cx}
        y1={cy}
        x2={minuteEnd.x}
        y2={minuteEnd.y}
        stroke="#4338ca"
        strokeWidth={minuteStrokeWidth}
        strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={centerDotR} fill="#d97706" />
      <circle cx={cx} cy={cy} r={centerDotR * 0.5} fill="#78350f" />
    </svg>
  );
}
