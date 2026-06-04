import Link from "next/link";
import type { LineageNode } from "@/lib/terrarium/service";

/**
 * A simple, legible lineage view: parents above, the snail in the middle, and
 * offspring below. Not a full force-directed tree — calm and readable, on-brand.
 */
export function LineageTree({
  self,
  ancestors,
  descendants,
}: {
  self: { name: string; generation: number };
  ancestors: LineageNode[];
  descendants: LineageNode[];
}) {
  return (
    <div className="text-center">
      {ancestors.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center gap-2">
            {ancestors.map((a) => (
              <Node key={a.id} node={a} />
            ))}
          </div>
          <Connector />
        </>
      )}

      <div className="inline-block rounded-sm border border-tyrian/50 bg-tyrian/5 px-4 py-2">
        <span className="font-display text-lg text-tyrian">{self.name}</span>
        <span className="ml-2 text-xs text-engravers/55">gen {self.generation}</span>
      </div>

      {descendants.length > 0 && (
        <>
          <Connector />
          <div className="flex flex-wrap justify-center gap-2">
            {descendants.map((d) => (
              <Node key={d.id} node={d} link />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Node({ node, link }: { node: LineageNode; link?: boolean }) {
  const inner = (
    <span className="inline-block rounded-sm border border-engravers/20 bg-bone/40 px-3 py-1.5 text-sm">
      {node.name}{" "}
      <span className="text-xs text-engravers/45">gen {node.generation}</span>
    </span>
  );
  return link ? (
    <Link href={`/terrarium/snail/${node.id}`} className="hover:opacity-80">
      {inner}
    </Link>
  ) : (
    inner
  );
}

function Connector() {
  return <div aria-hidden className="mx-auto my-2 h-5 w-px bg-engravers/25" />;
}
