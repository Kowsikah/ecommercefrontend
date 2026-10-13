import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs tracking-widest uppercase text-gold">
              ✨ 100% Natural Hair Care
            </span>

            <p className="mt-6 max-w-md font-serif italic text-lg leading-relaxed text-white/80">
              Every bottle is a promise of purity. Your hair deserves to be loved.
            </p>

            <h1 className="mt-4 font-serif font-semibold text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              Make your hair healthier.
            </h1>

            <p className="mt-6 font-serif text-xl md:text-2xl text-gold">
              Thick, strong &amp; shiny. Celebrate every strand.
            </p>

            <p className="mt-5 max-w-lg text-white/80 leading-8">
              Discover the gentle power of nature with Be in Love hair oils, crafted to nourish and strengthen.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="rounded-lg bg-gold-btn px-7 py-3.5 font-medium text-ink shadow-lg shadow-black/20 transition hover:brightness-105"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="rounded-lg border border-white/30 bg-white/5 px-7 py-3.5 font-medium text-white transition hover:bg-white/10"
              >
                Explore Our Story
              </Link>
            </div>
          </div>

          {/* Right: framed photo */}
          <div className="rounded-[2rem] border border-white/15 bg-white/5 p-3 shadow-2xl shadow-black/30">
             <img
  src="/hero.jpeg"
  alt="Woman with long, healthy hair holding Be in Love hair oil"
  className="w-full aspect-[4/5] object-cover object-[55%_center] rounded-3xl"
/>
          </div>
        </div>
      </section>

      {/* ───────── HEALTHY HAIR IS A LOVE STORY ───────── */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <h2 className="font-serif font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-ink">
            Healthy hair is a love story.
          </h2>

          <div className="space-y-6 text-ink/80 leading-8">
            <p>
              At Be in Love, we believe healthy hair is a love story. Our 100% natural hair oils blend
              time-honored ingredients like coconut oil, hibiscus, bhringaraj, amla, tanner’s cassia,
              curry leaves, and other traditional Ayurvedic herbs with modern care, delivering nourishment
              that feels luxurious yet authentic.
            </p>
            <p>
              Free from harsh chemicals, our oils are crafted to restore shine, strength, and
              softness—because your hair deserves to be loved.
            </p>
          </div>
        </div>
        
      </section>
   
    </>
  );
}