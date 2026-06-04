"use client";

import { useState, useTransition } from "react";
import { breedRespondAction } from "@/app/terrarium/actions";

type Request = { id: string; requesterSnailId: string };

export function BreedRequests({ requests }: { requests: Request[] }) {
  const [list, setList] = useState(requests);
  const [pending, startTransition] = useTransition();

  if (list.length === 0) return null;

  function respond(id: string, accept: boolean) {
    startTransition(async () => {
      await breedRespondAction(id, accept);
      setList((l) => l.filter((r) => r.id !== id));
    });
  }

  return (
    <div className="rounded-sm border border-tyrian/30 bg-tyrian/5 p-5">
      <p className="stat-label mb-3 text-tyrian">Pairing requests</p>
      <ul className="space-y-3">
        {list.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-3 text-sm">
            <span>
              Another keeper would like to pair with your snail. Both of you would
              receive a clutch.
            </span>
            <span className="flex shrink-0 gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={() => respond(r.id, true)}
                className="btn-tyrian text-sm disabled:opacity-60"
              >
                Accept
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => respond(r.id, false)}
                className="btn-outline text-sm disabled:opacity-60"
              >
                Decline
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
