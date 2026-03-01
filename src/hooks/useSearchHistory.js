import { useState, useEffect } from 'react';
import StorageService from '../utils/Storage';

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    setLoading(true);
    const history = await StorageService.getSearchHistory();
    setSearchHistory(history);
    setLoading(false);
  };

  const addSearch = async (query) => {
    if (!query.trim()) return;
    
    await StorageService.addToSearchHistory(query);
    await loadSearchHistory();
  };

  const clearHistory = async () => {
    await StorageService.clearSearchHistory();
    setSearchHistory([]);
  };

  const removeSearchItem = async (query) => {
    const newHistory = searchHistory.filter(item => item !== query);
    setSearchHistory(newHistory);
    await StorageService.setItem(StorageKeys.SEARCH_HISTORY, newHistory);
  };

  return {
    searchHistory,
    loading,
    addSearch,
    clearHistory,
    removeSearchItem,
    refreshHistory: loadSearchHistory
  };
};