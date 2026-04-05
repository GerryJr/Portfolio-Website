import { Link } from 'react-router-dom';
import { LOCATIONS } from '../lib/menu-data';
import FadeIn from '../components/FadeIn';

export default function KrispHome() {
  return (
    <div className="krisp-home-page">

      {/* ─── HERO ─── */}
      <section className="krisp-home-hero">
        <div className="krisp-home-heroImageWrap">
          <img src="/demo/krisp/about3.webp" alt="Barista pouring latte art" className="krisp-home-heroImage" />
        </div>
        <div className="krisp-home-heroContent">
          <div className="krisp-home-heroBrandWrap">
            <img src="/demo/krisp/krisp-logo.webp" alt="KRISP" className="krisp-home-heroBrandImg" />
          </div>
          <div className="krisp-home-heroLabelWrap">
            <span className="krisp-home-heroLine" />
            <p className="krisp-home-heroLabel">Specialty Coffee &amp; Fresh Food</p>
          </div>
          <h1 className="krisp-home-heroTitle">
            Crafted with care,<br />
            served with <em>intention.</em>
          </h1>
          <p className="krisp-home-heroSub">
            Premium matcha, handcrafted drinks &amp; superfood bowls — made fresh daily at our Irvine locations.
          </p>
          <div className="krisp-home-heroActions">
            <Link to="/demo/krisp-fresh-living/order" className="krisp-home-btnPrimary">Order Ahead</Link>
            <Link to="/demo/krisp-fresh-living/menu" className="krisp-home-btnOutline">View Menu</Link>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="krisp-home-marquee" aria-hidden="true">
        <div className="krisp-home-marqueeTrack">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="krisp-home-marqueeContent">
              <span className="krisp-home-marqueeBrand">KRISP</span>
              <span className="krisp-home-marqueeSep">&middot;</span>
              <span>Matcha</span>
              <span className="krisp-home-marqueeSep">&middot;</span>
              <span>Espresso</span>
              <span className="krisp-home-marqueeSep">&middot;</span>
              <span className="krisp-home-marqueeBrand">KRISP</span>
              <span className="krisp-home-marqueeSep">&middot;</span>
              <span>Superfood Bowls</span>
              <span className="krisp-home-marqueeSep">&middot;</span>
              <span>Fresh Food</span>
              <span className="krisp-home-marqueeSep">&middot;</span>
              <span className="krisp-home-marqueeBrand">KRISP</span>
              <span className="krisp-home-marqueeSep">&middot;</span>
              <span>Cold Brew</span>
              <span className="krisp-home-marqueeSep">&middot;</span>
              <span>Acai</span>
              <span className="krisp-home-marqueeSep">&middot;</span>
              <span>Smoothies</span>
              <span className="krisp-home-marqueeSep">&middot;</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED ─── */}
      <section className="krisp-home-featured">
        <FadeIn>
          <div className="krisp-home-featuredHeader">
            <p className="krisp-home-label">What We&apos;re Known For</p>
            <h2 className="krisp-home-heading">Handcrafted favorites.</h2>
          </div>
          <div className="krisp-home-featuredGrid">
            {[
              { img: '/demo/krisp/menu-2023-11-07-7.18.11.webp', alt: 'Acai bowl with fresh fruit toppings', label: 'Superfood Bowls' },
              { img: '/demo/krisp/menu-2023-11-07-7.20.02.webp', alt: 'KRISP signature matcha drinks', label: 'Signature Matcha' },
              { img: '/demo/krisp/menu-2023-11-07-7.19.42.webp', alt: 'Espresso tonic with ice and citrus', label: 'Espresso Drinks' },
            ].map(({ img, alt, label }) => (
              <Link to="/demo/krisp-fresh-living/menu" key={label} className="krisp-home-featuredCard">
                <div className="krisp-home-featuredImageWrap">
                  <img src={img} alt={alt} className="krisp-home-featuredImage" loading="lazy" />
                  <div className="krisp-home-featuredOverlay">
                    <span className="krisp-home-featuredLabel">{label}</span>
                    <span className="krisp-home-featuredArrow">View Menu &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="krisp-home-about">
        <div className="krisp-home-aboutInner">
          <FadeIn className="krisp-home-aboutImageCol">
            <div className="krisp-home-aboutImageWrap">
              <img src="/demo/krisp/menu-2023-11-07-7.20.31.webp" alt="Loose leaf tea being carefully measured" className="krisp-home-aboutImage" loading="lazy" />
            </div>
          </FadeIn>
          <FadeIn delay={120} className="krisp-home-aboutTextCol">
            <div className="krisp-home-aboutText">
              <p className="krisp-home-label">Our Philosophy</p>
              <h2 className="krisp-home-heading">This is KRISP.</h2>
              <p className="krisp-home-body">
                From ceremonial-grade matcha sourced directly from Uji, Japan to
                house-made syrups and freshly blended superfood bowls — every drink
                is handcrafted with care and quality ingredients.
              </p>
              <Link to="/demo/krisp-fresh-living/our-story" className="krisp-home-btnOutline">Our Story</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── INGREDIENTS ─── */}
      <section className="krisp-home-ingredients">
        <span className="krisp-home-watermark" aria-hidden="true">KRISP</span>
        <FadeIn>
          <div className="krisp-home-ingredientsInner">
            <div className="krisp-home-ingredientsHeader">
              <p className="krisp-home-label">What Sets Us Apart</p>
              <h2 className="krisp-home-heading">Premium ingredients, every cup.</h2>
            </div>
            <div className="krisp-home-ingredientGrid">
              {[
                { img: '/demo/krisp/product-6.webp', alt: 'Blueberry Matcha — fresh blueberries', name: 'Blueberry Matcha', desc: 'Fresh blueberries & organic matcha' },
                { img: '/demo/krisp/product-4.webp', alt: 'Signature Matcha — ceremonial grade matcha powder', name: 'Signature Matcha', desc: 'Ceremonial-grade from Uji, Japan', center: true },
                { img: '/demo/krisp/product-8.webp', alt: 'Coconut Matcha — fresh coconut', name: 'Coconut Matcha', desc: 'House-made coconut & matcha blend' },
              ].map(({ img, alt, name, desc, center }) => (
                <div key={alt} className={`krisp-home-ingredientCard${center ? ' krisp-home-ingredientCardCenter' : ''}`}>
                  <div className="krisp-home-ingredientImageWrap">
                    <img src={img} alt={alt} className="krisp-home-ingredientImage" loading="lazy" />
                  </div>
                  <div className="krisp-home-ingredientInfo">
                    <p className="krisp-home-ingredientName">{name}</p>
                    <p className="krisp-home-ingredientDesc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="krisp-home-ingredientsCta">
              <Link to="/demo/krisp-fresh-living/menu" className="krisp-home-btnOutline">View Full Menu</Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── LOCATIONS ─── */}
      <section className="krisp-home-locations">
        <FadeIn>
          <div className="krisp-home-locInner">
            <div className="krisp-home-locTop">
              <div className="krisp-home-locHeader">
                <p className="krisp-home-label">Find Us</p>
                <h2 className="krisp-home-heading">Two locations<br />in Irvine.</h2>
                <p className="krisp-home-body">Stop by for a drink, stay for the atmosphere.</p>
              </div>
              <div className="krisp-home-locImageWrap">
                <img src="/demo/krisp/menu-2023-11-07-7.18.59.webp" alt="KRISP storefront" className="krisp-home-locImage" loading="lazy" />
              </div>
            </div>
            <div className="krisp-home-locGrid">
              {LOCATIONS.map(loc => (
                <div key={loc.id} className="krisp-home-locCard">
                  <h3 className="krisp-home-locName">{loc.name}</h3>
                  <div className="krisp-home-locDetails">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="krisp-home-locAddress"
                    >
                      <span>{loc.address}</span>
                      <span>{loc.city}</span>
                      <svg className="krisp-home-locPin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </a>
                    <p className="krisp-home-locPhone">{loc.phone}</p>
                  </div>
                  <div className="krisp-home-locHours">
                    {Object.entries(loc.hours).map(([day, time]) => (
                      <div key={day} className="krisp-home-hourRow">
                        <span className="krisp-home-hourDay">{day}</span>
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="krisp-home-locActions">
                    <Link to="/demo/krisp-fresh-living/order" className="krisp-home-btnOutline">Order from {loc.shortName}</Link>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="krisp-home-locDirections"
                    >
                      Get Directions &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── CTA ─── */}
      <section className="krisp-home-cta">
        <FadeIn>
          <div className="krisp-home-ctaInner">
            <div className="krisp-home-ctaBannerWrap">
              <img
                src="/demo/krisp/hero.webp"
                alt="Ordering made easy — skip the line and order ahead"
                className="krisp-home-ctaBanner"
                loading="lazy"
              />
            </div>
            <div className="krisp-home-ctaActions">
              <Link to="/demo/krisp-fresh-living/order" className="krisp-home-ctaBtn">Start Your Order</Link>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
