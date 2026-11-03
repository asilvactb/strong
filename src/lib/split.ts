/** Split a headline into display lines: by sentence, otherwise into two balanced halves. */
export function splitTitle(s: string): string[] {
  const sentences = s.split(/(?<=[.,])\s+/).filter(Boolean);
  if (sentences.length > 1) return sentences;
  const w = s.split(" ");
  if (w.length < 3) return [s];
  let best = 1, diff = Infinity;
  for (let i = 1; i < w.length; i++) {
    const d = Math.abs(w.slice(0, i).join(" ").length - w.slice(i).join(" ").length);
    if (d < diff) (diff = d), (best = i);
  }
  return [w.slice(0, best).join(" "), w.slice(best).join(" ")];
}
