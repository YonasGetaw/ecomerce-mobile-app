import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function CategoryCard({ category, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: category.image }} style={styles.image} />
      <Text style={styles.name}>{category.name}</Text>
      <Text style={styles.count}>{category.count} items</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: SIZES.medium,
    width: 100
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: SIZES.small,
    borderWidth: 2,
    borderColor: COLORS.primaryLight
  },
  name: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    textAlign: 'center'
  },
  count: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    textAlign: 'center'
  }
});