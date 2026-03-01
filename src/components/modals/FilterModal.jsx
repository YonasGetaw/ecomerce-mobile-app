import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BottomSheet from './BottomSheet';
import PrimaryButton from '../../buttons/PrimaryButton';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function FilterModal({ visible, onClose, onApply, onClear }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['All', 'Women', 'Men', 'Kids'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Red', code: '#FF0000' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Green', code: '#00FF00' },
    { name: 'Yellow', code: '#FFFF00' },
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' }
  ];
  const sortOptions = [
    { id: 'popular', label: 'Popular' },
    { id: 'newest', label: 'Newest' },
    { id: 'price_low', label: 'Price: Low to High' },
    { id: 'price_high', label: 'Price: High to Low' }
  ];

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleColor = (colorName) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const handleApply = () => {
    onApply({
      category: selectedCategory,
      sizes: selectedSizes,
      colors: selectedColors,
      priceRange,
      sortBy
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange({ min: 0, max: 1000 });
    setSortBy('popular');
    if (onClear) onClear();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Filter">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.toLowerCase() && styles.selectedChip
                ]}
                onPress={() => setSelectedCategory(cat.toLowerCase())}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === cat.toLowerCase() && styles.selectedText
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sizes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeChip,
                  selectedSizes.includes(size) && styles.selectedChip
                ]}
                onPress={() => toggleSize(size)}
              >
                <Text style={[
                  styles.sizeText,
                  selectedSizes.includes(size) && styles.selectedText
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Colors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorContainer}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color.name}
                style={[
                  styles.colorChip,
                  { backgroundColor: color.code },
                  selectedColors.includes(color.name) && styles.selectedColorChip
                ]}
                onPress={() => toggleColor(color.name)}
              >
                {selectedColors.includes(color.name) && (
                  <Icon name="check" size={16} color={COLORS.white} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.priceContainer}>
            <View style={styles.priceInput}>
              <Text style={styles.priceLabel}>Min</Text>
              <Text style={styles.priceValue}>${priceRange.min}</Text>
            </View>
            <Text style={styles.priceSeparator}>-</Text>
            <View style={styles.priceInput}>
              <Text style={styles.priceLabel}>Max</Text>
              <Text style={styles.priceValue}>${priceRange.max}</Text>
            </View>
          </View>
        </View>

        {/* Sort By */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort By</Text>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.sortOption}
              onPress={() => setSortBy(option.id)}
            >
              <Text style={[
                styles.sortText,
                sortBy === option.id && styles.selectedSortText
              ]}>
                {option.label}
              </Text>
              {sortBy === option.id && (
                <Icon name="check" size={16} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
        <PrimaryButton title="Apply Filters" onPress={handleApply} style={styles.applyButton} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: SIZES.large
  },
  sectionTitle: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium,
    textTransform: 'uppercase'
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  categoryChip: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.radius.large,
    backgroundColor: COLORS.background,
    marginRight: SIZES.small,
    marginBottom: SIZES.small
  },
  selectedChip: {
    backgroundColor: COLORS.primary
  },
  categoryText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  selectedText: {
    color: COLORS.white
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  sizeChip: {
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
  sizeText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  colorChip: {
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
  selectedColorChip: {
    borderColor: COLORS.primary
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  priceInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius.medium
  },
  priceLabel: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  priceValue: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  priceSeparator: {
    marginHorizontal: SIZES.medium,
    fontSize: FONTS.sizes.large,
    color: COLORS.text.secondary
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  sortText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  selectedSortText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.large,
    paddingTop: SIZES.large,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  clearButton: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius.large
  },
  clearText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  applyButton: {
    flex: 2
  }
});