import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const inputClass =
  'mt-1 w-full rounded-lg border border-olive/25 bg-white px-3 py-2.5 text-ink outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/20';

export default function Signup() {
  const { user, signup } = useAuth();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) {
    const from = location.state?.from?.pathname;
    return <Navigate to={from || '/'} replace />;
  }

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await signup(form.name, form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not create your account. Please try again.');
      setBusy(false);
    }
  };

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-sm px-6 py-16 sm:py-20">
        <form onSubmit={submit} className="rounded-3xl border border-olive/15 bg-white p-8 shadow-xl shadow-olive/10">
          <h1 className="font-serif text-2xl font-semibold text-ink">Create your account</h1>

          <label className="mt-6 block text-sm font-medium text-ink">
            Name
            <input name="name" value={form.name} onChange={onChange}
              required minLength={2} autoComplete="name" className={inputClass} />
          </label>

          <label className="mt-4 block text-sm font-medium text-ink">
            Email
            <input name="email" type="email" value={form.email} onChange={onChange}
              required autoComplete="email" className={inputClass} />
          </label>

          <label className="mt-4 block text-sm font-medium text-ink">
            Password
            <input name="password" type="password" value={form.password} onChange={onChange}
              required minLength={8} autoComplete="new-password" className={inputClass} />
            <span className="mt-1 block text-xs font-normal text-ink/50">At least 8 characters.</span>
          </label>

          {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" disabled={busy}
            className="mt-6 w-full rounded-lg bg-olive px-6 py-3 font-medium text-white transition hover:bg-olive-dark disabled:opacity-60">
            {busy ? 'Creating account…' : 'Create account'}
          </button>

          <p className="mt-5 text-center text-sm text-ink/70">
            Already have an account?{' '}
            <Link to="/login" state={location.state} className="text-olive underline underline-offset-4">Log in</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
