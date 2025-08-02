import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'ecom_cart';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const existing = state.find(item => item.id === action.product.id);
      if (existing) {
        return state.map(item =>
          item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    case 'REMOVE':
      return state.filter(item => item.id !== action.id);
    case 'SET':
      return action.payload;
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, [], initial => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const add = product => dispatch({ type: 'ADD', product });
  const remove = id => dispatch({ type: 'REMOVE', id });
  const clear = () => dispatch({ type: 'CLEAR' });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, add, remove, clear, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
