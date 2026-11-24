import Link from "next/link";
import { Suspense } from "react";
import { asset } from "@/lib/config";
import { getSite, localePath, type Locale } from "@/lib/i18n";
import { QuoteForm } from "./QuoteForm";
import { ArrowLink, Bullets, DarkCards, DataTable, LightItems, PageHero, Plate, Rich, SectionHead } from "./ui";

export function HomeView({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const page = site.pages.home;
  return (
    <>
      <section className="hero">
        <img className="hero-ghost" src={asset("/images/hero-ghost.webp")} alt="" />
        <div className="inner hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="lede">{page.lede}</p>
            <div className="hero-actions">
              <Link className="btn" href={localePath(locale, "/contact/")}>
                {site.ui.requestQuote} <span aria-hidden="true">→</span>
              </Link>
              <Link className="text-link" href={localePath(locale, "/products/")}>
                {site.ui.viewProducts}
              </Link>
            </div>
            <dl className="hero-specs">
              {page.specs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.value}</dt>
                  <dd>{spec.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="hero-figure">
            <div className="plate hero-plate">
              <img src={asset("/images/hero-air-cooled.webp")} alt={page.heroAlt} />
              {page.callouts.map((callout) => (
                <div key={callout.place} className={`callout callout-${callout.place}`}>
                  <span>{callout.kicker}</span>
                  <strong>{callout.value}</strong>
                </div>
              ))}
            </div>
            <figcaption>{page.heroCaption}</figcaption>
          </figure>
        </div>
      </section>
      <section className="trust">
        <div className="inner trust-row">
          <span className="trust-label">{page.trustLabel}</span>
          {page.trust.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.companyKicker} title={page.companyTitle} deck={page.companyDeck} />
          <div className="stats">
            {page.figures.map((figure) => (
              <div key={figure.label} className={/\d/.test(figure.value) ? "stat stat-num" : "stat"}>
                <strong>{figure.value}</strong>
                <span>{figure.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.productsKicker} title={page.productsTitle} deck={page.productsDeck} />
          <div className="cards-4">
            {page.cards.map((card) => (
              <article key={card.title} className="pcard">
                <div className="plate">
                  <img src={asset(card.image)} alt={card.alt} />
                </div>
                <h3>{card.title}</h3>
                <Bullets items={card.bullets} plain />
                <ArrowLink locale={locale} href={card.href}>
                  {site.ui.findOutMore}
                </ArrowLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="band band-dark">
        <div className="inner">
          <SectionHead kicker={page.sectorsKicker} title={page.sectorsTitle} deck={page.sectorsDeck} />
          <DarkCards items={page.sectors} variant="sector" />
        </div>
      </section>
      <section className="band band-paper">
        <div className="inner">
          <SectionHead kicker={page.capKicker} title={page.capTitle} />
          <DarkCards items={page.capabilities} variant="cap" />
        </div>
      </section>
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.qualityKicker} title={page.qualityTitle} deck={page.qualityDeck} />
          <p className="link-row">
            {page.qualityLinks.map((link) => (
              <ArrowLink key={link.href} locale={locale} href={link.href}>
                {link.label}
              </ArrowLink>
            ))}
          </p>
        </div>
      </section>
    </>
  );
}

export function ProductsView({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const page = site.pages.products;
  return (
    <>
      <PageHero locale={locale} crumb={page.crumb} title={page.title} lede={page.lede} />
      <nav className="pindex" aria-label={page.crumb}>
        <div className="inner">
          <ul>
            {page.items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>
                  <span>{item.code}</span> {item.index}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <section className="band">
        <div className="inner product-list">
          {page.items.map((item, index) => (
            <article key={item.id} id={item.id} className={index % 2 === 1 ? "product-row reverse" : "product-row"}>
              <Plate src={item.image} alt={item.alt} caption={item.caption} />
              <div>
                <p className="code">{item.code}</p>
                <h2>{item.title}</h2>
                <p className="deck">{item.deck}</p>
                {item.chips.length > 0 && (
                  <ul className="chips">
                    {item.chips.map((chip) => (
                      <li key={chip}>{chip}</li>
                    ))}
                  </ul>
                )}
                <Bullets items={item.bullets} />
                <p className="link-row">
                  {item.quote && (
                    <ArrowLink locale={locale} href={`/contact/?application=${encodeURIComponent(item.application)}`}>
                      {item.quote}
                    </ArrowLink>
                  )}
                  {item.extra && (
                    <ArrowLink locale={locale} href={item.extra.href}>
                      {item.extra.label}
                    </ArrowLink>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="band band-paper">
        <div className="inner">
          <SectionHead kicker={page.mfgKicker} title={page.mfgTitle} />
          <div className="fig-row three">
            {page.mfgPhotos.map((photo) => (
              <figure key={photo.caption}>
                <Link href={localePath(locale, photo.href)}>
                  <img src={asset(photo.image)} alt={photo.alt} />
                </Link>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function AftermarketView({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const page = site.pages.aftermarket;
  return (
    <>
      <PageHero locale={locale} crumb={page.crumb} title={page.title} lede={page.lede} />
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.sparesKicker} title={page.sparesTitle} />
          <div className="split">
            <Plate src={page.sparesImage} alt={page.sparesAlt} />
            <div>
              <Bullets items={page.spares} />
              <p className="link-row">
                <ArrowLink locale={locale} href="/contact/?application=Spares">
                  {site.ui.requestSpares}
                </ArrowLink>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="band band-paper">
        <div className="inner">
          <SectionHead kicker={page.serviceKicker} title={page.serviceTitle} />
          <LightItems locale={locale} items={page.serviceItems} />
          <p className="link-row">
            <ArrowLink locale={locale} href="/refurbishment/">
              {site.ui.seeRefurbishment}
            </ArrowLink>
          </p>
        </div>
      </section>
    </>
  );
}

export function FinTubeView({ locale }: { locale: Locale }) {
  const page = getSite(locale).pages.finTube;
  return (
    <>
      <PageHero locale={locale} crumb={page.crumb} title={page.title} lede={page.lede} />
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.kicker} title={page.heading} deck={page.deck} />
          <div className="fin-grid">
            {page.tubes.map((tube) => (
              <article key={tube.code} className="fin-card">
                <img src={asset(tube.image)} alt={tube.alt} />
                <p className="code">{tube.code}</p>
                <h3>{tube.title}</h3>
                <p>
                  <Rich text={tube.body} />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="band band-paper">
        <div className="inner tfl">
          <img src={asset("/brand/tube-fins.webp")} alt={page.tflAlt} />
          <div>
            <SectionHead kicker={page.tflKicker} title={page.tflTitle} />
            <p className="deck">{page.tflBody}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function AutomotiveView({ locale }: { locale: Locale }) {
  const page = getSite(locale).pages.automotive;
  return (
    <>
      <PageHero locale={locale} crumb={page.crumb} title={page.title} lede={page.lede} />
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.kicker} title={page.heading} />
          <div className="split align-start">
            <Plate src={page.image} alt={page.alt} />
            <div className="stack">
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="band band-paper">
        <div className="inner">
          <SectionHead kicker={page.specKicker} title={page.specTitle} />
          <Bullets items={page.bullets} />
          <div className="fig-row three plates">
            {page.photos.map((photo) => (
              <div key={photo.alt} className="plate">
                <img src={asset(photo.image)} alt={photo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function RefurbishmentView({ locale }: { locale: Locale }) {
  const page = getSite(locale).pages.refurbishment;
  return (
    <>
      <PageHero locale={locale} crumb={page.crumb} title={page.title} lede={page.lede} />
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.processKicker} title={page.processTitle} />
          <DarkCards items={page.steps} />
        </div>
      </section>
      <section className="band band-paper">
        <div className="inner">
          <SectionHead kicker={page.resultsKicker} title={page.resultsTitle} />
          <div className="fig-row">
            {page.photos.map((photo) => (
              <figure key={photo.caption}>
                <img src={asset(photo.image)} alt={photo.alt} />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.scopeKicker} title={page.scopeTitle} />
          <Bullets items={page.scope} split />
        </div>
      </section>
      <section className="band tight-top">
        <div className="inner">
          <SectionHead kicker={page.supportKicker} title={page.supportTitle} deck={page.supportDeck} />
          <LightItems locale={locale} items={page.support} />
        </div>
      </section>
    </>
  );
}

export function ManufacturingView({ locale }: { locale: Locale }) {
  const page = getSite(locale).pages.manufacturing;
  return (
    <>
      <PageHero locale={locale} crumb={page.crumb} title={page.title} lede={page.lede} />
      <section className="band">
        <div className="inner">
          <div className="fig-row">
            {page.photos.map((photo) => (
              <figure key={photo.caption}>
                <img src={asset(photo.image)} alt={photo.alt} />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
          <SectionHead kicker={page.kicker} title={page.heading} />
          <LightItems locale={locale} items={page.items} />
        </div>
      </section>
    </>
  );
}

export function CompanyView({ locale }: { locale: Locale }) {
  const page = getSite(locale).pages.company;
  return (
    <>
      <PageHero locale={locale} crumb={page.crumb} title={page.title} lede={page.lede} />
      <section className="band">
        <div className="inner split">
          <div className="stack">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <figure className="plate-fig">
            <div className="plate">
              <img src={asset(page.photo)} alt={page.photoAlt} />
            </div>
            <figcaption>
              <Rich text={page.photoNote} />
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="band band-ink">
        <div className="inner">
          <SectionHead kicker={page.numbersKicker} title={page.numbersTitle} />
          <div className="stats">
            {page.numbers.map((item) => (
              <div key={item.label} className="stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="band band-paper">
        <div className="inner">
          <SectionHead kicker={page.policyKicker} title={page.policyTitle} deck={page.policyDeck} />
          <LightItems locale={locale} items={page.policies} />
        </div>
      </section>
    </>
  );
}

export function WhitepapersView({ locale }: { locale: Locale }) {
  const page = getSite(locale).pages.whitepapers;
  return (
    <>
      <PageHero locale={locale} crumb={page.crumb} title={page.title} lede={page.lede} />
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.kicker} title={page.heading} />
          <DataTable locale={locale} columns={page.columns} rows={page.rows} pending />
        </div>
      </section>
    </>
  );
}

export function ContactView({ locale, endpoint }: { locale: Locale; endpoint: string }) {
  const site = getSite(locale);
  const page = site.pages.contact;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.company.mapsQuery)}`;
  return (
    <>
      <PageHero locale={locale} crumb={page.crumb} title={page.title} lede={page.lede} />
      <section className="band">
        <div className="inner contact-grid">
          <div className="details">
            <div className="detail">
              <h2>{site.cookies.headOffice}</h2>
              <p>
                {site.company.legalName}
                <br />
                {site.company.addressLines[0]}
                <br />
                {site.company.addressLines[1]}
              </p>
            </div>
            <div className="detail">
              <h2>{site.cookies.telephone}</h2>
              <p>
                <a href={site.company.phoneHref}>{site.company.phone}</a>
              </p>
            </div>
            <div className="detail">
              <h2>{site.cookies.email}</h2>
              <p>
                <a href={`mailto:${site.company.email}`}>{site.company.email}</a>
              </p>
            </div>
            <div className="detail">
              <h2>{site.cookies.gettingHere}</h2>
              <p>{site.company.gettingHere}</p>
            </div>
            <div className="detail">
              <h2>{site.cookies.linkedin}</h2>
              <p>
                {site.company.linkedinName}
                <br />
                <Rich text={site.company.linkedinNote} />
              </p>
            </div>
            <div className="map-placeholder">{site.company.mapsLabel}</div>
            <p className="link-row">
              <ArrowLink locale={locale} href={maps} tone="amber">
                {site.ui.openInMaps}
              </ArrowLink>
            </p>
          </div>
          <Suspense fallback={null}>
            <QuoteForm locale={locale} endpoint={endpoint} />
          </Suspense>
        </div>
      </section>
    </>
  );
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const page = getSite(locale).pages.privacy;
  return (
    <>
      <PageHero locale={locale} crumb={page.crumb} title={page.title} lede={page.lede} />
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.kicker} title={page.heading} />
          <div className="policy">
            <nav aria-label={page.heading}>
              {page.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.nav}
                </a>
              ))}
            </nav>
            <div>
              {page.sections.map((section) => (
                <article key={section.id} id={section.id} className="policy-block">
                  <p className="code">{section.code}</p>
                  <h3>{section.title}</h3>
                  <p>
                    <Rich text={section.body} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function NotFoundView({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const page = site.pages.notFound;
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        tall
        action={
          <Link className="btn" href={localePath(locale, "/")}>
            {site.ui.backToHome} <span aria-hidden="true">→</span>
          </Link>
        }
      />
      <section className="band">
        <div className="inner">
          <SectionHead kicker={page.kicker} title={page.heading} />
          <DataTable locale={locale} columns={page.columns} rows={page.rows} />
        </div>
      </section>
    </>
  );
}

export function DownloadView({ locale, slug }: { locale: Locale; slug: string }) {
  const site = getSite(locale);
  const item = site.downloads.find((download) => download.slug === slug);
  if (!item) return null;
  return (
    <PageHero locale={locale} crumb={item.title} title={item.title} lede={item.summary} action={<Rich text={item.body} />} />
  );
}

export function ServicingNote({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const href = localePath(locale, "/refurbishment/");
  return (
    <section className="band">
      <div className="inner">
        <h1>{site.nav.find((item) => item.href === "/refurbishment/")?.label}</h1>
        <p>{site.ui.redirectServicing}</p>
        <p>
          <Link className="btn" href={href}>
            {site.ui.continue} <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
