import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function PasswordInput({
  label,
  value,
  onChangeText,
  placeholder = 'Enter password',
  error,
  onBlur,
  onFocus,
  showStrength = false,
  leftIcon,
  editable = true,
  autoFocus = false,
  returnKeyType = 'done',
  onSubmitEditing
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: 'No password', color: COLORS.text.hint };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[!@#$%^&*]/.test(password)) strength += 12.5;

    if (strength <= 25) return { strength, label: 'Weak', color: COLORS.error };
    if (strength <= 50) return { strength, label: 'Fair', color: COLORS.warning };
    if (strength <= 75) return { strength, label: 'Good', color: COLORS.info };
    return { strength, label: 'Strong', color: COLORS.success };
  };

  const strengthInfo = showStrength ? getPasswordStrength(value) : null;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        error && styles.errorBorder,
        isFocused && styles.focusedBorder,
        !editable && styles.disabled
      ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (showStrength || value) && styles.inputWithRightIcon
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.hint}
          secureTextEntry={!showPassword}
          onFocus={() => {
            setIsFocused(true);
            if (onFocus) onFocus();
          }}
          onBlur={() => {
            setIsFocused(false);
            if (onBlur) onBlur();
          }}
          editable={editable}
          autoFocus={autoFocus}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
        
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color={COLORS.text.secondary}
          />
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {showStrength && value && (
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBarContainer}>
            <View style={[styles.strengthBar, { width: `${strengthInfo.strength}%`, backgroundColor: strengthInfo.color }]} />
          </View>
          <Text style={[styles.strengthLabel, { color: strengthInfo.color }]}>
            {strengthInfo.label}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.medium
  },
  label: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
    marginBottom: SIZES.small,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.white,
    minHeight: 54
  },
  input: {
    flex: 1,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary
  },
  inputWithLeftIcon: {
    paddingLeft: 0
  },
  inputWithRightIcon: {
    paddingRight: 40
  },
  leftIcon: {
    paddingLeft: SIZES.medium
  },
  eyeIcon: {
    paddingRight: SIZES.medium
  },
  errorBorder: {
    borderColor: COLORS.error
  },
  focusedBorder: {
    borderColor: COLORS.primary,
    borderWidth: 2
  },
  disabled: {
    backgroundColor: COLORS.background,
    opacity: 0.6
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.small,
    marginTop: SIZES.small / 2,
    fontFamily: FONTS.regular
  },
  strengthContainer: {
    marginTop: SIZES.small,
    flexDirection: 'row',
    alignItems: 'center'
  },
  strengthBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginRight: SIZES.small
  },
  strengthBar: {
    height: 4,
    borderRadius: 2
  },
  strengthLabel: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    minWidth: 50,
    textAlign: 'right'
  }
});