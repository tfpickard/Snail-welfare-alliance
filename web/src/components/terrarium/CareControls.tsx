"use client";

import { useState, useTransition } from "react";
import {
  feedAction,
  estivateAction,
  renameAction,
} from "@/app/terrarium/actions";

type Props = {
  snailId: string;
  estivating: boolean;
  currentName: string;
};

export function CareControls({ snailId, estivating, currentName }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(currentName);

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setError("");
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Something went wrong.");
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => feedAction(snailId, "leaf"))}
          className="btn-outline text-sm disabled:opacity-60"
        >
          Feed a leaf
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => feedAction(snailId, "cuttlebone"))}
          className="btn-outline text-sm disabled:opacity-60"
        >
          Offer cuttlebone
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => estivateAction(snailId, !estivating))}
          className="btn-outline text-sm disabled:opacity-60"
        >
          {estivating ? "Wake gently" : "Estivate (going away?)"}
        </button>
        <button
          type="button"
          onClick={() => setRenaming((v) => !v)}
          className="btn-outline text-sm"
        >
          Rename
        </button>
      </div>

      {renaming && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(async () => {
              const res = await renameAction(snailId, name);
              if (res.ok) setRenaming(false);
              return res;
            });
          }}
          className="flex gap-2"
        >
          <label htmlFor="rename" className="sr-only">
            New name
          </label>
          <input
            id="rename"
            value={name}
            maxLength={30}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-sm border border-engravers/25 bg-vellum px-3 py-2 outline-none focus:border-tyrian"
          />
          <button type="submit" disabled={pending} className="btn-tyrian text-sm">
            Save
          </button>
        </form>
      )}

      {error && (
        <p role="alert" className="text-sm text-tyrian">
          {error}
        </p>
      )}
    </div>
  );
}
