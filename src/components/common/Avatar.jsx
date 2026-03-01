import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function Avatar({
  source,
  size = 50,
  name,
  onPress,
  showBadge = false,
  badgeColor = COLORS.success,
  style
}) {
  const getInitials = () => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const AvatarContent = () => (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {source ? (
        <Image source={source} style={[styles.image, { width: size, height: size }]} />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size }]}>
          {name ? (
            <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{getInitials()}</Text>
          ) : (
            <Icon name="user" size={size * 0.5} color={COLORS.text.hint} />
          )}
        </View>
      )}
      {showBadge && <View style={[styles.badge, { backgroundColor: badgeColor }]} />}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <AvatarContent />
      </TouchableOpacity>
    );
  }

  return <AvatarContent />;
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  image: {
    borderRadius: 999
  },
  placeholder: {
    borderRadius: 999,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  initials: {
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.white
  }
});