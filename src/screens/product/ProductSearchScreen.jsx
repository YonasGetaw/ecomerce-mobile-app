import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { PRODUCTS } from '../../data/MockData';

export default function ProductSearchScreen({ navigation, route }) {
  const { query: initialQuery, category } = route.params || {};
  const [searchQuery, setSearchQuery] = useState(initialQuery || category || '');
  const [searchHistory, setSearchHistory] = useState([
    'Summer dress',
    'White sneakers',
    'Leather jacket',
    'Denim jeans'
  ]);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (initialQuery || category) {
      performSearch();
    }
  }, []);

  const performSearch = () => {
    if (searchQuery.trim()) {
      // Add to history
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory(prev => [searchQuery, ...prev.slice(0, 4)]);
      }

      // Filter products (mock search)
      const results = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const removeHistoryItem = (item) => {
    setSearchHistory(prev => prev.filter(i => i !== item));
  };

  const recommendations = [
    'Skirt',
    'Accessories',
    'Black T-Shirt',
    'Jeans',
    'White Shoes'
  ];

  const renderSearchHistory = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        {searchHistory.length > 0 && (
          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      {searchHistory.map((item, index) => (
        <View key={index} style={styles.historyItem}>
          <TouchableOpacity
            style={styles.historyContent}
            onPress={() => {
              setSearchQuery(item);
              performSearch();
            }}
          >
            <Icon name="clock" size={16} color={COLORS.text.hint} />
            <Text style={styles.historyText}>{item}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeHistoryItem(item)}>
            <Icon name="x" size={16} color={COLORS.text.hint} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderRecommendations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recommendations</Text>
      <View style={styles.recommendationsGrid}>
        {recommendations.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendationChip}
            onPress={() => {
              setSearchQuery(item);
              performSearch();
            }}
          >
            <Text style={styles.recommendationText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderDiscover = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Discover</Text>
      <FlatList
        data={PRODUCTS.slice(0, 4)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.discoverItem}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.discoverImage} />
            <Text style={styles.discoverName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.discoverPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderSearchResults = () => (
    <FlatList
      data={searchResults}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.resultsCount}>
          {searchResults.length} results found
        </Text>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.resultItem}
          onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
          <Image source={{ uri: item.image }} style={styles.resultImage} />
          <Text style={styles.resultName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.resultPrice}>${item.price}</Text>
          {item.discount > 0 && (
            <View style={styles.resultDiscount}>
              <Text style={styles.discountText}>-{item.discount}%</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={styles.noResults}>
          <Icon name="search" size={50} color={COLORS.text.hint} />
          <Text style={styles.noResultsTitle}>No results found</Text>
          <Text style={styles.noResultsText}>
            Try checking your spelling or using different keywords
          </Text>
        </View>
      }
      contentContainerStyle={styles.resultsGrid}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Search Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={COLORS.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={performSearch}
            returnKeyType="search"
            autoFocus
            placeholderTextColor={COLORS.text.hint}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="x" size={20} color={COLORS.text.secondary} />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Icon name="sliders" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {showResults ? (
        renderSearchResults()
      ) : (
        <FlatList
          data={[1]}
          renderItem={() => (
            <>
              {renderSearchHistory()}
              {renderRecommendations()}
              {renderDiscover()}
            </>
          )}
          keyExtractor={() => 'content'}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.large,
    paddingHorizontal: SIZES.medium,
    marginHorizontal: SIZES.medium,
    height: 44
  },
  searchInput: {
    flex: 1,
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    padding: 0
  },
  section: {
    padding: SIZES.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  sectionTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  clearText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.small
  },
  historyContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  historyText: {
    marginLeft: SIZES.medium,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  recommendationChip: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.radius.large,
    marginRight: SIZES.small,
    marginBottom: SIZES.small
  },
  recommendationText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  discoverItem: {
    width: 140,
    marginRight: SIZES.medium
  },
  discoverImage: {
    width: '100%',
    height: 140,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.small
  },
  discoverName: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginBottom: 2
  },
  discoverPrice: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  resultsCount: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.medium
  },
  resultsGrid: {
    padding: SIZES.small
  },
  resultItem: {
    flex: 1,
    margin: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    padding: SIZES.small,
    position: 'relative'
  },
  resultImage: {
    width: '100%',
    height: 150,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.small
  },
  resultName: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginBottom: 2
  },
  resultPrice: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  resultDiscount: {
    position: 'absolute',
    top: SIZES.medium,
    right: SIZES.medium,
    backgroundColor: COLORS.error,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small
  },
  discountText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xxlarge * 2
  },
  noResultsTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginTop: SIZES.medium,
    marginBottom: SIZES.small
  },
  noResultsText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
    paddingHorizontal: SIZES.xxlarge
  }
});