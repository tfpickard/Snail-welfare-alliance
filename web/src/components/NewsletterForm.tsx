"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.message ?? "You’re on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className="rounded-sm border border-tyrian/30 bg-tyrian/5 px-4 py-3 text-tyrian"
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="nl-email" className="sr-only">
          Email address
        </label>
        <input
          id="nl-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-sm border border-engravers/25 bg-vellum px-4 py-3 outline-none focus:border-tyrian"
        />
        {/* Honeypot — visually hidden, off the tab order. */}
        <div aria-hidden className="absolute left-[-9999px]">
          <label htmlFor="nl-company">Company</label>
          <input
            id="nl-company"
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-tyrian justify-center disabled:opacity-60"
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-tyrian">
          {message}
        </p>
      )}
    </form>
  );
}
