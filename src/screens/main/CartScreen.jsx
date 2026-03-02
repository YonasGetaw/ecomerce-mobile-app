import React, { useMemo } from 'react';
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
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { useCartContext } from '../../Context/CartContext';
import { useFavoritesContext } from '../../Context/FavoritesContext';
import { useLocalization } from '../../Context/LocalizationContext';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart, addToCart } = useCartContext();
  const { favorites, removeFromFavorites } = useFavoritesContext();
  const { t } = useLocalization();
  const isCartEmpty = cartItems.length === 0;

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0),
    [cartItems]
  );

  const wishlistItems = useMemo(() => {
    const cartIds = new Set(cartItems.map((item) => item.id));
    return favorites.filter((item) => !cartIds.has(item.id)).slice(0, 2);
  }, [favorites, cartItems]);

  const formatPrice = (value) => `$${Number(value || 0).toFixed(2).replace('.', ',')}`;

  const handleRemoveFromCart = async (item) => {
    await removeFromCart(item.id, item.selectedSize ?? null, item.selectedColor ?? null);
  };

  const handleQuantityChange = async (item, direction) => {
    const next = Math.max(1, Number(item.quantity || 1) + direction);
    await updateQuantity(item.id, next, item.selectedSize, item.selectedColor);
  };

  const handleAddWishlistToCart = async (item) => {
    await addToCart(item, 1, item.selectedSize ?? 'M', item.selectedColor ?? 'Pink');
  };

  const handleRemoveFromWishlist = async (itemId) => {
    await removeFromFavorites(itemId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{t('cartTitle')}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{cartItems.length}</Text>
          </View>
        </View>

        <View style={styles.shippingCard}>
          <Text style={styles.shippingTitle}>{t('shippingAddressTitle')}</Text>
          <Text style={styles.shippingText}>26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh city</Text>
          <TouchableOpacity style={styles.editAddressButton}>
            <Icon name="edit-2" size={15} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {isCartEmpty && (
          <View style={styles.emptyCartVisualWrap}>
            <View style={styles.emptyCartIconCircle}>
              <Icon name="shopping-bag" size={48} color={COLORS.primary} />
            </View>
          </View>
        )}

        {cartItems.map((item) => (
          <View key={`${item.id}-${item.selectedSize || 'M'}-${item.selectedColor || 'Pink'}`} style={styles.cartItemRow}>
            <View style={styles.imageWrap}>
              <TouchableOpacity
                style={styles.imageTapArea}
                onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: item } })}
                activeOpacity={0.85}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteCircle}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                onPress={() => handleRemoveFromCart(item)}
              >
                <Icon name="trash-2" size={14} color={COLORS.error} />
              </TouchableOpacity>
            </View>

            <View style={styles.itemInfoWrap}>
              <Text style={styles.itemDesc} numberOfLines={2}>{item.description || t('loremLong')}</Text>
              <Text style={styles.itemVariant}>{`${item.selectedColor || 'Pink'}, ${t('size')} ${item.selectedSize || 'M'}`}</Text>

              <View style={styles.itemBottomRow}>
                <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>

                <View style={styles.qtyWrap}>
                  <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => handleQuantityChange(item, -1)}
                  >
                    <Icon name="minus" size={14} color={COLORS.primary} />
                  </TouchableOpacity>

                  <View style={styles.qtyValuePill}>
                    <Text style={styles.qtyValue}>{item.quantity || 1}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => handleQuantityChange(item, 1)}
                  >
                    <Icon name="plus" size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.wishlistSection}>
          <Text style={styles.wishlistTitle}>{t('fromYourWishlist')}</Text>

          {wishlistItems.map((item) => (
            <View key={`wish-${item.id}`} style={styles.wishlistRow}>
              <View style={styles.wishlistImageWrap}>
                <TouchableOpacity
                  style={styles.imageTapArea}
                  onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: item } })}
                >
                  <Image source={{ uri: item.image }} style={styles.wishlistImage} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteCircle}
                  onPress={() => handleRemoveFromWishlist(item.id)}
                >
                  <Icon name="trash-2" size={14} color={COLORS.error} />
                </TouchableOpacity>
              </View>

              <View style={styles.wishlistInfoWrap}>
                <Text numberOfLines={2} style={styles.itemDesc}>{item.description || t('loremLong')}</Text>
                <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>

                <View style={styles.wishlistBottomRow}>
                  <View style={styles.optionChipsRow}>
                    <View style={styles.optionChip}><Text style={styles.optionChipText}>{item.selectedColor || 'Pink'}</Text></View>
                    <View style={styles.optionChip}><Text style={styles.optionChipText}>{item.selectedSize || 'M'}</Text></View>
                  </View>

                  <TouchableOpacity
                    style={styles.cartAddAction}
                    onPress={() => handleAddWishlistToCart(item)}
                  >
                    <Icon name="shopping-cart" size={18} color={COLORS.primary} />
                    <View style={styles.plusDot}>
                      <Icon name="plus" size={9} color={COLORS.white} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.totalText}>{`${t('total')} ${formatPrice(total)}`}</Text>
        <TouchableOpacity
          style={[styles.checkoutButton, isCartEmpty && styles.checkoutButtonDisabled]}
          onPress={() => {
            if (!isCartEmpty) {
              navigation.navigate('Payment', { items: cartItems });
            }
          }}
          disabled={isCartEmpty}
        >
          <Text style={[styles.checkoutText, isCartEmpty && styles.checkoutTextDisabled]}>{t('checkout')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  scrollContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: 90
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.small,
    marginBottom: SIZES.medium
  },
  headerTitle: {
    fontSize: 28,
    lineHeight: 32,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  countBadge: {
    marginLeft: SIZES.small,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D9DEE9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  countText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  shippingCard: {
    backgroundColor: '#F0F0F3',
    borderRadius: SIZES.radius.medium,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    position: 'relative'
  },
  shippingTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: 2
  },
  shippingText: {
    width: '84%',
    fontSize: FONTS.sizes.small,
    lineHeight: 16,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary
  },
  editAddressButton: {
    position: 'absolute',
    right: SIZES.small,
    top: '50%',
    marginTop: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyCartVisualWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xxlarge
  },
  emptyCartIconCircle: {
    width: 136,
    height: 136,
    borderRadius: 68,
    backgroundColor: '#EFEFF1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.card.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4
  },
  cartItemRow: {
    flexDirection: 'row',
    marginBottom: SIZES.medium
  },
  imageWrap: {
    width: 108,
    height: 108,
    borderRadius: SIZES.radius.medium,
    overflow: 'hidden',
    marginRight: SIZES.small,
    position: 'relative'
  },
  imageTapArea: {
    width: '100%',
    height: '100%'
  },
  itemImage: {
    width: '100%',
    height: '100%'
  },
  deleteCircle: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    elevation: 5
  },
  itemInfoWrap: {
    flex: 1,
    justifyContent: 'space-between'
  },
  itemDesc: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary
  },
  itemVariant: {
    marginTop: 3,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  itemBottomRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemPrice: {
    fontSize: 23,
    lineHeight: 25,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  qtyWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyValuePill: {
    minWidth: 34,
    height: 30,
    borderRadius: SIZES.radius.small,
    backgroundColor: '#E6EBF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    paddingHorizontal: 8
  },
  qtyValue: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  wishlistSection: {
    marginTop: SIZES.small
  },
  wishlistTitle: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.small
  },
  wishlistRow: {
    flexDirection: 'row',
    marginBottom: SIZES.medium
  },
  wishlistImageWrap: {
    width: 112,
    height: 112,
    borderRadius: SIZES.radius.medium,
    overflow: 'hidden',
    marginRight: SIZES.small,
    position: 'relative'
  },
  wishlistImage: {
    width: '100%',
    height: '100%'
  },
  wishlistInfoWrap: {
    flex: 1,
    justifyContent: 'space-between'
  },
  wishlistBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  optionChipsRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionChip: {
    minWidth: 60,
    height: 34,
    borderRadius: SIZES.radius.small,
    backgroundColor: '#E6EBF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.small
  },
  optionChipText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  cartAddAction: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  plusDot: {
    position: 'absolute',
    right: -2,
    top: -1,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.medium
  },
  totalText: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  checkoutButton: {
    width: 162,
    height: 52,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkoutButtonDisabled: {
    backgroundColor: '#F1F1F1'
  },
  checkoutText: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    color: COLORS.white
  },
  checkoutTextDisabled: {
    color: COLORS.text.secondary
  }
});
