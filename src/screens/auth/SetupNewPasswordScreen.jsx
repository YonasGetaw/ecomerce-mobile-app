import React, { useState } from 'react';
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
import InputField from '../../components/inputs/InputField';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function SetupNewPasswordScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const requirements = [];
    if (password.length < 8) requirements.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) requirements.push('one uppercase letter');
    if (!/[a-z]/.test(password)) requirements.push('one lowercase letter');
    if (!/[0-9]/.test(password)) requirements.push('one number');
    if (!/[!@#$%^&*]/.test(password)) requirements.push('one special character');
    return requirements;
  };

  const handleSave = () => {
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else {
      const requirements = validatePassword(newPassword);
      if (requirements.length > 0) {
        newErrors.newPassword = `Password must contain ${requirements.join(', ')}`;
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      Alert.alert(
        'Success',
        'Your password has been reset successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    }

    setErrors(newErrors);
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
        <Text style={styles.header}>Setup New Password</Text>

        {/* Description */}
        <Text style={styles.description}>
          Please, setup a new password for your account
        </Text>

        {/* Form */}
        <View style={styles.form}>
          <InputField
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            secureTextEntry={!showPassword}
            error={errors.newPassword}
            leftIcon={<Icon name="lock" size={20} color={COLORS.text.secondary} />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color={COLORS.text.secondary} 
                />
              </TouchableOpacity>
            }
          />

          <InputField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            secureTextEntry={!showConfirmPassword}
            error={errors.confirmPassword}
            leftIcon={<Icon name="lock" size={20} color={COLORS.text.secondary} />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon 
                  name={showConfirmPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color={COLORS.text.secondary} 
                />
              </TouchableOpacity>
            }
          />

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>Password must contain:</Text>
            <View style={styles.requirementItem}>
              <Icon 
                name={newPassword.length >= 8 ? 'check-circle' : 'circle'} 
                size={16} 
                color={newPassword.length >= 8 ? COLORS.success : COLORS.text.hint} 
              />
              <Text style={styles.requirementText}>At least 8 characters</Text>
            </View>
            <View style={styles.requirementItem}>
              <Icon 
                name={/[A-Z]/.test(newPassword) ? 'check-circle' : 'circle'} 
                size={16} 
                color={/[A-Z]/.test(newPassword) ? COLORS.success : COLORS.text.hint} 
              />
              <Text style={styles.requirementText}>One uppercase letter</Text>
            </View>
            <View style={styles.requirementItem}>
              <Icon 
                name={/[a-z]/.test(newPassword) ? 'check-circle' : 'circle'} 
                size={16} 
                color={/[a-z]/.test(newPassword) ? COLORS.success : COLORS.text.hint} 
              />
              <Text style={styles.requirementText}>One lowercase letter</Text>
            </View>
            <View style={styles.requirementItem}>
              <Icon 
                name={/[0-9]/.test(newPassword) ? 'check-circle' : 'circle'} 
                size={16} 
                color={/[0-9]/.test(newPassword) ? COLORS.success : COLORS.text.hint} 
              />
              <Text style={styles.requirementText}>One number</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Save"
            onPress={handleSave}
            style={styles.saveButton}
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
    marginBottom: SIZES.xxlarge
  },
  form: {
    marginBottom: SIZES.xlarge
  },
  requirementsContainer: {
    marginTop: SIZES.medium,
    padding: SIZES.medium,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.medium
  },
  requirementsTitle: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold,
    color: COLORS.text.secondary,
    marginBottom: SIZES.small,
    textTransform: 'uppercase'
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.small / 2
  },
  requirementText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginLeft: SIZES.small
  },
  buttonContainer: {
    marginTop: 'auto'
  },
  saveButton: {
    marginBottom: SIZES.medium
  }
});