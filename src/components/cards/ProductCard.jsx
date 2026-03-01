import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';

export default function ProductCard({
  product,
  onPress,
  onFavoritePress,
  isFavorite = false,
  horizontal = false,
  hideTypeAndDiscount = false
}) {
  const {
    id,
    name,
    price,
    originalPrice,
    discount,
    image,
    rating,
    isNew,
    isSale,
    isHot
  } = product;

  const renderBadge = () => {
    if (isNew) {
      return <View style={[styles.badge, styles.newBadge]}><Text style={styles.badgeText}>NEW</Text></View>;
    }
    if (isSale) {
      return <View style={[styles.badge, styles.saleBadge]}><Text style={styles.badgeText}>SALE</Text></View>;
    }
    if (isHot) {
      return <View style={[styles.badge, styles.hotBadge]}><Text style={styles.badgeText}>HOT</Text></View>;
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={[styles.container, horizontal && styles.horizontalContainer]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        {!hideTypeAndDiscount && renderBadge()}
        {!hideTypeAndDiscount && discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onFavoritePress(id)}
        >
          <Icon
            name={isFavorite ? 'heart' : 'heart'}
            size={20}
            color={isFavorite ? COLORS.error : COLORS.white}
            solid={isFavorite}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{rating}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price}</Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>${originalPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    marginRight: SIZES.medium,
    marginBottom: SIZES.medium,
    shadowColor: COLORS.card.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  horizontalContainer: {
    width: '100%',
    flexDirection: 'row',
    marginRight: 0
  },
  imageContainer: {
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: SIZES.radius.large,
    borderTopRightRadius: SIZES.radius.large
  },
  badge: {
    position: 'absolute',
    top: SIZES.small,
    left: SIZES.small,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small,
    backgroundColor: COLORS.primary
  },
  newBadge: {
    backgroundColor: COLORS.primary
  },
  saleBadge: {
    backgroundColor: COLORS.error
  },
  hotBadge: {
    backgroundColor: COLORS.warning
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold
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
  favoriteButton: {
    position: 'absolute',
    bottom: SIZES.small,
    right: SIZES.small,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center'
  },
  details: {
    padding: SIZES.medium
  },
  name: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginBottom: 4
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  rating: {
    marginLeft: 4,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginRight: SIZES.small
  },
  originalPrice: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    textDecorationLine: 'line-through'
  }
});