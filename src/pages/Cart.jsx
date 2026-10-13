import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartItemRow from '../components/CartItemRow.jsx';
import { money } from '../utils/money.js';

export default function Cart() {
  const { items, count, subtotal, clear } = useCart();

  return (
    <>
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 text-center">
          <h1 className="font-serif font-semibold text-4xl md:text-5xl">Your Cart</h1>
        </div>
      </section>

      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
          {items.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-olive/15 bg-white p-10 text-center shadow-lg shadow-olive/5">
              <p className="font-serif text-2xl text-ink">Your cart is empty</p>
              <p className="mt-2 text-ink/60">Add your hair oil to get started.</p>
              <Link
                to="/shop"
                className="mt-6 inline-block rounded-lg bg-olive px-8 py-3.5 font-medium text-white transition hover:bg-olive-dark"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
              {/* Items */}
              <div className="lg:col-span-2 rounded-3xl border border-olive/15 bg-white px-6 shadow-lg shadow-olive/5">
                <ul className="divide-y divide-olive/10">
                  {items.map((item) => (
                    <CartItemRow key={item.productId} item={item} />
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-olive/10 py-4 text-sm">
                  <Link to="/shop" className="font-medium text-olive hover:underline underline-offset-4">
                    ← Continue shopping
                  </Link>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-ink/60 hover:text-red-600 hover:underline underline-offset-4"
                  >
                    Clear cart
                  </button>
                </div>
              </div>

              {/* Summary */}
              <aside className="rounded-3xl border border-olive/15 bg-white p-6 shadow-lg shadow-olive/5 lg:sticky lg:top-28">
                <h2 className="font-serif text-xl font-semibold text-ink">Order summary</h2>
                <dl className="mt-5 space-y-3 text-ink/80">
                  <div className="flex justify-between">
                    <dt>Items ({count})</dt>
                    <dd>{money(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Shipping</dt>
                    <dd className="text-ink/60">At checkout</dd>
                  </div>
                  <div className="flex justify-between border-t border-olive/10 pt-4 text-lg font-medium text-ink">
                    <dt>Subtotal</dt>
                    <dd className="font-serif text-2xl font-semibold text-olive">{money(subtotal)}</dd>
                  </div>
                </dl>

                <Link
                  to="/checkout"
                  className="mt-6 block rounded-lg bg-olive px-6 py-3.5 text-center font-medium text-white shadow-lg shadow-olive/20 transition hover:-translate-y-0.5 hover:bg-olive-dark"
                >
                  Proceed to Checkout
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}