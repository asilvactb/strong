import type { CSSProperties, ReactNode } from "react";

/** Headline split into masked lines that rise in when the parent gets `.in`. */
export default function Lines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  immediate = false,
  greyLast = false,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
  immediate?: boolean;
  greyLast?: boolean;
}) {
  return (
    <Tag className={className} data-reveal={immediate ? undefined : ""}>
      {lines.map((l, i) => (
        <span key={i} className={`ln${immediate ? " in" : ""}`} style={{ "--i": i, "--d": `${delay}ms` } as CSSProperties}>
          <span className={greyLast && i === lines.length - 1 ? "opacity-40" : undefined}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
