import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../utils/colors';

export default function Divider({
  vertical = false,
  color = COLORS.border,
  thickness = 1,
  margin = SIZES.medium,
  style
}) {
  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        {
          backgroundColor: color,
          [vertical ? 'width' : 'height']: thickness,
          marginVertical: vertical ? 0 : margin,
          marginHorizontal: vertical ? margin : 0
        },
        style
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    width: '100%'
  },
  vertical: {
    height: '100%'
  }
});