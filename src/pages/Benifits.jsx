import { Link } from 'react-router-dom';

/* ── Content exactly as given in the requirement doc ── */
const HEADLINE = 'Why Choose Be in Love?';
const SUBHEADLINE = 'Natural care that transforms your hair and honors the planet.';

const POINTS = [
  {
    title: 'Purely Natural',
    text: 'Our oils are crafted from organic, ethically sourced ingredients, free from harmful chemicals.',
    icon: (
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Zm-9 2c0-3 1.5-6.5 6-9" />
    ),
  },
  {
    title: 'Tailored Nourishment',
    text: 'Whether your hair craves hydration, strength, or shine, our blends deliver targeted care.',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
  },
  {
    title: 'Love in Every Drop',
    text: 'Infused with care, our oils are designed to make you feel confident and radiant.',
    icon: (
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    ),
  },
];

export default function Benefits() {
  return (
    <>
      {/* ───────── HEADER ───────── */}
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20 text-center">
          <h1 className="font-serif font-semibold text-4xl md:text-5xl lg:text-6xl leading-tight">
            {HEADLINE}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-serif italic text-lg md:text-xl text-gold">
            {SUBHEADLINE}
          </p>
        </div>
      </section>

      {/* ───────── POINTS ───────── */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {POINTS.map(({ title, text, icon }) => (
              <article
                key={title}
                className="group rounded-3xl border border-olive/15 bg-white p-8 text-center shadow-lg shadow-olive/5 transition duration-300 hover:-translate-y-1.5 hover:border-olive/40 hover:shadow-xl hover:shadow-olive/15"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-olive text-white transition duration-300 group-hover:scale-110 group-hover:bg-gold-btn group-hover:text-ink">
                  <svg
                    width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  >
                    {icon}
                  </svg>
                </span>
                <h2 className="mt-6 font-serif text-2xl font-semibold text-ink">{title}</h2>
                <p className="mt-3 leading-7 text-ink/75">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/shop"
              className="inline-block rounded-lg bg-olive px-8 py-3.5 font-medium text-white shadow-lg shadow-olive/20 transition hover:-translate-y-0.5 hover:bg-olive-dark"
            >
              Shop Our Collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}