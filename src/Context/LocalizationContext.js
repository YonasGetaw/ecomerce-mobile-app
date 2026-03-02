import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import StorageService, { StorageKeys } from '../utils/Storage';

const LocalizationContext = createContext({});

const translations = {
  en: {
    settings: 'Settings',
    personal: 'Personal',
    profile: 'Profile',
    shippingAddress: 'Shipping Address',
    paymentMethods: 'Payment methods',
    shop: 'Shop',
    country: 'Country',
    currency: 'Currency',
    sizes: 'Sizes',
    terms: 'Terms and Conditions',
    account: 'Account',
    language: 'Language',
    aboutSlada: 'About Slada',
    deleteAccount: 'Delete My Account',
    yourProfile: 'Your Profile',
    saveChanges: 'Save Changes',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    shippingAddressTitle: 'Shipping Address',
    chooseCountry: 'Choose your country',
    address: 'Address',
    townCity: 'Town / City',
    postcode: 'Postcode',
    phoneNumber: 'Phone Number',
    required: 'Required',
    myOrders: 'My Orders',
    stories: 'Stories',
    newItems: 'New Items',
    mostPopular: 'Most Popular',
    categories: 'Categories',
    flashSale: 'Flash Sale',
    topProducts: 'Top Products',
    justForYou: 'Just For You',
    recentlyViewed: 'Recently viewed',
    toPay: 'To Pay',
    toReceive: 'To Receive',
    toReview: 'To Review',
    seeAll: 'See All',
    announcement: 'Announcement',
    hello: 'Hello',
    chooseLanguage: 'Choose Language',
    english: 'English',
    amharic: 'Amharic',
    success: 'Success',
    error: 'Error',
    requiredMessage: 'Please fill all required fields.',
    shippingSaved: 'Shipping address saved.',
    profileSaved: 'Profile updated successfully.'
  },
  am: {
    settings: 'ቅንብሮች',
    personal: 'የግል',
    profile: 'መገለጫ',
    shippingAddress: 'የመላኪያ አድራሻ',
    paymentMethods: 'የክፍያ መንገዶች',
    shop: 'ሱቅ',
    country: 'ሀገር',
    currency: 'ገንዘብ',
    sizes: 'መጠኖች',
    terms: 'ደንቦች እና ሁኔታዎች',
    account: 'መለያ',
    language: 'ቋንቋ',
    aboutSlada: 'ስለ ስላዳ',
    deleteAccount: 'መለያዬን ሰርዝ',
    yourProfile: 'መገለጫዎ',
    saveChanges: 'ለውጦችን አስቀምጥ',
    name: 'ስም',
    email: 'ኢሜይል',
    password: 'የይለፍ ቃል',
    shippingAddressTitle: 'የመላኪያ አድራሻ',
    chooseCountry: 'ሀገርዎን ይምረጡ',
    address: 'አድራሻ',
    townCity: 'ከተማ',
    postcode: 'ፖስታ ኮድ',
    phoneNumber: 'ስልክ ቁጥር',
    required: 'አስፈላጊ',
    myOrders: 'ትዕዛዞቼ',
    stories: 'ስቶሪዎች',
    newItems: 'አዲስ እቃዎች',
    mostPopular: 'ታዋቂዎች',
    categories: 'ምድቦች',
    flashSale: 'ፍላሽ ሽያጭ',
    topProducts: 'ከፍተኛ ምርቶች',
    justForYou: 'ለእርስዎ',
    recentlyViewed: 'በቅርቡ የታዩ',
    toPay: 'ለመክፈል',
    toReceive: 'ለመቀበል',
    toReview: 'ለመገምገም',
    seeAll: 'ሁሉን ይመልከቱ',
    announcement: 'ማስታወቂያ',
    hello: 'ሰላም',
    chooseLanguage: 'ቋንቋ ይምረጡ',
    english: 'እንግሊዝኛ',
    amharic: 'አማርኛ',
    success: 'ተሳክቷል',
    error: 'ስህተት',
    requiredMessage: 'እባክዎ አስፈላጊ መረጃዎችን ሁሉ ይሙሉ።',
    shippingSaved: 'የመላኪያ አድራሻ ተቀምጧል።',
    profileSaved: 'መገለጫው ተዘምኗል።'
  }
};

export function LocalizationProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const load = async () => {
      const prefs = await StorageService.getItem(StorageKeys.USER_PREFERENCES);
      if (prefs?.language) {
        setLanguage(prefs.language);
      }
    };
    load();
  }, []);

  const updateLanguage = async (nextLanguage) => {
    const safeLanguage = nextLanguage === 'am' ? 'am' : 'en';
    setLanguage(safeLanguage);
    const prefs = (await StorageService.getItem(StorageKeys.USER_PREFERENCES)) || {};
    await StorageService.setItem(StorageKeys.USER_PREFERENCES, { ...prefs, language: safeLanguage });
  };

  const t = (key, fallback = '') => translations[language]?.[key] || translations.en[key] || fallback || key;

  const value = useMemo(
    () => ({ language, setLanguage: updateLanguage, t }),
    [language]
  );

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export const useLocalization = () => useContext(LocalizationContext);
