import React, { createContext, useState, useContext, useEffect } from 'react';
import StorageService, { StorageKeys } from '../utils/Storage';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await StorageService.getItem(StorageKeys.USER_DATA);
      const token = await StorageService.getItem(StorageKeys.USER_TOKEN);
      
      if (userData && token) {
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth state check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Mock login - replace with actual API call
      if (email && password) {
        const userData = {
          id: '1',
          email,
          name: email.split('@')[0],
          avatar: 'https://via.placeholder.com/150'
        };
        
        await StorageService.setItem(StorageKeys.USER_DATA, userData);
        await StorageService.setItem(StorageKeys.USER_TOKEN, 'mock-token-123');
        
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration - replace with actual API call
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        avatar: userData.avatar || 'https://via.placeholder.com/150'
      };
      
      await StorageService.setItem(StorageKeys.USER_DATA, newUser);
      await StorageService.setItem(StorageKeys.USER_TOKEN, 'mock-token-456');
      
      setUser(newUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await StorageService.removeItem(StorageKeys.USER_DATA);
    await StorageService.removeItem(StorageKeys.USER_TOKEN);
    
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserProfile = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      await StorageService.setItem(StorageKeys.USER_DATA, updatedUser);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};