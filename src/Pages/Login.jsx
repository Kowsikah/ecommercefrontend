import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const inputClass =
  'mt-1 w-full rounded-lg border border-olive/25 bg-white px-3 py-2.5 text-ink outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/20';

export default function Login() {
  const { user, login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Already logged in (or just logged in): go back where they came from
  if (user) {
    const from = location.state?.from?.pathname;
    return <Navigate to={from || (user.role === 'admin' ? '/admin' : '/')} replace />;
  }

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not log in. Please try again.');
      setBusy(false);
    }
  };

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-sm px-6 py-16 sm:py-20">
        <form onSubmit={submit} className="rounded-3xl border border-olive/15 bg-white p-8 shadow-xl shadow-olive/10">
          <h1 className="font-serif text-2xl font-semibold text-ink">Log in</h1>

          <label className="mt-6 block text-sm font-medium text-ink">
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required autoComplete="email" className={inputClass} />
          </label>

          <label className="mt-4 block text-sm font-medium text-ink">
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required autoComplete="current-password" className={inputClass} />
          </label>

          {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" disabled={busy}
            className="mt-6 w-full rounded-lg bg-olive px-6 py-3 font-medium text-white transition hover:bg-olive-dark disabled:opacity-60">
            {busy ? 'Logging in…' : 'Log in'}
          </button>

          <p className="mt-5 text-center text-sm text-ink/70">
            New here?{' '}
            <Link to="/signup" state={location.state} className="text-olive underline underline-offset-4">Create an account</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
