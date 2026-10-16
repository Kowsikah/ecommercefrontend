import { useState } from 'react';

/* ── Content exactly as given ── */
const WHY_POINTS = [
  'Made with carefully selected natural ingredients',
  'Inspired by traditional hair care rituals',
  'Created for real hair problems, not marketing claims',
  'Tested by real people, not labs alone',
];

const STANDS_FOR = [
  'Stronger roots',
  'Healthier scalp',
  'Naturally shiny, thicker hair',
];

/* Interactive Milestone Highlights for the Story Section */
const STORY_HIGHLIGHTS = [
  {
    tag: 'Origin',
    title: 'March 19, 2023',
    desc: 'Born from a very personal place — love, care, and a real struggle with hair problems.',
  },
  {
    tag: 'The Reality',
    title: 'The Turning Point',
    desc: 'Hair fall, dryness, thinning, and slow growth became part of everyday life. Chemical products only brought disappointment.',
  },
  {
    tag: 'Tradition',
    title: 'Back to Roots',
    desc: 'Formulating hair oil the traditional way using pure herbs, natural oils, and age-old Ayurvedic wisdom.',
  },
];

const CheckIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function About() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* ───────── EDITORIAL HEADER ───────── */}
      <section className="relative bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/25 via-transparent to-transparent opacity-75" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">Our Journey &amp; Heritage</span>
          <h1 className="mt-4 font-serif font-semibold text-4xl md:text-5xl lg:text-7xl leading-tight tracking-tight">
            Our Story – BeinLove Hair Oil
          </h1>
          <div className="mt-6 mx-auto h-0.5 w-20 bg-gold/70" />
        </div>
      </section>

      {/* ───────── STORY WITH INTERACTIVE TABS ───────── */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          
          {/* Photo with floating badge */}
          <div className="lg:sticky lg:top-28">
            <div className="relative rounded-[2.5rem] border-2 border-gold/40 bg-white p-4 shadow-2xl shadow-olive/20">
              <img
                src="https://res.cloudinary.com/dzhwcv2tr/image/upload/f_auto/q_auto/about_ablcqs.png"
                alt="Woman with long, healthy hair holding BeinLove hair oil"
                className="w-full aspect-[2/5] object-cover object-[60%_center] rounded-[2rem]"
              />
              <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3.5 rounded-2xl border border-gold/50 bg-white/95 backdrop-blur-md p-5 shadow-2xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-ink font-serif font-bold shadow-md">
                  ♥
                </span>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-ink/50 font-semibold">Self-Love</span>
                  <span className="block font-serif text-sm font-bold text-ink">In a Bottle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            
            {/* Interactive Timeline Selector */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-olive/10 border border-olive/15">
              {STORY_HIGHLIGHTS.map((item, idx) => (
                <button
                  key={item.tag}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === idx
                      ? 'bg-olive text-white shadow-md'
                      : 'text-ink/70 hover:text-ink hover:bg-white/50'
                  }`}
                >
                  {item.tag}
                </button>
              ))}
            </div>

            {/* Active Milestone Card */}
            <div className="spotlight rounded-3xl border border-olive/20 bg-white p-6 md:p-8 shadow-xl shadow-olive/10 transition-all duration-300">
              <span className="text-xs uppercase tracking-widest text-gold font-bold">
                {STORY_HIGHLIGHTS[activeTab].tag} Milestone
              </span>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
                {STORY_HIGHLIGHTS[activeTab].title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink/80">
                {STORY_HIGHLIGHTS[activeTab].desc}
              </p>
            </div>

            <div className="space-y-6 text-lg leading-8 text-ink/80 font-normal pt-2">
              <p>
                BeinLove was born on March 19, 2023, from a very personal place — love, care, and a
                real struggle with hair problems.
              </p>
              <p>
                Like many of you, we tried countless products that promised miracles but delivered
                disappointment. Hair fall, dryness, thinning, and slow growth became part of everyday
                life. What hurt more was realizing that most oils were either full of chemicals or
                didn’t suit Indian hair and scalp needs.
              </p>

              <div className="relative pl-6 border-l-2 border-gold my-6">
                <p className="font-serif text-2xl italic text-olive">
                  “That’s when we decided to go back to roots.”
                </p>
              </div>

              <p>
                We started formulating hair oil the traditional way — using pure herbs, natural oils,
                and age-old Ayurvedic wisdom, blended carefully, tested patiently, and used on our own
                family before offering it to anyone else.
              </p>

              <div className="rounded-3xl border border-olive/20 bg-gradient-to-br from-olive/5 via-cream to-olive/10 p-8 text-center shadow-xl shadow-olive/5">
                <p className="font-serif text-xl leading-relaxed text-ink">
                  BeinLove is not just a hair oil.
                  <br />
                  <span className="text-olive font-semibold text-2xl mt-1 block">It is self-love in a bottle.</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────── WHY BEINLOVE ───────── */}
      <section className="bg-white py-24 lg:py-32 border-t border-olive/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Our Commitment</span>
            <h2 className="mt-2 font-serif font-semibold text-3xl md:text-5xl text-ink">
              Why BeinLove?
            </h2>
            <div className="mt-4 mx-auto h-0.5 w-16 bg-gold/60" />
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {WHY_POINTS.map((point) => (
              <li
                key={point}
                className="reveal spotlight group flex items-start gap-4 rounded-3xl border border-olive/15 bg-cream/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-olive/15 hover:border-gold/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-olive text-white shadow-md transition group-hover:bg-gold group-hover:text-ink">
                  <CheckIcon size={20} />
                </span>
                <span className="pt-2 leading-relaxed text-ink/85 font-medium">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-16 rounded-3xl border border-olive/15 bg-cream p-8 md:p-10 text-center shadow-lg">
            <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-ink/85 font-serif italic">
              “We believe healthy hair begins with trust — trust in ingredients, in process, and in
              honesty. That’s why we focus on quality over quantity, results over hype, and love over
              shortcuts.”
            </p>
          </div>
        </div>
      </section>

      {/* ───────── TODAY (GRADIENT BANNER) ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white py-24 lg:py-32 text-center">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[55rem] rounded-full bg-gold/20 blur-[130px]" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">The Vision</span>
          <h2 className="mt-3 font-serif text-2xl md:text-4xl leading-snug">
            Today, BeinLove stands for every woman and man who wants:
          </h2>

          <ul className="mt-10 flex flex-wrap justify-center gap-4">
            {STANDS_FOR.map((item) => (
              <li
                key={item}
                className="rounded-full border border-gold/40 bg-white/10 px-7 py-3 text-gold backdrop-blur-md shadow-lg font-medium text-base transition hover:bg-gold hover:text-ink hover:scale-105"
              >
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-12 font-serif text-2xl italic text-white/90">
            And this is just the beginning.
          </p>
          <p className="mt-4 text-xl text-gold font-medium">
            💛 Thank you for being part of our journey.
          </p>
        </div>
      </section>
    </>
  );
}