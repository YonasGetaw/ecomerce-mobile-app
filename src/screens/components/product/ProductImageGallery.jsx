import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../utils/colors';

const { width } = Dimensions.get('window');

export default function ProductImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.mainImage} />
        )}
      />
      
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.thumbnailContainer}>
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setActiveIndex(index)}>
              <Image
                source={{ uri: item }}
                style={[
                  styles.thumbnail,
                  index === activeIndex && styles.activeThumbnail
                ]}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white
  },
  mainImage: {
    width,
    height: 400,
    resizeMode: 'cover'
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.overlay
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 20
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: SIZES.medium
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: SIZES.radius.small,
    marginRight: SIZES.small,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  activeThumbnail: {
    borderColor: COLORS.primary
  }
});