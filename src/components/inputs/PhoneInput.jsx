import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/colors';
import { constants } from '../../utils/constants';

export default function PhoneInput({
  value,
  onChangeText,
  onCountryChange,
  error,
  label = 'Phone Number'
}) {
  const [selectedCountry, setSelectedCountry] = useState(constants.countryCodes[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setModalVisible(false);
    if (onCountryChange) {
      onCountryChange(country);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.errorBorder]}>
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
          <Text style={styles.countryCode}>{selectedCountry.code}</Text>
          <Icon name="chevron-down" size={16} color={COLORS.text.secondary} />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.text.hint}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Country Selector Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="x" size={24} color={COLORS.text.primary} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={constants.countryCodes}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => handleCountrySelect(item)}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <Text style={styles.countryName}>{item.country}</Text>
                  <Text style={styles.countryCodeItem}>{item.code}</Text>
                  {selectedCountry.code === item.code && (
                    <Icon name="check" size={20} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.medium
  },
  label: {
    fontSize: FONTS.sizes.small,
    color: COLORS.text.secondary,
    marginBottom: SIZES.small,
    fontFamily: FONTS.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.white,
    minHeight: 54
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small
  },
  countryFlag: {
    fontSize: 24,
    marginRight: SIZES.small
  },
  countryCode: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginRight: SIZES.small
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
    marginHorizontal: SIZES.small
  },
  input: {
    flex: 1,
    paddingVertical: SIZES.medium,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary
  },
  errorBorder: {
    borderColor: COLORS.error
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.small,
    marginTop: SIZES.small / 2,
    fontFamily: FONTS.regular
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius.xlarge,
    borderTopRightRadius: SIZES.radius.xlarge,
    paddingBottom: SIZES.xlarge,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  modalTitle: {
    fontSize: FONTS.sizes.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  countryName: {
    flex: 1,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginLeft: SIZES.medium
  },
  countryCodeItem: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
    marginRight: SIZES.medium
  }
});