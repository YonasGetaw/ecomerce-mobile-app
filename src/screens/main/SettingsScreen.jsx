import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { useLocalization } from '../../Context/LocalizationContext';

function SettingRow({ title, value, onPress }) {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.rowTitle}>{title}</Text>
      <View style={styles.rowRight}>
        {value ? <Text style={styles.rowValue}>{value}</Text> : null}
        <Icon name="chevron-right" size={16} color={COLORS.text.secondary} />
      </View>
    </TouchableOpacity>
  );
}

export default function SettingsScreen({ navigation }) {
  const { language, setLanguage, t } = useLocalization();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const onPressLanguage = () => {
    setLanguageModalVisible(true);
  };

  const chooseLanguage = async (nextLanguage) => {
    await setLanguage(nextLanguage);
    setLanguageModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={18} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.screenTitle}>{t('settings', 'Settings')}</Text>

      <Text style={styles.sectionTitle}>{t('personal', 'Personal')}</Text>
      <SettingRow title={t('profile', 'Profile')} onPress={() => navigation.navigate('EditProfile')} />
      <SettingRow title={t('shippingAddress', 'Shipping Address')} onPress={() => navigation.navigate('ShippingAddress')} />
      <SettingRow title={t('paymentMethods', 'Payment methods')} onPress={() => {}} />

      <Text style={styles.sectionTitle}>{t('shop', 'Shop')}</Text>
      <SettingRow title={t('country', 'Country')} value="Vietnam" onPress={() => {}} />
      <SettingRow title={t('currency', 'Currency')} value="$ USD" onPress={() => {}} />
      <SettingRow title={t('sizes', 'Sizes')} value="UK" onPress={() => {}} />
      <SettingRow title={t('terms', 'Terms and Conditions')} onPress={() => {}} />

      <Text style={styles.sectionTitle}>{t('account', 'Account')}</Text>
      <SettingRow
        title={t('language', 'Language')}
        value={language === 'am' ? t('amharic', 'Amharic') : t('english', 'English')}
        onPress={onPressLanguage}
      />
      <SettingRow title={t('aboutSlada', 'About Slada')} onPress={() => navigation.navigate('AboutSlada')} />

      <TouchableOpacity style={styles.deleteWrap}>
        <Text style={styles.deleteText}>{t('deleteAccount', 'Delete My Account')}</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>Slada</Text>
        <Text style={styles.footerVersion}>Version 1.0 April, 2020</Text>
      </View>

      <Modal
        visible={languageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setLanguageModalVisible(false)} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t('chooseLanguage', 'Choose Language')}</Text>

            <TouchableOpacity style={styles.modalOption} onPress={() => chooseLanguage('en')}>
              <Text style={styles.modalOptionText}>{t('english', 'English')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption} onPress={() => chooseLanguage('am')}>
              <Text style={styles.modalOptionText}>{t('amharic', 'Amharic')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancel} onPress={() => setLanguageModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingLeft: SIZES.large,
    paddingRight: SIZES.medium
  },
  topBar: {
    marginTop: SIZES.small,
    marginBottom: 8
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenTitle: {
    fontSize: 32,
    lineHeight: 36,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold,
    marginBottom: 14
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 22,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  row: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowTitle: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontFamily: FONTS.medium
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowValue: {
    marginRight: 10,
    fontSize: 13,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular
  },
  deleteWrap: {
    marginTop: 18,
    paddingVertical: 10
  },
  deleteText: {
    fontSize: 12,
    color: '#E15B5B',
    fontFamily: FONTS.medium
  },
  footer: {
    marginTop: 8
  },
  footerBrand: {
    fontSize: 22,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  footerVersion: {
    fontSize: 11,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBackdrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  modalCard: {
    width: '84%',
    borderRadius: 12,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 14
  },
  modalTitle: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold,
    marginBottom: 8
  },
  modalOption: {
    height: 44,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  modalOptionText: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontFamily: FONTS.medium
  },
  modalCancel: {
    height: 40,
    justifyContent: 'center'
  },
  modalCancelText: {
    fontSize: 13,
    color: COLORS.text.secondary,
    fontFamily: FONTS.medium
  }
});
