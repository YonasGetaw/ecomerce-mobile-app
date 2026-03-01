import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { FLASH_SALE_ITEMS } from '../../data/MockData';

const { width: screenWidth } = Dimensions.get('window');
const DISCOUNT_TABS = ['all', '10', '20', '30', '40', '50'];

export default function FlashSaleDetailScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('20');
  const [remainingSeconds, setRemainingSeconds] = useState((36 * 60) + 58);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const saleProducts = useMemo(() => {
    const imagePool = [
      'https://loremflickr.com/500/500/fashion,girl?lock=401',
      'https://loremflickr.com/500/500/shopping,woman?lock=402',
      'https://loremflickr.com/500/500/lifestyle,model?lock=403',
      'https://loremflickr.com/500/500/clothes,style?lock=404',
      'https://loremflickr.com/500/500/dress,fashion?lock=405',
      'https://loremflickr.com/500/500/boutique,woman?lock=406'
    ];

    const discountPattern = [20, 20, 20, 20, 30, 40];

    return [...FLASH_SALE_ITEMS, ...FLASH_SALE_ITEMS].slice(0, 6).map((item, index) => {
      const discount = discountPattern[index] ?? 20;
      const price = 16;
      const originalPrice = 20;

      return {
        ...item,
        id: `${item.id}-${index}`,
        image: imagePool[index % imagePool.length],
        discount,
        price,
        originalPrice,
        description: 'Lorem ipsum dolor sit amet consectetur'
      };
    });
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedTab === 'all') return saleProducts;
    return saleProducts.filter((item) => item.discount === Number(selectedTab));
  }, [saleProducts, selectedTab]);

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;
  const pad = (value) => String(value).padStart(2, '0');

  const heroImages = [
    'https://loremflickr.com/450/600/woman,purple?lock=501',
    'https://loremflickr.com/450/600/fashion,white-shirt?lock=502',
    'https://loremflickr.com/450/600/model,pink-sweater?lock=503',
    'https://loremflickr.com/450/600/model,blue-sweater?lock=504'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topBlock}>
          <View style={styles.topCircle} />

          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>Flash Sale</Text>
              <Text style={styles.subtitle}>Choose Your Discount</Text>
            </View>

            <View style={styles.clockRow}>
              <Icon name="clock" size={17} color={COLORS.white} />
              <View style={styles.timeChip}><Text style={styles.timeText}>{pad(hours)}</Text></View>
              <View style={styles.timeChip}><Text style={styles.timeText}>{pad(minutes)}</Text></View>
              <View style={styles.timeChip}><Text style={styles.timeText}>{pad(seconds)}</Text></View>
            </View>
          </View>
        </View>

        <View style={styles.discountTabsWrap}>
          {DISCOUNT_TABS.map((tab) => {
            const isSelected = tab === selectedTab;
            const label = tab === 'all' ? 'All' : `${tab}%`;

            return (
              <TouchableOpacity
                key={tab}
                style={[styles.discountTab, isSelected && styles.discountTabActive]}
                onPress={() => setSelectedTab(tab)}
                activeOpacity={0.85}
              >
                <Text style={[styles.discountTabText, isSelected && styles.discountTabTextActive]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>ARTICLE REIMAGINED</Text>
          <View style={styles.heroRow}>
            {heroImages.map((uri, index) => (
              <View key={uri} style={styles.heroImageWrap}>
                <Image source={{ uri }} style={styles.heroImage} />
                {index === heroImages.length - 1 && (
                  <View style={styles.liveBadge}>
                    <Text style={styles.liveText}>Live</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>20% Discount</Text>
          <TouchableOpacity>
            <Icon name="sliders" size={18} color={COLORS.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.gridWrap}>
          {filteredProducts.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
              activeOpacity={0.9}
            >
              <View style={styles.imageWrap}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.discountBadgeCard}>
                  <Text style={styles.discountBadgeText}>-{item.discount}%</Text>
                </View>
              </View>

              <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

              <View style={styles.priceRow}>
                <Text style={styles.currentPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.oldPrice}>${item.originalPrice.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  topBlock: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.large,
    paddingTop: SIZES.medium,
    paddingBottom: SIZES.xlarge,
    borderBottomLeftRadius: SIZES.radius.xxlarge,
    borderBottomRightRadius: SIZES.radius.xxlarge,
    overflow: 'hidden'
  },
  topCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.25,
    top: -40,
    left: -20
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xxxlarge,
    fontFamily: FONTS.bold
  },
  subtitle: {
    color: COLORS.primaryLight,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    marginTop: 2
  },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeChip: {
    minWidth: 30,
    height: 28,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6
  },
  timeText: {
    color: COLORS.text.primary,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold
  },
  discountTabsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: SIZES.large,
    marginTop: -SIZES.large,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.xlarge,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-between'
  },
  discountTab: {
    minWidth: 44,
    height: 32,
    borderRadius: SIZES.radius.round,
    alignItems: 'center',
    justifyContent: 'center'
  },
  discountTabActive: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight
  },
  discountTabText: {
    color: COLORS.text.primary,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.semiBold
  },
  discountTabTextActive: {
    color: COLORS.primary
  },
  heroCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.large,
    marginTop: SIZES.medium,
    borderRadius: SIZES.radius.large,
    paddingTop: SIZES.small,
    paddingBottom: SIZES.small,
    paddingHorizontal: 6
  },
  heroTitle: {
    textAlign: 'center',
    color: COLORS.text.primary,
    letterSpacing: 3,
    fontSize: 10,
    fontFamily: FONTS.medium,
    marginBottom: SIZES.small
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heroImageWrap: {
    width: '24%',
    borderRadius: SIZES.radius.small,
    overflow: 'hidden'
  },
  heroImage: {
    width: '100%',
    height: 170
  },
  liveBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: SIZES.radius.small
  },
  liveText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: FONTS.bold
  },
  sectionHeader: {
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
    marginBottom: SIZES.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    color: COLORS.text.primary,
    fontSize: FONTS.sizes.xxxlarge,
    fontFamily: FONTS.bold
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.large,
    paddingBottom: SIZES.xlarge
  },
  productCard: {
    width: (screenWidth - (SIZES.large * 2) - SIZES.small) / 2,
    marginBottom: SIZES.medium
  },
  imageWrap: {
    borderRadius: SIZES.radius.medium,
    overflow: 'hidden',
    position: 'relative'
  },
  productImage: {
    width: '100%',
    height: 180
  },
  discountBadgeCard: {
    position: 'absolute',
    right: 6,
    top: 6,
    backgroundColor: COLORS.error,
    borderRadius: SIZES.radius.small,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  discountBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: FONTS.bold
  },
  description: {
    marginTop: 8,
    color: COLORS.text.secondary,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    lineHeight: 17
  },
  priceRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  currentPrice: {
    color: COLORS.text.primary,
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.bold,
    marginRight: 6
  },
  oldPrice: {
    color: COLORS.error,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    textDecorationLine: 'line-through'
  }
});
