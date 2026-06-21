"use client";

import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [count, setCount] = useState(0);
  const add = useCallback((qty = 1) => setCount((c) => c + qty), []);
  return (
    <CartContext.Provider value={{ count, add }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) return { count: 0, add: () => {} };
  return ctx;
}
