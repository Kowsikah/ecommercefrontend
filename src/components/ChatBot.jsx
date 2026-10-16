import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';

const WA = 'https://wa.me/916374962519';

/* ── Edit answers here ── */
const FAQ = [
  { keys: ['price', 'cost', 'how much', '598'], a: 'Be in Love Hair Oil (200 ml) is ₹598.', link: ['/shop', 'View product'] },
  { keys: ['use', 'apply', 'how to', 'overnight'], a: 'Massage a small amount into your scalp and hair, leave for 30 minutes or overnight, then wash with a mild shampoo. Apply on the ends regularly to help reduce split ends.' },
  { keys: ['ingredient', 'natural', 'made of', 'herb', 'chemical'], a: 'Our oil is 100% natural: coconut oil, hibiscus, bhringaraj, amla, tanner’s cassia, curry leaves and other Ayurvedic herbs, free from harsh chemicals.' },
  { keys: ['benefit', 'hair fall', 'growth', 'grey', 'frizz', 'dandruff'], a: 'It helps reduce hair fall, improves growth and texture, reduces frizz and premature greying, adds shine and soothes the scalp.', link: ['/benefits', 'See all benefits'] },
  { keys: ['who', 'men', 'women', 'child', 'kid', 'type'], a: 'It suits all hair types, and is for men, women and children.' },
  { keys: ['track', 'order status', 'where is my order'], a: 'You can check your order with your Order ID.', link: ['/track-order', 'Track my order'] },
  { keys: ['refund', 'return', 'money back'], a: 'Our refund terms are on the Refund Policy page.', link: ['/refund-policy', 'Refund Policy'] },
  { keys: ['cancel'], a: 'Details on cancelling an order are on our Cancellation Policy page.', link: ['/cancellation-policy', 'Cancellation Policy'] },
  { keys: ['contact', 'email', 'phone', 'call', 'whatsapp', 'human', 'support'], a: 'Reach us on WhatsApp at +91 6374 962 519 or email Beinlove.in@gmail.com.', ext: [WA, 'Chat on WhatsApp'] },
  { keys: ['hi', 'hello', 'hey'], a: 'Hello! 💚 How can I help you with your hair care today?' },
];

const CHIPS = ['Price', 'How to use', 'Ingredients', 'Track my order'];

function reply(text) {
  const t = text.toLowerCase();
  const hit = FAQ.find((f) => f.keys.some((k) => t.includes(k)));
  return hit || { a: 'I’m not sure about that one. Our team can help you directly on WhatsApp.', ext: [WA, 'Chat on WhatsApp'] };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: 'bot', a: 'Hi! I’m the Be in Love assistant 🌿 Ask me about our hair oil, orders or policies.' },
  ]);
  const end = useRef(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  // Asks the Groq-powered backend; falls back to the built-in FAQ if it is offline
  const send = async (text) => {
    const q = text.trim();
    if (!q || loading) return;
    const next = [...msgs, { from: 'user', a: q }];
    setMsgs(next);
    setInput('');
    setLoading(true);
    try {
      const history = next.slice(1) // skip the greeting
        .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.a }))
        .slice(-10);
      const { data } = await api.post('/chat', { messages: history });
      setMsgs((m) => [...m, { from: 'bot', a: data.reply }]);
    } catch {
      setMsgs((m) => [...m, { from: 'bot', ...reply(q) }]);
    } finally {
      setLoading(false);
    }
  };

  const linkCls = 'mt-2 inline-block rounded-full bg-olive px-3 py-1 text-xs font-medium text-white hover:bg-olive-dark';

  return (
    <>
      {open && (
        <div className="fixed bottom-44 right-5 z-50 flex h-[28rem] max-h-[calc(100vh-12rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-olive/20 bg-white shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between bg-olive px-4 py-3 text-white">
            <div>
              <p className="font-serif text-lg leading-tight">Be in Love Assistant</p>
              <p className="text-xs text-white/70">Usually replies instantly</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="text-2xl leading-none text-white/80 hover:text-white">×</button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-cream p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block max-w-[85%] rounded-2xl px-3.5 py-2 text-left leading-6 ${
                  m.from === 'user' ? 'bg-olive text-white' : 'border border-olive/10 bg-white text-ink'}`}>
                  {m.a}
                  {m.link && <div><Link to={m.link[0]} onClick={() => setOpen(false)} className={linkCls}>{m.link[1]}</Link></div>}
                  {m.ext && <div><a href={m.ext[0]} target="_blank" rel="noopener noreferrer" className={linkCls}>{m.ext[1]}</a></div>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block rounded-2xl border border-olive/10 bg-white px-3.5 py-2 text-ink/50">Typing…</div>
              </div>
            )}
            <div ref={end} />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-olive/10 bg-white px-3 pt-2">
            {CHIPS.map((c) => (
              <button key={c} type="button" onClick={() => send(c)}
                className="rounded-full border border-olive/25 px-3 py-1 text-xs text-olive hover:bg-olive hover:text-white">{c}</button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 bg-white p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question…"
              className="min-w-0 flex-1 rounded-lg border border-olive/25 px-3 py-2 text-sm outline-none focus:border-olive" />
            <button type="submit" disabled={loading} className="rounded-lg bg-olive px-4 disabled:opacity-60 text-sm font-medium text-white hover:bg-olive-dark">Send</button>
          </form>
        </div>
      )}

      <button type="button" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold-btn text-ink shadow-lg shadow-black/30 transition hover:scale-110">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </>
  );
}
