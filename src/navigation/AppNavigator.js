import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

// Auth Screens
import WelcomeScreen from '../../screens/Auth/WelcomeScreen';
import CreateAccountScreen from '../../screens/Auth/CreateAccountScreen';
import LoginScreen from '../../screens/Auth/LoginScreen';
import PasswordInputScreen from '../../screens/Auth/PasswordInputScreen';
import PasswordRecoveryScreen from '../../screens/Auth/PasswordRecoveryScreen';
import CodeVerificationScreen from '../../screens/Auth/CodeVerificationScreen';
import SetupNewPasswordScreen from '../../screens/Auth/SetupNewPasswordScreen';
import OnboardingScreen from '../../screens/Auth/OnboardingScreen';

// Main Screens
import HomeScreen from '../../screens/Main/HomeScreen';
import ProfileScreen from '../../screens/Main/ProfileScreen';
import CategoriesScreen from '../../screens/Main/CategoriesScreen';
import CartScreen from '../../screens/Main/CartScreen';
import FavoritesScreen from '../../screens/Main/FavoritesScreen';

// Product Screens
import ProductDetailScreen from '../../screens/Product/ProductDetailScreen';
import FlashSaleDetailScreen from '../../screens/Product/FlashSaleDetailScreen';
import ProductSearchScreen from '../../screens/Product/ProductSearchScreen';
import ImageSearchScreen from '../../screens/Product/ImageSearchScreen';

// Other Screens
import FilterScreen from '../../screens/Filter/FilterScreen';
import PaymentScreen from '../../screens/Checkout/PaymentScreen';

import { COLORS } from '../utils/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Categories') {
            iconName = 'grid';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text.secondary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Medium'
        },
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.white }
      }}
    >
      {/* Auth Flow */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PasswordInput" component={PasswordInputScreen} />
      <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
      <Stack.Screen name="CodeVerification" component={CodeVerificationScreen} />
      <Stack.Screen name="SetupNewPassword" component={SetupNewPasswordScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      
      {/* Main App */}
      <Stack.Screen name="MainApp" component={MainTabs} />
      
      {/* Product Related */}
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="FlashSaleDetail" component={FlashSaleDetailScreen} />
      <Stack.Screen name="ProductSearch" component={ProductSearchScreen} />
      <Stack.Screen name="ImageSearch" component={ImageSearchScreen} />
      
      {/* Other */}
      <Stack.Screen name="Filter" component={FilterScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}