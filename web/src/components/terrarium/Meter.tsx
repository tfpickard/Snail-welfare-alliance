/** A small labelled progress meter for snail vitals (0..1). */
export function Meter({
  label,
  value,
  caption,
}: {
  label: string;
  value: number;
  caption?: string;
}) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="stat-label">{label}</span>
        {caption && <span className="text-xs text-engravers/55">{caption}</span>}
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-engravers/12">
        <div
          className="h-full rounded-full bg-tyrian/70"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
