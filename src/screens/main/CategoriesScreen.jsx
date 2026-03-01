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
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { CATEGORIES, PRODUCTS } from '../../data/MockData';

export default function CategoriesScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [expandedCategory, setExpandedCategory] = useState(null);

  const tabs = ['All', 'Female', 'Male'];

  const femaleSubcategories = {
    Clothing: ['Dresses', 'Pants', 'Shirts', 'Jackets', 'Hoodies', 'T-shirts', 'Polo', 'Tunics'],
    Shoes: ['Heels', 'Flats', 'Boots', 'Sandals'],
    Accessories: ['Bags', 'Jewelry', 'Watches', 'Scarves']
  };

  const maleSubcategories = {
    Clothing: ['Shirts', 'Pants', 'Jackets', 'Hoodies', 'T-shirts', 'Polo'],
    Shoes: ['Sneakers', 'Formal', 'Boots', 'Sandals'],
    Accessories: ['Watches', 'Belts', 'Bags', 'Hats']
  };

  const allCategories = [
    { id: '1', name: 'Shoes', icon: 'trending-up', count: 245 },
    { id: '2', name: 'Bags', icon: 'briefcase', count: 189 },
    { id: '3', name: 'Lingerie', icon: 'heart', count: 156 },
    { id: '4', name: 'Accessories', icon: 'watch', count: 98 },
    { id: '5', name: 'Just for You', icon: 'star', count: 134 }
  ];

  const handleCategoryPress = (category) => {
    if (selectedGender !== 'All') {
      setExpandedCategory(expandedCategory === category ? null : category);
    } else {
      // Navigate to category products
      navigation.navigate('ProductSearch', { category });
    }
  };

  const renderSubcategories = (category, subcategories) => {
    if (expandedCategory !== category) return null;

    return (
      <View style={styles.subcategoryContainer}>
        {subcategories.map((subcat, index) => (
          <TouchableOpacity
            key={index}
            style={styles.subcategoryItem}
            onPress={() => navigation.navigate('ProductSearch', { category: subcat })}
          >
            <Text style={styles.subcategoryText}>{subcat}</Text>
            <Icon name="chevron-right" size={16} color={COLORS.text.secondary} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderGenderContent = () => {
    if (selectedGender === 'Female') {
      return (
        <>
          {Object.entries(femaleSubcategories).map(([category, items]) => (
            <View key={category}>
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.categoryName}>{category}</Text>
                <Icon 
                  name={expandedCategory === category ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={COLORS.text.secondary} 
                />
              </TouchableOpacity>
              {renderSubcategories(category, items)}
            </View>
          ))}
        </>
      );
    }

    if (selectedGender === 'Male') {
      return (
        <>
          {Object.entries(maleSubcategories).map(([category, items]) => (
            <View key={category}>
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.categoryName}>{category}</Text>
                <Icon 
                  name={expandedCategory === category ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={COLORS.text.secondary} 
                />
              </TouchableOpacity>
              {renderSubcategories(category, items)}
            </View>
          ))}
        </>
      );
    }

    // All Categories
    return (
      <>
        {allCategories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.categoryItem}
            onPress={() => navigation.navigate('ProductSearch', { category: item.name })}
          >
            <View style={styles.categoryIcon}>
              <Icon name={item.icon} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.categoryCount}>{item.count} items</Text>
            </View>
            <Icon name="chevron-right" size={20} color={COLORS.text.secondary} />
          </TouchableOpacity>
        ))}

        {/* Just for You Products */}
        <View style={styles.justForYouSection}>
          <Text style={styles.sectionTitle}>Just for You</Text>
          <FlatList
            data={PRODUCTS.slice(0, 4)}
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
      </>
    );
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
              selectedTab === tab && styles.selectedTab
            ]}
            onPress={() => {
              setSelectedTab(tab);
              setSelectedGender(tab);
              setExpandedCategory(null);
            }}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.selectedTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {renderGenderContent()}
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
  selectedTab: {
    backgroundColor: COLORS.primary
  },
  tabText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  selectedTabText: {
    color: COLORS.white
  },
  content: {
    padding: SIZES.medium
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.medium
  },
  categoryInfo: {
    flex: 1
  },
  categoryName: {
    flex: 1,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  categoryCount: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    marginTop: 2
  },
  subcategoryContainer: {
    marginLeft: SIZES.xxlarge,
    marginBottom: SIZES.small
  },
  subcategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.small,
    paddingLeft: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  subcategoryText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  justForYouSection: {
    marginTop: SIZES.xlarge
  },
  sectionTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium
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
    marginBottom: 4
  },
  productPrice: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  }
});