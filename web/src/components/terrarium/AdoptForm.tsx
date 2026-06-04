"use client";

import { useState, useTransition } from "react";
import { adoptAction } from "@/app/terrarium/actions";

export function AdoptForm({ suggestedName }: { suggestedName: string }) {
  const [name, setName] = useState(suggestedName);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        startTransition(async () => {
          const res = await adoptAction(name);
          if (!res.ok) setError(res.error ?? "Something went wrong.");
        });
      }}
      className="mt-6 flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="adopt-name" className="sr-only">
        Name your snail
      </label>
      <input
        id="adopt-name"
        value={name}
        maxLength={30}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name your snail"
        className="flex-1 rounded-sm border border-engravers/25 bg-vellum px-4 py-3 outline-none focus:border-tyrian"
      />
      <button type="submit" disabled={pending} className="btn-tyrian justify-center disabled:opacity-60">
        {pending ? "Settling in…" : "Adopt a snail"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-tyrian">
          {error}
        </p>
      )}
    </form>
  );
}
