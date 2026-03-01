import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, SIZES } from '../../utils/Colors';

export default function IconButton({
  name,
  size = 24,
  color = COLORS.text.primary,
  onPress,
  style,
  backgroundColor = 'transparent'
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        style
      ]}
      onPress={onPress}
    >
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    justifyContent: 'center'
  }
});