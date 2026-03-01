import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../utils/colors';
import { categories } from '../../data/categoriesData';
import { products } from '../../data/productsData';

export default function AllCategoriesScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('All');
  const [expandedCategory, setExpandedCategory] = useState(null);

  const tabs = ['All', 'Female', 'Male'];

  const femaleCategories = categories.filter(c => 
    ['Women', 'Accessories'].includes(c.name)
  );

  const maleCategories = categories.filter(c => 
    ['Men', 'Accessories'].includes(c.name)
  );

  const allCategories = categories;

  const handleCategoryPress = (category) => {
    if (selectedTab !== 'All') {
      // Toggle expansion for gender-specific categories
      setExpandedCategory(expandedCategory === category.id ? null : category.id);
    } else {
      // Navigate to subcategory screen for main categories
      navigation.navigate('SubCategory', { category });
    }
  };

  const handleSubCategoryPress = (category, subcategory) => {
    navigation.navigate('ProductSearch', { 
      category: subcategory.name,
      filters: { 
        mainCategory: category.name,
        subCategory: subcategory.name 
      }
    });
  };

  const renderCategoryItem = ({ item }) => {
    const isExpanded = expandedCategory === item.id;

    return (
      <View key={item.id} style={styles.categoryWrapper}>
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => handleCategoryPress(item)}
          activeOpacity={0.7}
        >
          <Image source={{ uri: item.image }} style={styles.categoryImage} />
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryCount}>{item.count} items</Text>
          </View>
          <Icon 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color={COLORS.text.secondary} 
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.subcategoryContainer}>
            {item.subcategories.map((sub) => (
              <TouchableOpacity
                key={sub.id}
                style={styles.subcategoryItem}
                onPress={() => handleSubCategoryPress(item, sub)}
              >
                <Text style={styles.subcategoryName}>{sub.name}</Text>
                <Text style={styles.subcategoryCount}>{sub.count}</Text>
                <Icon name="chevron-right" size={16} color={COLORS.text.hint} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderJustForYou = () => (
    <View style={styles.justForYouSection}>
      <View style={styles.sectionHeader}>
        <Icon name="star" size={20} color={COLORS.primary} />
        <Text style={styles.sectionTitle}>Just for You</Text>
      </View>
      <FlatList
        data={products.slice(0, 4)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const getCategoriesForTab = () => {
    switch(selectedTab) {
      case 'Female':
        return femaleCategories;
      case 'Male':
        return maleCategories;
      default:
        return allCategories;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Categories</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Gender Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab
            ]}
            onPress={() => {
              setSelectedTab(tab);
              setExpandedCategory(null);
            }}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Categories List */}
          <FlatList
            data={getCategoriesForTab()}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />

          {/* Just for You Section */}
          {renderJustForYou()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  headerTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  tabContainer: {
    flexDirection: 'row',
    padding: SIZES.small,
    backgroundColor: COLORS.background,
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.medium,
    borderRadius: SIZES.radius.large
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.small,
    alignItems: 'center',
    borderRadius: SIZES.radius.medium
  },
  activeTab: {
    backgroundColor: COLORS.primary
  },
  tabText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  activeTabText: {
    color: COLORS.white
  },
  content: {
    padding: SIZES.medium
  },
  listContainer: {
    paddingBottom: SIZES.medium
  },
  categoryWrapper: {
    marginBottom: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden'
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SIZES.medium
  },
  categoryInfo: {
    flex: 1
  },
  categoryName: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: 2
  },
  categoryCount: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  subcategoryContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.medium
  },
  subcategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  subcategoryName: {
    flex: 1,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary
  },
  subcategoryCount: {
    marginRight: SIZES.medium,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  justForYouSection: {
    marginTop: SIZES.large,
    paddingTop: SIZES.large,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  sectionTitle: {
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  productCard: {
    width: 140,
    marginRight: SIZES.medium
  },
  productImage: {
    width: '100%',
    height: 140,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.small
  },
  productName: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginBottom: 2
  },
  productPrice: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  }
});