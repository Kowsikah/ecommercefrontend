import { Link } from 'react-router-dom';

const Ico = ({ d, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
const LEAF = 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Zm-9 2c0-3 1.5-6.5 6-9';
const HEART = 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z';
const SHIELD = 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4';
const USERS = 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75';

const TRUST = [
  ['100% natural', LEAF],
  ['Free from harsh chemicals', SHIELD],
  ['Traditional Ayurvedic herbs', HEART],
  ['For men, women & children', USERS],
];

const INGREDIENTS = ['Coconut oil', 'Hibiscus', 'Bhringaraj', 'Amla', 'Tanner’s cassia', 'Curry leaves'];

const RITUAL = [
  ['Massage', 'Work a small amount into your scalp and hair.'],
  ['Rest', 'Leave it for 30 minutes, or overnight.'],
  ['Wash', 'Rinse out with a mild shampoo.'],
];

export default function Home() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="float-slow pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="float-slow pointer-events-none absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl [animation-delay:-5s]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs tracking-widest uppercase text-gold backdrop-blur">
              ✨ 100% Natural Hair Care
            </span>

            <h1 className="reveal mt-6 font-serif font-semibold text-5xl md:text-6xl lg:text-7xl leading-[1.05]" style={{ animationDelay: '80ms' }}>
              Make your hair <em className="font-normal text-gold">healthier.</em>
            </h1>

            <p className="reveal mt-6 font-serif text-xl md:text-2xl text-white/90" style={{ animationDelay: '160ms' }}>
              Thick, strong &amp; shiny. Celebrate every strand.
            </p>

            <p className="reveal mt-5 max-w-lg text-white/75 leading-8" style={{ animationDelay: '240ms' }}>
              Every bottle is a promise of purity. Discover the gentle power of nature with Be in Love hair oils, crafted to nourish and strengthen.
            </p>

            <div className="reveal mt-10 flex flex-wrap gap-4" style={{ animationDelay: '320ms' }}>
              <Link to="/shop"
                className="btn-shine rounded-lg bg-gold-btn px-8 py-3.5 font-medium text-ink shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-xl">
                Shop Now
              </Link>
              <Link to="/about"
                className="rounded-lg border border-white/30 bg-white/5 px-8 py-3.5 font-medium text-white backdrop-blur transition hover:border-gold hover:text-gold">
                Explore Our Story →
              </Link>
            </div>
          </div>

          <div className="reveal group relative" style={{ animationDelay: '200ms' }}>
            <div className="rounded-[2rem] border border-white/15 bg-white/5 p-3 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="overflow-hidden rounded-3xl">
                <img src="/hero.jpeg" alt="Woman with long, healthy hair holding Be in Love hair oil"
                  className="w-full aspect-[4/5] object-cover object-[55%_center] transition duration-[1200ms] ease-out group-hover:scale-105" />
              </div>
            </div>
            <div className="absolute -bottom-5 left-4 hidden items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-5 py-3 text-ink shadow-xl backdrop-blur sm:flex md:-left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-olive text-white"><Ico d={LEAF} size={20} /></span>
              <span className="leading-tight">
                <span className="block font-serif text-base font-semibold">Pure &amp; Ayurvedic</span>
                <span className="block text-xs text-ink/60">Loved by real people</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── TRUST STRIP ───────── */}
      <section className="border-b border-olive/10 bg-white">
        <ul className="max-w-7xl mx-auto grid grid-cols-2 gap-y-6 px-6 lg:px-10 py-8 lg:grid-cols-4">
          {TRUST.map(([label, d], i) => (
            <li key={label} className="reveal flex items-center justify-center gap-3 text-sm font-medium text-olive lg:justify-start" style={{ animationDelay: `${i * 70}ms` }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive/10"><Ico d={d} size={20} /></span>
              {label}
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── LOVE STORY + INGREDIENTS ───────── */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="reveal lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">Our belief</p>
            <h2 className="mt-3 font-serif font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-ink">
              Healthy hair is a <em className="font-normal text-olive">love story.</em>
            </h2>
            <div className="mt-6 h-0.5 w-16 bg-gold/70" />
            <div className="mt-8 space-y-5 text-ink/80 leading-8">
              <p>
                At Be in Love, we believe healthy hair is a love story. Our 100% natural hair oils blend time-honored
                ingredients with modern care, delivering nourishment that feels luxurious yet authentic.
              </p>
              <p>
                Free from harsh chemicals, our oils are crafted to restore shine, strength, and softness—because your
                hair deserves to be loved.
              </p>
            </div>
          </div>

          <div>
            <ul className="grid grid-cols-2 gap-4">
              {INGREDIENTS.map((name, i) => (
                <li key={name}
                  className="spotlight reveal group rounded-2xl border border-olive/15 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-olive/10"
                  style={{ animationDelay: `${(i % 2) * 80 + Math.floor(i / 2) * 60}ms` }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive text-white transition duration-300 group-hover:bg-gold-btn group-hover:text-ink">
                    <Ico d={LEAF} />
                  </span>
                  <p className="mt-5 text-xs font-semibold tracking-widest text-gold">0{i + 1}</p>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-ink">{name}</h3>
                </li>
              ))}
            </ul>
            <p className="reveal mt-5 text-center font-serif italic text-ink/60">…and other traditional Ayurvedic herbs.</p>
          </div>
        </div>
      </section>

      {/* ───────── RITUAL ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="reveal text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">The ritual</p>
            <h2 className="mt-3 font-serif font-semibold text-3xl md:text-5xl">Simple. Soothing. Yours.</h2>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {RITUAL.map(([title, text], i) => (
              <li key={title}
                className="spotlight reveal rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold/50"
                style={{ animationDelay: `${i * 90}ms` }}>
                <span className="font-serif text-5xl text-gold/80">{i + 1}</span>
                <h3 className="mt-3 font-serif text-2xl">{title}</h3>
                <p className="mt-2 leading-7 text-white/75">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
          <div className="reveal relative overflow-hidden rounded-[2rem] border border-gold/30 bg-white px-8 py-14 text-center shadow-xl shadow-olive/10">
            <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-96 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
            <h2 className="relative font-serif font-semibold text-3xl md:text-5xl text-ink">
              Your hair deserves to be <em className="font-normal text-olive">loved.</em>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-ink/70 leading-8">
              Restore shine, strength and softness the natural way.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/shop" className="btn-shine rounded-lg bg-olive px-8 py-3.5 font-medium text-white shadow-lg shadow-olive/20 transition hover:-translate-y-0.5 hover:bg-olive-dark">
                Shop Now
              </Link>
              <Link to="/benefits" className="rounded-lg border border-olive px-8 py-3.5 font-medium text-olive transition hover:bg-olive hover:text-white">
                Why Be in Love
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}