import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCart } from '../hooks/useCart';

const CartContext = createContext({});

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};