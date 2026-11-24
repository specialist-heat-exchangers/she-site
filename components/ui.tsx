import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/config";
import { localePath, type Locale } from "@/lib/i18n";

const MARK = "[[CLIENT TO CONFIRM]]";

export function Rich({ text }: { text: string }) {
  const parts = text.split(MARK);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <mark className="confirm">{MARK}</mark>}
        </span>
      ))}
    </>
  );
}

export function ArrowLink({
  locale,
  href,
  children,
  tone = "ink",
}: {
  locale: Locale;
  href: string;
  children: ReactNode;
  tone?: "ink" | "light" | "amber";
}) {
  const className = `arrow-link ${tone}`;
  const external = href.startsWith("http");
  const inner = (
    <>
      {children}
      <span className="arrow" aria-hidden="true">
        →
      </span>
    </>
  );
  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className={className} href={localePath(locale, href)}>
      {inner}
    </Link>
  );
}

export function PageHero({
  locale,
  crumb,
  title,
  lede,
  tall = false,
  eyebrow,
  action,
}: {
  locale: Locale;
  crumb?: string;
  title: string;
  lede?: string;
  tall?: boolean;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <header className={`page-hero${tall ? " tall" : ""}`}>
      <div className="inner">
        {crumb && (
          <p className="crumb">
            <Link href={localePath(locale, "/")}>{locale === "de" ? "Start" : "Home"}</Link>
            <span aria-hidden="true"> / </span>
            {crumb}
          </p>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>
          <Rich text={title} />
        </h1>
        {lede && (
          <p>
            <Rich text={lede} />
          </p>
        )}
        {action}
      </div>
    </header>
  );
}

export function SectionHead({
  kicker,
  title,
  deck,
}: {
  kicker?: string;
  title: string;
  deck?: string;
}) {
  return (
    <div className="section-head">
      {kicker && (
        <div className="rule">
          <span className="kicker">{kicker}</span>
        </div>
      )}
      {deck ? (
        <div className="split">
          <h2>
            <Rich text={title} />
          </h2>
          <p className="deck">
            <Rich text={deck} />
          </p>
        </div>
      ) : (
        <h2>
          <Rich text={title} />
        </h2>
      )}
    </div>
  );
}

export function Plate({
  src,
  alt,
  caption,
  locale,
}: {
  src: string;
  alt: string;
  caption?: string;
  locale?: Locale;
}) {
  return (
    <figure className="plate-fig">
      <div className="plate">
        <img src={asset(src)} alt={alt} />
      </div>
      {caption && (
        <figcaption>
          <Rich text={caption} />
        </figcaption>
      )}
      {locale ? null : null}
    </figure>
  );
}

export function Bullets({ items, plain = false, split = false }: { items: string[]; plain?: boolean; split?: boolean }) {
  return (
    <ul className={`bullets${plain ? " plain" : ""}${split ? " split" : ""}`}>
      {items.map((item) => (
        <li key={item}>
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

export function DarkCards({
  items,
  variant,
}: {
  items: { code: string; title: string; body: string }[];
  variant?: "sector" | "cap";
}) {
  return (
    <div className={`dark-cards cols-${Math.min(items.length, 5)}`}>
      {items.map((item) => (
        <article key={item.code} className={variant ? `dark-card ${variant}` : "dark-card"}>
          <p className="code">{item.code}</p>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function LightItems({
  locale,
  items,
}: {
  locale: Locale;
  items: { code: string; title: string; body: string; href?: string; action?: string }[];
}) {
  return (
    <div className={`light-grid cols-${items.length > 4 ? 3 : items.length}`}>
      {items.map((item) => (
        <article key={item.code} className="light-item">
          <p className="code">{item.code}</p>
          <h3>
            {item.href && !item.action ? (
              <Link href={localePath(locale, item.href)}>{item.title}</Link>
            ) : (
              item.title
            )}
          </h3>
          <p>{item.body}</p>
          {item.action && item.href && (
            <ArrowLink locale={locale} href={item.href}>
              {item.action}
            </ArrowLink>
          )}
        </article>
      ))}
    </div>
  );
}

export function DataTable({
  locale,
  columns,
  rows,
  pending,
}: {
  locale: Locale;
  columns: string[];
  rows: { code: string; title: string; summary: string; action: string; href: string }[];
  pending?: boolean;
}) {
  return (
    <div className="table-wrap">
      <table className="sheet">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} scope="col">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.code}>
              <td className="code" data-label={columns[0]}>
                {row.code}
              </td>
              <th scope="row" className="row-title" data-label={columns[1]}>
                {row.title}
              </th>
              <td data-label={columns[2]}>{row.summary}</td>
              <td data-label={columns[3]}>
                <ArrowLink locale={locale} href={row.href}>
                  {row.action}
                </ArrowLink>
                {pending && (
                  <div className="pending-note">
                    <Rich text="[[CLIENT TO CONFIRM]]" />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
