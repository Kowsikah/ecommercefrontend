import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client.js';
import { money } from '../../utils/money.js';
import { useAuth } from '../../context/AuthContext.jsx';

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const statusStyle = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-700',
};

const inputClass =
  'mt-1 w-full rounded-lg border border-olive/25 bg-white px-3 py-2.5 text-ink outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/20';

const when = (d) => new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

/* ───────────── Courier / tracking details ───────────── */
function TrackingForm({ order, disabled, onSave }) {
  const [f, setF] = useState({
    courier: order.courier ?? '',
    trackingNumber: order.tracking_number ?? '',
    trackingUrl: order.tracking_url ?? '',
  });
  const on = (e) => setF((x) => ({ ...x, [e.target.name]: e.target.value }));

  return (
    <div className="border-t border-olive/10 pt-4 sm:col-span-2">
      <p className="text-xs uppercase tracking-widest text-ink/50">Courier &amp; tracking (shown to the customer)</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        <input name="courier" value={f.courier} onChange={on} placeholder="Courier (e.g. DTDC)" className={inputClass} />
        <input name="trackingNumber" value={f.trackingNumber} onChange={on} placeholder="Tracking number" className={inputClass} />
        <input name="trackingUrl" value={f.trackingUrl} onChange={on} placeholder="https:// tracking link" className={inputClass} />
      </div>
      <button type="button" disabled={disabled} onClick={() => onSave(f)}
        className="mt-3 rounded-lg bg-olive px-5 py-2 text-sm font-medium text-white hover:bg-olive-dark disabled:opacity-50">
        Save tracking
      </button>
    </div>
  );
}

/* ───────────── Orders ───────────── */
function Orders({ auth, onExpired }) {
  const [orders, setOrders] = useState(null);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    api.get('/admin/orders', auth)
      .then(({ data }) => setOrders(data))
      .catch((e) => (e.response?.status === 401 ? onExpired() : setError('Could not load orders.')));
  }, [auth, onExpired]);

  useEffect(load, [load]);

  const changeStatus = async (id, status, extra = {}) => {
    setError('');
    try {
      await api.patch(`/admin/orders/${id}/status`, { status, ...extra }, auth);
      load();
    } catch (e) {
      if (e.response?.status === 401) return onExpired();
      setError(e.response?.data?.error || 'Could not update the order.');
    }
  };

  if (!orders) return <p className="py-10 text-center text-ink/60">{error || 'Loading…'}</p>;

  const shown = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
  const count = (s) => orders.filter((o) => o.status === s).length;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {['all', ...STATUSES].map((s) => (
          <button key={s} type="button" onClick={() => setFilter(s)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${
              filter === s ? 'border-olive bg-olive text-white' : 'border-olive/25 bg-white text-olive hover:bg-olive/5'
            }`}>
            {s}{s !== 'all' && ` (${count(s)})`}
          </button>
        ))}
      </div>

      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {shown.length === 0 ? (
        <p className="py-12 text-center text-ink/60">No orders here yet.</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {shown.map((o) => {
            const isOpen = open === o.id;
            const locked = o.status === 'cancelled';
            return (
              <li key={o.id} className="rounded-2xl border border-olive/15 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
                  <button type="button" onClick={() => setOpen(isOpen ? null : o.id)} className="text-left">
                    <p className="font-serif text-lg font-semibold text-olive">#{o.id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-sm text-ink/60">{when(o.created_at)}</p>
                    <p className="mt-1 text-sm font-medium text-ink">{o.shipping_name} · {o.city}</p>
                  </button>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-serif text-xl font-semibold text-ink">{money(o.total)}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyle[o.status] || 'bg-gray-100'}`}>
                      {o.status}
                    </span>
                    <select
                      value={o.status}
                      disabled={locked}
                      onChange={(e) => {
                        const next = e.target.value;
                        if (next === 'cancelled' && !window.confirm('Cancel this order? The stock will be added back.')) return;
                        changeStatus(o.id, next);
                      }}
                      aria-label="Change order status"
                      className="rounded-lg border border-olive/25 bg-white px-3 py-2 text-sm capitalize disabled:opacity-50"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {isOpen && (
                  <div className="grid gap-5 border-t border-olive/10 p-4 text-sm sm:grid-cols-2 sm:p-5">
                    <div className="space-y-1 text-ink/80">
                      <p className="text-xs uppercase tracking-widest text-ink/50">Customer</p>
                      <p className="font-medium text-ink">{o.shipping_name}</p>
                      <p>
                        <a href={`tel:+91${o.shipping_phone}`} className="text-olive underline underline-offset-4">{o.shipping_phone}</a>
                        {' · '}
                        <a href={`https://wa.me/91${o.shipping_phone}`} target="_blank" rel="noopener noreferrer"
                          className="text-olive underline underline-offset-4">WhatsApp</a>
                      </p>
                      {o.email && <p>{o.email}</p>}
                      <p className="pt-2 text-xs uppercase tracking-widest text-ink/50">Address</p>
                      <p>{o.shipping_address}</p>
                      <p>{o.city}, {o.state} – {o.pincode}</p>
                      {o.notes && <p className="italic text-ink/60">Note: {o.notes}</p>}
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-ink/50">Items</p>
                      <ul className="mt-1 divide-y divide-olive/10">
                        {o.items.map((i) => (
                          <li key={i.name} className="flex justify-between py-2">
                            <span>{i.name} × {i.quantity}</span>
                            <span>{money(i.unit_price * i.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 space-y-1 border-t border-olive/10 pt-2 text-ink/80">
                        <p className="flex justify-between"><span>Subtotal</span><span>{money(o.subtotal)}</span></p>
                        <p className="flex justify-between"><span>Shipping</span><span>{Number(o.shipping_fee) === 0 ? 'Free' : money(o.shipping_fee)}</span></p>
                        <p className="flex justify-between font-medium text-ink"><span>Total ({o.payment_method === 'cod' ? 'Cash on Delivery' : o.payment_method})</span><span>{money(o.total)}</span></p>
                      </div>
                    </div>
                    <TrackingForm order={o} disabled={locked}
                      onSave={(extra) => changeStatus(o.id, o.status, extra)} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ───────────── Products (list + add + edit) ───────────── */
const blank = { id: null, name: '', price: '', stock: '', size_ml: '', image_url: '' };
const toForm = (p) => ({
  id: p.id, name: p.name, price: p.price, stock: p.stock,
  size_ml: p.size_ml ?? '', image_url: p.image_url ?? '',
});

function ProductManager({ auth, onExpired }) {
  const [products, setProducts] = useState(null);
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get('/admin/products', auth)
      .then(({ data }) => {
        setProducts(data);
        setForm(data[0] ? toForm(data[0]) : { ...blank });
      })
      .catch((e) => (e.response?.status === 401 ? onExpired() : setMsg({ type: 'error', text: 'Could not load products.' })));
  }, [auth, onExpired]);

  if (!products || !form) return <p className="py-10 text-center text-ink/60">{msg.text || 'Loading…'}</p>;

  const isNew = !form.id;
  const clearMsg = () => setMsg({ type: '', text: '' });
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const select = (p) => { setForm(toForm(p)); clearMsg(); };
  const startNew = () => { setForm({ ...blank }); clearMsg(); };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    clearMsg();
    const payload = {
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      ...(form.size_ml !== '' && { size_ml: Number(form.size_ml) }),
      image_url: form.image_url,
    };
    try {
      if (isNew) {
        const { data } = await api.post('/admin/products', payload, auth);
        setProducts((list) => [...list, data]);
        setForm(toForm(data));
        setMsg({ type: 'ok', text: 'Product added.' });
      } else {
        const { data } = await api.patch(`/admin/products/${form.id}`, payload, auth);
        setProducts((list) => list.map((p) => (p.id === data.id ? data : p)));
        setForm(toForm(data));
        setMsg({ type: 'ok', text: 'Saved. The website now shows the new details.' });
      }
    } catch (err) {
      if (err.response?.status === 401) return onExpired();
      setMsg({ type: 'error', text: err.response?.data?.error || 'Could not save.' });
    }
    setBusy(false);
  };

  const remove = async () => {
    if (!window.confirm(`Delete "${form.name}"? This cannot be undone.`)) return;
    setBusy(true);
    clearMsg();
    try {
      await api.delete(`/admin/products/${form.id}`, auth);
      const rest = products.filter((p) => p.id !== form.id);
      setProducts(rest);
      setForm(rest[0] ? toForm(rest[0]) : { ...blank });
      setMsg({ type: 'ok', text: 'Product deleted.' });
    } catch (err) {
      if (err.response?.status === 401) return onExpired();
      setMsg({ type: 'error', text: err.response?.data?.error || 'Could not delete.' });
    }
    setBusy(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* List */}
      <div className="lg:col-span-1">
        <button type="button" onClick={startNew}
          className="w-full rounded-lg bg-olive px-4 py-2.5 text-sm font-medium text-white hover:bg-olive-dark">
          + Add product
        </button>
        <ul className="mt-4 space-y-2">
          {products.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => select(p)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                  form.id === p.id ? 'border-olive bg-olive/5' : 'border-olive/15 bg-white hover:border-olive/40'}`}>
                {p.image_url
                  ? <img src={p.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  : <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-cream text-xs text-ink/40">No img</span>}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-ink">{p.name}</span>
                  <span className="block text-sm text-ink/60">
                    {money(p.price)} · {p.stock === 0 ? <span className="text-red-600">Out of stock</span> : `${p.stock} in stock`}
                  </span>
                </span>
              </button>
            </li>
          ))}
          {products.length === 0 && <li className="py-4 text-center text-sm text-ink/60">No products yet.</li>}
        </ul>
      </div>

      {/* Form */}
      <form onSubmit={save} className="rounded-2xl border border-olive/15 bg-white p-6 shadow-sm lg:col-span-2">
        <h2 className="font-serif text-xl font-semibold text-ink">{isNew ? 'Add a new product' : 'Edit product'}</h2>

        <label className="mt-5 block text-sm font-medium text-ink">Product name
          <input name="name" value={form.name} onChange={onChange} required minLength={2} className={inputClass} />
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="block text-sm font-medium text-ink">Price (₹)
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={onChange} required className={inputClass} />
          </label>
          <label className="block text-sm font-medium text-ink">Stock
            <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={onChange} required className={inputClass} />
          </label>
          <label className="block text-sm font-medium text-ink">Size (ml)
            <input name="size_ml" type="number" min="1" step="1" value={form.size_ml} onChange={onChange} className={inputClass} />
          </label>
        </div>

        <label className="mt-4 block text-sm font-medium text-ink">
          Image path <span className="font-normal text-ink/50">(for example /bottle.jpg or an https:// link, or leave empty)</span>
          <input name="image_url" value={form.image_url} onChange={onChange} placeholder="/bottle.jpg" className={inputClass} />
        </label>

        {form.image_url && (
          <img src={form.image_url} alt="Preview" className="mt-3 h-28 w-28 rounded-xl border border-olive/15 object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        )}

        {msg.text && (
          <p role={msg.type === 'error' ? 'alert' : 'status'}
            className={`mt-4 rounded-lg px-4 py-3 text-sm ${msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-olive/10 text-olive'}`}>
            {msg.text}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="submit" disabled={busy}
            className="rounded-lg bg-olive px-8 py-3 font-medium text-white transition hover:bg-olive-dark disabled:opacity-60">
            {busy ? 'Saving…' : isNew ? 'Add product' : 'Save changes'}
          </button>
          {!isNew && (
            <button type="button" onClick={remove} disabled={busy}
              className="rounded-lg border border-red-300 px-6 py-3 font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ───────────── Messages ───────────── */
function Messages({ auth, onExpired }) {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/messages', auth)
      .then(({ data }) => setMessages(data))
      .catch((e) => (e.response?.status === 401 ? onExpired() : setError('Could not load messages.')));
  }, [auth, onExpired]);

  if (!messages) return <p className="py-10 text-center text-ink/60">{error || 'Loading…'}</p>;
  if (messages.length === 0) return <p className="py-12 text-center text-ink/60">No messages yet.</p>;

  return (
    <ul className="space-y-4">
      {messages.map((m) => (
        <li key={m.id} className="rounded-2xl border border-olive/15 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium text-ink">{m.name}</p>
            <p className="text-xs text-ink/50">{when(m.created_at)}</p>
          </div>
          <a href={`mailto:${m.email}`} className="text-sm text-olive underline underline-offset-4">{m.email}</a>
          <p className="mt-3 whitespace-pre-wrap text-ink/80 leading-7">{m.message}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────────── Page ───────────── */
const TABS = [['orders', 'Orders'], ['product', 'Products'], ['messages', 'Messages']];

export default function Dashboard() {
  const { token, logout } = useAuth(); // route is wrapped in <AdminRoute>, so only admins get here
  const [tab, setTab] = useState('orders');

  // Keep this page out of search engines
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const auth = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

  return (
    <>
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-serif font-semibold text-3xl">Admin</h1>
          <button type="button" onClick={logout}
            className="rounded-lg border border-white/30 px-4 py-2 text-sm hover:bg-white/10">Log out</button>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8 lg:py-10">
          <div role="tablist" className="flex gap-2 border-b border-olive/15">
            {TABS.map(([key, label]) => (
              <button key={key} role="tab" aria-selected={tab === key} type="button" onClick={() => setTab(key)}
                className={`-mb-px border-b-2 px-5 py-3 text-sm font-medium transition ${
                  tab === key ? 'border-olive text-olive' : 'border-transparent text-ink/60 hover:text-ink'
                }`}>
                {label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {tab === 'orders' && <Orders auth={auth} onExpired={logout} />}
            {tab === 'product' && <ProductManager auth={auth} onExpired={logout} />}
            {tab === 'messages' && <Messages auth={auth} onExpired={logout} />}
          </div>
        </div>
      </section>
    </>
  );
}