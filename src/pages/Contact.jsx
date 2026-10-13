import { useState } from 'react';
import { api } from '../api/client.js';
import {
  WhatsAppIcon, MailIcon, InstagramIcon, YouTubeIcon, SendIcon,
} from '../components/icons.jsx';

/* ── Contact details (edit here) ── */
const contacts = [
  { label: 'WhatsApp',  text: '+91 6374 962 519',         href: 'https://wa.me/916374962519',                          Icon: WhatsAppIcon },
  { label: 'Email',     text: 'Beinlove.in@gmail.com',    href: 'mailto:Beinlove.in@gmail.com',                        Icon: MailIcon },
  { label: 'Instagram', text: '@beinlove.in',             href: 'https://www.instagram.com/beinlove.in',               Icon: InstagramIcon },
  { label: 'Instagram', text: '@heart_hunter_so_be_cful', href: 'https://www.instagram.com/heart_hunter_so_be_cful/', Icon: InstagramIcon },
  { label: 'YouTube',   text: '@Hearthunter',             href: 'https://youtube.com/@Hearthunter',                    Icon: YouTubeIcon },
];

const empty = { name: '', email: '', message: '', website: '' };

const inputClass =
  'mt-2 w-full rounded-lg border border-olive/25 bg-white px-4 py-3 text-ink placeholder:text-ink/40 ' +
  'outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/20';

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await api.post('/contact', form);
      setForm(empty);
      setStatus('success');
    } catch (err) {
      setErrorMsg(
        err.response?.data?.error ||
          'Could not send your message. Please try again or message us on WhatsApp.'
      );
      setStatus('error');
    }
  };

  return (
    <>
      {/* ───────── HEADER ───────── */}
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-gold">Contact</p>
          <h1 className="mt-3 font-serif font-semibold text-4xl md:text-5xl lg:text-6xl leading-tight">
            Let’s Connect
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/80 leading-8">
            Have questions about our natural hair oils or need help choosing the right one? We’re
            here to help you fall in love with your hair. Reach out via email, phone, or follow us
            on social media for the latest updates and hair care tips.
          </p>
        </div>
      </section>

      {/* ───────── DETAILS + FORM ───────── */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20 grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Contact details */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-ink">Reach us directly</h2>
            <ul className="mt-6 space-y-3">
              {contacts.map(({ label, text, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-olive/15 bg-white p-4 transition hover:-translate-y-0.5 hover:border-olive/40 hover:shadow-lg hover:shadow-olive/10"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-olive text-white transition group-hover:bg-gold-btn group-hover:text-ink">
                      <Icon size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-widest text-ink/50">{label}</span>
                      <span className="block truncate font-medium text-ink">{text}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-olive/15 bg-white p-6 sm:p-8 shadow-xl shadow-olive/10">
              <h2 className="font-serif text-2xl font-semibold text-ink">Send us a message</h2>
              <p className="mt-1 text-sm text-ink/60">We’ll get back to you as soon as we can.</p>

              {status === 'success' ? (
                <div
                  role="status"
                  className="mt-6 rounded-2xl border border-olive/20 bg-olive/5 p-6 text-center"
                >
                  <p className="font-serif text-xl text-olive">Thank you! 💚</p>
                  <p className="mt-2 text-ink/70">
                    Your message has been sent. We’ll reply to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm font-medium text-olive underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate={false}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-ink">
                      Your name
                      <input
                        name="name" value={form.name} onChange={onChange}
                        required minLength={2} maxLength={100}
                        autoComplete="name" placeholder="Your name"
                        className={inputClass}
                      />
                    </label>
                    <label className="block text-sm font-medium text-ink">
                      Email
                      <input
                        type="email" name="email" value={form.email} onChange={onChange}
                        required maxLength={200}
                        autoComplete="email" placeholder="you@example.com"
                        className={inputClass}
                      />
                    </label>
                  </div>

                  <label className="block text-sm font-medium text-ink">
                    Message
                    <textarea
                      name="message" value={form.message} onChange={onChange}
                      required minLength={10} maxLength={2000} rows={6}
                      placeholder="How can we help you?"
                      className={`${inputClass} resize-y`}
                    />
                  </label>

                  {/* Spam trap: hidden from people */}
                  <input
                    type="text" name="website" value={form.website} onChange={onChange}
                    tabIndex={-1} autoComplete="off" aria-hidden="true"
                    className="hidden"
                  />

                  {status === 'error' && (
                    <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-olive px-8 py-3.5 font-medium text-white shadow-lg shadow-olive/20 transition hover:-translate-y-0.5 hover:bg-olive-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Us a Message'}
                    {status !== 'sending' && <SendIcon size={18} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}