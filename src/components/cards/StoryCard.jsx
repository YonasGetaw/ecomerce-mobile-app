import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function StoryCard({ story, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: story.image }} style={styles.image} />
        {story.isViewed && <View style={styles.viewedOverlay} />}
      </View>
      <Text style={styles.title}>{story.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: SIZES.medium
  },
  imageContainer: {
    position: 'relative',
    marginBottom: SIZES.small
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.primary
  },
  viewedOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 35,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  title: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  }
});