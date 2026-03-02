import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';

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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={18} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.screenTitle}>Settings</Text>

      <Text style={styles.sectionTitle}>Personal</Text>
      <SettingRow title="Profile" onPress={() => {}} />
      <SettingRow title="Shipping Address" onPress={() => {}} />
      <SettingRow title="Payment methods" onPress={() => {}} />

      <Text style={styles.sectionTitle}>Shop</Text>
      <SettingRow title="Country" value="Vietnam" onPress={() => {}} />
      <SettingRow title="Currency" value="$ USD" onPress={() => {}} />
      <SettingRow title="Sizes" value="UK" onPress={() => {}} />
      <SettingRow title="Terms and Conditions" onPress={() => {}} />

      <Text style={styles.sectionTitle}>Account</Text>
      <SettingRow title="Language" value="English" onPress={() => {}} />
      <SettingRow title="About Slada" onPress={() => {}} />

      <TouchableOpacity style={styles.deleteWrap}>
        <Text style={styles.deleteText}>Delete My Account</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>Slada</Text>
        <Text style={styles.footerVersion}>Version 1.0 April, 2020</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.medium
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
  }
});
