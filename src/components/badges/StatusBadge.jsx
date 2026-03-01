import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function StatusBadge({ status, style }) {
  const getStatusColor = () => {
    switch(status.toLowerCase()) {
      case 'new': return COLORS.primary;
      case 'sale': return COLORS.error;
      case 'hot': return COLORS.warning;
      case 'limited': return COLORS.secondary;
      default: return COLORS.text.secondary;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() }, style]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold,
    textTransform: 'uppercase'
  }
});