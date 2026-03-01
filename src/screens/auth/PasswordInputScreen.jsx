import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import OTPInput from '../../components/inputs/OTPInput';
import { COLORS, FONTS, SIZES } from '../../utils/colors';
import { useAuth } from '../../Context/AuthContext';

export default function PasswordInputScreen({ navigation, route }) {
  const { login } = useAuth();
  const { email } = route.params || {};
  const [password, setPassword] = useState(['', '', '', '', '', '']);
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;

  const handlePasswordComplete = async (enteredPassword) => {
    if (!email) {
      Alert.alert('Login error', 'Email is missing. Please try again.');
      navigation.navigate('Login');
      return;
    }

    const result = await login(email, enteredPassword);

    if (result.success) {
      setShowError(false);
      setAttempts(0);
      return;
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setShowError(true);
      
      if (newAttempts >= maxAttempts) {
        Alert.alert(
          'Maximum Attempts Reached',
          'You reached out maximum amount of attempts. Please, try later.',
          [
            {
              text: 'Okay',
              onPress: () => navigation.navigate('Login'),
              style: 'default'
            }
          ],
          { cancelable: false }
        );
      }
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('PasswordRecovery');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Hello, {email?.split('@')[0] || 'User'}!!</Text>

        {/* Password Input Label */}
        <Text style={styles.passwordLabel}>Type your password</Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          <OTPInput
            code={password}
            setCode={setPassword}
            length={6}
            onComplete={handlePasswordComplete}
          />
        </View>

        {/* Error Message */}
        {showError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Incorrect password</Text>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Not You Link */}
        <TouchableOpacity 
          style={styles.notYouContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.notYouText}>Not You?</Text>
          <View style={styles.arrowIcon}>
            <Icon name="arrow-right" size={16} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SIZES.xlarge,
    paddingTop: SIZES.medium
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: SIZES.large
  },
  imageContainer: {
    marginBottom: SIZES.large
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.primary
  },
  greeting: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.xxlarge
  },
  passwordLabel: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: SIZES.medium,
    alignSelf: 'flex-start'
  },
  otpContainer: {
    width: '100%',
    marginBottom: SIZES.large
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: SIZES.small
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    textDecorationLine: 'underline'
  },
  notYouContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: SIZES.xxlarge
  },
  notYouText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginRight: SIZES.small
  },
  arrowIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});