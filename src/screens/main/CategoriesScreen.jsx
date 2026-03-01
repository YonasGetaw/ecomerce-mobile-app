import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';

const TABS = ['All', 'Female', 'Male'];

const CATEGORY_IMAGES = {
  Clothing: 'https://loremflickr.com/120/120/fashion,dress?lock=901',
  Shoes: 'https://loremflickr.com/120/120/shoes,sneakers?lock=902',
  Bags: 'https://loremflickr.com/120/120/bag,handbag?lock=903',
  Lingerie: 'https://loremflickr.com/120/120/lingerie,women?lock=904',
  Accessories: 'https://loremflickr.com/120/120/accessories,fashion?lock=905',
  'Just for You': 'https://loremflickr.com/120/120/model,woman?lock=906'
};

const FEMALE_SUBCATEGORIES = ['Dresses', 'Pants', 'Skirts', 'Shorts', 'Jackets', 'Hoodies', 'Shirts', 'Polo', 'T-Shirts', 'Tunics'];
const MALE_SUBCATEGORIES = ['Shirts', 'Pants', 'Polos', 'Shorts', 'Jackets', 'Hoodies', 'Jeans', 'Tracks', 'T-Shirts', 'Suits'];
const ALL_SUBCATEGORIES = ['Dresses', 'Pants', 'Skirts', 'Shorts', 'Jackets', 'Hoodies', 'Shirts', 'Polo', 'T-Shirts', 'Tunics'];

export default function CategoriesScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Female');
  const [expandedCategory, setExpandedCategory] = useState('Clothing');

  const clothingItems = useMemo(() => {
    if (selectedTab === 'Male') return MALE_SUBCATEGORIES;
    if (selectedTab === 'All') return ALL_SUBCATEGORIES;
    return FEMALE_SUBCATEGORIES;
  }, [selectedTab]);

  const categories = useMemo(
    () => [
      { id: '1', name: 'Clothing', expandable: true },
      { id: '2', name: 'Shoes', expandable: true },
      { id: '3', name: 'Bags', expandable: true },
      { id: '4', name: 'Lingerie', expandable: true },
      { id: '5', name: 'Accessories', expandable: true },
      { id: '6', name: 'Just for You', expandable: false }
    ],
    []
  );

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    setExpandedCategory('Clothing');
  };

  const handleCategoryPress = (categoryName) => {
    if (categoryName === 'Just for You') {
      navigation.navigate('ProductSearch', { query: 'Recommended' });
      return;
    }

    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const renderClothingGrid = () => {
    if (expandedCategory !== 'Clothing') return null;

    return (
      <View style={styles.subcategoryGrid}>
        {clothingItems.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.subcategoryChip}
            onPress={() => navigation.navigate('ProductSearch', { category: item })}
            activeOpacity={0.85}
          >
            <Text style={styles.subcategoryChipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderCategoryRow = (item) => {
    const isExpanded = expandedCategory === item.name;
    const isJustForYou = item.name === 'Just for You';

    return (
      <View key={item.id} style={styles.categoryBlock}>
        <TouchableOpacity
          style={styles.categoryRow}
          onPress={() => handleCategoryPress(item.name)}
          activeOpacity={0.9}
        >
          <Image source={{ uri: CATEGORY_IMAGES[item.name] }} style={styles.categoryThumb} />
          <View style={styles.categoryTextWrap}>
            <Text style={styles.categoryTitle}>{item.name}</Text>
            {isJustForYou && <Icon name="star" size={12} color={COLORS.primary} style={styles.justForYouStar} />}
          </View>

          {isJustForYou ? (
            <View style={styles.justForYouArrowWrap}>
              <Icon name="arrow-right" size={16} color={COLORS.white} />
            </View>
          ) : (
            <Icon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.text.primary}
            />
          )}
        </TouchableOpacity>

        {item.name === 'Clothing' && renderClothingGrid()}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.screenLabelWrap}>
        <Text style={styles.screenLabel}>27 Categories Filter</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Categories</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBarWrap}>
        {TABS.map((tab) => {
          const isActive = selectedTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => handleTabPress(tab)}
              activeOpacity={0.9}
            >
              <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map(renderCategoryRow)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  screenLabelWrap: {
    paddingHorizontal: SIZES.medium,
    paddingTop: SIZES.small
  },
  screenLabel: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.medium,
    paddingTop: SIZES.medium,
    paddingBottom: SIZES.small
  },
  headerTitle: {
    fontSize: 40,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  tabBarWrap: {
    marginHorizontal: SIZES.medium,
    marginTop: SIZES.small,
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.medium,
    padding: 4,
    flexDirection: 'row'
  },
  tabButton: {
    flex: 1,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius.medium
  },
  activeTabButton: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  tabButtonText: {
    color: COLORS.text.primary,
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium
  },
  activeTabButtonText: {
    color: COLORS.primary
  },
  scrollContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.xlarge
  },
  categoryBlock: {
    marginBottom: SIZES.small
  },
  categoryRow: {
    height: 66,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.small
  },
  categoryThumb: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radius.small,
    marginRight: SIZES.small
  },
  categoryTextWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryTitle: {
    fontSize: FONTS.sizes.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  justForYouStar: {
    marginLeft: 6
  },
  subcategoryGrid: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  subcategoryChip: {
    width: '48.6%',
    height: 54,
    borderRadius: SIZES.radius.medium,
    borderWidth: 1,
    borderColor: COLORS.errorLight,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.small
  },
  subcategoryChipText: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  justForYouArrowWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
