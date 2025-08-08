// src/CartContext.jsx

import { createContext, useContext, useReducer } from 'react';

export const CartContext = createContext();

const initialState = {
  cartItems: [],
  purchaseHistory: JSON.parse(localStorage.getItem('purchaseHistory')) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cartItems.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };

    case 'CHECKOUT': {
      const newHistory = [...state.purchaseHistory, ...state.cartItems];
      localStorage.setItem('purchaseHistory', JSON.stringify(newHistory));
      return {
        ...state,
        purchaseHistory: newHistory,
        cartItems: [],
      };
    }

    case 'SAVE_PURCHASE': {
      const updatedHistory = [...state.purchaseHistory, ...action.payload];
      localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));
      return {
        ...state,
        purchaseHistory: updatedHistory,
      };
    }

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = product => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = id => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const checkout = () => dispatch({ type: 'CHECKOUT' });

  // ✅ New helper for ReceiptPage
  const savePurchase = (items) => dispatch({ type: 'SAVE_PURCHASE', payload: items });

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        purchaseHistory: state.purchaseHistory,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        savePurchase, // ✅ Make it available
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
