import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import ProductCard from '../../components/Cards/ProductCard';
import { PRODUCTS, FLASH_SALE_ITEMS } from '../../data/MockData';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState(['Dresses', 'Jeans', 'T-Shirts']);
  const [recommendations] = useState(['Skirt', 'Accessories', 'Black T-Shirt', 'Jeans', 'White Shoes']);

  const sampleProductImages = [
    'https://loremflickr.com/700/700/fashion,shopping?lock=101',
    'https://loremflickr.com/700/700/women,clothing?lock=102',
    'https://loremflickr.com/700/700/shoes,sneakers?lock=103',
    'https://loremflickr.com/700/700/watch,luxury?lock=104',
    'https://loremflickr.com/700/700/handbag,accessories?lock=105',
    'https://loremflickr.com/700/700/hoodie,streetwear?lock=106',
    'https://loremflickr.com/700/700/lingerie,fashion?lock=107',
    'https://loremflickr.com/700/700/dress,style?lock=108'
  ];

  const homeProducts = PRODUCTS.map((product, index) => ({
    ...product,
    image: sampleProductImages[index % sampleProductImages.length]
  }));

  const homeFlashSaleItems = FLASH_SALE_ITEMS.map((item, index) => ({
    ...item,
    image: sampleProductImages[(index + 2) % sampleProductImages.length]
  }));

  const flashSaleDisplayItems = [...homeFlashSaleItems, ...homeFlashSaleItems].slice(0, 6);
  const justForYouItems = [...homeProducts, ...homeProducts].slice(0, 8);

  const categories = [
    {
      id: '1',
      name: 'Clothing',
      count: 109,
      images: [
        'https://loremflickr.com/300/300/fashion,clothing?lock=201',
        'https://loremflickr.com/300/300/women,shirt?lock=202',
        'https://loremflickr.com/300/300/apparel,model?lock=203',
        'https://loremflickr.com/300/300/outfit,style?lock=204'
      ]
    },
    {
      id: '2',
      name: 'Shoes',
      count: 530,
      images: [
        'https://loremflickr.com/300/300/shoes,sneakers?lock=205',
        'https://loremflickr.com/300/300/running,shoes?lock=206',
        'https://loremflickr.com/300/300/footwear,fashion?lock=207',
        'https://loremflickr.com/300/300/sneaker,shop?lock=208'
      ]
    },
    {
      id: '3',
      name: 'Bags',
      count: 87,
      images: [
        'https://loremflickr.com/300/300/bag,shopping?lock=209',
        'https://loremflickr.com/300/300/handbag,purse?lock=210',
        'https://loremflickr.com/300/300/leather,bag?lock=211',
        'https://loremflickr.com/300/300/fashion,bag?lock=212'
      ]
    },
    {
      id: '4',
      name: 'Lingerie',
      count: 218,
      images: [
        'https://loremflickr.com/300/300/lingerie,fashion?lock=213',
        'https://loremflickr.com/300/300/women,style?lock=214',
        'https://loremflickr.com/300/300/fashion,studio?lock=215',
        'https://loremflickr.com/300/300/clothes,women?lock=216'
      ]
    },
    {
      id: '5',
      name: 'Watch',
      count: 218,
      images: [
        'https://loremflickr.com/300/300/watch,luxury?lock=217',
        'https://loremflickr.com/300/300/wristwatch,accessory?lock=218',
        'https://loremflickr.com/300/300/smartwatch,tech?lock=219',
        'https://loremflickr.com/300/300/clock,watch?lock=220'
      ]
    },
    {
      id: '6',
      name: 'Hoodies',
      count: 218,
      images: [
        'https://loremflickr.com/300/300/hoodie,streetwear?lock=221',
        'https://loremflickr.com/300/300/sweatshirt,fashion?lock=222',
        'https://loremflickr.com/300/300/casual,hoodie?lock=223',
        'https://loremflickr.com/300/300/streetstyle,clothing?lock=224'
      ]
    }
  ];

  const promoBanners = [
    { id: '1', title: 'Big Sale', discount: '50%', description: 'Happening Now', color: '#FF6B6B' },
    { id: '2', title: 'Summer Special', discount: '30%', description: 'Limited Time', color: '#4ECDC4' },
    { id: '3', title: 'New Arrivals', discount: 'Up to 40%', description: 'Shop Now', color: '#45B7D1' },
    { id: '4', title: 'Clearance', discount: '70%', description: 'Final Sale', color: '#96CEB4' },
    { id: '5', title: 'Flash Deal', discount: '60%', description: 'Today Only', color: '#FFEAA7' }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchHistory([searchQuery, ...searchHistory.slice(0, 4)]);
      navigation.navigate('ProductSearch', { query: searchQuery });
      setShowSearchHistory(false);
    }
  };

  const handleDeleteHistoryItem = (item) => {
    setSearchHistory(searchHistory.filter(i => i !== item));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.shopText}>Shop</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={COLORS.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setShowSearchHistory(true)}
          onSubmitEditing={handleSearch}
          placeholderTextColor={COLORS.text.hint}
        />
        <TouchableOpacity onPress={() => navigation.navigate('CameraSearch')}>
          <Icon name="camera" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchHistory = () => (
    <View style={styles.searchOverlay}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {searchHistory.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {searchHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <TouchableOpacity 
                  style={styles.historyTextContainer}
                  onPress={() => {
                    setSearchQuery(item);
                    handleSearch();
                  }}
                >
                  <Icon name="clock" size={16} color={COLORS.text.hint} />
                  <Text style={styles.historyText}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteHistoryItem(item)}>
                  <Icon name="x" size={16} color={COLORS.text.hint} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <View style={styles.recommendationsGrid}>
            {recommendations.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recommendationChip}
                onPress={() => {
                  setSearchQuery(item);
                  handleSearch();
                }}
              >
                <Text style={styles.recommendationText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {renderHeader()}
      
      {showSearchHistory ? (
        renderSearchHistory()
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Promo Cards */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.promoScroll}
            contentContainerStyle={styles.promoContent}
          >
            {promoBanners.map((banner) => (
              <TouchableOpacity
                key={banner.id}
                style={[styles.promoCard, { backgroundColor: banner.color }]}
              >
                <Text style={styles.promoTitle}>{banner.title}</Text>
                <Text style={styles.promoDiscount}>Up to {banner.discount}</Text>
                <Text style={styles.promoDescription}>{banner.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Categories */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate('Categories')}>
                <Text style={styles.seeAllText}>See All</Text>
                <View style={styles.arrowIcon}>
                  <Icon name="arrow-right" size={12} color={COLORS.white} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.categoriesGrid}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.categoryMosaicCard}
                  onPress={() => navigation.navigate('ProductSearch', { category: item.name })}
                  activeOpacity={0.9}
                >
                  <View style={styles.mosaicGrid}>
                    {item.images.map((image, imageIndex) => (
                      <Image key={`${item.id}-${imageIndex}`} source={{ uri: image }} style={styles.mosaicImage} />
                    ))}
                  </View>

                  <View style={styles.categoryFooter}>
                    <Text style={styles.categoryMosaicName}>{item.name}</Text>
                    <View style={styles.categoryCountBadge}>
                      <Text style={styles.categoryCountBadgeText}>{item.count}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Products</Text>

            <FlatList
              data={homeProducts.slice(0, 8)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `top-${item.id}`}
              contentContainerStyle={styles.topProductsList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.topProductItem}
                  onPress={() => navigation.navigate('ProductDetail', { product: item })}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: item.image }} style={styles.topProductImage} />
                </TouchableOpacity>
              )}
            />
          </View>

          {/* New Items */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>New Items</Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <View style={styles.arrowIcon}>
                  <Icon name="arrow-right" size={12} color={COLORS.white} />
                </View>
              </TouchableOpacity>
            </View>

            <FlatList
              data={homeProducts.slice(0, 5)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductCard 
                  product={item} 
                  hideTypeAndDiscount
                  onPress={() => navigation.navigate('ProductDetail', { product: item })}
                />
              )}
            />
          </View>

          {/* Flash Sale */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Flash Sale</Text>
              <View style={styles.flashTimerContainer}>
                <Icon name="clock" size={18} color={COLORS.primary} />
                <View style={styles.timerChip}><Text style={styles.timerChipText}>00</Text></View>
                <View style={styles.timerChip}><Text style={styles.timerChipText}>36</Text></View>
                <View style={styles.timerChip}><Text style={styles.timerChipText}>58</Text></View>
              </View>
            </View>

            <View style={styles.flashSaleGrid}>
              {flashSaleDisplayItems.map((item, index) => (
                <TouchableOpacity
                  key={`${item.id}-${index}`}
                  style={styles.flashSaleGridCard}
                  onPress={() => navigation.navigate('FlashSaleDetail', { item })}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: item.image }} style={styles.flashSaleGridImage} />
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-{item.discount}%</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Most Popular */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Most Popular</Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <View style={styles.arrowIcon}>
                  <Icon name="arrow-right" size={12} color={COLORS.white} />
                </View>
              </TouchableOpacity>
            </View>

            <FlatList
              data={homeProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductCard 
                  product={item} 
                  onPress={() => navigation.navigate('ProductDetail', { product: item })}
                />
              )}
            />
          </View>

          {/* Just for You */}
          <View style={[styles.section, styles.lastSection]}>
            <View style={styles.sectionHeader}>
              <View style={styles.justForYouHeader}>
                <Text style={styles.sectionTitle}>Just For You</Text>
                <Icon name="star" size={14} color={COLORS.primary} style={styles.justForYouStar} />
              </View>
            </View>

            <View style={styles.justForYouGrid}>
              {justForYouItems.map((item, index) => (
                <TouchableOpacity
                  key={`${item.id}-${index}`}
                  style={styles.justForYouCard}
                  onPress={() => navigation.navigate('ProductDetail', { product: item })}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: item.image }} style={styles.justForYouImage} />
                  <Text style={styles.justForYouName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.justForYouPrice}>${Number(item.price).toFixed(2)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
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
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  shopText: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginRight: SIZES.medium
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
  searchInput: {
    flex: 1,
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    padding: 0
  },
  searchOverlay: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.medium
  },
  historySection: {
    marginBottom: SIZES.xlarge
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.small
  },
  historyTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  historyText: {
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary
  },
  recommendationsSection: {
    marginBottom: SIZES.xlarge
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.small
  },
  recommendationChip: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.radius.large,
    marginRight: SIZES.small,
    marginBottom: SIZES.small
  },
  recommendationText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  promoScroll: {
    marginVertical: SIZES.medium
  },
  promoContent: {
    paddingHorizontal: SIZES.medium
  },
  promoCard: {
    width: 280,
    height: 140,
    borderRadius: SIZES.radius.large,
    padding: SIZES.large,
    marginRight: SIZES.medium,
    justifyContent: 'flex-end'
  },
  promoTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: 4
  },
  promoDiscount: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: 4
  },
  promoDescription: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.white
  },
  section: {
    marginBottom: SIZES.xlarge,
    paddingHorizontal: SIZES.medium
  },
  lastSection: {
    marginBottom: SIZES.xxlarge
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  sectionTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  seeAllText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginRight: 4
  },
  arrowIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  categoryMosaicCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.small,
    marginBottom: SIZES.medium
  },
  mosaicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  mosaicImage: {
    width: '49%',
    aspectRatio: 1,
    borderRadius: SIZES.radius.small,
    marginBottom: SIZES.small / 2
  },
  categoryFooter: {
    marginTop: SIZES.small / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  categoryMosaicName: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  categoryCountBadge: {
    minWidth: 36,
    paddingHorizontal: SIZES.small,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryCountBadgeText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  topProductsList: {
    paddingTop: SIZES.medium
  },
  topProductItem: {
    marginRight: SIZES.small,
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    overflow: 'hidden'
  },
  topProductImage: {
    width: '100%',
    height: '100%'
  },
  flashTimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.small / 2
  },
  timerChip: {
    minWidth: 28,
    height: 28,
    borderRadius: SIZES.radius.small,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timerChipText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  flashSaleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  flashSaleGridCard: {
    width: '32%',
    aspectRatio: 1,
    borderRadius: SIZES.radius.medium,
    overflow: 'hidden',
    marginBottom: SIZES.small,
    position: 'relative',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  flashSaleGridImage: {
    width: '100%',
    height: '100%'
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.error,
    paddingHorizontal: SIZES.small,
    paddingVertical: 2,
    borderRadius: SIZES.radius.small
  },
  discountText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold
  },
  justForYouHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  justForYouStar: {
    marginLeft: SIZES.small / 2
  },
  justForYouGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  justForYouCard: {
    width: '48%',
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.medium,
    overflow: 'hidden'
  },
  justForYouImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: SIZES.radius.medium
  },
  justForYouName: {
    marginTop: SIZES.small,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    lineHeight: 20
  },
  justForYouPrice: {
    marginTop: SIZES.small / 2,
    fontSize: FONTS.sizes.xxxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  }
});