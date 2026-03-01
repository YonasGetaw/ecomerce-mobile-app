import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';

export default function PaymentScreen({ navigation, route }) {
  const { items } = route.params || { items: [] };
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [addressForm, setAddressForm] = useState({
    country: '',
    address: '',
    city: '',
    postcode: ''
  });

  const shippingAddress = {
    full: 'Magadi Main Rd, next to Prasanna Theatre, Cholourpalya, Bengaluru, Karnataka 560023',
    contact: '+91987654321',
    email: 'gmail@example.com'
  };

  const shippingOptions = [
    { 
      id: 'standard', 
      name: 'Standard', 
      duration: '5-7 business days', 
      price: 0,
      deliveryDate: 'Thursday, 23 April 2020'
    },
    { 
      id: 'express', 
      name: 'Express', 
      duration: '1-2 business days', 
      price: 10.99,
      deliveryDate: 'Monday, 20 April 2020'
    }
  ];

  const paymentMethods = [
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/24' },
    { id: '2', type: 'Mastercard', last4: '8888', expiry: '08/25' }
  ];

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  const calculateDiscount = () => {
    return items.reduce((sum, item) => {
      if (item.originalPrice) {
        return sum + ((item.originalPrice - item.price) * (item.quantity || 1));
      }
      return sum;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = selectedShipping === 'express' ? 10.99 : 0;
    return subtotal + shipping;
  };

  const AddressModal = () => (
    <Modal
      visible={showAddressModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowAddressModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Shipping Address</Text>
            <TouchableOpacity onPress={() => setShowAddressModal(false)}>
              <Icon name="x" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Country</Text>
              <TextInput
                style={styles.input}
                value={addressForm.country}
                onChangeText={(text) => setAddressForm({...addressForm, country: text})}
                placeholder="Enter country"
                placeholderTextColor={COLORS.text.hint}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.input}
                value={addressForm.address}
                onChangeText={(text) => setAddressForm({...addressForm, address: text})}
                placeholder="Enter address"
                placeholderTextColor={COLORS.text.hint}
                multiline
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Town/City</Text>
              <TextInput
                style={styles.input}
                value={addressForm.city}
                onChangeText={(text) => setAddressForm({...addressForm, city: text})}
                placeholder="Enter town/city"
                placeholderTextColor={COLORS.text.hint}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Postcode</Text>
              <TextInput
                style={styles.input}
                value={addressForm.postcode}
                onChangeText={(text) => setAddressForm({...addressForm, postcode: text})}
                placeholder="Enter postcode"
                placeholderTextColor={COLORS.text.hint}
                keyboardType="numeric"
              />
            </View>

            <PrimaryButton
              title="Save Changes"
              onPress={() => {
                setShowAddressModal(false);
                // Save address logic here
              }}
              style={styles.saveButton}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Shipping Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <TouchableOpacity onPress={() => setShowAddressModal(true)}>
              <Icon name="edit-2" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>{shippingAddress.full}</Text>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Contact Info</Text>
            <TouchableOpacity>
              <Icon name="edit-2" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.contactText}>{shippingAddress.contact}</Text>
          <Text style={styles.contactText}>{shippingAddress.email}</Text>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items ({items.length})</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.itemDetails}>
                <Text style={styles.itemQuantity}>x{item.quantity || 1}</Text>
                <Text style={styles.itemPrice}>${(item.price * (item.quantity || 1)).toFixed(2)}</Text>
              </View>
            </View>
          ))}
          {calculateDiscount() > 0 && (
            <View style={styles.discountRow}>
              <Text style={styles.discountLabel}>Discount</Text>
              <Text style={styles.discountAmount}>-${calculateDiscount().toFixed(2)}</Text>
            </View>
          )}
        </View>

        {/* Shipping Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Options</Text>
          {shippingOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.shippingOption,
                selectedShipping === option.id && styles.selectedShipping
              ]}
              onPress={() => setSelectedShipping(option.id)}
            >
              <View style={styles.shippingInfo}>
                <View style={styles.shippingHeader}>
                  <Text style={styles.shippingName}>{option.name}</Text>
                  {option.price === 0 ? (
                    <Text style={styles.shippingFree}>Free</Text>
                  ) : (
                    <Text style={styles.shippingPrice}>${option.price.toFixed(2)}</Text>
                  )}
                </View>
                <Text style={styles.shippingDuration}>{option.duration}</Text>
              </View>
              <View style={[
                styles.radioButton,
                selectedShipping === option.id && styles.radioSelected
              ]}>
                {selectedShipping === option.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
          <Text style={styles.deliveryNote}>
            Delivered on or before {selectedShipping === 'standard' 
              ? shippingOptions[0].deliveryDate 
              : shippingOptions[1].deliveryDate}
          </Text>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity>
              <Icon name="edit-2" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentMethod}>
              <View style={styles.paymentIcon}>
                <Icon name="credit-card" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentType}>{method.type}</Text>
                <Text style={styles.paymentInfo}>
                  •••• {method.last4} | Expires {method.expiry}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Order Total */}
        <View style={[styles.section, styles.totalSection]}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${calculateSubtotal().toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping</Text>
            <Text style={styles.totalValue}>
              {selectedShipping === 'express' ? '$10.99' : 'Free'}
            </Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>${calculateTotal().toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.bottomBar}>
        <PrimaryButton
          title={`Pay $${calculateTotal().toFixed(2)}`}
          onPress={() => {
            Alert.alert('Success', 'Payment successful!', [
              { text: 'OK', onPress: () => navigation.navigate('Home') }
            ]);
          }}
          style={styles.payButton}
        />
      </View>

      <AddressModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  headerTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  section: {
    backgroundColor: COLORS.white,
    marginBottom: SIZES.small,
    padding: SIZES.large
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  sectionTitle: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    textTransform: 'uppercase'
  },
  addressText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    lineHeight: 22
  },
  contactText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    marginBottom: 4
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small
  },
  itemName: {
    flex: 1,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemQuantity: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    marginRight: SIZES.medium
  },
  itemPrice: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    minWidth: 70,
    textAlign: 'right'
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.small,
    paddingTop: SIZES.small,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  discountLabel: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.success
  },
  discountAmount: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.success
  },
  shippingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  selectedShipping: {
    backgroundColor: COLORS.primaryLight
  },
  shippingInfo: {
    flex: 1
  },
  shippingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  shippingName: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginRight: SIZES.small
  },
  shippingFree: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold,
    color: COLORS.success
  },
  shippingPrice: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  shippingDuration: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.medium
  },
  radioSelected: {
    borderColor: COLORS.primary
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary
  },
  deliveryNote: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginTop: SIZES.medium
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.medium
  },
  paymentDetails: {
    flex: 1
  },
  paymentType: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: 2
  },
  paymentInfo: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  totalSection: {
    marginBottom: SIZES.xxlarge
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.small
  },
  totalLabel: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  totalValue: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  grandTotal: {
    marginTop: SIZES.small,
    paddingTop: SIZES.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  grandTotalLabel: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  grandTotalValue: {
    fontSize: FONTS.sizes.xlarge,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  bottomBar: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  payButton: {
    width: '100%'
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
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  modalForm: {
    padding: SIZES.large
  },
  inputGroup: {
    marginBottom: SIZES.large
  },
  inputLabel: {
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
  saveButton: {
    marginTop: SIZES.medium
  }
});