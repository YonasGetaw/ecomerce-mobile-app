import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function LiveBadge({ size = 'medium', style }) {
  const getSize = () => {
    switch(size) {
      case 'small': return { padding: 2, fontSize: FONTS.sizes.small };
      case 'large': return { padding: 8, fontSize: FONTS.sizes.large };
      default: return { padding: 4, fontSize: FONTS.sizes.medium };
    }
  };

  const sizeStyle = getSize();

  return (
    <View style={[styles.badge, { padding: sizeStyle.padding }, style]}>
      <Text style={[styles.text, { fontSize: sizeStyle.fontSize }]}>LIVE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLORS.error,
    borderRadius: SIZES.radius.small,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    textTransform: 'uppercase'
  }
});