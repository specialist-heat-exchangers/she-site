"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/config";
import { Rich } from "./ui";
import {
  equivalentPath,
  getSite,
  localeFromPath,
  localePath,
  otherLocale,
  type Locale,
} from "@/lib/i18n";

function useLocale(): Locale {
  const pathname = usePathname() || "/";
  const [locale, setLocale] = useState<Locale>(localeFromPath(pathname));
  useEffect(() => {
    const next = localeFromPath(window.location.pathname);
    setLocale(next);
    document.documentElement.lang = next === "de" ? "de" : "en";
    document.documentElement.dataset.locale = next;
  }, [pathname]);
  return locale;
}

export function Chrome({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  return (
    <>
      <Header locale={locale} />
      <main id="main">{children}</main>
      <CtaBand locale={locale} />
      <Footer locale={locale} />
    </>
  );
}

function Header({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const switchHref = equivalentPath(pathname, otherLocale(locale));
  const menuId = useId();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOpen(false);
    setSearch(window.location.search);
    if (detailsRef.current) detailsRef.current.open = false;
  }, [pathname]);

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        detailsRef.current.open = false;
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && detailsRef.current) detailsRef.current.open = false;
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="inner header-inner">
        <Link className="logo" href={localePath(locale, "/")} aria-label={site.meta.siteName}>
          <img src={asset("/brand/logo.webp")} alt="" />
        </Link>
        <nav className="primary" aria-label={site.ui.menu}>
          {site.nav.map((item) => {
            const href = localePath(locale, item.href);
            const current = normalize(pathname) === normalize(href);
            return (
              <Link key={item.href} href={href} aria-current={current ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="header-tools">
          <details className="lang" ref={detailsRef}>
            <summary aria-label={site.ui.language}>
              <span className="lang-code">{locale.toUpperCase()}</span>
              <svg className="chev" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </summary>
            <div className="lang-menu" role="list">
              <LocaleLink locale="en" current={locale} href={withSearch(equivalentPath(pathname, "en"), search)} label={site.ui.english} />
              <LocaleLink locale="de" current={locale} href={withSearch(equivalentPath(pathname, "de"), search)} label={site.ui.german} />
            </div>
          </details>
          <Link className="btn quote-desktop" href={localePath(locale, "/contact/")}>
            {site.ui.requestQuote} <span aria-hidden="true">→</span>
          </Link>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? site.ui.close : site.ui.menu}</span>
            <span className="burger" aria-hidden="true" />
          </button>
        </div>
        <div id={menuId} className={open ? "mobile-panel open" : "mobile-panel"} hidden={!open}>
          {site.nav.map((item) => (
            <Link key={item.href} href={localePath(locale, item.href)} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="btn" href={localePath(locale, "/contact/")} onClick={() => setOpen(false)}>
            {site.ui.requestQuote} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <span className="sr-only">
          {site.ui.language}: {locale === "de" ? site.ui.german : site.ui.english}. {switchHref}
        </span>
      </div>
    </header>
  );
}

function LocaleLink({
  locale,
  current,
  href,
  label,
}: {
  locale: Locale;
  current: Locale;
  href: string;
  label: string;
}) {
  return (
    <Link href={href} hrefLang={locale} lang={locale} aria-current={current === locale ? "true" : undefined} role="listitem">
      <span className="lang-code">{locale.toUpperCase()}</span>
      <span>{label}</span>
    </Link>
  );
}

function CtaBand({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  return (
    <section className="cta">
      <div className="inner cta-inner">
        <h2>{site.cta.title}</h2>
        <Link className="btn btn-dark" href={localePath(locale, site.cta.href)}>
          {site.cta.button} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [choice, setChoice] = useState<"unknown" | "on" | "off">("unknown");

  useEffect(() => {
    const stored = window.localStorage.getItem("she-analytics");
    if (stored === "on" || stored === "off") setChoice(stored);
  }, []);

  function save(next: "on" | "off") {
    window.localStorage.setItem("she-analytics", next);
    setChoice(next);
    dialogRef.current?.close();
  }

  return (
    <footer className="site-footer">
      <div className="inner">
        <div className="footer-grid">
          <div>
            <h2>{site.footerLabels.company}</h2>
            <p>
              {site.company.legalName}
              <br />
              {site.company.divisionLine}
            </p>
          </div>
          <div>
            <h2>{site.footerLabels.headOffice}</h2>
            <p>
              {site.company.addressLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div>
            <h2>{site.footerLabels.enquiries}</h2>
            <p>
              <a href={site.company.phoneHref}>{site.company.phone}</a>
              <br />
              <a href={`mailto:${site.company.email}`}>{site.company.email}</a>
            </p>
          </div>
          <div>
            <h2>{site.footerLabels.pages}</h2>
            {site.footerNav.map((row, index) => (
              <p key={index}>
                {row.map((item, itemIndex) => (
                  <span key={item.href}>
                    {itemIndex > 0 && <span aria-hidden="true"> · </span>}
                    <Link href={localePath(locale, item.href)}>{item.label}</Link>
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
        <p className="legal">
          © {site.company.legalName} · {site.legal.companyNo} <Rich text={site.company.companyNumber} /> · {site.legal.vat}{" "}
          <Rich text={site.company.vat} /> · <Link href={localePath(locale, "/privacy/")}>{site.legal.privacy}</Link> ·{" "}
          <button type="button" className="linkish" onClick={() => dialogRef.current?.showModal()}>
            {site.legal.cookies}
          </button>{" "}
          · {site.legal.rev}
        </p>
      </div>
      <dialog ref={dialogRef} className="cookie-dialog" aria-labelledby="cookie-title">
        <h2 id="cookie-title">{site.ui.cookieTitle}</h2>
        <p>{site.ui.cookieBody}</p>
        <p className="cookie-state">{choice === "on" ? site.ui.cookieOn : site.ui.cookieOff}</p>
        <div className="cookie-actions">
          <button type="button" className="btn" onClick={() => save("on")}>
            {site.ui.cookieAccept}
          </button>
          <button type="button" className="btn btn-dark" onClick={() => save("off")}>
            {site.ui.cookieReject}
          </button>
        </div>
      </dialog>
    </footer>
  );
}

function withSearch(href: string, search: string) {
  if (!search || href.includes("?")) return href;
  return `${href}${search}`;
}

function normalize(path: string) {
  const bare = path.split("?")[0].split("#")[0];
  if (bare.length > 1 && bare.endsWith("/")) return bare;
  return bare.endsWith("/") ? bare : `${bare}/`;
}
