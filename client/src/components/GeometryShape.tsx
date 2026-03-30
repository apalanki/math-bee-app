/**
 * GeometryShape — SVG shape renderer for geometry questions
 * Renders labeled diagrams for squares, rectangles, triangles, polygons, and 3D shapes
 * Design: Honeycomb Kingdom theme (amber/honey palette)
 */

interface GeometryShapeProps {
  question: string; // The question text to parse for shape type and dimensions
  size?: number;    // Container size in px, default 160
}

/** Parse dimensions from question text */
function parseDimensions(q: string): { type: string; params: Record<string, number> } {
  const lower = q.toLowerCase();

  // Rectangle: "Rectangle: l=9, w=6" or "Rectangle: length=2cm, width=1cm"
  const rectMatch = q.match(/[Rr]ectangle[:\s]+(?:l(?:ength)?)\s*=\s*([\d.]+)[^,]*,\s*(?:w(?:idth)?)\s*=\s*([\d.]+)/i);
  if (rectMatch) {
    return { type: 'rectangle', params: { l: parseFloat(rectMatch[1]), w: parseFloat(rectMatch[2]) } };
  }

  // Square: "A square has side length N"
  const squareMatch = q.match(/square has side length ([\d.]+)/i);
  if (squareMatch) {
    return { type: 'square', params: { s: parseFloat(squareMatch[1]) } };
  }

  // Triangle: "A triangle has side length N" or "Triangle: sides a=N, b=N, c=N"
  const triangleMatch = q.match(/triangle[:\s]+(?:sides?\s+)?a\s*=\s*([\d.]+)[^,]*,\s*b\s*=\s*([\d.]+)[^,]*,\s*c\s*=\s*([\d.]+)/i);
  if (triangleMatch) {
    return { type: 'triangle', params: { a: parseFloat(triangleMatch[1]), b: parseFloat(triangleMatch[2]), c: parseFloat(triangleMatch[3]) } };
  }

  // Shape identification questions — extract shape name
  const shapeNames = ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'heptagon', 'octagon', 'nonagon', 'decagon', 'rhombus', 'trapezoid', 'parallelogram', 'circle'];
  for (const shape of shapeNames) {
    if (lower.includes(shape)) {
      return { type: shape, params: {} };
    }
  }

  // 3D shapes
  const shapes3d = ['cube', 'rectangular prism', 'cylinder', 'cone', 'triangular prism', 'square pyramid', 'sphere'];
  for (const shape of shapes3d) {
    if (lower.includes(shape)) {
      return { type: shape.replace(' ', '_'), params: {} };
    }
  }

  // Angle type questions
  if (lower.includes('angle')) {
    const degMatch = q.match(/(\d+)°/);
    if (degMatch) {
      return { type: 'angle', params: { deg: parseInt(degMatch[1]) } };
    }
  }

  // Lines of symmetry questions
  if (lower.includes('lines of symmetry')) {
    const shapeMatch = lower.match(/lines of symmetry does a (\w+)/);
    if (shapeMatch) {
      return { type: shapeMatch[1], params: {} };
    }
  }

  return { type: 'unknown', params: {} };
}

/** Color palette */
const C = {
  fill: '#FEF3C7',
  stroke: '#D97706',
  strokeDark: '#92400E',
  label: '#78350F',
  dimLabel: '#1D4ED8',
  bg: '#FFFBF0',
  angleFill: '#EFF6FF',
  angleStroke: '#3B82F6',
};

export default function GeometryShape({ question, size = 160 }: GeometryShapeProps) {
  const { type, params } = parseDimensions(question);
  const cx = size / 2;
  const cy = size / 2;
  const pad = size * 0.12;

  const labelStyle: React.CSSProperties = {
    fontSize: size * 0.09,
    fontWeight: 700,
    fontFamily: "'Fredoka One', 'Nunito', sans-serif",
    fill: C.dimLabel,
  };

  const shapeLabel: React.CSSProperties = {
    fontSize: size * 0.085,
    fontWeight: 700,
    fontFamily: "'Fredoka One', 'Nunito', sans-serif",
    fill: C.label,
  };

  // ── RECTANGLE / SQUARE ──────────────────────────────────────────
  if (type === 'rectangle' || type === 'square') {
    const l = params.l ?? params.s ?? 6;
    const w = params.w ?? params.s ?? 6;
    const ratio = l / w;
    const maxW = size - pad * 2;
    const maxH = size - pad * 2;
    let rw: number, rh: number;
    if (ratio >= 1) {
      rw = maxW;
      rh = Math.min(maxH, maxW / ratio);
    } else {
      rh = maxH;
      rw = Math.min(maxW, maxH * ratio);
    }
    const rx = (size - rw) / 2;
    const ry = (size - rh) / 2;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`${type} shape`}>
        <rect x={rx} y={ry} width={rw} height={rh} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.025} rx={size * 0.02} />
        {/* Right angle marks */}
        {[0, 1, 2, 3].map(i => {
          const corners = [
            { x: rx, y: ry },
            { x: rx + rw, y: ry },
            { x: rx + rw, y: ry + rh },
            { x: rx, y: ry + rh },
          ];
          const dirs = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
          const m = size * 0.06;
          const c = corners[i];
          const d = dirs[i];
          return (
            <path key={i}
              d={`M ${c.x + d[0] * m} ${c.y} L ${c.x + d[0] * m} ${c.y + d[1] * m} L ${c.x} ${c.y + d[1] * m}`}
              fill="none" stroke={C.strokeDark} strokeWidth={size * 0.015} />
          );
        })}
        {/* Width label (top) */}
        <text x={cx} y={ry - size * 0.05} textAnchor="middle" style={labelStyle}>{l}</text>
        {/* Height label (right) */}
        <text x={rx + rw + size * 0.07} y={cy} textAnchor="middle" dominantBaseline="central" style={labelStyle}>{w}</text>
      </svg>
    );
  }

  // ── TRIANGLE ────────────────────────────────────────────────────
  if (type === 'triangle') {
    const bx1 = pad, bx2 = size - pad, by = size - pad;
    const tx = cx, ty = pad;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="triangle shape">
        <polygon points={`${tx},${ty} ${bx1},${by} ${bx2},${by}`} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.025} />
        {params.a && <text x={cx} y={by + size * 0.08} textAnchor="middle" style={labelStyle}>{params.a}</text>}
        {params.b && <text x={(tx + bx1) / 2 - size * 0.08} y={(ty + by) / 2} textAnchor="middle" style={labelStyle}>{params.b}</text>}
        {params.c && <text x={(tx + bx2) / 2 + size * 0.08} y={(ty + by) / 2} textAnchor="middle" style={labelStyle}>{params.c}</text>}
      </svg>
    );
  }

  // ── EQUILATERAL TRIANGLE ─────────────────────────────────────────
  if (type === 'equilateral triangle') {
    const bx1 = pad, bx2 = size - pad, by = size - pad;
    const tx = cx, ty = pad;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="equilateral triangle">
        <polygon points={`${tx},${ty} ${bx1},${by} ${bx2},${by}`} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.025} />
        <text x={cx} y={size - size * 0.04} textAnchor="middle" style={shapeLabel}>Equilateral △</text>
      </svg>
    );
  }

  // ── ISOSCELES TRIANGLE ───────────────────────────────────────────
  if (type === 'isosceles triangle') {
    const bx1 = pad * 1.5, bx2 = size - pad * 1.5, by = size - pad;
    const tx = cx, ty = pad;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="isosceles triangle">
        <polygon points={`${tx},${ty} ${bx1},${by} ${bx2},${by}`} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.025} />
        <text x={cx} y={size - size * 0.04} textAnchor="middle" style={shapeLabel}>Isosceles △</text>
      </svg>
    );
  }

  // ── SCALENE TRIANGLE ─────────────────────────────────────────────
  if (type === 'scalene triangle') {
    const bx1 = pad, bx2 = size - pad * 1.5, by = size - pad;
    const tx = pad * 1.8, ty = pad;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="scalene triangle">
        <polygon points={`${tx},${ty} ${bx1},${by} ${bx2},${by}`} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.025} />
        <text x={cx} y={size - size * 0.04} textAnchor="middle" style={shapeLabel}>Scalene △</text>
      </svg>
    );
  }

  // ── REGULAR POLYGON (pentagon, hexagon, heptagon, octagon, nonagon, decagon) ──
  const polygonSides: Record<string, number> = {
    pentagon: 5, hexagon: 6, heptagon: 7, octagon: 8, nonagon: 9, decagon: 10,
  };
  if (polygonSides[type]) {
    const n = polygonSides[type];
    const r = size / 2 - pad;
    const points = Array.from({ length: n }, (_, i) => {
      const angle = ((i * 360) / n - 90) * (Math.PI / 180);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`${type} shape`}>
        <polygon points={points} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.025} />
      </svg>
    );
  }

  // ── RHOMBUS ──────────────────────────────────────────────────────
  if (type === 'rhombus') {
    const hw = size / 2 - pad;
    const hh = size / 2 - pad * 1.3;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="rhombus shape">
        <polygon points={`${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`}
          fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.025} />
      </svg>
    );
  }

  // ── TRAPEZOID ────────────────────────────────────────────────────
  if (type === 'trapezoid') {
    const bw = size - pad * 2;
    const tw = size * 0.5;
    const h = size * 0.45;
    const by = cy + h / 2;
    const ty2 = cy - h / 2;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="trapezoid shape">
        <polygon points={`${cx - tw / 2},${ty2} ${cx + tw / 2},${ty2} ${cx + bw / 2},${by} ${cx - bw / 2},${by}`}
          fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.025} />
      </svg>
    );
  }

  // ── PARALLELOGRAM ────────────────────────────────────────────────
  if (type === 'parallelogram') {
    const w2 = size * 0.38, h2 = size * 0.22, offset = size * 0.12;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="parallelogram shape">
        <polygon points={`${cx - w2 + offset},${cy - h2} ${cx + w2 + offset},${cy - h2} ${cx + w2 - offset},${cy + h2} ${cx - w2 - offset},${cy + h2}`}
          fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.025} />
      </svg>
    );
  }

  // ── CIRCLE ───────────────────────────────────────────────────────
  if (type === 'circle') {
    const r = size / 2 - pad;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="circle shape">
        <circle cx={cx} cy={cy} r={r} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.025} />
      </svg>
    );
  }

  // ── ANGLE ────────────────────────────────────────────────────────
  if (type === 'angle') {
    const deg = params.deg ?? 45;
    const armLen = size * 0.38;
    const baseX = size * 0.2, baseY = size * 0.78;
    const arm1X = baseX + armLen, arm1Y = baseY;
    const rad = (deg * Math.PI) / 180;
    const arm2X = baseX + armLen * Math.cos(-rad);
    const arm2Y = baseY + armLen * Math.sin(-rad);
    // Arc
    const arcR = size * 0.12;
    const arcX = baseX + arcR * Math.cos(-rad);
    const arcY = baseY + arcR * Math.sin(-rad);
    const largeArc = deg > 180 ? 1 : 0;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`${deg} degree angle`}>
        {/* Arms */}
        <line x1={baseX} y1={baseY} x2={arm1X} y2={arm1Y} stroke={C.stroke} strokeWidth={size * 0.03} strokeLinecap="round" />
        <line x1={baseX} y1={baseY} x2={arm2X} y2={arm2Y} stroke={C.stroke} strokeWidth={size * 0.03} strokeLinecap="round" />
        {/* Arc */}
        <path d={`M ${baseX + arcR} ${baseY} A ${arcR} ${arcR} 0 ${largeArc} 0 ${arcX} ${arcY}`}
          fill="none" stroke={C.angleStroke} strokeWidth={size * 0.02} />
        {/* Degree label */}
        <text x={baseX + size * 0.18} y={baseY - size * 0.08} textAnchor="middle" style={{ ...labelStyle, fill: C.dimLabel, fontSize: size * 0.1 }}>
          {deg}°
        </text>
        {/* Right angle mark for 90° */}
        {deg === 90 && (
          <rect x={baseX} y={baseY - size * 0.09} width={size * 0.09} height={size * 0.09}
            fill="none" stroke={C.angleStroke} strokeWidth={size * 0.018} />
        )}
      </svg>
    );
  }

  // ── 3D: CUBE ─────────────────────────────────────────────────────
  if (type === 'cube') {
    const s = size * 0.35;
    const ox = size * 0.15, oy = size * 0.15;
    const fx = cx - s / 2, fy = cy - s / 2;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="cube">
        {/* Front face */}
        <rect x={fx} y={fy} width={s} height={s} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.022} />
        {/* Top face */}
        <polygon points={`${fx},${fy} ${fx + ox},${fy - oy} ${fx + s + ox},${fy - oy} ${fx + s},${fy}`}
          fill="#FEF9C3" stroke={C.stroke} strokeWidth={size * 0.022} />
        {/* Right face */}
        <polygon points={`${fx + s},${fy} ${fx + s + ox},${fy - oy} ${fx + s + ox},${fy + s - oy} ${fx + s},${fy + s}`}
          fill="#FDE68A" stroke={C.stroke} strokeWidth={size * 0.022} />
      </svg>
    );
  }

  // ── 3D: RECTANGULAR PRISM ────────────────────────────────────────
  if (type === 'rectangular_prism') {
    const sw = size * 0.42, sh = size * 0.28;
    const ox = size * 0.15, oy = size * 0.12;
    const fx = cx - sw / 2, fy = cy - sh / 2 + size * 0.05;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="rectangular prism">
        <rect x={fx} y={fy} width={sw} height={sh} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.022} />
        <polygon points={`${fx},${fy} ${fx + ox},${fy - oy} ${fx + sw + ox},${fy - oy} ${fx + sw},${fy}`}
          fill="#FEF9C3" stroke={C.stroke} strokeWidth={size * 0.022} />
        <polygon points={`${fx + sw},${fy} ${fx + sw + ox},${fy - oy} ${fx + sw + ox},${fy + sh - oy} ${fx + sw},${fy + sh}`}
          fill="#FDE68A" stroke={C.stroke} strokeWidth={size * 0.022} />
      </svg>
    );
  }

  // ── 3D: CYLINDER ─────────────────────────────────────────────────
  if (type === 'cylinder') {
    const rr = size * 0.28, rh = size * 0.35;
    const ry2 = size * 0.12;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="cylinder">
        <rect x={cx - rr} y={cy - rh / 2} width={rr * 2} height={rh} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.022} />
        <ellipse cx={cx} cy={cy + rh / 2} rx={rr} ry={ry2} fill="#FDE68A" stroke={C.stroke} strokeWidth={size * 0.022} />
        <ellipse cx={cx} cy={cy - rh / 2} rx={rr} ry={ry2} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.022} />
      </svg>
    );
  }

  // ── 3D: CONE ─────────────────────────────────────────────────────
  if (type === 'cone') {
    const rr = size * 0.3, ry2 = size * 0.1;
    const tipY = size * 0.12, baseY = size * 0.78;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="cone">
        <polygon points={`${cx},${tipY} ${cx - rr},${baseY} ${cx + rr},${baseY}`} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.022} />
        <ellipse cx={cx} cy={baseY} rx={rr} ry={ry2} fill="#FDE68A" stroke={C.stroke} strokeWidth={size * 0.022} />
      </svg>
    );
  }

  // ── 3D: TRIANGULAR PRISM ─────────────────────────────────────────
  if (type === 'triangular_prism') {
    const tw2 = size * 0.32, th = size * 0.28;
    const ox = size * 0.14, oy = size * 0.12;
    const bly = cy + th / 2, tly = cy - th / 2;
    const blx = cx - tw2, brx = cx + tw2, tmx = cx;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="triangular prism">
        {/* Front triangle */}
        <polygon points={`${tmx},${tly} ${blx},${bly} ${brx},${bly}`} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.022} />
        {/* Top face */}
        <polygon points={`${tmx},${tly} ${tmx + ox},${tly - oy} ${blx + ox},${bly - oy} ${blx},${bly}`}
          fill="#FEF9C3" stroke={C.stroke} strokeWidth={size * 0.022} />
        {/* Right face */}
        <polygon points={`${brx},${bly} ${brx + ox},${bly - oy} ${tmx + ox},${tly - oy} ${tmx},${tly}`}
          fill="#FDE68A" stroke={C.stroke} strokeWidth={size * 0.022} />
      </svg>
    );
  }

  // ── 3D: SQUARE PYRAMID ───────────────────────────────────────────
  if (type === 'square_pyramid') {
    const bw = size * 0.5, bh = size * 0.2;
    const bx = cx - bw / 2, by = cy + size * 0.15;
    const tipX = cx, tipY = cy - size * 0.28;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="square pyramid">
        {/* Base ellipse */}
        <ellipse cx={cx} cy={by} rx={bw / 2} ry={bh / 2} fill="#FDE68A" stroke={C.stroke} strokeWidth={size * 0.022} />
        {/* Left face */}
        <polygon points={`${tipX},${tipY} ${bx},${by} ${cx},${by + bh / 2}`} fill={C.fill} stroke={C.stroke} strokeWidth={size * 0.022} />
        {/* Right face */}
        <polygon points={`${tipX},${tipY} ${bx + bw},${by} ${cx},${by + bh / 2}`} fill="#FEF9C3" stroke={C.stroke} strokeWidth={size * 0.022} />
      </svg>
    );
  }

  // ── FALLBACK: no visual ──────────────────────────────────────────
  return null;
}

/** Determine if a geometry question should show a shape diagram */
export function shouldShowShape(question: string): boolean {
  const lower = question.toLowerCase();
  // Show shapes for: sides/angles/perimeter/area/faces/vertices/symmetry/angle-type questions
  return (
    lower.includes('how many sides') ||
    lower.includes('how many angles') ||
    lower.includes('how many faces') ||
    lower.includes('how many vertices') ||
    lower.includes('perimeter') ||
    lower.includes('area') ||
    lower.includes('lines of symmetry') ||
    lower.includes('angle') ||
    lower.includes('triangle') ||
    lower.includes('square') ||
    lower.includes('rectangle') ||
    lower.includes('pentagon') ||
    lower.includes('hexagon') ||
    lower.includes('heptagon') ||
    lower.includes('octagon') ||
    lower.includes('nonagon') ||
    lower.includes('decagon') ||
    lower.includes('rhombus') ||
    lower.includes('trapezoid') ||
    lower.includes('parallelogram') ||
    lower.includes('circle') ||
    lower.includes('cube') ||
    lower.includes('cylinder') ||
    lower.includes('cone') ||
    lower.includes('prism') ||
    lower.includes('pyramid')
  );
}
