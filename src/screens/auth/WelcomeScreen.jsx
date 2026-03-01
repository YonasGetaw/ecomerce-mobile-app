import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { COLORS, FONTS, SIZES } from '../../utils/colors';
import { constants } from '../../utils/constants';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <View style={styles.content}>
        {/* Shop Icon */}
        <View style={styles.iconContainer}>
          <Icon name="shopping-bag" size={60} color={COLORS.primary} />
        </View>

        {/* App Name */}
        <Text style={styles.appName}>{constants.appName}</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>{constants.tagline}</Text>

        {/* Get Started Button */}
        <PrimaryButton
          title="Let's get started"
          onPress={() => navigation.navigate('CreateAccount')}
          style={styles.getStartedButton}
        />

        {/* Already have account link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>I already have an account</Text>
          <View style={styles.arrowIcon}>
            <Icon 
              name="arrow-right" 
              size={16} 
              color={COLORS.white} 
              onPress={() => navigation.navigate('Login')}
            />
          </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.xlarge
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.xxlarge
  },
  appName: {
    fontSize: FONTS.sizes.huge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.small,
    letterSpacing: 1
  },
  tagline: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SIZES.xxlarge * 2,
    lineHeight: 24
  },
  getStartedButton: {
    width: '100%',
    marginBottom: SIZES.large
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  loginText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginRight: SIZES.small
  },
  arrowIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});