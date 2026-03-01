import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function OrderCard({ order, onPress, onTrack }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return COLORS.warning;
      case 'shipped': return COLORS.primary;
      case 'delivered': return COLORS.success;
      case 'cancelled': return COLORS.error;
      default: return COLORS.text.secondary;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.date}>{order.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.items}>
        {order.items.slice(0, 2).map((item, index) => (
          <Image key={index} source={{ uri: item.image }} style={styles.itemImage} />
        ))}
        {order.items.length > 2 && (
          <View style={styles.moreItems}>
            <Text style={styles.moreText}>+{order.items.length - 2}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>${order.total}</Text>
        </View>
        
        {order.status === 'shipped' && (
          <TouchableOpacity style={styles.trackButton} onPress={onTrack}>
            <Text style={styles.trackText}>Track Order</Text>
          </TouchableOpacity>
        )}
        
        {order.status === 'delivered' && (
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewText}>Write Review</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    shadowColor: COLORS.card.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  orderId: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  date: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    marginTop: 2
  },
  statusBadge: {
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small
  },
  statusText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    textTransform: 'capitalize'
  },
  items: {
    flexDirection: 'row',
    marginBottom: SIZES.medium
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radius.small,
    marginRight: SIZES.small
  },
  moreItems: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radius.small,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.secondary
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.medium
  },
  totalLabel: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  totalValue: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  trackButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.radius.medium
  },
  trackText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium
  },
  reviewButton: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.radius.medium
  },
  reviewText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium
  }
});