import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';

export default function FilterScreen({ navigation }) {
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('clothes');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
  const colors = [
    { name: 'Red', code: '#FF0000' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Green', code: '#00FF00' },
    { name: 'Yellow', code: '#FFFF00' },
    { name: 'Purple', code: '#800080' },
    { name: 'Orange', code: '#FFA500' },
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Pink', code: '#FFC0CB' },
    { name: 'Brown', code: '#A52A2A' }
  ];

  const sortOptions = [
    { id: 'popular', label: 'Popular' },
    { id: 'newest', label: 'Newest' },
    { id: 'priceHighToLow', label: 'Price: High to Low' },
    { id: 'priceLowToHigh', label: 'Price: Low to High' }
  ];

  const toggleSize = (size) => {
    if (selectedSize.includes(size)) {
      setSelectedSize(selectedSize.filter(s => s !== size));
    } else {
      setSelectedSize([...selectedSize, size]);
    }
  };

  const toggleColor = (color) => {
    if (selectedColor.includes(color)) {
      setSelectedColor(selectedColor.filter(c => c !== color));
    } else {
      setSelectedColor([...selectedColor, color]);
    }
  };

  const handleApply = () => {
    // Apply filters and navigate back
    navigation.goBack();
  };

  const handleClear = () => {
    setSelectedSize([]);
    setSelectedColor([]);
    setPriceRange([500, 5000]);
    setSortBy('popular');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filter</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Circle Image Selector */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5].map((item) => (
              <TouchableOpacity key={item} style={styles.circleImage}>
                <Image 
                  source={{ uri: `https://via.placeholder.com/80` }} 
                  style={styles.circleImageStyle} 
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Category Toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryToggle}>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === 'clothes' && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory('clothes')}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === 'clothes' && styles.selectedCategoryText
              ]}>
                Clothes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === 'shoes' && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory('shoes')}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === 'shoes' && styles.selectedCategoryText
              ]}>
                Shoes
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Size Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize.includes(size) && styles.selectedSize
                ]}
                onPress={() => toggleSize(size)}
              >
                <Text style={[
                  styles.sizeText,
                  selectedSize.includes(size) && styles.selectedSizeText
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorContainer}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color.name}
                style={[
                  styles.colorButton,
                  { backgroundColor: color.code },
                  selectedColor.includes(color.name) && styles.selectedColorButton
                ]}
                onPress={() => toggleColor(color.name)}
              >
                {selectedColor.includes(color.name) && (
                  <Icon name="check" size={16} color={COLORS.white} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price</Text>
          <View style={styles.priceContainer}>
            <View style={styles.priceInputs}>
              <View style={styles.priceInput}>
                <Text style={styles.priceLabel}>Min</Text>
                <Text style={styles.priceValue}>${priceRange[0]}</Text>
              </View>
              <Text style={styles.priceSeparator}>-</Text>
              <View style={styles.priceInput}>
                <Text style={styles.priceLabel}>Max</Text>
                <Text style={styles.priceValue}>${priceRange[1]}</Text>
              </View>
            </View>
            
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10000}
              step={100}
              value={priceRange[1]}
              onValueChange={(value) => setPriceRange([priceRange[0], value])}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.border}
              thumbTintColor={COLORS.primary}
            />
            
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10000}
              step={100}
              value={priceRange[0]}
              onValueChange={(value) => setPriceRange([value, priceRange[1]])}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.border}
              thumbTintColor={COLORS.primary}
            />
          </View>
        </View>

        {/* Sort By */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort By</Text>
          <View style={styles.sortContainer}>
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
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
        <PrimaryButton
          title="Apply"
          onPress={handleApply}
          style={styles.applyButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  headerTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  section: {
    padding: SIZES.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  sectionTitle: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium,
    textTransform: 'uppercase'
  },
  circleImage: {
    marginRight: SIZES.medium
  },
  circleImageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.primary
  },
  categoryToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.large,
    padding: 4
  },
  categoryButton: {
    flex: 1,
    paddingVertical: SIZES.small,
    alignItems: 'center',
    borderRadius: SIZES.radius.medium
  },
  selectedCategory: {
    backgroundColor: COLORS.primary
  },
  categoryText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  selectedCategoryText: {
    color: COLORS.white
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
  selectedColorButton: {
    borderColor: COLORS.primary
  },
  priceContainer: {
    marginTop: SIZES.small
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.large
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
  slider: {
    width: '100%',
    height: 40,
    marginBottom: SIZES.small
  },
  sortContainer: {
    marginTop: SIZES.small
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
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white
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