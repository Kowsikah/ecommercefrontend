import { Link } from 'react-router-dom';
import logoFull from '/logo-nav-light.png';

/* ── Icons ── */
const Svg = ({ children, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const WhatsAppIcon = (p) => (
  <Svg {...p}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" />
  </Svg>
);

const MailIcon = (p) => (
  <Svg {...p}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Svg>
);

const InstagramIcon = (p) => (
  <Svg {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Svg>
);

const YouTubeIcon = (p) => (
  <Svg {...p}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </Svg>
);

const ArrowUpIcon = (p) => (
  <Svg {...p}>
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </Svg>
);

/* ── Links & Data ── */
const exploreLinks = [
  ['/shop', 'Shop'],
  ['/about', 'Our Story'],
  ['/benefits', 'Why Be in Love'],
  ['/contact', 'Contact'],
];

const directContacts = [
  {
    label: 'WhatsApp',
    text: '+91 6374 962 519',
    href: 'https://wa.me/916374962519',
    Icon: WhatsAppIcon,
  },
  {
    label: 'Email',
    text: 'Beinlove.in@gmail.com',
    href: 'mailto:Beinlove.in@gmail.com',
    Icon: MailIcon,
  },
];

const socialLinks = [
  { label: '@beinlove.in', href: 'https://www.instagram.com/beinlove.in', Icon: InstagramIcon },
  { label: '@heart_hunter_so_be_cful', href: 'https://www.instagram.com/heart_hunter_so_be_cful/', Icon: InstagramIcon },
  { label: '@Hearthunter', href: 'https://youtube.com/@Hearthunter', Icon: YouTubeIcon },
];

const Heading = ({ children }) => (
  <h3 className="font-serif text-xl text-gold">
    {children}
    <span className="mt-2 block h-0.5 w-10 rounded bg-gold/70" />
  </h3>
);

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-base text-white/80">
      {/* Top Gold Line & Radial Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-olive/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Brand */}
          <div className="md:col-span-5 text-center md:text-left">
            <Link to="/" aria-label="Be in Love — home">
              <img
                src={logoFull}
                alt="Be in love — make your hair healthier"
                className="h-22 w-auto mx-auto md:mx-0 transition duration-300 hover:scale-[1.02]"
              />
            </Link>
            <p className="mt-4 max-w-sm font-serif italic text-lg leading-relaxed text-white/75 mx-auto md:mx-0">
              Every bottle is a promise of purity. Your hair deserves to be loved.
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-2 text-center md:text-left">
            <Heading>Explore</Heading>
            <ul className="mt-5 space-y-3.5">
              {exploreLinks.map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-0 text-base transition-all duration-300 hover:gap-2 hover:text-white"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="md:col-span-5 text-center md:text-left">
            <Heading>Get in touch</Heading>

            {/* Direct Contact Cards */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {directContacts.map(({ label, text, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition duration-300 hover:border-gold/50 hover:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/40 text-gold transition duration-300 group-hover:bg-gold group-hover:text-[#0a0a0a]">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0 text-left">
                    <span className="block text-xs uppercase tracking-wider text-white/50">
                      {label}
                    </span>
                    <span className="block truncate text-sm font-medium text-white/95 group-hover:text-white">
                      {text}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <span className="block text-xs uppercase tracking-wider text-white/50 mb-3">Follow Us</span>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-2 text-sm text-white/85 transition duration-200 hover:border-gold/50 hover:text-gold"
                  >
                    <Icon size={16} className="text-gold" />
                    <span className="truncate max-w-[160px]">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Be in Love. All rights reserved.
          </p>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-gold hover:text-gold"
          >
            Back to top
            <ArrowUpIcon size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}