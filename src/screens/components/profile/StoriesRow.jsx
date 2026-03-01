import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import StoryCard from '../../../components/cards/StoryCard';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function StoriesRow({ stories, onStoryPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stories</Text>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StoryCard story={item} onPress={() => onStoryPress(item)} />
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
  }
});