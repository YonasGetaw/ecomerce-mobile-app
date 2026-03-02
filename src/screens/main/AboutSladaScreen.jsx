import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { useLocalization } from '../../Context/LocalizationContext';

export default function AboutSladaScreen() {
  const { t } = useLocalization();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.container.backgroundColor} />

      <View style={styles.iconWrap}>
        <View style={styles.bagBody}>
          <Icon name="shopping-bag" size={64} color={COLORS.primary} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{t('aboutShoppeTitle', 'About Shoppe')}</Text>
        <Text style={styles.description}>{t('aboutShoppeDescription', 'Shoppe - Shopping UI kit is likely a user interface (UI) kit designed to facilitate the development of e-commerce or shopping-related applications. UI kits are collections of pre-designed elements, components, and templates that developers and designers can use to create consistent and visually appealing user interfaces.')}</Text>

        <Text style={styles.supportText}>{t('aboutShoppeSupport', 'If you need help or you have any questions, feel free to contact me by email.')}</Text>
        <Text style={styles.email}>hello@mydomain.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC'
  },
  iconWrap: {
    marginTop: 54,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bagBody: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    marginTop: 52,
    paddingHorizontal: SIZES.large
  },
  title: {
    fontSize: 42,
    lineHeight: 46,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold,
    marginBottom: SIZES.medium
  },
  description: {
    fontSize: 15,
    lineHeight: 26,
    color: COLORS.text.primary,
    fontFamily: FONTS.regular
  },
  supportText: {
    marginTop: 34,
    fontSize: 15,
    lineHeight: 25,
    color: COLORS.text.primary,
    fontFamily: FONTS.regular
  },
  email: {
    marginTop: 8,
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  }
});
