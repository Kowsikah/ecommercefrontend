import { Link } from 'react-router-dom';

/* ── Content from the requirement doc (edit here) ── */
const KEY_POINTS = [
  {
    title: '100% natural',
    text: 'Natural and sustainably sourced ingredients in every bottle.',
    icon: (
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Zm-9 2c0-3 1.5-6.5 6-9" />
    ),
  },
  {
    title: 'Inspired by love',
    text: 'Made with love, care, and the beauty of nature.',
    icon: (
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    ),
  },
];

const INGREDIENTS = [
  'Coconut oil',
  'Hibiscus',
  'Bhringaraj',
  'Amla',
  'Tanner’s cassia',
  'Curry leaves',
  'Other Ayurvedic herbs',
];

export default function About() {
  return (
    <>
      {/* ───────── HEADER ───────── */}
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-gold">Our Story</p>
          <h1 className="mt-3 font-serif font-semibold text-4xl md:text-5xl lg:text-6xl leading-tight">
            A Love Letter to Your Hair
          </h1>
        </div>
      </section>

      {/* ───────── STORY ───────── */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Photo */}
          <div className="rounded-[2rem] border border-olive/15 bg-white p-3 shadow-xl shadow-olive/10 lg:order-1">
            <img
              src="/hero.jpeg"
              alt="Woman with long, healthy hair holding Be in Love hair oil"
              className="w-full aspect-[4/5] object-cover object-[60%_center] rounded-3xl"
            />
          </div>

          {/* Text */}
          <div>
            <p className="font-serif italic text-xl text-gold">
              Every bottle is a promise of purity.
            </p>
            <div className="mt-6 space-y-5 text-lg leading-8 text-ink/80">
              <p>
                Be in Love was born from a passion for natural beauty and self-care. Our mission is
                simple: to create hair oils that harness the best of nature’s ingredients to nurture
                your hair and uplift your spirit.
              </p>
              <p>
                Join us in celebrating hair that’s as vibrant as you are.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {KEY_POINTS.map(({ title, text, icon }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-olive/15 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-olive/10"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive text-white">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {icon}
                    </svg>
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── INGREDIENTS ───────── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16 text-center">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl text-ink">
            Time-honoured ingredients
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70 leading-7">
            Our oils blend traditional Ayurvedic ingredients with modern care, so the nourishment
            feels luxurious yet authentic.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {INGREDIENTS.map((name) => (
              <li
                key={name}
                className="rounded-full border border-olive/25 bg-cream px-5 py-2 text-sm font-medium text-olive transition hover:bg-olive hover:text-white"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl">
            Your hair deserves to be loved
          </h2>
          <p className="mt-4 text-white/80">Free from harsh chemicals. Made to restore shine, strength and softness.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="rounded-lg bg-gold-btn px-7 py-3.5 font-medium text-ink shadow-lg shadow-black/20 transition hover:brightness-105"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border border-white/30 bg-white/5 px-7 py-3.5 font-medium text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}