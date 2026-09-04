// Ambient background decoration: dinosaurs running across the screen and
// color bubbles floating up, behind all real content. Purely cosmetic —
// fixed, z-index below everything, pointer-events: none — so it never
// intercepts a click or shifts layout. Mounted once at the app root
// (App.jsx) so it's visible on every page, not per-route.
const DINOS = [
  { emoji: "🦖", top: "8%", size: 30, duration: 26, delay: -4 },
  { emoji: "🦕", top: "28%", size: 24, duration: 34, delay: -18 },
  { emoji: "🦖", top: "62%", size: 26, duration: 30, delay: -9 },
  { emoji: "🦕", top: "82%", size: 32, duration: 22, delay: -14 },
];

const BUBBLE_COLORS = ["#4c6fff", "#8b5cf6", "#16c79a", "#ffb020", "#ef5757", "#00b4d8"];

// Deterministic-but-varied bubble layout, computed once at module load
// (not per render) so bubbles don't jump around on re-render.
const BUBBLES = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 8.3 + (i % 3) * 5) % 100}%`,
  size: 14 + ((i * 7) % 26),
  color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
  duration: 16 + ((i * 5) % 14),
  delay: -((i * 3) % 18),
}));

export default function BackgroundDecor() {
  return (
    <div className="bg-decor" aria-hidden="true">
      {DINOS.map((d, i) => (
        <span
          key={i}
          className="bg-decor-dino"
          style={{
            top: d.top,
            fontSize: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        >
          {d.emoji}
        </span>
      ))}
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="bg-decor-bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            background: b.color,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
