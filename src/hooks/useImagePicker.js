import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const useImagePicker = (options = {}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    base64: false,
    ...options
  };

  const requestPermission = async (type) => {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera permission is needed to take photos.'
        );
        return false;
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Gallery permission is needed to select photos.'
        );
        return false;
      }
    }
    return true;
  };

  const pickFromCamera = async () => {
    const hasPermission = await requestPermission('camera');
    if (!hasPermission) return null;

    setLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync(defaultOptions);
      if (!result.canceled) {
        setImage(result.assets[0]);
        return result.assets[0];
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    } finally {
      setLoading(false);
    }
    return null;
  };

  const pickFromGallery = async () => {
    const hasPermission = await requestPermission('gallery');
    if (!hasPermission) return null;

    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync(defaultOptions);
      if (!result.canceled) {
        setImage(result.assets[0]);
        return result.assets[0];
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
    } finally {
      setLoading(false);
    }
    return null;
  };

  const clearImage = () => {
    setImage(null);
  };

  return {
    image,
    loading,
    pickFromCamera,
    pickFromGallery,
    clearImage
  };
};