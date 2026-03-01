import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import InputField from '../../components/inputs/InputField';
import PhoneInput from '../../components/inputs/PhoneInput';
import { COLORS, FONTS, SIZES } from '../../utils/colors';
import { useAuth } from '../../Context/AuthContext';

export default function CreateAccountScreen({ navigation }) {
  const { register } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sixDigitCode, setSixDigitCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [errors, setErrors] = useState({});

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload photo');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!sixDigitCode) {
      newErrors.sixDigitCode = '6-digit code is required';
    } else if (sixDigitCode.length !== 6) {
      newErrors.sixDigitCode = 'Code must be 6 digits';
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDone = async () => {
    if (!validateForm()) return;

    const result = await register({
      email,
      password,
      sixDigitCode,
      phoneNumber,
      countryCode: selectedCountry?.code || null,
      avatar: profileImage || undefined
    });

    if (!result.success) {
      Alert.alert('Registration failed', result.error || 'Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.content}>
            {/* Header */}
            <Text style={styles.header}>Create Account</Text>

            {/* Profile Photo Upload */}
            <TouchableOpacity 
              style={styles.uploadContainer} 
              onPress={pickImage}
              activeOpacity={0.8}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Icon name="camera" size={40} color={COLORS.primary} />
                </View>
              )}
              <View style={styles.cameraIcon}>
                <Icon name="camera" size={16} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            {/* Form Fields */}
            <View style={styles.form}>
              <InputField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                error={errors.email}
                leftIcon={<Icon name="mail" size={20} color={COLORS.text.secondary} />}
              />

              <InputField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password (min 6 characters)"
                secureTextEntry
                error={errors.password}
                leftIcon={<Icon name="lock" size={20} color={COLORS.text.secondary} />}
              />

              <InputField
                label="6-digit Number"
                value={sixDigitCode}
                onChangeText={setSixDigitCode}
                placeholder="Enter 6-digit code"
                keyboardType="numeric"
                maxLength={6}
                error={errors.sixDigitCode}
                leftIcon={<Icon name="hash" size={20} color={COLORS.text.secondary} />}
              />

              <PhoneInput
                label="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onCountryChange={setSelectedCountry}
                error={errors.phoneNumber}
              />

              {/* Action Buttons */}
              <PrimaryButton
                title="Done"
                onPress={handleDone}
                style={styles.doneButton}
              />

              <SecondaryButton
                title="Cancel"
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1
  },
  content: {
    padding: SIZES.xlarge
  },
  header: {
    fontSize: FONTS.sizes.huge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.xxlarge,
    textAlign: 'center'
  },
  uploadContainer: {
    alignSelf: 'center',
    marginBottom: SIZES.xxlarge,
    position: 'relative'
  },
  uploadPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryLight
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white
  },
  form: {
    width: '100%'
  },
  doneButton: {
    marginTop: SIZES.xlarge,
    marginBottom: SIZES.medium
  }
});