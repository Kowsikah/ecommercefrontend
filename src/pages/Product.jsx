import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';

/* ── Content from the requirement doc (edit here) ── */
const WHY_YOULL_LOVE_IT = [
  'A lightweight blend that restores vibrancy without greasiness.',
  'A rich, soothing oil that transforms dry, damaged hair into soft, healthy locks.',
];

const BENEFITS = [
  'Improves hair growth & hair texture',
  'Gives soft and smooth hair, reduces frizz',
  'Helps reduce hair fall',
  'Helps reduce premature greying',
  'Boosts shine and strengthens strands',
  'Deeply hydrates, repairs split ends and soothes the scalp',
];

const FEATURES = [
  'Suitable for all hair types',
  'For men, women & children',
  '100% natural',
];

const HOW_TO_USE = [
  'Take a small amount of Be in Love hair oil.',
  'Massage into the scalp and hair.',
  'Leave for 30 minutes or overnight.',
  'Wash it using a mild shampoo.',
  'Apply on the ends of the hair regularly to help reduce split ends.',
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Product() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const { addItem, openDrawer } = useCart();

useEffect(() => {
  api.get('/products')
    .then(({ data }) => {
      const first = Array.isArray(data) ? data[0] : null;
      if (!first?.id) throw new Error('Unexpected response from the server');
      setProduct(first);
    })
    .catch(() => setError('Could not load the product. Please make sure the server is running and refresh.'));
}, []);

  const maxQty = Math.min(product?.stock ?? 10, 10);
  const outOfStock = product && product.stock === 0;

  // Passes the whole product object from the API (not the click event)
    const handleAddToCart = () => {
    if (!product) return;
    addItem(product, qty);   // the whole product, not the click event
    openDrawer();
  };

  return (
    <>
      {/* ───────── PAGE HEADER ───────── */}
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-gold">Shop</p>
          <h1 className="mt-3 font-serif font-semibold text-4xl md:text-5xl lg:text-6xl leading-tight">
            Nature’s Finest Hair Oils
          </h1>
          <p className="mt-4 font-serif italic text-lg md:text-xl text-gold">
            Purely natural. Perfectly you.
          </p>
        </div>
      </section>

      {/* ───────── PRODUCT ───────── */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image */}
          <div className="lg:sticky lg:top-28 rounded-[2rem] border border-olive/15 bg-white p-3 shadow-xl shadow-olive/10">
            <img
              src={product?.image_url || '/product.jpeg'}
              alt={product?.name || 'Be in Love hair oil'}
              className="w-full aspect-[4/5] object-cover object-[55%_35%] rounded-3xl"
            />
          </div>

          {/* Details */}
          <div>
            <h2 className="font-serif font-semibold text-3xl md:text-4xl text-ink">
              {product?.name || 'Be in Love Hair Oil'}
            </h2>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-4xl font-semibold text-olive">
                ₹{Number(product?.price ?? 598)}
              </span>
              {product?.size_ml && (
                <span className="text-sm text-ink/60">/ {product.size_ml} ml</span>
              )}
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            {/* Why you'll love it */}
            <div className="mt-8">
              <h3 className="font-serif text-xl text-olive">Why you’ll love it</h3>
              <ul className="mt-3 space-y-3 text-ink/80 leading-7">
                {WHY_YOULL_LOVE_IT.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1 text-gold"><CheckIcon /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature chips */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {FEATURES.map((f) => (
                <span key={f} className="rounded-full border border-olive/25 bg-white px-4 py-1.5 text-sm text-olive transition hover:border-olive hover:bg-olive hover:text-white">
                  {f}
                </span>
              ))}
            </div>

            {/* Quantity + CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-lg border border-olive/30 bg-white">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="h-12 w-12 text-xl text-olive hover:bg-olive/5 rounded-l-lg"
                >
                  −
                </button>
                <span className="w-10 text-center font-medium" aria-live="polite">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                  aria-label="Increase quantity"
                  className="h-12 w-12 text-xl text-olive hover:bg-olive/5 rounded-r-lg"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product || outOfStock}
                className="btn-shine flex-1 min-w-[10rem] rounded-lg bg-olive px-8 py-3.5 font-medium text-white shadow-lg shadow-olive/20 transition hover:-translate-y-0.5 hover:bg-olive-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {outOfStock ? 'Out of stock' : 'Add to Cart'}
              </button>

              <a
                href="#reviews"
                className="rounded-lg border border-olive px-6 py-3.5 font-medium text-olive transition hover:bg-olive hover:text-white"
              >
                Read Reviews
              </a>
            </div>

            <p className="mt-5 text-sm text-ink/60">
              Highly recommended for both men &amp; women, and children.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── BENEFITS ───────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h2 className="reveal font-serif font-semibold text-3xl md:text-4xl text-ink text-center">
            Benefits you’ll love
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div
                key={b}
                className="reveal spotlight flex items-start gap-4 rounded-2xl border border-olive/10 bg-cream p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-olive/10"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive text-white">
                  <CheckIcon />
                </span>
                <p className="pt-1 text-ink/85 leading-7">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── HOW TO USE ───────── */}
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl text-center">How to use</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {HOW_TO_USE.map((step, i) => (
              <li
                key={step}
                className="reveal flex items-start gap-4 rounded-2xl border border-white/15 bg-white/5 p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-btn font-semibold text-ink">
                  {i + 1}
                </span>
                <p className="pt-1 text-white/90 leading-7">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── REVIEWS (anchor for "Read Reviews") ───────── */}
     {/* ───────── REVIEWS (anchor for "Read Reviews") ───────── */}
<section id="reviews" className="bg-cream scroll-mt-24">
  <div className="max-w-4xl mx-auto px-6 py-16 text-center">
    <h2 className="font-serif font-semibold text-3xl text-ink">Customer reviews</h2>
    <p className="mt-3 text-ink/70">Real people. Real results. Real love.</p>

    <div className="mt-10 rounded-[2rem] border border-olive/15 bg-white p-3 shadow-xl shadow-olive/10">
      <img
        src="https://res.cloudinary.com/dzhwcv2tr/image/upload/f_auto/q_auto/review_customer_xzpgw2.png"
        alt="Customer reviews and before/after results for Be in Love hair oil"
        loading="lazy"
        className="w-full h-auto rounded-3xl"
      />
    </div>

    <p className="mt-10 text-ink/70">Have questions about the oil?</p>
    <Link
      to="/contact"
      className="btn-shine mt-4 inline-block rounded-lg bg-gold-btn px-7 py-3.5 font-medium text-ink transition hover:brightness-105"
    >
      Ask us anything
    </Link>
  </div>
</section>
         </>
  );
}