"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSite, type Locale } from "@/lib/i18n";

export function QuoteForm({ locale, endpoint }: { locale: Locale; endpoint: string }) {
  const params = useSearchParams();
  const preset = params.get("application") || "";
  return <QuoteFormFields locale={locale} endpoint={endpoint.trim()} preset={preset} />;
}

function QuoteFormFields({
  locale,
  endpoint,
  preset,
}: {
  locale: Locale;
  endpoint: string;
  preset: string;
}) {
  const site = getSite(locale);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const [fileName, setFileName] = useState("");
  const [mailtoText, setMailtoText] = useState("");
  const [application, setApplication] = useState("");

  useEffect(() => {
    if (preset) setApplication(preset);
  }, [preset]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("drawing");
    if (file instanceof File && file.size === 0) data.delete("drawing");

    const summary = [
      `${site.form.name}: ${data.get("name") || ""}`,
      `${site.form.company}: ${data.get("company") || ""}`,
      `${site.form.email}: ${data.get("email") || ""}`,
      `${site.form.phone}: ${data.get("phone") || ""}`,
      `${site.form.application}: ${data.get("application") || ""}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");

    if (!endpoint) {
      const href = `mailto:${site.company.email}?subject=${encodeURIComponent(site.form.subject)}&body=${encodeURIComponent(summary)}`;
      setMailtoText(summary);
      setStatus("mailto");
      window.location.href = href;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="success" role="status">
        <h2>{site.ui.enquirySent}</h2>
        <p>{site.ui.enquiryThanks}</p>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={onSubmit}>
      <h2 className="form-title">{site.form.title}</h2>
      {!endpoint && <p className="form-note">{site.ui.mailtoNotice}</p>}
      {status === "error" && <p className="form-error">{site.ui.formError}</p>}
      {status === "mailto" && (
        <div className="success" role="status">
          <h2>{site.ui.mailtoOpened}</h2>
          <p>{site.ui.mailtoBody}</p>
          <pre>{mailtoText}</pre>
        </div>
      )}
      <div className="fields">
        <label>
          {site.form.name}
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          {site.form.company}
          <input name="company" type="text" autoComplete="organization" />
        </label>
        <label>
          {site.form.email}
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          {site.form.phone}
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="full">
          {site.form.application}
          <input name="application" type="text" value={application} onChange={(event) => setApplication(event.target.value)} />
        </label>
        <label className="full">
          {site.form.requirement}
          <textarea name="message" required />
        </label>
        <label className="full">
          {site.ui.fileLabel}
          <span className="filebox">
            <input
              name="drawing"
              type="file"
              onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
            />
            <span>{fileName || site.ui.chooseFile}</span>
          </span>
        </label>
      </div>
      <input type="hidden" name="_subject" value={site.form.subject} />
      <input type="text" name="_gotcha" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? site.ui.sending : site.ui.sendEnquiry} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
