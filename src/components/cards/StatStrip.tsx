import "./StatStrip.css";

interface Stat {
  value: string;
  label: string;
}

interface StatStripProps {
  stats: Stat[];
}

/** Utility-label stat row (Section 4.1) — Roboto Flex pushed to a bolder/wider variable-font
 * setting rather than loading a separate display face, per Section 2. */
export function StatStrip({ stats }: StatStripProps) {
  return (
    <dl className="stat-strip">
      {stats.map((stat) => (
        <div className="stat-strip__item" key={stat.label}>
          <dt>{stat.value}</dt>
          <dd>{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}
