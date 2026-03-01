import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1, max = 99 }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, quantity <= min && styles.disabled]} 
        onPress={onDecrease}
        disabled={quantity <= min}
      >
        <Icon name="minus" size={16} color={quantity <= min ? COLORS.text.hint : COLORS.text.primary} />
      </TouchableOpacity>
      
      <Text style={styles.quantity}>{quantity}</Text>
      
      <TouchableOpacity 
        style={[styles.button, quantity >= max && styles.disabled]} 
        onPress={onIncrease}
        disabled={quantity >= max}
      >
        <Icon name="plus" size={16} color={quantity >= max ? COLORS.text.hint : COLORS.text.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.white
  },
  button: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabled: {
    opacity: 0.5
  },
  quantity: {
    minWidth: 40,
    textAlign: 'center',
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  }
});