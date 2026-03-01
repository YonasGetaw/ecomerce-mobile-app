import { useState, useEffect } from 'react';
import StorageService, { StorageKeys } from '../utils/Storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    const items = await StorageService.getFavorites();
    setFavorites(items);
    setLoading(false);
  };

  const toggleFavorite = async (product) => {
    const isAdded = await StorageService.toggleFavorite(product);
    await loadFavorites(); // Reload favorites
    return isAdded;
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const removeFromFavorites = async (productId) => {
    const newFavorites = favorites.filter(item => item.id !== productId);
    setFavorites(newFavorites);
    await StorageService.setItem(StorageKeys.FAVORITES, newFavorites);
  };

  const clearFavorites = async () => {
    setFavorites([]);
    await StorageService.removeItem(StorageKeys.FAVORITES);
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    removeFromFavorites,
    clearFavorites,
    refreshFavorites: loadFavorites
  };
};