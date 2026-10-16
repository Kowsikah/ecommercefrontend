import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import { money } from '../utils/money.js';

const STEPS = [
  ['pending', 'Order placed'],
  ['confirmed', 'Confirmed'],
  ['shipped', 'Shipped'],
  ['delivered', 'Delivered'],
];

const inputCls =
  'mt-2 w-full rounded-lg border border-olive/25 px-4 py-3 outline-none focus:border-olive focus:ring-2 focus:ring-olive/20';

export default function TrackOrder() {
  const [form, setForm] = useState({ orderId: '', contact: '' });
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError(''); setOrder(null);
    try {
      const { data } = await api.post('/orders/track', form);
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not look up your order. Please try again.');
    } finally { setBusy(false); }
  };

  const cancelled = order?.status === 'cancelled';
  // Older/other status values (e.g. 'paid', 'confirmed') count as "Order placed"
  const found = STEPS.findIndex(([k]) => k === order?.status);
  const current = found === -1 ? 0 : found;

  return (
    <>
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 text-center">
          <p className="text-xs uppercase tracking-widest text-gold">Orders</p>
          <h1 className="mt-3 font-serif font-semibold text-4xl md:text-5xl">Track Your Order</h1>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-xl px-6 py-14">
          <form onSubmit={submit} className="rounded-3xl border border-olive/15 bg-white p-8 shadow-xl shadow-olive/10">
            <label className="block text-sm font-medium text-ink">
              Order ID
              <input name="orderId" value={form.orderId} onChange={onChange} required
                placeholder="From your order confirmation" className={inputCls} />
            </label>
            <label className="mt-4 block text-sm font-medium text-ink">
              Email or phone used at checkout
              <input name="contact" value={form.contact} onChange={onChange} required
                placeholder="you@example.com or 98765 43210" className={inputCls} />
            </label>
            <button type="submit" disabled={busy}
              className="mt-5 w-full rounded-lg bg-olive px-6 py-3 font-medium text-white hover:bg-olive-dark disabled:opacity-60">
              {busy ? 'Searching…' : 'Track Order'}
            </button>
            {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          </form>

          {order && (
            <div className="mt-8 rounded-3xl border border-olive/15 bg-white p-8 shadow-lg shadow-olive/5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink/50">Status</p>
                  <p className={`font-serif text-2xl font-semibold ${cancelled ? 'text-red-600' : 'text-olive'}`}>
                    {cancelled ? 'Cancelled' : STEPS[current]?.[1] || order.status}
                  </p>
                  {order.updated_at && (
                    <p className="text-xs text-ink/50">Updated {new Date(order.updated_at).toLocaleString()}</p>
                  )}
                </div>
                <p className="font-mono text-xs text-ink/50">#{order.id}</p>
              </div>

              {!cancelled && (
                <ol className="mt-8 space-y-0">
                  {STEPS.map(([key, label], i) => {
                    const done = i <= current;
                    return (
                      <li key={key} className="relative flex gap-4 pb-6 last:pb-0">
                        {i < STEPS.length - 1 && (
                          <span className={`absolute left-[11px] top-6 h-full w-0.5 ${i < current ? 'bg-olive' : 'bg-olive/15'}`} />
                        )}
                        <span className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                          done ? 'bg-olive text-white' : 'border-2 border-olive/20 bg-white'}`}>
                          {done && '✓'}
                        </span>
                        <span className={done ? 'font-medium text-ink' : 'text-ink/40'}>{label}</span>
                      </li>
                    );
                  })}
                </ol>
              )}

              {order.tracking_number && (
                <div className="mt-6 rounded-2xl bg-cream p-4 text-sm">
                  <p className="text-ink/60">{order.courier || 'Courier'} tracking number</p>
                  <p className="font-mono font-medium text-ink">{order.tracking_number}</p>
                  {order.tracking_url && (
                    <a href={order.tracking_url} target="_blank" rel="noopener noreferrer"
                      className="mt-2 inline-block font-medium text-olive underline underline-offset-4">
                      Track with courier →
                    </a>
                  )}
                </div>
              )}

              <div className="mt-6 flex justify-between border-t border-olive/10 pt-4 text-sm font-semibold text-ink">
                <span>Order total</span><span className="text-olive">{money(order.total)}</span>
              </div>
              <p className="mt-5 text-sm text-ink/60">
                Need help? <Link to="/contact" className="text-olive underline underline-offset-4">Contact us</Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}