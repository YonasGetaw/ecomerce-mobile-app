import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import PasswordInputScreen from '../screens/auth/PasswordInputScreen';
import PasswordRecoveryScreen from '../screens/auth/PasswordRecoveryScreen';
import CodeVerificationScreen from '../screens/auth/CodeVerificationScreen';
import SetupNewPasswordScreen from '../screens/auth/SetupNewPasswordScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import { COLORS } from '../utils/colors';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.white }
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PasswordInput" component={PasswordInputScreen} />
      <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
      <Stack.Screen name="CodeVerification" component={CodeVerificationScreen} />
      <Stack.Screen name="SetupNewPassword" component={SetupNewPasswordScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  );
}