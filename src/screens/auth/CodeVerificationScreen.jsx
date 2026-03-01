import React, { useState, useEffect, useRef } from 'react';
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
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function CodeVerificationScreen({ navigation, route }) {
  const { method } = route.params || { method: 'sms' };
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setCode(['', '', '', '']);
    Alert.alert('Code Resent', `A new code has been sent to your ${method}`);
  };

  const handleVerify = () => {
    const enteredCode = code.join('');
    if (enteredCode.length === 4) {
      // In real app, verify with backend
      if (enteredCode === '1234') { // Demo code
        navigation.navigate('SetupNewPassword');
      } else {
        setError('Invalid code. Please try again.');
      }
    } else {
      setError('Please enter complete code');
    }
  };

  const getPhoneDisplay = () => {
    return '+98 *** *** 00'; // Demo masked phone
  };

  const getEmailDisplay = () => {
    return 'u***@example.com'; // Demo masked email
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

        {/* Avatar Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
        </View>

        {/* Header */}
        <Text style={styles.header}>Password Recovery</Text>

        {/* Description */}
        <Text style={styles.description}>
          Enter 4-digits code we sent you on your{' '}
          {method === 'sms' ? 'phone number' : 'email'}
        </Text>

        {/* Contact Info */}
        <Text style={styles.contactInfo}>
          {method === 'sms' ? getPhoneDisplay() : getEmailDisplay()}
        </Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          <OTPInput
            code={code}
            setCode={setCode}
            length={4}
            onComplete={handleVerify}
          />
        </View>

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Resend Button */}
        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResend}
          disabled={!canResend}
        >
          <Text style={[
            styles.resendText,
            !canResend && styles.resendDisabled
          ]}>
            Send again {!canResend && `(${timer}s)`}
          </Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Next"
            onPress={handleVerify}
            style={styles.nextButton}
          />
          <SecondaryButton
            title="Cancel"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
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
    padding: SIZES.xlarge
  },
  backButton: {
    marginBottom: SIZES.large
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: SIZES.large
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.primary
  },
  header: {
    fontSize: FONTS.sizes.xxxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SIZES.small
  },
  description: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SIZES.small
  },
  contactInfo: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.xxlarge
  },
  otpContainer: {
    marginBottom: SIZES.medium
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    marginBottom: SIZES.medium
  },
  resendButton: {
    alignItems: 'center',
    marginBottom: SIZES.xxlarge
  },
  resendText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    textDecorationLine: 'underline'
  },
  resendDisabled: {
    color: COLORS.text.hint,
    textDecorationLine: 'none'
  },
  buttonContainer: {
    marginTop: 'auto'
  },
  nextButton: {
    marginBottom: SIZES.medium
  }
});