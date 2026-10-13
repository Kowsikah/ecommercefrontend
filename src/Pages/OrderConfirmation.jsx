import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client.js';
import { money } from '../utils/money.js';

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(({ data }) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Order not found.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-cream flex items-center justify-center">
        <p className="text-ink/60 text-lg">Loading order details...</p>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="bg-cream">
        <div className="mx-auto max-w-md px-6 py-20 text-center">
          <p className="font-serif text-2xl text-ink">{error || 'Order not found'}</p>
          <Link to="/shop" className="mt-6 inline-block rounded-lg bg-olive px-8 py-3.5 font-medium text-white shadow-lg shadow-olive/20 transition hover:bg-olive-dark">
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream py-14">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-3xl border border-olive/15 bg-white p-8 shadow-lg shadow-olive/5">
          <div className="text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-olive/10 text-olive">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h1 className="mt-4 font-serif text-3xl font-semibold text-ink">Order Confirmed!</h1>
            <p className="mt-1 text-sm text-ink/60">Thank you for your order, {order.shipping_name}.</p>
            <p className="mt-1 text-xs text-ink/50 font-mono">Order ID: {order.id}</p>
          </div>

          <div className="mt-8 border-t border-olive/10 pt-6">
            <h2 className="font-serif text-lg font-semibold text-ink">Items Ordered</h2>
            <ul className="mt-4 divide-y divide-olive/10">
              {order.items?.map((item, index) => (
                <li key={index} className="flex justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink/60">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-ink">{money(item.unit_price * item.quantity)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t border-olive/10 pt-4 space-y-2 text-sm text-ink/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{money(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shipping_fee === 0 ? 'Free' : money(order.shipping_fee)}</span>
            </div>
            <div className="flex justify-between border-t border-olive/10 pt-3 text-base font-semibold text-ink">
              <span>Total ({order.payment_method?.toUpperCase()})</span>
              <span className="text-olive">{money(order.total)}</span>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/shop" className="inline-block rounded-lg bg-olive px-8 py-3.5 font-medium text-white shadow-lg shadow-olive/20 transition hover:bg-olive-dark">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}