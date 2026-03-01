import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function VariationSelector({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeSelect,
  onColorSelect
}) {
  return (
    <View style={styles.container}>
      {/* Size Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Size</Text>
        <View style={styles.sizeContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSize
              ]}
              onPress={() => onSizeSelect(size)}
            >
              <Text style={[
                styles.sizeText,
                selectedSize === size && styles.selectedSizeText
              ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Color Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Color</Text>
        <View style={styles.colorContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color.name}
              style={[
                styles.colorButton,
                { backgroundColor: color.code },
                selectedColor === color.name && styles.selectedColor
              ]}
              onPress={() => onColorSelect(color.name)}
            >
              {selectedColor === color.name && (
                <Icon name="check" size={16} color={COLORS.white} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.large
  },
  section: {
    marginBottom: SIZES.large
  },
  sectionTitle: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.small,
    marginBottom: SIZES.small
  },
  selectedSize: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  sizeText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  selectedSizeText: {
    color: COLORS.white
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.small,
    marginBottom: SIZES.small,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedColor: {
    borderColor: COLORS.primary
  }
});