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
  StatusBar,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import ProductCard from '../../components/Cards/ProductCard';
import { PRODUCTS, FLASH_SALE_ITEMS } from '../../data/MockData';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState(['Dresses', 'Jeans', 'T-Shirts']);
  const [recommendations] = useState(['Skirt', 'Accessories', 'Black T-Shirt', 'Jeans', 'White Shoes']);
  const [activePromoIndex, setActivePromoIndex] = useState(0);

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
    {
      id: '1',
      title: 'Big Sale',
      discount: 'Up to 50%',
      badge: 'Happening\nNow',
      color: '#F4B400',
      image: 'https://loremflickr.com/600/600/woman,shopping?lock=301'
    },
    {
      id: '2',
      title: 'Summer Sale',
      discount: 'Up to 40%',
      badge: 'Limited\nTime',
      color: '#FF8A65',
      image: 'https://loremflickr.com/600/600/fashion,summer?lock=302'
    },
    {
      id: '3',
      title: 'New Arrivals',
      discount: 'Up to 30%',
      badge: 'Shop\nNow',
      color: '#4DB6AC',
      image: 'https://loremflickr.com/600/600/clothing,model?lock=303'
    },
    {
      id: '4',
      title: 'Flash Deal',
      discount: 'Up to 60%',
      badge: 'Today\nOnly',
      color: '#64B5F6',
      image: 'https://loremflickr.com/600/600/retail,shopping?lock=304'
    }
  ];

  const handleSearch = (queryText = searchQuery) => {
    const normalizedQuery = (queryText || '').trim();

    if (normalizedQuery) {
      setSearchQuery(normalizedQuery);
      setSearchHistory((prevHistory) => [normalizedQuery, ...prevHistory.filter(item => item !== normalizedQuery).slice(0, 4)]);
      navigation.navigate('ProductSearch', { query: normalizedQuery });
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
        <TouchableOpacity onPress={() => handleSearch()}>
          <Icon name="search" size={20} color={COLORS.text.secondary} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setShowSearchHistory(true)}
          onSubmitEditing={() => handleSearch()}
          placeholderTextColor={COLORS.text.hint}
        />
        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('ImageSearch')}>
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
                    handleSearch(item);
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
                  handleSearch(item);
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
          <View style={styles.promoCarouselSection}>
            <FlatList
              data={promoBanners}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              onMomentumScrollEnd={(event) => {
                const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                setActivePromoIndex(currentIndex);
              }}
              renderItem={({ item }) => (
                <View style={styles.promoItemWrapper}>
                  <TouchableOpacity style={[styles.promoCard, { backgroundColor: item.color }]} activeOpacity={0.9}>
                    <View style={styles.promoLeftContent}>
                      <Text style={styles.promoTitle}>{item.title}</Text>
                      <Text style={styles.promoDiscount}>{item.discount}</Text>

                      <View style={styles.promoBadgeBubble}>
                        <Text style={styles.promoBadgeText}>{item.badge}</Text>
                      </View>
                    </View>

                    <Image source={{ uri: item.image }} style={styles.promoSideImage} />
                  </TouchableOpacity>
                </View>
              )}
            />

            <View style={styles.promoDotsContainer}>
              {promoBanners.map((_, index) => (
                <View
                  key={`promo-dot-${index}`}
                  style={[styles.promoDot, activePromoIndex === index && styles.activePromoDot]}
                />
              ))}
            </View>
          </View>

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
    color: COLORS.black,
    marginRight: SIZES.medium
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.large,
    paddingHorizontal: SIZES.medium,
    height: 48
  },
  searchInput: {
    flex: 1,
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.small
  },
  cameraButton: {
    marginLeft: SIZES.small
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
  promoCarouselSection: {
    marginVertical: SIZES.medium
  },
  promoItemWrapper: {
    width: screenWidth,
    paddingHorizontal: SIZES.medium
  },
  promoCard: {
    width: '100%',
    height: 126,
    borderRadius: SIZES.radius.large,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  promoLeftContent: {
    flex: 1,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
    justifyContent: 'space-between'
  },
  promoSideImage: {
    width: '44%',
    height: '100%'
  },
  promoTitle: {
    fontSize: FONTS.sizes.huge,
    fontFamily: FONTS.bold,
    color: COLORS.white
  },
  promoDiscount: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    color: COLORS.white
  },
  promoBadgeBubble: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -SIZES.large,
    marginBottom: -SIZES.medium
  },
  promoBadgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    lineHeight: 18
  },
  promoDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.small
  },
  promoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C7D4F6',
    marginHorizontal: 4
  },
  activePromoDot: {
    width: 38,
    borderRadius: 6,
    backgroundColor: COLORS.primary
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