import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// Compares hashes so the check takes the same time however many letters match
export function passwordMatches(input) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return false;
  const a = crypto.createHash('sha256').update(String(input)).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export const signAdminToken = () =>
  jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Please log in.' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') throw new Error('not admin');
    next();
  } catch {
    res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
}