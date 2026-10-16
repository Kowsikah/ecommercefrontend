export const CONTACT_EMAIL = 'Beinlove.in@gmail.com';
export const CONTACT_PHONE = '+91 6374 962 519';

/* sections: [{ h: 'Heading', p: 'Paragraph', list: ['item', ...] }] */
export default function PolicyLayout({ title, updated = 'October 2026', intro, sections }) {
  return (
    <>
      <section className="bg-gradient-to-br from-olive-dark via-olive to-olive-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 text-center">
          <p className="text-xs uppercase tracking-widest text-gold">Policies</p>
          <h1 className="mt-3 font-serif font-semibold text-4xl md:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-white/70">Last updated {updated}</p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <div className="rounded-3xl border border-olive/15 bg-white p-8 md:p-10 shadow-lg shadow-olive/5">
            {intro && <p className="leading-7 text-ink/80">{intro}</p>}

            <div className="mt-8 space-y-8">
              {sections.map(({ h, p, list }, i) => (
                <div key={h}>
                  <h2 className="font-serif text-xl font-semibold text-olive">{i + 1}. {h}</h2>
                  {p && <p className="mt-2 leading-7 text-ink/80">{p}</p>}
                  {list && (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-7 text-ink/80 marker:text-gold">
                      {list.map((x) => <li key={x}>{x}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-cream p-5 text-sm text-ink/70">
              <p className="font-medium text-ink">Need help?</p>
              <p className="mt-1">
                Email <a href={`mailto:${CONTACT_EMAIL}`} className="text-olive underline underline-offset-4">{CONTACT_EMAIL}</a>{' '}
                or WhatsApp <a href="https://wa.me/916374962519" target="_blank" rel="noopener noreferrer" className="text-olive underline underline-offset-4">{CONTACT_PHONE}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
