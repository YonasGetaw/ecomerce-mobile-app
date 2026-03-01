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
  const [showDatePanel, setShowDatePanel] = useState(false);
  const [selectedDate, setSelectedDate] = useState(18);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(3);
  const items = route?.params?.items || [];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthDates = Array.from({ length: 31 }, (_, index) => index + 1);

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

  const renderDatePanel = () => {
    if (!showDatePanel) return null;

    return (
      <View style={styles.datePanelWrap}>
        <View style={styles.datePanelHeader}>
          <TouchableOpacity
            style={styles.monthArrowButton}
            onPress={() => setSelectedMonthIndex((prev) => (prev === 0 ? 11 : prev - 1))}
          >
            <Icon name="chevron-left" size={16} color={COLORS.primary} />
          </TouchableOpacity>

          <View style={styles.monthNamePill}>
            <Text style={styles.monthNameText}>{months[selectedMonthIndex]}</Text>
          </View>

          <TouchableOpacity
            style={styles.monthArrowButton}
            onPress={() => setSelectedMonthIndex((prev) => (prev === 11 ? 0 : prev + 1))}
          >
            <Icon name="chevron-right" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.dateGrid}>
          {monthDates.map((date) => {
            const isSelected = date === selectedDate;

            return (
              <TouchableOpacity
                key={date}
                style={[styles.dateCell, isSelected && styles.dateCellActive]}
                onPress={() => {
                  setSelectedDate(date);
                  setSelectedDay('Yesterday');
                }}
              >
                <Text style={[styles.dateCellText, isSelected && styles.dateCellTextActive]}>{String(date).padStart(2, '0')}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.collapseButton}
          onPress={() => setShowDatePanel(false)}
        >
          <Icon name="chevron-up" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.headerRow}>
        <Text style={styles.title}>Recently viewed</Text>
      </View>

      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[styles.dayChip, selectedDay === 'Today' && styles.dayChipActive]}
          onPress={() => {
            setSelectedDay('Today');
            setShowDatePanel(false);
          }}
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
          <TouchableOpacity
            style={styles.dayCheck}
            onPress={() => {
              setSelectedDay('Yesterday');
              setShowDatePanel((prev) => !prev);
            }}
          >
            <Icon name={showDatePanel ? 'chevron-up' : 'chevron-down'} size={12} color={COLORS.white} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {renderDatePanel()}

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
  datePanelWrap: {
    marginHorizontal: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.xlarge,
    paddingTop: SIZES.small,
    paddingBottom: SIZES.medium,
    paddingHorizontal: SIZES.small,
    marginBottom: SIZES.medium,
    shadowColor: COLORS.card.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative'
  },
  datePanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.small
  },
  monthArrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  monthNamePill: {
    minWidth: 120,
    height: 30,
    borderRadius: SIZES.radius.round,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.medium
  },
  monthNameText: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  dateCell: {
    width: '13.4%',
    aspectRatio: 1,
    borderRadius: SIZES.radius.round,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
  },
  dateCellActive: {
    backgroundColor: COLORS.primaryLight
  },
  dateCellText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  dateCellTextActive: {
    color: COLORS.primary
  },
  collapseButton: {
    position: 'absolute',
    bottom: -14,
    alignSelf: 'center',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
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
