import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../utils/colors';
import { products } from '../../data/productsData';

export default function SubCategoryScreen({ navigation, route }) {
  const { category } = route.params;
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return products.filter(p => 
      p.category.toLowerCase() === category.name.toLowerCase() ||
      p.subcategory?.toLowerCase() === category.name.toLowerCase()
    );
  }, [category]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const productsCopy = [...categoryProducts];
    switch(sortBy) {
      case 'price_low':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price_high':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'newest':
        return productsCopy.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'popular':
      default:
        return productsCopy.sort((a, b) => b.rating - a.rating);
    }
  }, [categoryProducts, sortBy]);

  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.gridImage} />
        {item.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{item.discount}%</Text>
          </View>
        )}
      </View>
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price}</Text>
        {item.originalPrice && (
          <Text style={styles.originalPrice}>${item.originalPrice}</Text>
        )}
      </View>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={12} color="#FFD700" />
        <Text style={styles.rating}>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.listImage} />
      <View style={styles.listDetails}>
        <Text style={styles.listName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.listRating}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={styles.listRatingText}>{item.rating} ({item.reviews})</Text>
        </View>
        <View style={styles.listPriceContainer}>
          <Text style={styles.listPrice}>${item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.listOriginalPrice}>${item.originalPrice}</Text>
          )}
        </View>
        {item.discount > 0 && (
          <View style={styles.listDiscountBadge}>
            <Text style={styles.listDiscountText}>{item.discount}% OFF</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const SortButton = ({ title, value }) => (
    <TouchableOpacity
      style={[styles.sortButton, sortBy === value && styles.sortButtonActive]}
      onPress={() => setSortBy(value)}
    >
      <Text style={[styles.sortButtonText, sortBy === value && styles.sortButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.name}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.viewModeButton}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <Icon 
              name={viewMode === 'grid' ? 'grid' : 'list'} 
              size={20} 
              color={COLORS.text.primary} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => navigation.navigate('Filter', { category: category.name })}
          >
            <Icon name="sliders" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <SortButton title="Popular" value="popular" />
          <SortButton title="Newest" value="newest" />
          <SortButton title="Price: Low to High" value="price_low" />
          <SortButton title="Price: High to Low" value="price_high" />
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {sortedProducts.length} products found
        </Text>
      </View>

      {/* Product List/Grid */}
      <FlatList
        data={sortedProducts}
        renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
        keyExtractor={(item) => item.id}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode} // Force re-render when view mode changes
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="package" size={60} color={COLORS.text.hint} />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyText}>
              There are no products in this category yet.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  headerTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewModeButton: {
    marginRight: SIZES.medium
  },
  filterButton: {
    padding: SIZES.small
  },
  sortContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  sortButton: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    marginHorizontal: SIZES.small,
    borderRadius: SIZES.radius.large,
    backgroundColor: COLORS.background
  },
  sortButtonActive: {
    backgroundColor: COLORS.primary
  },
  sortButtonText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  sortButtonTextActive: {
    color: COLORS.white
  },
  resultsContainer: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  resultsText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  listContent: {
    padding: SIZES.small
  },
  // Grid View Styles
  gridItem: {
    flex: 1,
    margin: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    padding: SIZES.small,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  imageContainer: {
    position: 'relative',
    marginBottom: SIZES.small
  },
  gridImage: {
    width: '100%',
    height: 150,
    borderRadius: SIZES.radius.medium
  },
  discountBadge: {
    position: 'absolute',
    top: SIZES.small,
    right: SIZES.small,
    backgroundColor: COLORS.error,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small
  },
  discountText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold
  },
  productName: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginBottom: 4
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  price: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginRight: SIZES.small
  },
  originalPrice: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    textDecorationLine: 'line-through'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rating: {
    marginLeft: 4,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  // List View Styles
  listItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    marginBottom: SIZES.small,
    padding: SIZES.small,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  listImage: {
    width: 100,
    height: 100,
    borderRadius: SIZES.radius.medium,
    marginRight: SIZES.medium
  },
  listDetails: {
    flex: 1,
    justifyContent: 'center'
  },
  listName: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: 4
  },
  listRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  listRatingText: {
    marginLeft: 4,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  listPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  listPrice: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginRight: SIZES.small
  },
  listOriginalPrice: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    textDecorationLine: 'line-through'
  },
  listDiscountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.errorLight,
    paddingHorizontal: SIZES.small,
    paddingVertical: 2,
    borderRadius: SIZES.radius.small
  },
  listDiscountText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xxlarge * 2
  },
  emptyTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginTop: SIZES.medium,
    marginBottom: SIZES.small
  },
  emptyText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center'
  }
});