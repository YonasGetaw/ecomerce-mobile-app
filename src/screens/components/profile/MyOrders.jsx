import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function MyOrders({ orders, filters, activeFilter, onFilterChange, onOrderPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Order</Text>
      </View>

      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, activeFilter === filter && styles.activeFilter]}
            onPress={() => onFilterChange(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.ordersGrid}>
        {orders.map((order, index) => (
          <TouchableOpacity
            key={index}
            style={styles.orderItem}
            onPress={() => onOrderPress(order)}
          >
            <View style={styles.orderCircle}>
              <Text style={styles.orderCount}>{order.count}</Text>
            </View>
            <Text style={styles.orderLabel}>
              {order.status === 'pending' ? 'To Pay' : 
               order.status === 'shipped' ? 'To Receive' : 'To Review'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.xlarge,
    paddingHorizontal: SIZES.medium
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  title: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.large
  },
  filterButton: {
    flex: 1,
    paddingVertical: SIZES.small,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border
  },
  activeFilter: {
    borderBottomColor: COLORS.primary
  },
  filterText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  activeFilterText: {
    color: COLORS.primary
  },
  ordersGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  orderItem: {
    alignItems: 'center'
  },
  orderCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.small
  },
  orderCount: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  orderLabel: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  }
});