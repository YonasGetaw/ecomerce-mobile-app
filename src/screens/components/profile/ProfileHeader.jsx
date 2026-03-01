import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function ProfileHeader({ user, onEditPress, onScanPress, onMenuPress, onSettingsPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.activityBadge}>
            <Text style={styles.activityText}>My activity</Text>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={onScanPress} style={styles.iconButton}>
            <Icon name="camera" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
            <Icon name="menu" size={20} color={COLORS.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSettingsPress} style={styles.iconButton}>
            <Icon name="settings" size={20} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>Hello, {user.name}!</Text>
        <TouchableOpacity onPress={onEditPress}>
          <Icon name="edit-2" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SIZES.small
  },
  activityBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small
  },
  activityText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconButton: {
    marginLeft: SIZES.medium
  },
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  greeting: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  }
});