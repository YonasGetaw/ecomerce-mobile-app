import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import CategoriesScreen from '../screens/main/CategoriesScreen';
import CartStackNavigator from './CartStackNavigator';
import FavoritesScreen from '../screens/main/FavoritesScreen';
import { COLORS, SIZES } from '../utils/Colors';
import { useCartContext } from '../Context/CartContext';
import { useLocalization } from '../Context/LocalizationContext';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function CartIcon({ color, size }) {
  const { cartCount } = useCartContext();
  
  return (
    <View>
      <Icon name="shopping-cart" size={size} color={color} />
      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      )}
    </View>
  );
}

export default function MainTabNavigator() {
  const { t } = useLocalization();

  const getTabLabel = (routeName) => {
    if (routeName === 'Home') return t('home');
    if (routeName === 'Favorites') return t('favorites');
    if (routeName === 'Categories') return t('categories');
    if (routeName === 'Cart') return t('cart');
    if (routeName === 'Profile') return t('profile');
    return routeName;
  };

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
            return <CartIcon color={color} size={size} />;
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.warning,
        tabBarInactiveTintColor: COLORS.primary,
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
        tabBarLabel: getTabLabel(route.name),
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: 'Poppins-Bold'
  }
});