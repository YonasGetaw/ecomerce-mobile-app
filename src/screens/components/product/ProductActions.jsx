import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import QuantitySelector from '../../../components/buttons/QuantitySelector';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function ProductActions({
  quantity,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  isFavorite,
  onToggleFavorite
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
          onPress={onToggleFavorite}
        >
          <Icon
            name="heart"
            size={24}
            color={isFavorite ? COLORS.white : COLORS.text.primary}
            solid={isFavorite}
          />
        </TouchableOpacity>

        <QuantitySelector
          quantity={quantity}
          onIncrease={() => onQuantityChange(quantity + 1)}
          onDecrease={() => onQuantityChange(quantity - 1)}
        />
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.addToCartButton} onPress={onAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowButton} onPress={onBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.large,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  favoriteButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteActive: {
    backgroundColor: COLORS.error,
    borderColor: COLORS.error
  },
  bottomRow: {
    flexDirection: 'row'
  },
  addToCartButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius.large,
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
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.large,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buyNowText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium
  }
});