import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useFavoritesContext } from '../../Context/FavoritesContext';
import { useCartContext } from '../../Context/CartContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFromFavorites } = useFavoritesContext();
  const { addToCart } = useCartContext();

  const recentlyViewed = useMemo(() => favorites.slice(0, 8), [favorites]);

  const handleRemove = async (itemId) => {
    await removeFromFavorites(itemId);
  };

  const handleAddToCart = async (item) => {
    await addToCart(item, 1, item.selectedSize ?? 'M', item.selectedColor ?? 'Pink');
    Alert.alert('Added to Cart', `${item.name} added to your cart.`, [
      {
        text: 'View Cart',
        onPress: () => navigation.navigate('Cart', { screen: 'CartMain' })
      },
      { text: 'OK', style: 'cancel' }
    ]);
  };

  const renderRecentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recentThumbWrap}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.recentThumb} />
    </TouchableOpacity>
  );

  const renderWishlistItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
        style={styles.imageWrap}
        activeOpacity={0.85}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />

        <TouchableOpacity
          style={styles.deleteCircle}
          onPress={() => handleRemove(item.id)}
        >
          <Icon name="trash-2" size={14} color={COLORS.error} />
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={styles.detailsWrap}>
        <Text style={styles.descriptionText} numberOfLines={2}>
          {item.description || 'Lorem ipsum dolor sit amet consectetur.'}
        </Text>

        <View style={styles.priceRow}>
          {item.originalPrice ? (
            <Text style={styles.oldPrice}>${Number(item.originalPrice).toFixed(2)}</Text>
          ) : null}
          <Text style={styles.currentPrice}>${Number(item.price).toFixed(2)}</Text>
        </View>

        <View style={styles.bottomMetaRow}>
          <View style={styles.optionChipsRow}>
            <View style={styles.optionChip}>
              <Text style={styles.optionChipText}>{item.selectedColor || 'Pink'}</Text>
            </View>
            <View style={styles.optionChip}>
              <Text style={styles.optionChipText}>{item.selectedSize || 'M'}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.cartActionButton}
            onPress={() => handleAddToCart(item)}
          >
            <Icon name="shopping-cart" size={18} color={COLORS.primary} />
            <View style={styles.plusDot}>
              <Icon name="plus" size={10} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

        <View style={styles.headerOnly}>
          <Text style={styles.title}>Wishlist</Text>
        </View>

        <View style={styles.emptyContainer}>
          <Icon name="heart" size={78} color={COLORS.text.hint} />
          <Text style={styles.emptyTitle}>No wishlist items yet</Text>
          <Text style={styles.emptyText}>Save products to wishlist and they will appear here.</Text>
          <PrimaryButton
            title="Explore Products"
            onPress={() => navigation.navigate('Home', { screen: 'HomeMain' })}
            style={styles.exploreButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderWishlistItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={(
          <View>
            <Text style={styles.title}>Wishlist</Text>

            <View style={styles.recentHeaderRow}>
              <Text style={styles.recentTitle}>Recently viewed</Text>
              <TouchableOpacity style={styles.recentArrowButton}>
                <Icon name="arrow-right" size={16} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.recentStripWrap}>
              <FlatList
                data={recentlyViewed}
                horizontal
                keyExtractor={(item) => `recent-${item.id}`}
                showsHorizontalScrollIndicator={false}
                renderItem={renderRecentItem}
                contentContainerStyle={styles.recentStripContent}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  listContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.large
  },
  headerOnly: {
    paddingHorizontal: SIZES.medium,
    paddingTop: SIZES.medium
  },
  title: {
    marginTop: SIZES.small,
    marginBottom: SIZES.medium,
    fontSize: 42,
    lineHeight: 46,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  recentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small
  },
  recentTitle: {
    fontSize: FONTS.sizes.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  recentArrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recentStripWrap: {
    borderWidth: 2,
    borderColor: COLORS.info,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.small,
    marginBottom: SIZES.medium
  },
  recentStripContent: {
    alignItems: 'center'
  },
  recentThumbWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: 'hidden',
    marginRight: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white
  },
  recentThumb: {
    width: '100%',
    height: '100%'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.small,
    padding: SIZES.small,
    shadowColor: COLORS.card.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 2
  },
  imageWrap: {
    width: 138,
    height: 118,
    borderRadius: SIZES.radius.medium,
    overflow: 'hidden',
    marginRight: SIZES.small,
    position: 'relative'
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
    justifyContent: 'center'
  },
  detailsWrap: {
    flex: 1,
    justifyContent: 'space-between'
  },
  descriptionText: {
    fontSize: FONTS.sizes.medium,
    lineHeight: 19,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginTop: 2
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  oldPrice: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    textDecorationLine: 'line-through',
    marginRight: SIZES.small
  },
  currentPrice: {
    fontSize: 34,
    lineHeight: 36,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  bottomMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  optionChipsRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionChip: {
    minWidth: 62,
    height: 34,
    borderRadius: SIZES.radius.small,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.small
  },
  optionChipText: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  cartActionButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  plusDot: {
    position: 'absolute',
    right: -2,
    top: 0,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.xlarge
  },
  emptyTitle: {
    marginTop: SIZES.large,
    marginBottom: SIZES.small,
    fontSize: FONTS.sizes.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  emptyText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SIZES.large
  },
  exploreButton: {
    width: '100%'
  }
});
