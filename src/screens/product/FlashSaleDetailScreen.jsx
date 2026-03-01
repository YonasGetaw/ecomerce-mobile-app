import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { FLASH_SALE_ITEMS } from '../../data/MockData';

export default function FlashSaleDetailScreen({ navigation }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filters = [
    { id: 'all', label: 'All' },
    { id: '10', label: '10%' },
    { id: '20', label: '20%' },
    { id: '30', label: '30%' },
    { id: '40', label: '40%' },
    { id: '50', label: '50%' }
  ];

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const renderLiveItem = (item) => (
    <TouchableOpacity 
      style={styles.liveItem}
      onPress={() => setSelectedItem(item)}
    >
      <Image source={{ uri: item.image }} style={styles.liveImage} />
      <View style={styles.liveBadge}>
        <Text style={styles.liveText}>LIVE</Text>
      </View>
      <View style={styles.liveOverlay}>
        <View style={styles.viewCount}>
          <Icon name="eye" size={12} color={COLORS.white} />
          <Text style={styles.viewCountText}>{item.views}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderProductItem = (item) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDiscountBadge}>
          <Text style={styles.productDiscountText}>-{item.discount}%</Text>
        </View>
      </View>
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <View style={styles.productPriceContainer}>
        <Text style={styles.productPrice}>${item.price}</Text>
        {item.originalPrice && (
          <Text style={styles.productOriginalPrice}>${item.originalPrice}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderLiveModal = () => {
    if (!selectedItem) return null;

    return (
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.modalClose}
          onPress={() => setSelectedItem(null)}
        >
          <Icon name="x" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        <Image source={{ uri: selectedItem.image }} style={styles.modalImage} />
        
        <View style={styles.modalContent}>
          <View style={styles.modalStats}>
            <View style={styles.viewCount}>
              <Icon name="eye" size={16} color={COLORS.white} />
              <Text style={styles.viewCountText}>{selectedItem.views}</Text>
            </View>
            <View style={styles.liveBadgeLarge}>
              <Text style={styles.liveTextLarge}>LIVE</Text>
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.shopButton}>
              <Text style={styles.shopButtonText}>Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowButton}>
              <Icon name="arrow-right" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flash Sale</Text>
        <View style={styles.timerContainer}>
          <Icon name="clock" size={16} color={COLORS.error} />
          <Text style={styles.timer}>
            {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </Text>
        </View>
      </View>

      {/* Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedFilter === filter.id && styles.selectedFilterChip
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.selectedFilterText
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Live Item */}
        <View style={styles.featuredSection}>
          <Text style={styles.featuredTitle}>Artical Reimagined</Text>
          {FLASH_SALE_ITEMS
            .filter(item => item.isLive)
            .map(item => renderLiveItem(item))}
          <View style={styles.discountNote}>
            <Icon name="percent" size={16} color={COLORS.primary} />
            <Text style={styles.discountNoteText}>20% Discount on all items</Text>
          </View>
        </View>

        {/* Product Grid */}
        <View style={styles.productGrid}>
          {FLASH_SALE_ITEMS.map(item => renderProductItem(item))}
          {FLASH_SALE_ITEMS.map(item => renderProductItem(item))}
        </View>
      </ScrollView>

      {renderLiveModal()}
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
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.medium
  },
  timer: {
    marginLeft: 4,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold,
    color: COLORS.error
  },
  filterScroll: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  filterContent: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small
  },
  filterChip: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.radius.large,
    backgroundColor: COLORS.background,
    marginRight: SIZES.small
  },
  selectedFilterChip: {
    backgroundColor: COLORS.primary
  },
  filterText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  selectedFilterText: {
    color: COLORS.white
  },
  featuredSection: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.small,
    padding: SIZES.large
  },
  featuredTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium
  },
  liveItem: {
    position: 'relative',
    marginBottom: SIZES.medium
  },
  liveImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius.large
  },
  liveBadge: {
    position: 'absolute',
    top: SIZES.medium,
    left: SIZES.medium,
    backgroundColor: COLORS.error,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small
  },
  liveText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold
  },
  liveOverlay: {
    position: 'absolute',
    bottom: SIZES.medium,
    right: SIZES.medium
  },
  viewCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small
  },
  viewCountText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    marginLeft: 4
  },
  discountNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.small
  },
  discountNoteText: {
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SIZES.small,
    justifyContent: 'space-between'
  },
  productItem: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    marginBottom: SIZES.medium,
    padding: SIZES.small
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: SIZES.small
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: SIZES.radius.medium
  },
  productDiscountBadge: {
    position: 'absolute',
    top: SIZES.small,
    right: SIZES.small,
    backgroundColor: COLORS.error,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small
  },
  productDiscountText: {
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
  productPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  productPrice: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginRight: SIZES.small
  },
  productOriginalPrice: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    textDecorationLine: 'line-through'
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center'
  },
  modalClose: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalImage: {
    width: '100%',
    height: '70%'
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.large
  },
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  liveBadgeLarge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.radius.medium
  },
  liveTextLarge: {
    color: COLORS.white,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold
  },
  modalActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  shopButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.medium,
    borderRadius: SIZES.radius.large,
    alignItems: 'center',
    marginRight: SIZES.small
  },
  shopButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold
  },
  arrowButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});