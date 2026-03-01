import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { PRODUCTS } from '../../data/MockData';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState(PRODUCTS.slice(0, 5));
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const toggleFavorite = (item) => {
    Alert.alert(
      'Remove from Favorites',
      `Are you sure you want to remove ${item.name} from your favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setFavorites(prev => prev.filter(i => i.id !== item.id));
            setSelectedItems(prev => prev.filter(id => id !== item.id));
          }
        }
      ]
    );
  };

  const toggleSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    } else {
      setSelectedItems(prev => [...prev, itemId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === favorites.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(favorites.map(item => item.id));
    }
  };

  const addSelectedToCart = () => {
    const selectedProducts = favorites.filter(item => selectedItems.includes(item.id));
    Alert.alert(
      'Added to Cart',
      `${selectedProducts.length} item(s) added to your cart`,
      [
        {
          text: 'View Cart',
          onPress: () => navigation.navigate('Cart')
        },
        {
          text: 'Continue Shopping',
          style: 'cancel'
        }
      ]
    );
    // Here you would add to cart logic
    setIsEditing(false);
    setSelectedItems([]);
  };

  const removeSelected = () => {
    Alert.alert(
      'Remove Items',
      `Are you sure you want to remove ${selectedItems.length} item(s) from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setFavorites(prev => prev.filter(item => !selectedItems.includes(item.id)));
            setSelectedItems([]);
            setIsEditing(false);
          }
        }
      ]
    );
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      {isEditing && (
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => toggleSelect(item.id)}
        >
          <View style={[
            styles.checkboxInner,
            selectedItems.includes(item.id) && styles.checkboxSelected
          ]}>
            {selectedItems.includes(item.id) && (
              <Icon name="check" size={12} color={COLORS.white} />
            )}
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.itemContent, isEditing && styles.itemContentWithCheckbox]}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
          
          <View style={styles.itemPriceContainer}>
            <Text style={styles.itemPrice}>${item.price}</Text>
            {item.originalPrice && (
              <Text style={styles.itemOriginalPrice}>${item.originalPrice}</Text>
            )}
          </View>

          <View style={styles.itemRating}>
            <Icon name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating} ({item.reviews} reviews)</Text>
          </View>

          {!isEditing && (
            <View style={styles.itemActions}>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => {
                  Alert.alert('Added to Cart', `${item.name} added to your cart`);
                }}
              >
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => toggleFavorite(item)}
              >
                <Icon name="trash-2" size={18} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favorites</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.emptyContainer}>
          <Icon name="heart" size={80} color={COLORS.text.hint} />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyText}>
            Items you favorite will appear here. Start exploring and save your favorite items!
          </Text>
          <PrimaryButton
            title="Explore Products"
            onPress={() => navigation.navigate('Home')}
            style={styles.exploreButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Favorites {isEditing ? `(${selectedItems.length} selected)` : ''}
        </Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editText}>
            {isEditing ? 'Done' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      {isEditing && (
        <View style={styles.editBar}>
          <TouchableOpacity style={styles.selectAll} onPress={toggleSelectAll}>
            <Text style={styles.selectAllText}>
              {selectedItems.length === favorites.length ? 'Deselect All' : 'Select All'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.editActions}>
            <TouchableOpacity
              style={[styles.editAction, selectedItems.length === 0 && styles.disabledAction]}
              onPress={addSelectedToCart}
              disabled={selectedItems.length === 0}
            >
              <Icon 
                name="shopping-cart" 
                size={18} 
                color={selectedItems.length === 0 ? COLORS.text.hint : COLORS.primary} 
              />
              <Text style={[
                styles.actionText,
                selectedItems.length === 0 && styles.disabledText
              ]}>
                Add to Cart
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.editAction, selectedItems.length === 0 && styles.disabledAction]}
              onPress={removeSelected}
              disabled={selectedItems.length === 0}
            >
              <Icon 
                name="trash-2" 
                size={18} 
                color={selectedItems.length === 0 ? COLORS.text.hint : COLORS.error} 
              />
              <Text style={[
                styles.actionText,
                selectedItems.length === 0 && styles.disabledText,
                selectedItems.length > 0 && styles.removeText
              ]}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
  editText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  },
  editBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  selectAll: {
    paddingVertical: SIZES.small
  },
  selectAllText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  },
  editActions: {
    flexDirection: 'row'
  },
  editAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SIZES.large,
    paddingVertical: SIZES.small
  },
  disabledAction: {
    opacity: 0.5
  },
  actionText: {
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  },
  disabledText: {
    color: COLORS.text.hint
  },
  removeText: {
    color: COLORS.error
  },
  listContent: {
    padding: SIZES.medium
  },
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    marginBottom: SIZES.medium,
    padding: SIZES.medium,
    shadowColor: COLORS.card.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  checkbox: {
    marginRight: SIZES.medium,
    justifyContent: 'center'
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row'
  },
  itemContentWithCheckbox: {
    flex: 1
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: SIZES.radius.medium,
    marginRight: SIZES.medium
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: 4
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  itemPrice: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginRight: SIZES.small
  },
  itemOriginalPrice: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    textDecorationLine: 'line-through'
  },
  itemRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.small
  },
  ratingText: {
    marginLeft: 4,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.radius.medium,
    alignItems: 'center',
    marginRight: SIZES.small
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium
  },
  removeButton: {
    padding: SIZES.small
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xxlarge
  },
  emptyTitle: {
    fontSize: FONTS.sizes.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginTop: SIZES.large,
    marginBottom: SIZES.small
  },
  emptyText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SIZES.xxlarge
  },
  exploreButton: {
    width: '100%'
  }
});