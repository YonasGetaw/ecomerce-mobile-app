import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function OrderSummaryScreen({ navigation, route }) {
  const { order } = route.params || {};
  const [showFullDetails, setShowFullDetails] = useState(false);

  // Mock order data if none provided
  const orderData = order || {
    id: 'ORD-' + Math.floor(Math.random() * 10000),
    date: new Date().toISOString(),
    status: 'confirmed',
    items: [
      {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        quantity: 2,
        size: 'M',
        color: 'White',
        image: 'https://via.placeholder.com/100'
      },
      {
        id: '2',
        name: 'Slim Fit Jeans',
        price: 79.99,
        quantity: 1,
        size: '32',
        color: 'Blue',
        image: 'https://via.placeholder.com/100'
      }
    ],
    shipping: {
      method: 'Standard Shipping',
      cost: 0,
      estimatedDays: '5-7 business days',
      trackingNumber: 'TRK123456789'
    },
    payment: {
      method: 'Visa •••• 4242',
      total: 139.97,
      subtotal: 139.97,
      tax: 11.20,
      discount: 0
    },
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      country: 'USA',
      phone: '+1 234 567 8900'
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return COLORS.success;
      case 'processing': return COLORS.info;
      case 'shipped': return COLORS.primary;
      case 'delivered': return COLORS.success;
      case 'cancelled': return COLORS.error;
      default: return COLORS.warning;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return 'check-circle';
      case 'processing': return 'clock';
      case 'shipped': return 'truck';
      case 'delivered': return 'package';
      case 'cancelled': return 'x-circle';
      default: return 'alert-circle';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleTrackOrder = () => {
    // Navigate to tracking screen or open tracking URL
    Alert.alert(
      'Track Order',
      `Tracking Number: ${orderData.shipping.trackingNumber}\n\nYou will be notified when your order ships.`,
      [{ text: 'OK' }]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'How would you like to contact us?',
      [
        { text: 'Email', onPress: () => console.log('Email support') },
        { text: 'Chat', onPress: () => console.log('Chat support') },
        { text: 'Call', onPress: () => console.log('Call support') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleReorder = () => {
    Alert.alert(
      'Reorder Items',
      'Would you like to add all items from this order to your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reorder',
          onPress: () => {
            // Add items to cart logic
            Alert.alert('Success', 'Items added to your cart');
            navigation.navigate('Cart');
          }
        }
      ]
    );
  };

  const handleWriteReview = (item) => {
    navigation.navigate('ProductDetail', { 
      product: item,
      writeReview: true 
    });
  };

  const handleReturnItem = (item) => {
    Alert.alert(
      'Return Item',
      'Please select return reason',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Defective Item' },
        { text: 'Wrong Item Sent' },
        { text: 'Changed Mind' },
        { text: 'Size Issue' }
      ]
    );
  };

  const OrderStatus = () => (
    <View style={styles.statusSection}>
      <View style={[styles.statusHeader, { backgroundColor: getStatusColor(orderData.status) + '15' }]}>
        <Icon 
          name={getStatusIcon(orderData.status)} 
          size={24} 
          color={getStatusColor(orderData.status)} 
        />
        <View style={styles.statusInfo}>
          <Text style={[styles.statusTitle, { color: getStatusColor(orderData.status) }]}>
            {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
          </Text>
          <Text style={styles.statusDate}>Placed on {formatDate(orderData.date)}</Text>
        </View>
      </View>

      {orderData.shipping.trackingNumber && (
        <TouchableOpacity style={styles.trackingButton} onPress={handleTrackOrder}>
          <Icon name="truck" size={20} color={COLORS.primary} />
          <Text style={styles.trackingText}>Track Package</Text>
          <Text style={styles.trackingNumber}>#{orderData.shipping.trackingNumber}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const OrderItems = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        <TouchableOpacity onPress={() => setShowFullDetails(!showFullDetails)}>
          <Text style={styles.seeAllText}>
            {showFullDetails ? 'Show Less' : 'View All'}
          </Text>
        </TouchableOpacity>
      </View>

      {orderData.items.slice(0, showFullDetails ? undefined : 2).map((item, index) => (
        <View key={index} style={styles.orderItem}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          
          <View style={styles.itemDetails}>
            <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
            
            <View style={styles.itemVariations}>
              {item.size && <Text style={styles.itemVariation}>Size: {item.size}</Text>}
              {item.color && <Text style={styles.itemVariation}>Color: {item.color}</Text>}
            </View>

            <View style={styles.itemPriceRow}>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>

            {orderData.status === 'delivered' && (
              <View style={styles.itemActions}>
                <TouchableOpacity 
                  style={styles.itemActionButton}
                  onPress={() => handleWriteReview(item)}
                >
                  <Icon name="star" size={14} color={COLORS.primary} />
                  <Text style={styles.itemActionText}>Review</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.itemActionButton}
                  onPress={() => handleReturnItem(item)}
                >
                  <Icon name="rotate-ccw" size={14} color={COLORS.error} />
                  <Text style={[styles.itemActionText, styles.returnText]}>Return</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ))}

      {orderData.items.length > 2 && !showFullDetails && (
        <TouchableOpacity 
          style={styles.moreItemsButton}
          onPress={() => setShowFullDetails(true)}
        >
          <Text style={styles.moreItemsText}>
            +{orderData.items.length - 2} more items
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const ShippingInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shipping Information</Text>
      
      <View style={styles.infoRow}>
        <Icon name="map-pin" size={16} color={COLORS.primary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Delivery Address</Text>
          <Text style={styles.infoText}>
            {orderData.shippingAddress.fullName}
            {'\n'}
            {orderData.shippingAddress.addressLine1}
            {orderData.shippingAddress.addressLine2 ? `\n${orderData.shippingAddress.addressLine2}` : ''}
            {'\n'}
            {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.pincode}
            {'\n'}
            {orderData.shippingAddress.country}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="phone" size={16} color={COLORS.primary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Phone Number</Text>
          <Text style={styles.infoText}>{orderData.shippingAddress.phone}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="truck" size={16} color={COLORS.primary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Shipping Method</Text>
          <Text style={styles.infoText}>
            {orderData.shipping.method} • {orderData.shipping.estimatedDays}
          </Text>
        </View>
      </View>
    </View>
  );

  const PaymentInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Information</Text>
      
      <View style={styles.infoRow}>
        <Icon name="credit-card" size={16} color={COLORS.primary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Payment Method</Text>
          <Text style={styles.infoText}>{orderData.payment.method}</Text>
        </View>
      </View>

      <View style={styles.priceBreakdown}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Subtotal</Text>
          <Text style={styles.priceValue}>${orderData.payment.subtotal.toFixed(2)}</Text>
        </View>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Shipping</Text>
          <Text style={styles.priceValue}>
            {orderData.shipping.cost === 0 ? 'Free' : `$${orderData.shipping.cost.toFixed(2)}`}
          </Text>
        </View>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Tax</Text>
          <Text style={styles.priceValue}>${orderData.payment.tax.toFixed(2)}</Text>
        </View>
        
        {orderData.payment.discount > 0 && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Discount</Text>
            <Text style={[styles.priceValue, styles.discountValue]}>
              -${orderData.payment.discount.toFixed(2)}
            </Text>
          </View>
        )}
        
        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${orderData.payment.total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  const ActionButtons = () => (
    <View style={styles.actionButtons}>
      {orderData.status === 'delivered' && (
        <PrimaryButton
          title="Reorder Items"
          onPress={handleReorder}
          style={styles.actionButton}
        />
      )}
      
      {orderData.status === 'shipped' && (
        <PrimaryButton
          title="Track Order"
          onPress={handleTrackOrder}
          style={styles.actionButton}
        />
      )}
      
      {orderData.status === 'confirmed' && (
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => {
            Alert.alert(
              'Cancel Order',
              'Are you sure you want to cancel this order?',
              [
                { text: 'No', style: 'cancel' },
                { 
                  text: 'Yes, Cancel', 
                  style: 'destructive',
                  onPress: () => console.log('Order cancelled')
                }
              ]
            );
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel Order</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity 
        style={styles.supportButton}
        onPress={handleContactSupport}
      >
        <Icon name="headphones" size={16} color={COLORS.primary} />
        <Text style={styles.supportText}>Need Help?</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Order ID */}
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderIdLabel}>Order ID</Text>
            <Text style={styles.orderId}>{orderData.id}</Text>
          </View>

          {/* Order Status */}
          <OrderStatus />

          {/* Order Items */}
          <OrderItems />

          {/* Shipping Information */}
          <ShippingInfo />

          {/* Payment Information */}
          <PaymentInfo />

          {/* Action Buttons */}
          <ActionButtons />
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
  content: {
    padding: SIZES.medium
  },
  orderIdContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    alignItems: 'center'
  },
  orderIdLabel: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    marginBottom: 4
  },
  orderId: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  statusSection: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    padding: SIZES.medium,
    marginBottom: SIZES.medium
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.medium
  },
  statusInfo: {
    marginLeft: SIZES.medium,
    flex: 1
  },
  statusTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    marginBottom: 2
  },
  statusDate: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  trackingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.primaryLight,
    borderRadius: SIZES.radius.medium
  },
  trackingText: {
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    flex: 1
  },
  trackingNumber: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    padding: SIZES.medium,
    marginBottom: SIZES.medium
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  sectionTitle: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    textTransform: 'uppercase'
  },
  seeAllText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: SIZES.medium,
    paddingBottom: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  itemImage: {
    width: 80,
    height: 80,
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
  itemVariations: {
    flexDirection: 'row',
    marginBottom: 4
  },
  itemVariation: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    marginRight: SIZES.small
  },
  itemPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemQuantity: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  itemPrice: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  itemActions: {
    flexDirection: 'row',
    marginTop: SIZES.small
  },
  itemActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.medium
  },
  itemActionText: {
    marginLeft: 4,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  },
  returnText: {
    color: COLORS.error
  },
  moreItemsButton: {
    alignItems: 'center',
    paddingVertical: SIZES.small
  },
  moreItemsText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SIZES.medium
  },
  infoContent: {
    flex: 1,
    marginLeft: SIZES.medium
  },
  infoLabel: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    marginBottom: 2
  },
  infoText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    lineHeight: 20
  },
  priceBreakdown: {
    marginTop: SIZES.small
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.small
  },
  priceLabel: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  priceValue: {
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
  actionButtons: {
    marginTop: SIZES.small,
    marginBottom: SIZES.xxlarge
  },
  actionButton: {
    marginBottom: SIZES.medium
  },
  cancelButton: {
    backgroundColor: COLORS.errorLight,
    paddingVertical: SIZES.medium,
    borderRadius: SIZES.radius.large,
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  cancelButtonText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.medium
  },
  supportText: {
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  }
});