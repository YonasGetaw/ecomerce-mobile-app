import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function FlashSaleRow({ items, timer, onSeeAll, onItemPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Flash Sale</Text>
        <View style={styles.timerContainer}>
          <Icon name="clock" size={16} color={COLORS.error} />
          <Text style={styles.timer}>{timer}</Text>
        </View>
      </View>
      
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            {item.isLive && (
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{item.discount}%</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.xlarge
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.medium,
    marginBottom: SIZES.medium
  },
  title: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.medium
  },
  timer: {
    marginLeft: 4,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold,
    color: COLORS.error
  },
  item: {
    marginRight: SIZES.medium,
    position: 'relative'
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: SIZES.radius.large
  },
  liveBadge: {
    position: 'absolute',
    top: SIZES.small,
    left: SIZES.small,
    backgroundColor: COLORS.error,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small
  },
  liveText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold
  },
  discountBadge: {
    position: 'absolute',
    top: SIZES.small,
    right: SIZES.small,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small
  },
  discountText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold
  }
});