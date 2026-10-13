import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client.js';

const KEY = 'beinlove_token';

const readToken = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const saveToken = (t) => {
  try { t ? localStorage.setItem(KEY, t) : localStorage.removeItem(KEY); } catch { /* ignore */ }
};
// Every API request carries the token automatically
const applyHeader = (t) => {
  if (t) api.defaults.headers.common.Authorization = `Bearer ${t}`;
  else delete api.defaults.headers.common.Authorization;
};

// Set before any component renders, so first requests are already authenticated
applyHeader(readToken());

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(readToken()));

  const clear = useCallback(() => {
    saveToken(null);
    applyHeader(null);
    setToken(null);
    setUser(null);
  }, []);

  // On page load, ask the server who this token belongs to
  useEffect(() => {
    if (!token) { setLoading(false); return; }
    let cancelled = false;
    api.get('/auth/me')
      .then(({ data }) => { if (!cancelled) setUser(data.user); })
      .catch((e) => { if (e.response?.status === 401) clear(); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accept = useCallback(({ token: t, user: u }) => {
    saveToken(t);
    applyHeader(t);
    setToken(t);
    setUser(u);
    return u;
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return accept(data);
  }, [accept]);

  const signup = useCallback(async (name, email, password) => {
    const { data } = await api.post('/auth/signup', { name, email, password });
    return accept(data);
  }, [accept]);

  const value = useMemo(
    () => ({ user, token, loading, isAdmin: user?.role === 'admin', login, signup, logout: clear }),
    [user, token, loading, login, signup, clear]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
