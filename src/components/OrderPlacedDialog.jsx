import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderPlacedDialog({ orderId, email, emailSent }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const orderNo = orderId.slice(0, 8).toUpperCase();

  // Page behind the dialog doesn't scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(orderNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available: the number is still visible */
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-placed-title"
        className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-olive text-white">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>

        <h2 id="order-placed-title" className="mt-5 font-serif text-3xl font-semibold text-ink">
          Order placed!
        </h2>
        <p className="mt-2 text-ink/70">Thank you for choosing Be in Love.</p>

        <div className="mt-6 rounded-2xl border border-olive/20 bg-cream p-5">
          <p className="text-xs uppercase tracking-widest text-ink/50">Your order number</p>
          <p className="mt-1 font-serif text-4xl font-semibold tracking-widest text-olive">{orderNo}</p>
          <button
            type="button"
            onClick={copy}
            className="mt-3 text-sm font-medium text-olive underline underline-offset-4"
          >
            {copied ? 'Copied ✓' : 'Copy order number'}
          </button>
        </div>

        {emailSent ? (
          <div role="status" className="mt-5 flex items-start gap-3 rounded-xl bg-olive/10 p-4 text-left text-sm leading-6 text-ink/80">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-olive text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span>
              Confirmation email sent to <strong className="text-ink">{email}</strong>.
              If you can’t find it, please check your spam folder.
            </span>
          </div>
        ) : (
          <p className="mt-5 rounded-xl bg-cream p-4 text-sm leading-6 text-ink/70">
            We couldn’t send the confirmation email just now, but your order is saved.
            Please keep your order number, and we’ll contact you on your mobile number to confirm delivery.
          </p>
        )}

        <div className="mt-7 flex flex-col gap-3">
          <button
            type="button"
            autoFocus
            onClick={() => navigate(`/order/${orderId}`, { replace: true })}
            className="rounded-lg bg-olive px-6 py-3.5 font-medium text-white shadow-lg shadow-olive/20 transition hover:bg-olive-dark"
          >
            View order details
          </button>
          <button
            type="button"
            onClick={() => navigate('/shop', { replace: true })}
            className="rounded-lg border border-olive px-6 py-3 font-medium text-olive transition hover:bg-olive hover:text-white"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}
