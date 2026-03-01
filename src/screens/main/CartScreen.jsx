import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { COLORS, FONTS, SIZES } from '../../utils/colors';
import { PRODUCTS } from '../../data/MockData';

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState(
    PRODUCTS.slice(0, 3).map((item, index) => ({
      ...item,
      cartId: index + 1,
      quantity: 1,
      selected: true
    }))
  );

  const updateQuantity = (id, increment) => {
    setCartItems(prev =>
      prev.map(item =>
        item.cartId === id
          ? { ...item, quantity: Math.max(1, item.quantity + increment) }
          : item
      )
    );
  };

  const toggleSelect = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.cartId === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    setCartItems(prev =>
      prev.map(item => ({ ...item, selected: !allSelected }))
    );
  };

  const removeItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setCartItems(prev => prev.filter(item => item.cartId !== id))
        }
      ]
    );
  };

  const calculateSubtotal = () => {
    return cartItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return cartItems
      .filter(item => item.selected && item.originalPrice)
      .reduce((sum, item) => 
        sum + ((item.originalPrice - item.price) * item.quantity), 0
      );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const selectedCount = cartItems.filter(item => item.selected).length;
  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.emptyContainer}>
          <Icon name="shopping-cart" size={80} color={COLORS.text.hint} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Looks like you haven't added anything to your cart yet
          </Text>
          <PrimaryButton
            title="Start Shopping"
            onPress={() => navigation.navigate('Home')}
            style={styles.shopButton}
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
        <Text style={styles.headerTitle}>Shopping Cart ({cartItems.length})</Text>
        <TouchableOpacity onPress={toggleSelectAll}>
          <Text style={styles.selectAllText}>
            {allSelected ? 'Deselect All' : 'Select All'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <View style={styles.cartItems}>
          {cartItems.map((item) => (
            <View key={item.cartId} style={styles.cartItem}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleSelect(item.cartId)}
              >
                <View style={[
                  styles.checkboxInner,
                  item.selected && styles.checkboxSelected
                ]}>
                  {item.selected && (
                    <Icon name="check" size={12} color={COLORS.white} />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
                style={styles.itemImageContainer}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </TouchableOpacity>

              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                
                <View style={styles.itemPriceContainer}>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                  {item.originalPrice && (
                    <Text style={styles.itemOriginalPrice}>${item.originalPrice}</Text>
                  )}
                </View>

                <View style={styles.itemActions}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.cartId, -1)}
                    >
                      <Icon name="minus" size={16} color={COLORS.text.primary} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.cartId, 1)}
                    >
                      <Icon name="plus" size={16} color={COLORS.text.primary} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeItem(item.cartId)}
                  >
                    <Icon name="trash-2" size={18} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({selectedCount} items)</Text>
            <Text style={styles.summaryValue}>${calculateSubtotal().toFixed(2)}</Text>
          </View>

          {calculateDiscount() > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>
                -${calculateDiscount().toFixed(2)}
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>Calculated at checkout</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
          </View>
        </View>

        {/* Recommended Items */}
        <View style={styles.recommended}>
          <Text style={styles.recommendedTitle}>You might also like</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {PRODUCTS.slice(3, 7).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recommendedItem}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              >
                <Image source={{ uri: item.image }} style={styles.recommendedImage} />
                <Text style={styles.recommendedName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.recommendedPrice}>${item.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.bottomTotalLabel}>Total</Text>
          <Text style={styles.bottomTotalValue}>${calculateTotal().toFixed(2)}</Text>
        </View>
        <PrimaryButton
          title={`Checkout (${selectedCount})`}
          onPress={() => {
            const selectedItems = cartItems.filter(item => item.selected);
            navigation.navigate('Payment', { items: selectedItems });
          }}
          disabled={selectedCount === 0}
          style={styles.checkoutButton}
        />
      </View>
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
  selectAllText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.primary
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
  shopButton: {
    width: '100%'
  },
  cartItems: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.small,
    paddingHorizontal: SIZES.medium
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  checkbox: {
    marginRight: SIZES.medium,
    justifyContent: 'center'
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  itemImageContainer: {
    marginRight: SIZES.medium
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius.medium
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
    marginBottom: SIZES.small
  },
  itemPrice: {
    fontSize: FONTS.sizes.medium,
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
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius.medium
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantity: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  removeButton: {
    padding: SIZES.small
  },
  summary: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.small,
    padding: SIZES.large
  },
  summaryTitle: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium,
    textTransform: 'uppercase'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.small
  },
  summaryLabel: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  summaryValue: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  discountValue: {
    color: COLORS.success
  },
  totalRow: {
    marginTop: SIZES.small,
    paddingTop: SIZES.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  totalLabel: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  totalValue: {
    fontSize: FONTS.sizes.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  recommended: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.small,
    marginBottom: SIZES.xxlarge,
    padding: SIZES.large
  },
  recommendedTitle: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium,
    textTransform: 'uppercase'
  },
  recommendedItem: {
    width: 120,
    marginRight: SIZES.medium
  },
  recommendedImage: {
    width: '100%',
    height: 120,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.small
  },
  recommendedName: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginBottom: 2
  },
  recommendedPrice: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  totalContainer: {
    marginRight: SIZES.medium
  },
  bottomTotalLabel: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  bottomTotalValue: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  checkoutButton: {
    flex: 1
  }
});