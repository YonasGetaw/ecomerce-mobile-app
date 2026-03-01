import { useState, useEffect } from 'react';
import StorageService from '../utils/Storage';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    calculateCartSummary();
  }, [cartItems]);

  const normalizeVariant = (value) => (value == null || value === '' ? null : value);

  const loadCart = async () => {
    setLoading(true);
    const items = await StorageService.getCart();
    setCartItems(items);
    setLoading(false);
  };

  const calculateCartSummary = () => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setCartCount(count);
    setCartTotal(total);
  };

  const addToCart = async (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    const normalizedSize = normalizeVariant(selectedSize);
    const normalizedColor = normalizeVariant(selectedColor);

    const cartItem = {
      ...product,
      quantity,
      selectedSize: normalizedSize,
      selectedColor: normalizedColor,
      addedAt: new Date().toISOString()
    };

    const existingIndex = cartItems.findIndex(
      item => item.id === product.id &&
      normalizeVariant(item.selectedSize) === normalizedSize &&
      normalizeVariant(item.selectedColor) === normalizedColor
    );

    let newCart;
    if (existingIndex >= 0) {
      newCart = [...cartItems];
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart = [...cartItems, cartItem];
    }

    setCartItems(newCart);
    await StorageService.saveCart(newCart);
    return true;
  };

  const updateQuantity = async (itemId, newQuantity, size, color) => {
    const normalizedSize = normalizeVariant(size);
    const normalizedColor = normalizeVariant(color);

    const index = cartItems.findIndex(
      item => item.id === itemId &&
      normalizeVariant(item.selectedSize) === normalizedSize &&
      normalizeVariant(item.selectedColor) === normalizedColor
    );
    
    if (index >= 0 && newQuantity > 0) {
      const newCart = [...cartItems];
      newCart[index].quantity = newQuantity;
      setCartItems(newCart);
      await StorageService.saveCart(newCart);
    }
  };

  const removeFromCart = async (itemId, size, color) => {
    const normalizedSize = normalizeVariant(size);
    const normalizedColor = normalizeVariant(color);

    const newCart = cartItems.filter(
      item => !(
        item.id === itemId &&
        normalizeVariant(item.selectedSize) === normalizedSize &&
        normalizeVariant(item.selectedColor) === normalizedColor
      )
    );
    setCartItems(newCart);
    await StorageService.saveCart(newCart);
  };

  const clearCart = async () => {
    setCartItems([]);
    await StorageService.saveCart([]);
  };

  const getSelectedItemsTotal = (selectedIds) => {
    return cartItems
      .filter(item => selectedIds.includes(`${item.id}-${item.selectedSize}-${item.selectedColor}`))
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return {
    cartItems,
    loading,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getSelectedItemsTotal,
    refreshCart: loadCart
  };
};