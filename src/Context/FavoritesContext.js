import React, { createContext, useState, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';

const FavoritesContext = createContext({});

export const useFavoritesContext = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
};