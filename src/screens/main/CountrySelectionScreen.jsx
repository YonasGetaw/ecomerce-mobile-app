import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import StorageService, { StorageKeys } from '../../utils/Storage';
import { COUNTRIES } from '../../data/countriesData';
import { useLocalization } from '../../Context/LocalizationContext';

export default function CountrySelectionScreen({ navigation, route }) {
  const { t } = useLocalization();
  const [selectedCountry, setSelectedCountry] = useState(route?.params?.selectedCountry || 'India');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredCountries = normalizedQuery
      ? COUNTRIES.filter((country) => country.toLowerCase().includes(normalizedQuery))
      : COUNTRIES;
    const sorted = [...filteredCountries].sort((a, b) => a.localeCompare(b));
    const grouped = sorted.reduce((acc, country) => {
      const letter = country[0].toUpperCase();
      if (!acc[letter]) {
        acc[letter] = [];
      }
      acc[letter].push(country);
      return acc;
    }, {});

    return Object.keys(grouped)
      .sort()
      .map((letter) => ({ title: letter, data: grouped[letter] }));
  }, [searchQuery]);

  const onSelectCountry = async (country) => {
    setSelectedCountry(country);
    const prefs = (await StorageService.getItem(StorageKeys.USER_PREFERENCES)) || {};
    await StorageService.setItem(StorageKeys.USER_PREFERENCES, { ...prefs, country });
  };

  const renderCountry = ({ item }) => {
    const isSelected = item === selectedCountry;

    return (
      <TouchableOpacity
        style={[styles.countryRow, isSelected && styles.countryRowSelected]}
        onPress={() => onSelectCountry(item)}
        activeOpacity={0.85}
      >
        <Text style={[styles.countryText, isSelected && styles.countryTextSelected]}>{item}</Text>
        {isSelected && (
          <View style={styles.checkCircle}>
            <Icon name="check" size={12} color={COLORS.white} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.container.backgroundColor} />

      <View style={styles.headerRow}>
        <Text style={styles.screenTitle}>{t('settings', 'Settings')}</Text>
        <TouchableOpacity style={styles.doneButton} onPress={() => navigation.goBack()}>
          <Icon name="x" size={18} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.fieldLabel}>{t('country', 'Country')}</Text>

      <View style={styles.searchBox}>
        <Icon name="search" size={16} color={COLORS.text.secondary} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('searchCountry', 'Search country')}
          placeholderTextColor={COLORS.text.hint}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item}
        renderItem={renderCountry}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: SIZES.medium
  },
  headerRow: {
    marginTop: SIZES.small,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  screenTitle: {
    fontSize: 38,
    lineHeight: 42,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  doneButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fieldLabel: {
    marginTop: 6,
    marginBottom: 8,
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  searchBox: {
    height: 42,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    paddingVertical: 8,
    paddingHorizontal: 6
  },
  listContent: {
    paddingBottom: SIZES.large
  },
  countryRow: {
    minHeight: 44,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 4
  },
  countryRowSelected: {
    backgroundColor: '#DCE4F8'
  },
  countryText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary
  },
  countryTextSelected: {
    color: COLORS.primary,
    fontFamily: FONTS.medium
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#165DFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionHeader: {
    marginTop: 6,
    marginBottom: 4,
    height: 34,
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#F7F7F7'
  },
  sectionHeaderText: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  }
});
