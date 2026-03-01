import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import BottomSheet from './BottomSheet';
import PrimaryButton from '../../buttons/PrimaryButton';
import { COLORS, FONTS, SIZES } from '../utils/colors';

export default function AddressModal({ visible, onClose, onSave, initialAddress = {} }) {
  const [address, setAddress] = useState({
    fullName: initialAddress.fullName || '',
    phone: initialAddress.phone || '',
    addressLine1: initialAddress.addressLine1 || '',
    addressLine2: initialAddress.addressLine2 || '',
    city: initialAddress.city || '',
    state: initialAddress.state || '',
    pincode: initialAddress.pincode || '',
    country: initialAddress.country || 'India',
    isDefault: initialAddress.isDefault || false
  });

  const handleSave = () => {
    onSave(address);
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Shipping Address">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={address.fullName}
              onChangeText={(text) => setAddress({...address, fullName: text})}
              placeholder="Enter full name"
              placeholderTextColor={COLORS.text.hint}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={address.phone}
              onChangeText={(text) => setAddress({...address, phone: text})}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              placeholderTextColor={COLORS.text.hint}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address Line 1</Text>
            <TextInput
              style={styles.input}
              value={address.addressLine1}
              onChangeText={(text) => setAddress({...address, addressLine1: text})}
              placeholder="House/Flat No., Building Name"
              placeholderTextColor={COLORS.text.hint}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address Line 2 (Optional)</Text>
            <TextInput
              style={styles.input}
              value={address.addressLine2}
              onChangeText={(text) => setAddress({...address, addressLine2: text})}
              placeholder="Road, Area, Landmark"
              placeholderTextColor={COLORS.text.hint}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: SIZES.small }]}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                value={address.city}
                onChangeText={(text) => setAddress({...address, city: text})}
                placeholder="City"
                placeholderTextColor={COLORS.text.hint}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: SIZES.small }]}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                value={address.state}
                onChangeText={(text) => setAddress({...address, state: text})}
                placeholder="State"
                placeholderTextColor={COLORS.text.hint}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: SIZES.small }]}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={styles.input}
                value={address.pincode}
                onChangeText={(text) => setAddress({...address, pincode: text})}
                placeholder="Pincode"
                keyboardType="numeric"
                placeholderTextColor={COLORS.text.hint}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 2, marginLeft: SIZES.small }]}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                value={address.country}
                onChangeText={(text) => setAddress({...address, country: text})}
                placeholder="Country"
                placeholderTextColor={COLORS.text.hint}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <PrimaryButton title="Save Address" onPress={handleSave} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: SIZES.large
  },
  inputGroup: {
    marginBottom: SIZES.medium
  },
  label: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary,
    marginBottom: SIZES.small,
    textTransform: 'uppercase'
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.medium,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary
  },
  row: {
    flexDirection: 'row',
    marginBottom: SIZES.medium
  },
  actions: {
    marginTop: SIZES.large
  }
});