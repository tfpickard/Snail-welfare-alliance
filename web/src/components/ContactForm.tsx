"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.message ?? "Thanks — your message is on its way.");
        setForm({ name: "", email: "", message: "", company: "" });
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

  const inputClass =
    "w-full rounded-sm border border-engravers/25 bg-vellum px-4 py-3 outline-none focus:border-tyrian";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="ct-name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="ct-name"
          name="name"
          required
          autoComplete="name"
          value={form.name}
          onChange={update("name")}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="ct-email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="ct-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={update("email")}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="ct-message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="ct-message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={update("message")}
          className={`${inputClass} resize-y`}
        />
      </div>
      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="ct-company">Company</label>
        <input
          id="ct-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update("company")}
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-tyrian justify-center disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-tyrian">
          {message}
        </p>
      )}
    </form>
  );
}
