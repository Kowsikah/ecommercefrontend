import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoIcon from '/logo-nav-light.png';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
const links = [
  ['/', 'Home'],
  ['/shop', 'Shop'],
  ['/about', 'Our Story'],
  ['/benefits', 'Benefits'],
  ['/contact', 'Contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { count, openDrawer } = useCart();
  const { user, isAdmin, logout } = useAuth();

  // Close the menu whenever the page changes
  useEffect(() => setOpen(false), [pathname]);

  // Stop the page behind the menu from scrolling while it's open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const desktopLink = ({ isActive }) =>
    isActive ? 'text-gold' : 'text-white/80 hover:text-white transition';

  const mobileLink = ({ isActive }) =>
    `block px-6 py-4 text-base border-b border-white/10 ${
      isActive ? 'text-gold bg-white/5' : 'text-white/90 active:bg-white/10'
    }`;

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0a] text-white border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-[72px] sm:h-24 flex items-center justify-between">
        {/* Logo */}
        {/* Logo */}
<Link to="/" className="flex items-center gap-2.5">
  <img src={logoIcon} alt="" className="h-13 w-auto" />
  
</Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 text-sm">
          {links.map(([to, label]) => (
            <li key={to}>
              <NavLink to={to} className={desktopLink}>{label}</NavLink>
            </li>
          ))}
        </ul>

        {/* Right side: Cart + hamburger */}
        <div className="flex items-center gap-3">
          {/* Account links (desktop) */}
          <div className="hidden md:flex items-center gap-5 pr-2 text-sm">
            {isAdmin && <NavLink to="/admin" className={desktopLink}>Admin</NavLink>}
            {user ? (
              <button type="button" onClick={logout} className="text-white/80 hover:text-white transition">Log out</button>
            ) : (
              <NavLink to="/login" className={desktopLink}>Login</NavLink>
            )}
          </div>

           <button
  type="button"
  onClick={openDrawer}
  aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
  className="relative rounded-lg bg-gold-btn px-4 py-2 text-sm font-medium text-ink"
>
  Cart
  {count > 0 && (
    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-semibold text-ink ring-2 ring-[#0a0a0a]">
      {count}
    </span>
  )}
</button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 hover:bg-white/10"
          >
            {open ? (
              // X icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              // Hamburger icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {open && (
        <>
          {/* Tap outside to close */}
          <div
            className="md:hidden fixed inset-0 top-16 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
           // dropdown
className="md:hidden absolute left-0 right-0 top-[72px] sm:top-24 bg-[#0a0a0a] border-t border-white/10 shadow-xl"
          >
            <ul>
              {links.map(([to, label]) => (
                <li key={to}>
                  <NavLink to={to} end={to === '/'} className={mobileLink}>
                    {label}
                  </NavLink>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <NavLink to="/admin" className={mobileLink}>Admin</NavLink>
                </li>
              )}
              <li>
                {user ? (
                  <button type="button" onClick={logout}
                    className="block w-full px-6 py-4 text-left text-base text-white/90 border-b border-white/10 active:bg-white/10">
                    Log out
                  </button>
                ) : (
                  <NavLink to="/login" className={mobileLink}>Login</NavLink>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}