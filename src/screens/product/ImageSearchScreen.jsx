import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { PRODUCTS } from '../../data/MockData';

export default function ImageSearchScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri);
        performImageSearch(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant gallery permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
      performImageSearch(result.assets[0].uri);
    }
  };

  const performImageSearch = (imageUri) => {
    setIsSearching(true);
    
    // Simulate image search API call
    setTimeout(() => {
      // Mock results - in real app, this would be an API call
      const mockResults = PRODUCTS.slice(0, 4);
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setSearchResults([]);
  };

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        ratio="16:9"
      >
        <View style={styles.cameraOverlay}>
          <View style={styles.cameraHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="x" size={24} color={COLORS.white} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.flipButton}
              onPress={() => setCameraType(
                cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )}
            >
              <Icon name="refresh-cw" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.cameraFooter}>
            <TouchableOpacity 
              style={styles.galleryButton}
              onPress={pickImage}
            >
              <Icon name="image" size={24} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>

            <View style={{ width: 44 }} />
          </View>
        </View>
      </Camera>
    </View>
  );

  const renderResults = () => (
    <View style={styles.resultsContainer}>
      <View style={styles.resultsHeader}>
        <TouchableOpacity onPress={resetCamera}>
          <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.resultsTitle}>Search Results</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.previewSection}>
        <Text style={styles.previewLabel}>Your Image</Text>
        <Image source={{ uri: capturedImage }} style={styles.previewImage} />
      </View>

      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Searching for similar products...</Text>
        </View>
      ) : (
        <View style={styles.resultsSection}>
          <Text style={styles.resultsLabel}>Similar Products ({searchResults.length})</Text>
          <View style={styles.resultsGrid}>
            {searchResults.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.resultItem}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              >
                <Image source={{ uri: item.image }} style={styles.resultImage} />
                <Text style={styles.resultName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.resultPrice}>${item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No access to camera</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      {capturedImage ? renderResults() : renderCamera()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black
  },
  cameraContainer: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.large,
    paddingTop: SIZES.xxlarge
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: SIZES.xxlarge,
    paddingHorizontal: SIZES.large
  },
  galleryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center'
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.black
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  resultsTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  previewSection: {
    padding: SIZES.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  previewLabel: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium,
    textTransform: 'uppercase'
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius.large,
    resizeMode: 'cover'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xxlarge
  },
  loadingText: {
    marginTop: SIZES.large,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center'
  },
  resultsSection: {
    flex: 1,
    padding: SIZES.large
  },
  resultsLabel: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium,
    textTransform: 'uppercase'
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  resultItem: {
    width: '48%',
    marginBottom: SIZES.medium
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
  errorText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    textAlign: 'center',
    marginTop: SIZES.xxlarge
  },
  backButton: {
    marginTop: SIZES.large,
    alignSelf: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.medium
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium
  }
});