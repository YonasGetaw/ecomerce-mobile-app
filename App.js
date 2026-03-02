import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/Context/AuthContext';
import { CartProvider } from './src/Context/CartContext';
import { FavoritesProvider } from './src/Context/FavoritesContext';
import { LocalizationProvider } from './src/Context/LocalizationContext';
import { COLORS } from './src/utils/Colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <LocalizationProvider>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <NavigationContainer>
                <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
                <RootNavigator />
              </NavigationContainer>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </LocalizationProvider>
    </SafeAreaProvider>
  );
}