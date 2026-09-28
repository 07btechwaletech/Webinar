// A hand-drawn arrow that draws itself in, shaft first, then the head. Pair it with a `.hand` note.
const ARROWS = {
  // curls down and to the left, towards something below
  down: ["M88 6C70 4 40 10 30 30c-6 12-4 26 4 38", "M22 58l12 12 10-15"],
  // sweeps left, towards something beside it
  left: ["M92 30C70 12 40 14 14 30", "M26 18L12 31l16 8"],
};

export function Scribble({ to = "down", className = "", delay = 900 }: { to?: keyof typeof ARROWS; className?: string; delay?: number }) {
  const [shaft, head] = ARROWS[to];
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`draw ${className}`}
      aria-hidden="true"
    >
      <path d={shaft} pathLength={1} style={{ "--d": `${delay}ms` } as React.CSSProperties} />
      <path d={head} pathLength={1} style={{ "--d": `${delay + 500}ms` } as React.CSSProperties} />
    </svg>
  );
}
