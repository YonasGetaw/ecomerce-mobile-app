import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  onCameraPress,
  onFilterPress,
  placeholder = 'Search products...',
  autoFocus = false
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={COLORS.text.secondary} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.hint}
          returnKeyType="search"
          onSubmitEditing={onSubmit}
          autoFocus={autoFocus}
        />
        {value ? (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <Icon name="x" size={18} color={COLORS.text.secondary} />
          </TouchableOpacity>
        ) : null}
      </View>
      
      {onCameraPress && (
        <TouchableOpacity style={styles.iconButton} onPress={onCameraPress}>
          <Icon name="camera" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      )}
      
      {onFilterPress && (
        <TouchableOpacity style={styles.iconButton} onPress={onFilterPress}>
          <Icon name="sliders" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.large,
    paddingHorizontal: SIZES.medium,
    height: 44
  },
  input: {
    flex: 1,
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    padding: 0
  },
  iconButton: {
    marginLeft: SIZES.small,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center'
  }
});