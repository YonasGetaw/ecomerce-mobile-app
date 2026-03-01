import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import InputField from '../../components/inputs/InputField';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateEmail()) {
      navigation.navigate('PasswordInput', { email });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header */}
          <Text style={styles.header}>Login</Text>

          {/* Welcome Back Message */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Good to see you back!</Text>
            <Icon name="heart" size={24} color={COLORS.error} />
          </View>

          {/* Email Input */}
          <View style={styles.form}>
            <InputField
              label="Email Address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              error={error}
              leftIcon={<Icon name="mail" size={20} color={COLORS.text.secondary} />}
              autoCapitalize="none"
            />

            {/* Action Buttons */}
            <PrimaryButton
              title="Next"
              onPress={handleNext}
              style={styles.nextButton}
            />

            <SecondaryButton
              title="Cancel"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  keyboardView: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: SIZES.xlarge,
    justifyContent: 'center'
  },
  header: {
    fontSize: FONTS.sizes.huge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xxlarge
  },
  welcomeText: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginRight: SIZES.small
  },
  form: {
    width: '100%'
  },
  nextButton: {
    marginTop: SIZES.xlarge,
    marginBottom: SIZES.medium
  }
});