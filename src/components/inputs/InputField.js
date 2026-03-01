import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import Icon from 'react-native-vector-icons/Feather';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        error && styles.errorBorder,
        !editable && styles.disabled
      ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            multiline && styles.multilineInput
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.hint}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          editable={editable}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.medium
  },
  label: {
    fontSize: FONTS.sizes.small,
    color: COLORS.text.secondary,
    marginBottom: SIZES.small,
    fontFamily: FONTS.medium,
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
    paddingRight: 0
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  leftIcon: {
    paddingLeft: SIZES.medium
  },
  rightIcon: {
    paddingRight: SIZES.medium
  },
  errorBorder: {
    borderColor: COLORS.error
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.small,
    marginTop: SIZES.small / 2,
    fontFamily: FONTS.regular
  },
  disabled: {
    backgroundColor: COLORS.background,
    opacity: 0.6
  }
});