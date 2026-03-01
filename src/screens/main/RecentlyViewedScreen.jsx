import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { PRODUCTS } from '../../data/MockData';

export default function RecentlyViewedScreen({ navigation, route }) {
  const [selectedDay, setSelectedDay] = useState('Today');
  const items = route?.params?.items || [];

  const viewedItems = useMemo(() => {
    const fallback = [...PRODUCTS, ...PRODUCTS].slice(0, 8);
    if (!items || items.length === 0) return fallback;
    return [...items, ...items].slice(0, 8);
  }, [items]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={2} style={styles.desc}>{item.description || 'Lorem ipsum dolor sit amet consectetur'}</Text>
      <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.headerRow}>
        <Text style={styles.title}>Recently viewed</Text>
      </View>

      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[styles.dayChip, selectedDay === 'Today' && styles.dayChipActive]}
          onPress={() => setSelectedDay('Today')}
        >
          <Text style={[styles.dayChipText, selectedDay === 'Today' && styles.dayChipTextActive]}>Today</Text>
          <View style={styles.dayCheck}>
            <Icon name="check" size={12} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dayChip, selectedDay === 'Yesterday' && styles.dayChipActive]}
          onPress={() => setSelectedDay('Yesterday')}
        >
          <Text style={[styles.dayChipText, selectedDay === 'Yesterday' && styles.dayChipTextActive]}>Yesterday</Text>
          <View style={styles.dayCheck}>
            <Icon name="chevron-down" size={12} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={viewedItems}
        renderItem={renderProduct}
        keyExtractor={(item, index) => `viewed-${item.id}-${index}`}
        numColumns={2}
        columnWrapperStyle={styles.columnWrap}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  headerRow: {
    paddingHorizontal: SIZES.medium,
    paddingTop: SIZES.medium,
    paddingBottom: SIZES.small
  },
  title: {
    fontSize: 42,
    lineHeight: 46,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.medium,
    marginBottom: SIZES.medium,
    justifyContent: 'space-between'
  },
  dayChip: {
    width: '48.5%',
    height: 44,
    backgroundColor: '#E9EDF7',
    borderRadius: SIZES.radius.round,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.medium
  },
  dayChipActive: {
    backgroundColor: '#DCE6FF'
  },
  dayChipText: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  dayChipTextActive: {
    color: COLORS.primary
  },
  dayCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.large
  },
  columnWrap: {
    justifyContent: 'space-between'
  },
  card: {
    width: '48.5%',
    marginBottom: SIZES.medium
  },
  image: {
    width: '100%',
    height: 190,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.small
  },
  desc: {
    fontSize: FONTS.sizes.medium,
    lineHeight: 19,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginBottom: 4
  },
  price: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  }
});
