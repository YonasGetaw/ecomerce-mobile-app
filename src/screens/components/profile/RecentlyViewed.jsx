import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function RecentlyViewed({ items, onItemPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Viewed</Text>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onItemPress(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.xlarge,
    paddingHorizontal: SIZES.medium
  },
  title: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SIZES.small
  }
});