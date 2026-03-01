import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Hello!',
    description: 'Welcome to Shoppe - your ultimate shopping destination'
  },
  {
    id: '2',
    title: 'Ready?',
    description: 'Discover amazing products with exclusive deals and offers'
  }
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('CreateAccount');
    }
  };

  const renderDotIndicator = () => {
    return (
      <View style={styles.dotContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        />

        {renderDotIndicator()}

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={currentIndex === onboardingData.length - 1 ? "Let's start" : "Next"}
            onPress={handleNext}
            style={styles.button}
          />
          
          {currentIndex < onboardingData.length - 1 && (
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={() => navigation.replace('MainApp')}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.xlarge
  },
  card: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: SIZES.radius.xlarge,
    padding: SIZES.xxlarge,
    alignItems: 'center',
    width: '100%',
    shadowColor: COLORS.card.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  cardTitle: {
    fontSize: FONTS.sizes.huge,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.medium
  },
  cardDescription: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SIZES.xxlarge
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.border,
    marginHorizontal: 5
  },
  activeDot: {
    width: 30,
    backgroundColor: COLORS.primary
  },
  buttonContainer: {
    paddingHorizontal: SIZES.xlarge,
    marginBottom: SIZES.xxlarge
  },
  button: {
    marginBottom: SIZES.medium
  },
  skipButton: {
    alignItems: 'center'
  },
  skipText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  }
});