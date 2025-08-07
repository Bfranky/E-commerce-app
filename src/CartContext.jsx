// src/context/CartContext.jsx

import { createContext, useContext, useReducer } from 'react';

// Named export so it can be imported as { CartContext }
export const CartContext = createContext();

const initialState = {
  cartItems: [],
};

// Reducer function for managing cart state
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

    default:
      return state;
  }
}

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action methods
  const addToCart = product =>
    dispatch({ type: 'ADD_TO_CART', payload: product });

  const removeFromCart = id =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  const clearCart = () =>
    dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for accessing cart context
export const useCart = () => useContext(CartContext);
