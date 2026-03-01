import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/main/HomeScreen';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import ProductSearchScreen from '../screens/product/ProductSearchScreen';
import ImageSearchScreen from '../screens/product/ImageSearchScreen';
import FlashSaleDetailScreen from '../screens/product/FlashSaleDetailScreen';
import FilterScreen from '../screens/filter/FilterScreen';
import { COLORS } from '../utils/colors';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.white }
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="ProductSearch" component={ProductSearchScreen} />
      <Stack.Screen name="ImageSearch" component={ImageSearchScreen} />
      <Stack.Screen name="FlashSaleDetail" component={FlashSaleDetailScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
    </Stack.Navigator>
  );
}