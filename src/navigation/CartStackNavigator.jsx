import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/main/CartScreen';
import PaymentScreen from '../screens/checkout/PaymentScreen';
import OrderSummaryScreen from '../screens/checkout/OrderSummaryScreen';
import { COLORS } from '../../utils/colors';

const Stack = createStackNavigator();

export default function CartStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.white }
      }}
    >
      <Stack.Screen name="CartMain" component={CartScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
    </Stack.Navigator>
  );
}