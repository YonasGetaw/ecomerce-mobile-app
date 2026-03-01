import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { STORIES, RECENTLY_VIEWED, PRODUCTS } from '../../data/MockData';

export default function ProfileScreen({ navigation }) {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://via.placeholder.com/150',
    memberSince: '2024'
  };

  const orderFilters = ['to Pay', 'to Receive', 'to Review'];

  const myOrders = [
    { id: '1', status: 'pending', count: 2 },
    { id: '2', status: 'shipped', count: 1 },
    { id: '3', status: 'delivered', count: 3 }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.activityBadge}>
            <Text style={styles.activityText}>My activity</Text>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="camera" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="menu" size={20} color={COLORS.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="settings" size={20} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello, {user.name}!</Text>
        </View>

        {/* Announcement */}
        <TouchableOpacity style={styles.announcement}>
          <Text style={styles.announcementText}>
            Summer Sale: Up to 50% off on selected items
          </Text>
          <View style={styles.arrowIcon}>
            <Icon name="arrow-right" size={12} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        {/* Recently Viewed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
          <FlatList
            data={RECENTLY_VIEWED}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Image source={{ uri: item.image }} style={styles.recentImage} />
            )}
          />
        </View>

        {/* My Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Order</Text>
          
          <View style={styles.orderFilters}>
            {orderFilters.map((filter, index) => (
              <TouchableOpacity key={index} style={styles.filterButton}>
                <Text style={styles.filterText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.orderStats}>
            {myOrders.map((order) => (
              <View key={order.id} style={styles.orderStatItem}>
                <View style={styles.orderStatCircle}>
                  <Text style={styles.orderStatCount}>{order.count}</Text>
                </View>
                <Text style={styles.orderStatLabel}>
                  {order.status === 'pending' ? 'To Pay' : 
                   order.status === 'shipped' ? 'To Receive' : 'To Review'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stories</Text>
          <FlatList
            data={STORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.storyCard}>
                <Image source={{ uri: item.image }} style={styles.storyImage} />
                <Text style={styles.storyTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* New Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Items</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <View style={styles.arrowIcon}>
                <Icon name="arrow-right" size={12} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={PRODUCTS.slice(0, 5)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.newItemCard}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              >
                <Image source={{ uri: item.image }} style={styles.newItemImage} />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Flash Sale */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Flash Sale</Text>
            <View style={styles.timerContainer}>
              <Icon name="clock" size={16} color={COLORS.error} />
              <Text style={styles.timer}>23:59:59</Text>
            </View>
          </View>

          <FlatList
            data={PRODUCTS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.flashSaleItem}>
                <Image source={{ uri: item.image }} style={styles.flashSaleImage} />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Top Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Products</Text>
          <FlatList
            data={PRODUCTS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Image source={{ uri: item.image }} style={styles.topProductImage} />
            )}
          />
        </View>

        {/* Just for You */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <View style={styles.justForYouHeader}>
              <Icon name="star" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Just for You</Text>
            </View>
          </View>

          {PRODUCTS.slice(0, 3).map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.justForYouItem}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            >
              <Image source={{ uri: item.image }} style={styles.justForYouImage} />
              <View style={styles.justForYouDetails}>
                <Text style={styles.justForYouName}>{item.name}</Text>
                <Text style={styles.justForYouPrice}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: COLORS.white
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.small
  },
  activityBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small
  },
  activityText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerIcon: {
    marginLeft: SIZES.medium
  },
  greetingContainer: {
    padding: SIZES.medium
  },
  greeting: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  announcement: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primaryLight,
    marginHorizontal: SIZES.medium,
    padding: SIZES.medium,
    borderRadius: SIZES.radius.large,
    marginBottom: SIZES.large
  },
  announcementText: {
    flex: 1,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginRight: SIZES.small
  },
  section: {
    marginBottom: SIZES.xlarge,
    paddingHorizontal: SIZES.medium
  },
  lastSection: {
    marginBottom: SIZES.xxlarge
  },
  sectionTitle: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.medium
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  seeAllText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginRight: 4
  },
  arrowIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SIZES.small
  },
  orderFilters: {
    flexDirection: 'row',
    marginBottom: SIZES.medium
  },
  filterButton: {
    flex: 1,
    paddingVertical: SIZES.small,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border
  },
  filterText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.secondary
  },
  orderStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SIZES.medium
  },
  orderStatItem: {
    alignItems: 'center'
  },
  orderStatCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.small
  },
  orderStatCount: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  },
  orderStatLabel: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary
  },
  storyCard: {
    marginRight: SIZES.medium,
    alignItems: 'center'
  },
  storyImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: SIZES.small
  },
  storyTitle: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  newItemCard: {
    marginRight: SIZES.medium
  },
  newItemImage: {
    width: 100,
    height: 100,
    borderRadius: SIZES.radius.medium
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.medium
  },
  timer: {
    marginLeft: 4,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.bold,
    color: COLORS.error
  },
  flashSaleItem: {
    marginRight: SIZES.medium
  },
  flashSaleImage: {
    width: 100,
    height: 100,
    borderRadius: SIZES.radius.medium
  },
  topProductImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SIZES.small
  },
  justForYouHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  justForYouItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderRadius: SIZES.radius.medium
  },
  justForYouImage: {
    width: 60,
    height: 60,
    borderRadius: SIZES.radius.medium,
    marginRight: SIZES.medium
  },
  justForYouDetails: {
    flex: 1
  },
  justForYouName: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: 4
  },
  justForYouPrice: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.primary
  }
});