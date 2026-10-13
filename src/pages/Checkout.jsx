import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';
import { money } from '../utils/money.js';
import OrderPlacedDialog from '../components/OrderPlacedDialog.jsx';

const STEPS = ['Contact', 'Delivery', 'Review & Pay'];

const inputClass =
  'mt-2 w-full rounded-lg border border-olive/25 bg-white px-4 py-3 text-ink placeholder:text-ink/40 ' +
  'outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/20';

const primaryBtn =
  'rounded-lg bg-olive px-8 py-3.5 font-medium text-white shadow-lg shadow-olive/20 transition ' +
  'hover:-translate-y-0.5 hover:bg-olive-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';

const secondaryBtn =
  'rounded-lg border border-olive px-6 py-3.5 font-medium text-olive transition hover:bg-olive hover:text-white';

const empty = { name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '', notes: '' };

/* ── Progress indicator ── */
function Stepper({ step }) {
  return (
    <ol className="mx-auto flex max-w-xl items-center" aria-label="Checkout progress">
      {STEPS.map((label, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none" aria-current={current ? 'step' : undefined}>
            <div className="flex flex-col items-center gap-2">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                  done
                    ? 'bg-olive text-white'
                    : current
                    ? 'bg-gold-btn text-ink ring-4 ring-gold-btn/30'
                    : 'border border-olive/30 bg-white text-ink/50'
                }`}
              >
                {done ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className={`text-xs sm:text-sm ${current ? 'font-medium text-ink' : 'text-ink/55'}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <span className={`mx-2 mb-6 h-0.5 flex-1 rounded ${done ? 'bg-olive' : 'bg-olive/15'}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(empty);
  const [config, setConfig] = useState({ shippingFee: 0, freeShippingAbove: 0 });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState(null); // { id, email, emailSent } after a successful order

  useEffect(() => {
    api.get('/orders/config').then(({ data }) => setConfig(data)).catch(() => {});
  }, []);

  // Start each step at the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const shipping =
    config.freeShippingAbove > 0 && subtotal >= config.freeShippingAbove ? 0 : config.shippingFee;
  const total = subtotal + shipping;

  // After a successful order: show the dialog (the cart is already empty at this point)
  if (placed) {
    return (
      <section className="min-h-[60vh] bg-cream">
        <OrderPlacedDialog orderId={placed.id} email={placed.email} emailSent={placed.emailSent} />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-cream">
        <div className="mx-auto max-w-md px-6 py-20 text-center">
          <p className="font-serif text-2xl text-ink">Your cart is empty</p>
          <Link to="/shop" className={`${primaryBtn} mt-6 inline-block`}>Shop Now</Link>
        </div>
      </section>
    );
  }

  const next = (e) => {
    e.preventDefault();
    setError('');
    setStep((s) => Math.min(s + 1, 2));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { data } = await api.post('/orders', {
        items: items.map((i) => ({ productId: i.productId, qty: i.qty })),
        customer: form,
      });
      setPlaced({ id: data.id, email: form.email, emailSent: data.emailSent });
      clear();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Could not place your order. Please try again or message us on WhatsApp.'
      );
      setBusy(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 text-center">
          <h1 className="font-serif font-semibold text-4xl md:text-5xl">Checkout</h1>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
          <Stepper step={step} />

          <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:items-start">
            {/* ── Current step ── */}
            <div className="lg:col-span-3 rounded-3xl border border-olive/15 bg-white p-6 sm:p-8 shadow-lg shadow-olive/5">
              {/* STEP 1: Contact */}
              {step === 0 && (
                <form onSubmit={next}>
                  <h2 className="font-serif text-2xl font-semibold text-ink">Contact details</h2>
                  <p className="mt-1 text-sm text-ink/60">We’ll call or message you about your delivery.</p>

                  <label className="mt-6 block text-sm font-medium text-ink">
                    Full name
                    <input name="name" value={form.name} onChange={onChange} required minLength={2} maxLength={100}
                      autoComplete="name" placeholder="Your name" className={inputClass} />
                  </label>

                  <label className="mt-5 block text-sm font-medium text-ink">
                    Mobile number
                    <input name="phone" value={form.phone} onChange={onChange} required
                      type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10}
                      title="Enter a 10-digit mobile number"
                      autoComplete="tel-national" placeholder="10-digit mobile number" className={inputClass} />
                  </label>

                  <label className="mt-5 block text-sm font-medium text-ink">
                    Email
                    <input name="email" value={form.email} onChange={onChange} type="email" required
                      autoComplete="email" placeholder="you@example.com" className={inputClass} />
                    <span className="mt-1 block text-xs font-normal text-ink/50">
                      We’ll send your order confirmation here.
                    </span>
                  </label>

                  <div className="mt-8 flex justify-between gap-3">
                    <Link to="/cart" className={secondaryBtn}>← Cart</Link>
                    <button type="submit" className={primaryBtn}>Continue →</button>
                  </div>
                </form>
              )}

              {/* STEP 2: Delivery */}
              {step === 1 && (
                <form onSubmit={next}>
                  <h2 className="font-serif text-2xl font-semibold text-ink">Delivery address</h2>
                  <p className="mt-1 text-sm text-ink/60">Where should we send your order?</p>

                  <label className="mt-6 block text-sm font-medium text-ink">
                    Address
                    <textarea name="address" value={form.address} onChange={onChange} required
                      minLength={5} maxLength={300} rows={3} autoComplete="street-address"
                      placeholder="House / flat no., street, area, landmark"
                      className={`${inputClass} resize-y`} />
                  </label>

                  <div className="mt-5 grid gap-5 sm:grid-cols-3">
                    <label className="block text-sm font-medium text-ink">
                      City
                      <input name="city" value={form.city} onChange={onChange} required minLength={2}
                        autoComplete="address-level2" className={inputClass} />
                    </label>
                    <label className="block text-sm font-medium text-ink">
                      State
                      <input name="state" value={form.state} onChange={onChange} required minLength={2}
                        autoComplete="address-level1" className={inputClass} />
                    </label>
                    <label className="block text-sm font-medium text-ink">
                      Pincode
                      <input name="pincode" value={form.pincode} onChange={onChange} required
                        inputMode="numeric" pattern="[1-9][0-9]{5}" maxLength={6}
                        title="Enter a 6-digit pincode"
                        autoComplete="postal-code" placeholder="6 digits" className={inputClass} />
                    </label>
                  </div>

                  <label className="mt-5 block text-sm font-medium text-ink">
                    Order notes <span className="font-normal text-ink/50">(optional)</span>
                    <textarea name="notes" value={form.notes} onChange={onChange} maxLength={500} rows={2}
                      placeholder="Anything we should know?" className={`${inputClass} resize-y`} />
                  </label>

                  <div className="mt-8 flex justify-between gap-3">
                    <button type="button" onClick={() => setStep(0)} className={secondaryBtn}>← Back</button>
                    <button type="submit" className={primaryBtn}>Continue →</button>
                  </div>
                </form>
              )}

              {/* STEP 3: Review & Pay */}
              {step === 2 && (
                <form onSubmit={placeOrder}>
                  <h2 className="font-serif text-2xl font-semibold text-ink">Review your order</h2>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-olive/15 bg-cream p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 text-sm leading-6 text-ink/80">
                          <p className="text-xs uppercase tracking-widest text-ink/50">Contact</p>
                          <p className="font-medium text-ink">{form.name}</p>
                          <p>{form.phone}</p>
                          <p className="break-all">{form.email}</p>
                        </div>
                        <button type="button" onClick={() => setStep(0)}
                          className="text-sm font-medium text-olive underline underline-offset-4">Edit</button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-olive/15 bg-cream p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm leading-6 text-ink/80">
                          <p className="text-xs uppercase tracking-widest text-ink/50">Deliver to</p>
                          <p>{form.address}</p>
                          <p>{form.city}, {form.state} – {form.pincode}</p>
                          {form.notes && <p className="mt-1 italic text-ink/60">Note: {form.notes}</p>}
                        </div>
                        <button type="button" onClick={() => setStep(1)}
                          className="text-sm font-medium text-olive underline underline-offset-4">Edit</button>
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-8 font-serif text-xl font-semibold text-ink">Payment</h3>
                  <div className="mt-3 flex items-start gap-3 rounded-2xl border-2 border-olive bg-olive/5 p-4">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-olive">
                      <span className="h-2.5 w-2.5 rounded-full bg-olive" />
                    </span>
                    <div>
                      <p className="font-medium text-ink">Cash on Delivery</p>
                      <p className="text-sm text-ink/60">Pay when your order arrives.</p>
                    </div>
                  </div>

                  {error && (
                    <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
                  )}

                  <div className="mt-8 flex flex-wrap justify-between gap-3">
                    <button type="button" onClick={() => setStep(1)} className={secondaryBtn} disabled={busy}>← Back</button>
                    <button type="submit" disabled={busy} className={primaryBtn}>
                      {busy ? 'Placing order…' : `Place Order · ${money(total)}`}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ── Summary (always visible) ── */}
            <aside className="lg:col-span-2 rounded-3xl border border-olive/15 bg-white p-6 shadow-lg shadow-olive/5 lg:sticky lg:top-28">
              <h2 className="font-serif text-xl font-semibold text-ink">Order summary</h2>

              <ul className="mt-4 divide-y divide-olive/10">
                {items.map((i) => (
                  <li key={i.productId} className="flex items-center gap-3 py-3">
                    <img src={i.image} alt="" className="h-14 w-14 rounded-lg border border-olive/15 object-cover object-[55%_35%]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{i.name}</p>
                      <p className="text-xs text-ink/60">Qty {i.qty}</p>
                    </div>
                    <p className="text-sm font-medium text-ink">{money(i.price * i.qty)}</p>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 space-y-3 border-t border-olive/10 pt-4 text-ink/80">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? 'Free' : money(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-olive/10 pt-4 text-lg font-medium text-ink">
                  <dt>Total</dt>
                  <dd className="font-serif text-2xl font-semibold text-olive">{money(total)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}