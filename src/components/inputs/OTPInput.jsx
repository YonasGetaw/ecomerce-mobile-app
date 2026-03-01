import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard
} from 'react-native';
import { COLORS, SIZES } from '../../utils/Colors';

export default function OTPInput({
  code,
  setCode,
  length = 6,
  onComplete
}) {
  const inputRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to next input if current is filled
    if (text && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if OTP is complete
    const otpString = newCode.join('');
    if (otpString.length === length && onComplete) {
      Keyboard.dismiss();
      onComplete(otpString);
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  return (
    <View style={styles.container}>
      {Array(length).fill().map((_, index) => (
        <View
          key={index}
          style={[
            styles.inputWrapper,
            code[index] && styles.filled,
            focusedIndex === index && styles.focused
          ]}
        >
          <TextInput
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            value={code[index] || ''}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.medium
  },
  inputWrapper: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.white
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text.primary
  },
  filled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight
  },
  focused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3
  }
});