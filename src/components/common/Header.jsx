import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function Header({
  title,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  rightIcon2,
  onRightPress2,
  showBack = false,
  onBackPress,
  style
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        )}
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
            <Icon name={leftIcon} size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.right}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            <Icon name={rightIcon} size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        )}
        {rightIcon2 && (
          <TouchableOpacity onPress={onRightPress2} style={styles.iconButton}>
            <Icon name={rightIcon2} size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  iconButton: {
    padding: SIZES.small
  }
});