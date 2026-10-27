/**
 * Animated botanical backdrop for the hero stage:
 * a swaying meadow of blossoms along the bottom and
 * flowering branches drifting in from the top corners.
 * Purely decorative — sits behind the gatefold card.
 */

import React from 'react';

type Palette = { petal: string; inner: string; center: string; stroke?: string };

const PALETTES: Palette[] = [
  { petal: '#E9CFC8', inner: '#DDB3A8', center: '#C9A66B' },                    // blush
  { petal: '#FFFCF7', inner: '#F3E6D3', center: '#C9A66B', stroke: '#E3CA98' }, // ivory
  { petal: '#D9A99D', inner: '#C98F83', center: '#A98548' },                    // deep rose
  { petal: '#F2DFD9', inner: '#E9CFC8', center: '#E3CA98' },                    // pale blush
  { petal: '#E3CA98', inner: '#C9A66B', center: '#A98548' },                    // gold
];

// Deterministic PRNG so the layout is identical on every render
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Bloom = {
  x: number;
  headX: number;
  headY: number;
  size: number;
  palette: Palette;
  petals: number;
  rotation: number;
  duration: number;
  delay: number;
};

type Blade = { x: number; height: number; lean: number; color: string; duration: number; delay: number };

const WIDTH = 1440;
const HEIGHT = 360;

function buildMeadow() {
  const rand = seeded(20261122);
  const rows = [
    { count: 26, yMin: 150, yMax: 210, sizeMin: 9, sizeMax: 14, opacity: 0.55 },
    { count: 22, yMin: 205, yMax: 265, sizeMin: 13, sizeMax: 19, opacity: 0.8 },
    { count: 16, yMin: 255, yMax: 320, sizeMin: 19, sizeMax: 28, opacity: 1 },
  ];

  const blooms = rows.map((row) =>
    Array.from({ length: row.count }, (_, i): Bloom => {
      const slot = WIDTH / row.count;
      const x = slot * i + slot * (0.15 + rand() * 0.7);
      return {
        x,
        headX: x + (rand() - 0.5) * 30,
        headY: row.yMin + rand() * (row.yMax - row.yMin),
        size: row.sizeMin + rand() * (row.sizeMax - row.sizeMin),
        palette: PALETTES[Math.floor(rand() * PALETTES.length)],
        petals: rand() > 0.3 ? 5 : 6,
        rotation: rand() * 72,
        duration: 4 + rand() * 3,
        delay: -rand() * 6,
      };
    })
  );

  const blades: Blade[] = Array.from({ length: 90 }, () => ({
    x: rand() * WIDTH,
    height: 50 + rand() * 120,
    lean: (rand() - 0.5) * 50,
    color: rand() > 0.35 ? '#A8B5A0' : '#7E9583',
    duration: 3.5 + rand() * 3,
    delay: -rand() * 5,
  }));

  return { blooms, opacities: rows.map((r) => r.opacity), blades };
}

const MEADOW = buildMeadow();

function petalPath(r: number) {
  return `M0,0 C${-r * 0.55},${-r * 0.35} ${-r * 0.55},${-r * 0.95} 0,${-r * 1.05} C${r * 0.55},${-r * 0.95} ${r * 0.55},${-r * 0.35} 0,0 Z`;
}

function BlossomHead({ size, palette, petals, rotation }: Pick<Bloom, 'size' | 'palette' | 'petals' | 'rotation'>) {
  const step = 360 / petals;
  return (
    <g transform={`rotate(${rotation})`}>
      {Array.from({ length: petals }, (_, i) => (
        <path
          key={i}
          d={petalPath(size)}
          transform={`rotate(${i * step})`}
          fill={palette.petal}
          stroke={palette.stroke ?? palette.inner}
          strokeWidth={0.6}
        />
      ))}
      {Array.from({ length: petals }, (_, i) => (
        <path
          key={`in-${i}`}
          d={petalPath(size * 0.45)}
          transform={`rotate(${i * step + step / 2})`}
          fill={palette.inner}
          opacity={0.7}
        />
      ))}
      <circle r={size * 0.22} fill={palette.center} />
      <circle r={size * 0.1} fill="#FFF9EF" opacity={0.6} cx={-size * 0.05} cy={-size * 0.05} />
    </g>
  );
}

function Branch({ side }: { side: 'left' | 'right' }) {
  const blossoms: Array<[number, number, number, number]> = [
    // x, y, size, palette index
    [150, 62, 15, 0],
    [218, 98, 12, 3],
    [262, 54, 10, 1],
    [300, 128, 14, 0],
    [96, 112, 11, 1],
    [352, 92, 9, 3],
    [190, 160, 10, 2],
    [58, 52, 13, 3],
    [330, 170, 8, 0],
  ];
  const buds: Array<[number, number]> = [[392, 120], [240, 190], [130, 150], [370, 205]];

  return (
    <div className={`hero-branch hero-branch-${side}`}>
      <svg viewBox="0 0 420 260" className="w-full h-full">
        <g className="hero-branch-sway">
          <path d="M-10,10 C60,40 120,70 200,96 C260,116 320,140 400,124" fill="none" stroke="#A98548" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
          <path d="M120,72 C150,110 175,140 190,160" fill="none" stroke="#A98548" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M260,118 C290,150 315,165 330,170 M300,128 C330,160 355,190 370,205" fill="none" stroke="#A98548" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
          <path d="M60,30 C80,40 90,60 96,112 M200,96 C215,70 240,58 262,54" fill="none" stroke="#A98548" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
          {/* leaves */}
          <path d="M170,86 C180,60 205,55 212,62 C200,80 185,88 170,86 Z" fill="#A8B5A0" opacity="0.85" />
          <path d="M280,124 C300,140 305,160 296,164 C282,150 278,136 280,124 Z" fill="#A8B5A0" opacity="0.8" />
          <path d="M40,24 C50,4 72,2 76,8 C66,22 54,28 40,24 Z" fill="#7E9583" opacity="0.6" />
          {buds.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={4.5} fill="#E9CFC8" stroke="#DDB3A8" strokeWidth="0.8" />
          ))}
          {blossoms.map(([x, y, size, p], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <g className="hero-blossom-breathe" style={{ animationDelay: `${-i * 0.7}s` }}>
                <BlossomHead size={size} palette={PALETTES[p]} petals={5} rotation={i * 23} />
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

// Static markup: memoised so parent re-renders never rebuild the SVG
export default React.memo(function HeroFlowerField() {
  return (
    <div className="hero-flower-field pointer-events-none" aria-hidden="true">
      <Branch side="left" />
      <Branch side="right" />

      <div className="hero-meadow">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMax slice" className="w-full h-full">
          <defs>
            <linearGradient id="meadowMist" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFF9EF" stopOpacity="0" />
              <stop offset="1" stopColor="#E9DCC4" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          <path d={`M0,${HEIGHT} L0,250 C240,215 480,240 720,225 C960,210 1200,235 ${WIDTH},215 L${WIDTH},${HEIGHT} Z`} fill="url(#meadowMist)" />

          <g className="hero-grass-sway">
          {MEADOW.blades.map((b, i) => (
            <path
              key={`blade-${i}`}
              d={`M${b.x - 3},${HEIGHT} Q${b.x + b.lean * 0.4},${HEIGHT - b.height * 0.6} ${b.x + b.lean},${HEIGHT - b.height} Q${b.x + b.lean * 0.3},${HEIGHT - b.height * 0.5} ${b.x + 3},${HEIGHT} Z`}
              fill={b.color}
              opacity={0.55}
            />
          ))}
          </g>

          {MEADOW.blooms.map((row, r) => (
            <g key={`row-${r}`} opacity={MEADOW.opacities[r]}>
              {row.map((f, i) => (
                <g
                  key={i}
                  className="hero-sway"
                  style={{ animationDuration: `${f.duration}s`, animationDelay: `${f.delay}s` }}
                >
                  <path
                    d={`M${f.x},${HEIGHT} Q${(f.x + f.headX) / 2 + 8},${(HEIGHT + f.headY) / 2} ${f.headX},${f.headY}`}
                    fill="none"
                    stroke="#7E9583"
                    strokeWidth={1 + r * 0.6}
                    strokeLinecap="round"
                  />
                  <path
                    d={`M${(f.x + f.headX) / 2},${(HEIGHT + f.headY) / 2 + 10} c${f.size * 0.9},${-f.size * 0.2} ${f.size * 1.1},${-f.size * 0.9} ${f.size * 0.9},${-f.size}`}
                    fill="#A8B5A0"
                    opacity={0.8}
                  />
                  <g transform={`translate(${f.headX} ${f.headY})`}>
                    <BlossomHead size={f.size} palette={f.palette} petals={f.petals} rotation={f.rotation} />
                  </g>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
});
