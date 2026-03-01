import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function PromoCard({ title, discount, description, color, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.discount}>Up to {discount}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    height: 140,
    borderRadius: SIZES.radius.large,
    padding: SIZES.large,
    marginRight: SIZES.medium,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: 4
  },
  discount: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: 4
  },
  description: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.white
  }
});