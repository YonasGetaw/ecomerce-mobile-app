import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { useAuth } from '../../Context/AuthContext';

const COUNTRIES = ['Vietnam', 'Ethiopia', 'United States', 'United Kingdom', 'Canada'];

export default function ShippingAddressScreen({ navigation }) {
  const { user, updateUserProfile } = useAuth();

  const initialAddress = useMemo(() => user?.shippingAddress || {}, [user?.shippingAddress]);

  const [country, setCountry] = useState(initialAddress.country || 'Choose your country');
  const [address, setAddress] = useState(initialAddress.address || '');
  const [town, setTown] = useState(initialAddress.town || '');
  const [postcode, setPostcode] = useState(initialAddress.postcode || '');
  const [phone, setPhone] = useState(initialAddress.phone || '');
  const [saving, setSaving] = useState(false);

  const onPickCountry = () => {
    Alert.alert('Select Country', 'Choose your country', [
      ...COUNTRIES.map((item) => ({
        text: item,
        onPress: () => setCountry(item)
      })),
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const onSave = async () => {
    if (
      country === 'Choose your country' ||
      !address.trim() ||
      !town.trim() ||
      !postcode.trim() ||
      !phone.trim()
    ) {
      Alert.alert('Required', 'Please fill all shipping address fields.');
      return;
    }

    setSaving(true);
    const result = await updateUserProfile({
      shippingAddress: {
        country,
        address: address.trim(),
        town: town.trim(),
        postcode: postcode.trim(),
        phone: phone.trim()
      }
    });
    setSaving(false);

    if (result?.success) {
      Alert.alert('Success', 'Shipping address saved.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
      return;
    }

    Alert.alert('Error', result?.error || 'Could not save shipping address.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={18} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Shipping Address</Text>

      <Text style={styles.fieldLabel}>Country</Text>
      <TouchableOpacity style={styles.countryRow} onPress={onPickCountry} activeOpacity={0.85}>
        <Text style={styles.countryText}>{country}</Text>
        <View style={styles.countryArrow}>
          <Icon name="arrow-right" size={12} color={COLORS.white} />
        </View>
      </TouchableOpacity>

      <Text style={styles.fieldLabel}>Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Required"
        placeholderTextColor="#A7B9EA"
        style={styles.input}
      />

      <Text style={styles.fieldLabel}>Town / City</Text>
      <TextInput
        value={town}
        onChangeText={setTown}
        placeholder="Required"
        placeholderTextColor="#A7B9EA"
        style={styles.input}
      />

      <Text style={styles.fieldLabel}>Postcode</Text>
      <TextInput
        value={postcode}
        onChangeText={setPostcode}
        placeholder="Required"
        placeholderTextColor="#A7B9EA"
        style={styles.input}
      />

      <Text style={styles.fieldLabel}>Phone Number</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Required"
        placeholderTextColor="#A7B9EA"
        style={styles.input}
        keyboardType="phone-pad"
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveButton} onPress={onSave} disabled={saving}>
          <Text style={styles.saveText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 14
  },
  topBar: {
    marginTop: 6,
    marginBottom: 8
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 38,
    lineHeight: 40,
    fontFamily: FONTS.bold,
    color: '#202020'
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 14,
    fontSize: 14,
    color: '#202020',
    fontFamily: FONTS.medium
  },
  fieldLabel: {
    fontSize: 12,
    color: '#202020',
    fontFamily: FONTS.medium,
    marginBottom: 6,
    marginTop: 10
  },
  countryRow: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  countryText: {
    fontSize: 18,
    color: '#202020',
    fontFamily: FONTS.bold
  },
  countryArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 38,
    borderRadius: 8,
    backgroundColor: '#EEF1F9',
    paddingHorizontal: 10,
    color: '#202020',
    fontFamily: FONTS.regular,
    fontSize: 14
  },
  bottomBar: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 12
  },
  saveButton: {
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveText: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: FONTS.medium
  }
});
