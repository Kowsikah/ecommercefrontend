import { useState } from 'react';
import { Link } from 'react-router-dom';

/* ── Content exactly as given in the requirement doc ── */
const HEADLINE = 'Why Choose Be in Love?';
const SUBHEADLINE = 'Natural care that transforms your hair and honors the planet.';

const POINTS = [
  {
    title: 'Purely Natural',
    text: 'Our oils are crafted from organic, ethically sourced ingredients, free from harmful chemicals.',
    highlight: '100% organic formulation with zero synthetic fillers or parabens.',
    icon: (
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Zm-9 2c0-3 1.5-6.5 6-9" />
    ),
  },
  {
    title: 'Tailored Nourishment',
    text: 'Whether your hair craves hydration, strength, or shine, our blends deliver targeted care.',
    highlight: 'Deeply penetrates roots to seal split ends, eliminate frizz, and rebuild strength.',
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
    highlight: 'An uplifting sensory self-care ritual crafted to elevate your daily routine.',
    icon: (
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    ),
  },
];

export default function Benefits() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* ───────── HEADER ───────── */}
      <section className="relative bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/25 via-transparent to-transparent opacity-75" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">Our Promise</span>
          <h1 className="mt-4 font-serif font-semibold text-4xl md:text-5xl lg:text-7xl leading-tight tracking-tight">
            {HEADLINE}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-serif italic text-lg md:text-xl text-gold">
            {SUBHEADLINE}
          </p>
          <div className="mt-6 mx-auto h-0.5 w-20 bg-gold/70" />
        </div>
      </section>

      {/* ───────── INTERACTIVE POINTS SHOWCASE ───────── */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          {/* Interactive Selector Pill Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {POINTS.map((p, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2.5 shadow-md ${
                    isActive
                      ? 'bg-olive text-white scale-105 ring-2 ring-gold/50 shadow-olive/20'
                      : 'bg-white text-ink/80 border border-olive/15 hover:border-gold hover:text-ink'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-gold animate-pulse' : 'bg-olive/40'}`} />
                  {p.title}
                </button>
              );
            })}
          </div>

          {/* Active Highlight Showcase Card */}
          <div className="max-w-4xl mx-auto mb-20 rounded-3xl border border-olive/20 bg-white p-8 md:p-12 shadow-2xl shadow-olive/10 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-bl-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-olive text-white shadow-xl">
                <svg
                  width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                >
                  {POINTS[activeIndex].icon}
                </svg>
              </div>
              <div className="text-center md:text-left space-y-3">
                <span className="text-xs uppercase tracking-widest text-gold font-bold">
                  Pillar 0{activeIndex + 1} of 03
                </span>
                <h3 className="font-serif text-3xl font-semibold text-ink">
                  {POINTS[activeIndex].title}
                </h3>
                <p className="text-lg leading-relaxed text-ink/80">
                  {POINTS[activeIndex].text}
                </p>
                <div className="pt-2">
                  <span className="inline-block rounded-xl bg-cream border border-olive/15 px-4 py-2 text-xs font-medium text-olive">
                    ✨ {POINTS[activeIndex].highlight}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Overview Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {POINTS.map(({ title, text, icon }, idx) => (
              <article
                key={title}
                onClick={() => setActiveIndex(idx)}
                className={`spotlight group cursor-pointer rounded-3xl border p-8 text-center transition-all duration-300 ${
                  activeIndex === idx
                    ? 'border-gold bg-white shadow-2xl shadow-olive/15 -translate-y-2'
                    : 'border-olive/15 bg-white/70 hover:-translate-y-1 hover:border-olive/40 hover:shadow-xl hover:shadow-olive/10'
                }`}
              >
                <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full transition duration-300 ${
                  activeIndex === idx ? 'bg-gold-btn text-ink scale-110' : 'bg-olive text-white group-hover:scale-105'
                }`}>
                  <svg
                    width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  >
                    {icon}
                  </svg>
                </span>
                <h2 className="mt-6 font-serif text-2xl font-semibold text-ink">{title}</h2>
                <p className="mt-3 leading-7 text-ink/75">{text}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-wider font-semibold text-olive group-hover:text-gold transition-colors">
                  {activeIndex === idx ? 'Currently Viewing ↓' : 'Click to Explore →'}
                </span>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/shop"
              className="btn-shine inline-block rounded-xl bg-olive px-9 py-4 font-medium text-white shadow-xl shadow-olive/20 transition hover:-translate-y-0.5 hover:bg-olive-dark hover:scale-105"
            >
              Shop Our Collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}