"use client";

import { useState } from "react";
import { DONATE } from "@/lib/site";

const PRESETS = [10, 25, 50];

/**
 * Provider-agnostic donation widget. The amount selector is passed through to
 * the configured donation URL where supported (?amount=NN). When no provider is
 * configured it renders a clearly-marked placeholder — never a fake processor,
 * never a tax-deductibility claim.
 */
export function DonateWidget() {
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState("");

  const configured = DONATE.provider !== "placeholder" && DONATE.url !== "";
  const effectiveAmount = custom ? Number(custom) : amount;

  function donateHref() {
    if (!configured) return "#";
    try {
      const url = new URL(DONATE.url);
      if (effectiveAmount > 0) url.searchParams.set("amount", String(effectiveAmount));
      return url.toString();
    } catch {
      return DONATE.url;
    }
  }

  return (
    <div className="rounded-sm border border-engravers/20 bg-bone/40 p-6 sm:p-8">
      <p className="stat-label mb-4">Choose an amount</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={!custom && amount === p}
            onClick={() => {
              setAmount(p);
              setCustom("");
            }}
            className={`rounded-sm border px-4 py-3 font-medium transition-colors ${
              !custom && amount === p
                ? "border-tyrian bg-tyrian text-vellum"
                : "border-engravers/25 hover:border-tyrian"
            }`}
          >
            ${p}
          </button>
        ))}
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-engravers/50"
          >
            $
          </span>
          <label htmlFor="donate-custom" className="sr-only">
            Custom amount
          </label>
          <input
            id="donate-custom"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Other"
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ""))}
            className="w-full rounded-sm border border-engravers/25 bg-vellum py-3 pl-7 pr-3 outline-none focus:border-tyrian"
          />
        </div>
      </div>

      {configured ? (
        <a
          href={donateHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-tyrian mt-5 w-full justify-center"
        >
          Donate ${effectiveAmount || 0} via {DONATE.provider} →
        </a>
      ) : (
        <div className="mt-5">
          <button
            type="button"
            disabled
            className="btn-tyrian w-full cursor-not-allowed justify-center opacity-60"
          >
            Donations open soon
          </button>
          <p className="mt-3 text-sm text-engravers/65">
            {/* TODO(owner): set NEXT_PUBLIC_DONATE_PROVIDER + NEXT_PUBLIC_DONATE_URL
                (e.g. Every.org, Open Collective, or Donorbox) to activate this. */}
            <strong className="font-medium">Placeholder:</strong> our donation
            processor isn&rsquo;t connected yet. {""}
            {ORG_FUNDING_NOTE}
          </p>
        </div>
      )}
    </div>
  );
}

const ORG_FUNDING_NOTE =
  "We are not yet a registered 501(c)(3); donations are not currently tax-deductible.";
