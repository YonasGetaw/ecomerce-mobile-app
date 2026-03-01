import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  CART_ITEMS: 'cart_items',
  FAVORITES: 'favorites',
  SEARCH_HISTORY: 'search_history',
  RECENTLY_VIEWED: 'recently_viewed',
  USER_PREFERENCES: 'user_preferences'
};

class StorageService {
  // Store data
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  // Retrieve data
  async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  }

  // Remove data
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  }

  // Clear all app data
  async clearAll() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  // Cart specific methods
  async getCart() {
    return await this.getItem(StorageKeys.CART_ITEMS) || [];
  }

  async saveCart(cartItems) {
    return await this.setItem(StorageKeys.CART_ITEMS, cartItems);
  }

  async addToCart(item) {
    const cart = await this.getCart();
    const existingItem = cart.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      cart.push({ ...item, quantity: item.quantity || 1 });
    }
    
    return await this.saveCart(cart);
  }

  async removeFromCart(itemId) {
    const cart = await this.getCart();
    const newCart = cart.filter(i => i.id !== itemId);
    return await this.saveCart(newCart);
  }

  async updateCartItemQuantity(itemId, quantity) {
    const cart = await this.getCart();
    const item = cart.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      return await this.saveCart(cart);
    }
    return false;
  }

  // Favorites specific methods
  async getFavorites() {
    return await this.getItem(StorageKeys.FAVORITES) || [];
  }

  async toggleFavorite(item) {
    const favorites = await this.getFavorites();
    const index = favorites.findIndex(i => i.id === item.id);
    
    if (index === -1) {
      favorites.push(item);
    } else {
      favorites.splice(index, 1);
    }
    
    await this.setItem(StorageKeys.FAVORITES, favorites);
    return index === -1; // Returns true if added, false if removed
  }

  async isFavorite(itemId) {
    const favorites = await this.getFavorites();
    return favorites.some(i => i.id === itemId);
  }

  // Search history
  async addToSearchHistory(query) {
    const history = await this.getItem(StorageKeys.SEARCH_HISTORY) || [];
    const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 10);
    return await this.setItem(StorageKeys.SEARCH_HISTORY, newHistory);
  }

  async getSearchHistory() {
    return await this.getItem(StorageKeys.SEARCH_HISTORY) || [];
  }

  async clearSearchHistory() {
    return await this.removeItem(StorageKeys.SEARCH_HISTORY);
  }

  // Recently viewed
  async addToRecentlyViewed(product) {
    const viewed = await this.getItem(StorageKeys.RECENTLY_VIEWED) || [];
    const newViewed = [product, ...viewed.filter(v => v.id !== product.id)].slice(0, 10);
    return await this.setItem(StorageKeys.RECENTLY_VIEWED, newViewed);
  }

  async getRecentlyViewed() {
    return await this.getItem(StorageKeys.RECENTLY_VIEWED) || [];
  }
}

export default new StorageService();