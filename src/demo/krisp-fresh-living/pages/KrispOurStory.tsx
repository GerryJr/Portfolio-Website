import FadeIn from '../components/FadeIn';

export default function KrispOurStory() {
  return (
    <>
      {/* Hero */}
      <section className="krisp-story-hero">
        <img src="/demo/krisp/menu-2023-11-07-7.18.59.webp" alt="KRISP Fresh Living storefront" className="krisp-story-heroImage" />
        <div className="krisp-story-heroOverlay">
          <h1 className="krisp-story-heroTitle">Our Story</h1>
        </div>
      </section>

      {/* Story */}
      <section className="krisp-story-storySection">
        <div className="krisp-story-storyContent">
          <p className="krisp-story-storyText">
            <span className="krisp-story-highlight">KRISP Fresh Living</span> was born from a simple idea:
            that your daily coffee and food should be as fresh, bold, and vibrant as the California
            lifestyle we love. We believe in crafting every drink and dish with intention — from our
            ceremonial grade matcha sourced directly from Uji, Japan, to our house-made syrups
            and freshly blended smoothie bowls.
          </p>
          <p className="krisp-story-storyText">
            What started as a single location on Michelson Drive in Irvine has grown into a
            community hub where good vibes, great coffee, and fresh food come together. Our
            second location on Alton Parkway brings the same KRISP experience to even more
            of our Irvine neighbors.
          </p>
          <p className="krisp-story-storyText">
            Every item on our menu is crafted with care — we source premium ingredients,
            support local whenever possible, and never cut corners on quality. Whether it's
            our signature Vietnamese coffee, our famous Strawberry Matcha, or our loaded
            avocado toast, we want every bite and sip to feel special.
          </p>
        </div>

        <div className="krisp-story-imageGrid">
          <img src="/demo/krisp/about1.webp" alt="KRISP Interior" className="krisp-story-gridImage" />
          <img src="/demo/krisp/about2.webp" alt="KRISP Drinks" className="krisp-story-gridImage" />
          <img src="/demo/krisp/about3.webp" alt="KRISP Food" className="krisp-story-gridImage" />
        </div>
      </section>

      {/* Values */}
      <section className="krisp-story-valuesSection">
        <div className="krisp-story-valuesIntro">
          <h2 className="krisp-story-valuesTitle">What We Stand For</h2>
          <p className="krisp-story-valuesSubtitle">
            The principles behind every cup we pour and every plate we serve.
          </p>
        </div>
        <div className="krisp-story-valuesGrid">
          <div className="krisp-story-valueCard">
            <div className="krisp-story-valueIcon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                <path d="M12 6v8" />
                <path d="M9 10c1.5-1 3-1.5 3-4" />
                <path d="M15 10c-1.5-1-3-1.5-3-4" />
              </svg>
            </div>
            <h3 className="krisp-story-valueTitle">Fresh Ingredients</h3>
            <p className="krisp-story-valueDesc">
              Premium, high-quality ingredients sourced with care. From Japanese matcha
              to Vietnamese coffee beans.
            </p>
          </div>
          <div className="krisp-story-valueCard">
            <div className="krisp-story-valueIcon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
              </svg>
            </div>
            <h3 className="krisp-story-valueTitle">Crafted With Love</h3>
            <p className="krisp-story-valueDesc">
              Every drink is handcrafted by our trained baristas. We take pride in every
              pour, every blend, every plate.
            </p>
          </div>
          <div className="krisp-story-valueCard">
            <div className="krisp-story-valueIcon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="krisp-story-valueTitle">Community First</h3>
            <p className="krisp-story-valueDesc">
              KRISP is more than a coffee shop — it's a community space for good vibes,
              connection, and fresh living.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
