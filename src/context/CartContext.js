import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'beinlove_cart_v1';
const MAX_QTY = 10;

const clamp = (qty, stock) => Math.max(1, Math.min(qty, MAX_QTY, stock ?? MAX_QTY));

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { item, qty } = action;
      const existing = state.find((i) => i.productId === item.productId);
      if (existing) {
        return state.map((i) =>
          i.productId === item.productId
            ? { ...i, ...item, qty: clamp(i.qty + qty, item.stock) }
            : i
        );
      }
      return [...state, { ...item, qty: clamp(qty, item.stock) }];
    }
    case 'setQty':
      return state.map((i) =>
        i.productId === action.productId ? { ...i, qty: clamp(action.qty, i.stock) } : i
      );
    case 'remove':
      return state.filter((i) => i.productId !== action.productId);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Keep the cart after a page refresh
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: cart still works until refresh */
    }
  }, [items]);

  const addItem = useCallback((product, qty = 1) => {
    dispatch({
      type: 'add',
      qty,
      item: {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: Number(product.price),
        sizeMl: product.size_ml,
        stock: product.stock,
        image: product.image_url || '/hero.jpeg',
      },
    });
  }, []);

  const setQty = useCallback((productId, qty) => dispatch({ type: 'setQty', productId, qty }), []);
  const removeItem = useCallback((productId) => dispatch({ type: 'remove', productId }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    return { items, count, subtotal, addItem, setQty, removeItem, clear, drawerOpen, openDrawer, closeDrawer };
  }, [items, addItem, setQty, removeItem, clear, drawerOpen, openDrawer, closeDrawer]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}