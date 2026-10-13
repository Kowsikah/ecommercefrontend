import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartItemRow from './CartItemRow.jsx';
import { money } from '../utils/money.js';

export default function CartDrawer() {
  const { items, count, subtotal, drawerOpen, closeDrawer } = useCart();
  const { pathname } = useLocation();

  // Close when the page changes
  useEffect(() => { closeDrawer(); }, [pathname, closeDrawer]);

  // Esc closes it, and the page behind doesn't scroll
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeDrawer();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] duration-300 ${drawerOpen ? 'visible' : 'invisible'}`}
      aria-hidden={!drawerOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between border-b border-olive/15 px-6 py-5">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Your cart{count > 0 && <span className="ml-2 text-base font-normal text-ink/60">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-olive/20 text-ink hover:bg-olive/5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="font-serif text-xl text-ink">Your cart is empty</p>
            <p className="mt-2 text-sm text-ink/60">Add your hair oil to get started.</p>
            <Link
              to="/shop"
              className="mt-6 rounded-lg bg-olive px-7 py-3 font-medium text-white transition hover:bg-olive-dark"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-olive/10 overflow-y-auto px-6">
              {items.map((item) => (
                <CartItemRow key={item.productId} item={item} compact />
              ))}
            </ul>

            <footer className="border-t border-olive/15 bg-white px-6 py-5">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-ink">Subtotal</span>
                <span className="font-serif text-2xl font-semibold text-olive">{money(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink/55">Shipping is added at checkout.</p>

              <Link
                to="/checkout"
                className="mt-4 block rounded-lg bg-olive px-6 py-3.5 text-center font-medium text-white shadow-lg shadow-olive/20 transition hover:bg-olive-dark"
              >
                Checkout
              </Link>
              <Link
                to="/cart"
                className="mt-3 block rounded-lg border border-olive px-6 py-3 text-center font-medium text-olive transition hover:bg-olive hover:text-white"
              >
                View cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}