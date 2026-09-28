import { ringPoint } from "@/lib/ring";

const DOTS = Array.from({ length: 60 }, (_, i) => i);

// Decorative echo of the studio clock: 60 dots, larger on every fifth.
export function DotRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      {DOTS.map((i) => (
        <circle key={i} {...ringPoint(i, 60, 190)} r={i % 5 === 0 ? 4.2 : 2.6} fill="currentColor" />
      ))}
    </svg>
  );
}
