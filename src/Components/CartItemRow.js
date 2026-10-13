import { useCart } from '../context/CartContext.jsx';
import { money } from '../utils/money.js';

export default function CartItemRow({ item, compact = false }) {
  const { setQty, removeItem } = useCart();
  const maxQty = Math.min(10, item.stock ?? 10);

  return (
    <li className="flex gap-4 py-5">
      <img
        src={item.image}
        alt={item.name}
        className={`${compact ? 'h-20 w-20' : 'h-24 w-24 sm:h-28 sm:w-28'} shrink-0 rounded-xl border border-olive/15 object-cover object-[55%_35%]`}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-serif font-semibold leading-snug text-ink">{item.name}</p>
            {item.sizeMl && <p className="text-sm text-ink/60">{item.sizeMl} ml</p>}
            <p className="mt-0.5 text-sm text-ink/60">{money(item.price)} each</p>
          </div>
          <p className="whitespace-nowrap font-medium text-ink">{money(item.price * item.qty)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="inline-flex items-center rounded-lg border border-olive/30 bg-white">
            <button
              type="button"
              onClick={() => setQty(item.productId, item.qty - 1)}
              disabled={item.qty <= 1}
              aria-label="Decrease quantity"
              className="h-9 w-9 rounded-l-lg text-lg text-olive hover:bg-olive/5 disabled:opacity-30"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-medium" aria-live="polite">{item.qty}</span>
            <button
              type="button"
              onClick={() => setQty(item.productId, item.qty + 1)}
              disabled={item.qty >= maxQty}
              aria-label="Increase quantity"
              className="h-9 w-9 rounded-r-lg text-lg text-olive hover:bg-olive/5 disabled:opacity-30"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            className="text-sm text-ink/60 underline-offset-4 hover:text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}