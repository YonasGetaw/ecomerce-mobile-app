import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ProductCard from '../../components/cards/ProductCard';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function JustForYouRow({ items, onItemPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Icon name="star" size={20} color={COLORS.primary} />
          <Text style={styles.title}>Just for You</Text>
        </View>
      </View>
      
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <ProductCard product={item} onPress={() => onItemPress(item)} />
          </View>
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
    paddingHorizontal: SIZES.medium,
    marginBottom: SIZES.medium
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  itemContainer: {
    flex: 1,
    maxWidth: '50%',
    paddingHorizontal: SIZES.small
  }
});