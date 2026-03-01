import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function ActivityTabs({ activeTab, onTabChange, tabs }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
        >
          <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.small,
    alignItems: 'center',
    borderRadius: SIZES.radius.medium
  },
  activeTab: {
    backgroundColor: COLORS.primary
  },
  tabText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  activeTabText: {
    color: COLORS.white
  }
});