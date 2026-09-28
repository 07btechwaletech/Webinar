// Dot positions around a 400×400 ring: the studio clock motif used across the page.
// Rounded so server and browser trig agree to the last digit (avoids hydration mismatch).
const round = (n: number) => Math.round(n * 100) / 100;

export function ringPoint(index: number, total: number, radius: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return { cx: round(200 + radius * Math.cos(angle)), cy: round(200 + radius * Math.sin(angle)) };
}
