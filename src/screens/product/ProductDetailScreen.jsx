import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { useCartContext } from '../../Context/CartContext';
import { useLocalization } from '../../Context/LocalizationContext';

export default function ProductDetailScreen({ navigation, route }) {
  const { product } = route.params;
  const { addToCart } = useCartContext();
  const { t } = useLocalization();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('pink');
  const [isFavorite, setIsFavorite] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
  const colors = [
    { name: 'pink', code: '#FFC0CB' },
    { name: 'red', code: '#FF0000' },
    { name: 'blue', code: '#0000FF' },
    { name: 'black', code: '#000000' },
    { name: 'white', code: '#FFFFFF' }
  ];

  const colorImageMap = {
    pink: [
      'https://loremflickr.com/700/700/fashion,pink?lock=811',
      'https://loremflickr.com/700/700/women,pink-dress?lock=812',
      'https://loremflickr.com/700/700/style,pink?lock=813',
      'https://loremflickr.com/700/700/clothing,pink?lock=814'
    ],
    red: [
      'https://loremflickr.com/700/700/fashion,red?lock=821',
      'https://loremflickr.com/700/700/women,red-dress?lock=822',
      'https://loremflickr.com/700/700/style,red?lock=823',
      'https://loremflickr.com/700/700/clothing,red?lock=824'
    ],
    blue: [
      'https://loremflickr.com/700/700/fashion,blue?lock=831',
      'https://loremflickr.com/700/700/women,blue-dress?lock=832',
      'https://loremflickr.com/700/700/style,blue?lock=833',
      'https://loremflickr.com/700/700/clothing,blue?lock=834'
    ],
    black: [
      'https://loremflickr.com/700/700/fashion,black?lock=841',
      'https://loremflickr.com/700/700/women,black-dress?lock=842',
      'https://loremflickr.com/700/700/style,black?lock=843',
      'https://loremflickr.com/700/700/clothing,black?lock=844'
    ],
    white: [
      'https://loremflickr.com/700/700/fashion,white?lock=851',
      'https://loremflickr.com/700/700/women,white-dress?lock=852',
      'https://loremflickr.com/700/700/style,white?lock=853',
      'https://loremflickr.com/700/700/clothing,white?lock=854'
    ]
  };

  const productImages = useMemo(() => {
    const defaultImages = [
      product.image,
      'https://loremflickr.com/700/700/fashion,lookbook?lock=861',
      'https://loremflickr.com/700/700/fashion,studio?lock=862',
      'https://loremflickr.com/700/700/fashion,model?lock=863'
    ];

    return colorImageMap[selectedColor] || defaultImages;
  }, [product.image, selectedColor]);

  const handleAddToCart = async () => {
    await addToCart(product, quantity, selectedSize, selectedColor);
    Alert.alert(t('addedToCart'), `${product.name} ${t('addedToYourCart')}`, [
      { text: t('continue'), style: 'cancel' },
      {
        text: t('viewCart'),
        onPress: () => navigation.navigate('Cart', { screen: 'CartMain' })
      }
    ]);
  };

  const handleBuyNow = async () => {
    const buyNowItem = { ...product, quantity, selectedSize, selectedColor };
    await addToCart(product, quantity, selectedSize, selectedColor);
    navigation.navigate('Cart', {
      screen: 'Payment',
      params: { items: [buyNowItem] }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="share-2" size={20} color={COLORS.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerIcon}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Icon 
              name="heart" 
              size={20} 
              color={isFavorite ? COLORS.error : COLORS.text.primary} 
              solid={isFavorite}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <FlatList
          key={`images-${selectedColor}`}
          data={productImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.productImage} />
          )}
        />

        <View style={styles.content}>
          {/* Price and Description */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Variations */}
          <View style={styles.variationSection}>
            <TouchableOpacity style={styles.variationHeader}>
              <View>
                <Text style={styles.variationLabel}>{`${t('color')}: ${selectedColor}`}</Text>
                <Text style={styles.variationValue}>{`${t('size')}: ${selectedSize}`}</Text>
              </View>
              <Icon name="chevron-right" size={20} color={COLORS.text.secondary} />
            </TouchableOpacity>
          </View>

          {/* Size Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('selectSize')}</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSize
                  ]}
                  onPress={() => setSelectedSize(size)}
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
            <Text style={styles.sectionTitle}>{t('selectColor')}</Text>
            <View style={styles.colorContainer}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.name}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color.code },
                    selectedColor === color.name && styles.selectedColor
                  ]}
                  onPress={() => setSelectedColor(color.name)}
                >
                  {selectedColor === color.name && (
                    <Icon name="check" size={16} color={COLORS.white} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Additional Images */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('moreImages')}</Text>
            <FlatList
              data={productImages.slice(1)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.thumbnailImage} />
              )}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Icon 
            name="heart" 
            size={24} 
            color={isFavorite ? COLORS.error : COLORS.text.primary} 
            solid={isFavorite}
          />
        </TouchableOpacity>

        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Icon name="minus" size={16} color={COLORS.text.primary} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Icon name="plus" size={16} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>{t('addToCartText')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buyNowButton}
          onPress={handleBuyNow}
        >
          <Text style={styles.buyNowText}>{t('buyNow')}</Text>
        </TouchableOpacity>
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
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerIcon: {
    marginLeft: SIZES.medium
  },
  productImage: {
    width: 400,
    height: 400,
    resizeMode: 'cover'
  },
  content: {
    padding: SIZES.large
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.small
  },
  price: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginRight: SIZES.small
  },
  originalPrice: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    textDecorationLine: 'line-through'
  },
  productName: {
    fontSize: FONTS.sizes.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.small
  },
  description: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    lineHeight: 22,
    marginBottom: SIZES.large
  },
  variationSection: {
    marginBottom: SIZES.large
  },
  variationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.medium
  },
  variationLabel: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: 4
  },
  variationValue: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
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
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius.medium,
    marginRight: SIZES.small
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.small
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.small
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantity: {
    marginHorizontal: SIZES.small,
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    minWidth: 30,
    textAlign: 'center'
  },
  addToCartButton: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.small
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium
  },
  buyNowButton: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buyNowText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium
  }
});