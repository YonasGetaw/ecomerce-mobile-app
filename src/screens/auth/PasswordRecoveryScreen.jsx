import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function PasswordRecoveryScreen({ navigation }) {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const recoveryMethods = [
    { id: 'sms', title: 'SMS', icon: 'message-circle', description: 'Get code via SMS' },
    { id: 'email', title: 'Email', icon: 'mail', description: 'Get code via Email' }
  ];

  const handleNext = () => {
    if (selectedMethod === 'sms') {
      navigation.navigate('CodeVerification', { method: 'sms' });
    } else if (selectedMethod === 'email') {
      navigation.navigate('CodeVerification', { method: 'email' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>

        {/* Avatar Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
        </View>

        {/* Header */}
        <Text style={styles.header}>Password Recovery</Text>

        {/* Description */}
        <Text style={styles.description}>
          How you would like to restore your password?
        </Text>

        {/* Recovery Methods */}
        <View style={styles.methodsContainer}>
          {recoveryMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.selectedMethod
              ]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.8}
            >
              <View style={styles.methodIconContainer}>
                <Icon 
                  name={method.icon} 
                  size={24} 
                  color={selectedMethod === method.id ? COLORS.primary : COLORS.text.secondary} 
                />
              </View>
              <View style={styles.methodInfo}>
                <Text style={[
                  styles.methodTitle,
                  selectedMethod === method.id && styles.selectedText
                ]}>
                  {method.title}
                </Text>
                <Text style={styles.methodDescription}>
                  {method.description}
                </Text>
              </View>
              {selectedMethod === method.id && (
                <View style={styles.checkmark}>
                  <Icon name="check-circle" size={24} color={COLORS.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Next"
            onPress={handleNext}
            disabled={!selectedMethod}
            style={styles.nextButton}
          />
          <SecondaryButton
            title="Cancel"
            onPress={() => navigation.goBack()}
          />
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
    padding: SIZES.xlarge
  },
  backButton: {
    marginBottom: SIZES.large
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: SIZES.xxlarge
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.primary
  },
  header: {
    fontSize: FONTS.sizes.xxxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SIZES.small
  },
  description: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SIZES.xxlarge
  },
  methodsContainer: {
    marginBottom: SIZES.xxlarge
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius.large,
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.white
  },
  selectedMethod: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2
  },
  methodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.medium
  },
  methodInfo: {
    flex: 1
  },
  methodTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: 4
  },
  methodDescription: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  selectedText: {
    color: COLORS.primary
  },
  checkmark: {
    marginLeft: SIZES.medium
  },
  buttonContainer: {
    marginTop: 'auto'
  },
  nextButton: {
    marginBottom: SIZES.medium
  }
});