import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Modal,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Camera } from 'expo-camera';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { PRODUCTS, FLASH_SALE_ITEMS } from '../../data/MockData';
import { useImagePicker } from '../../hooks/useImagePicker';

export default function ProfileScreen({ navigation }) {
  const { pickFromCamera, pickFromGallery } = useImagePicker();

  const [avatarUri, setAvatarUri] = useState('https://loremflickr.com/220/220/face,woman?lock=1901');
  const [scannerVisible, setScannerVisible] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [selectedOrderTab, setSelectedOrderTab] = useState('receive');
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  const orderTabs = [
    { key: 'pay', label: 'To Pay' },
    { key: 'receive', label: 'To Recieve' },
    { key: 'review', label: 'To Review' }
  ];

  const recentViewed = [
    'https://loremflickr.com/120/120/woman,style?lock=1910',
    'https://loremflickr.com/120/120/fashion,girl?lock=1911',
    'https://loremflickr.com/120/120/model,portrait?lock=1912',
    'https://loremflickr.com/120/120/woman,casual?lock=1913',
    'https://loremflickr.com/120/120/fashion,photo?lock=1914'
  ];

  const stories = [
    { id: '1', title: 'Live', image: 'https://loremflickr.com/300/500/shopping,woman?lock=1920' },
    { id: '2', title: 'New', image: 'https://loremflickr.com/300/500/fashion,pink?lock=1921' },
    { id: '3', title: 'Top', image: 'https://loremflickr.com/300/500/model,beauty?lock=1922' },
    { id: '4', title: 'Hot', image: 'https://loremflickr.com/300/500/shop,bag?lock=1923' }
  ];

  const productImages = [
    'https://loremflickr.com/500/500/sunglasses,woman?lock=1930',
    'https://loremflickr.com/500/500/woman,portrait?lock=1931',
    'https://loremflickr.com/500/500/model,green-shirt?lock=1932',
    'https://loremflickr.com/500/500/fashion,woman?lock=1933',
    'https://loremflickr.com/500/500/shopper,bag?lock=1934',
    'https://loremflickr.com/500/500/fashion,pink?lock=1935'
  ];

  const categories = [
    {
      id: '1',
      title: 'Clothing',
      count: 109,
      images: [
        'https://loremflickr.com/220/220/fashion,yellow?lock=1940',
        'https://loremflickr.com/220/220/woman,sunglasses?lock=1941',
        'https://loremflickr.com/220/220/model,pink?lock=1942',
        'https://loremflickr.com/220/220/woman,shop?lock=1943'
      ]
    },
    {
      id: '2',
      title: 'Shoes',
      count: 530,
      images: [
        'https://loremflickr.com/220/220/sneakers,shoe?lock=1944',
        'https://loremflickr.com/220/220/blue-shoes,product?lock=1945',
        'https://loremflickr.com/220/220/sports-shoes?lock=1946',
        'https://loremflickr.com/220/220/heels,shoe?lock=1947'
      ]
    },
    {
      id: '3',
      title: 'Bags',
      count: 87,
      images: [
        'https://loremflickr.com/220/220/bag,white?lock=1948',
        'https://loremflickr.com/220/220/handbag,pink?lock=1949',
        'https://loremflickr.com/220/220/leather-bag?lock=1950',
        'https://loremflickr.com/220/220/travel-bag?lock=1951'
      ]
    },
    {
      id: '4',
      title: 'Lingerie',
      count: 218,
      images: [
        'https://loremflickr.com/220/220/woman,beach?lock=1952',
        'https://loremflickr.com/220/220/fashion,woman?lock=1953',
        'https://loremflickr.com/220/220/lingerie,style?lock=1954',
        'https://loremflickr.com/220/220/model,portrait?lock=1955'
      ]
    }
  ];

  const topProducts = [
    'https://loremflickr.com/140/140/bag,product?lock=1960',
    'https://loremflickr.com/140/140/watch,product?lock=1961',
    'https://loremflickr.com/140/140/tshirt,product?lock=1962',
    'https://loremflickr.com/140/140/shoes,product?lock=1963',
    'https://loremflickr.com/140/140/woman,profile?lock=1964'
  ];

  const homeProducts = useMemo(
    () => PRODUCTS.map((item, index) => ({
      ...item,
      image: productImages[index % productImages.length]
    })),
    []
  );

  useEffect(() => {
    const fetchPermission = async () => {
      if (scannerVisible) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(status === 'granted');
      }
    };

    fetchPermission();
  }, [scannerVisible]);

  const onAvatarPress = () => {
    Alert.alert('Profile Image', 'Select image source', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const image = await pickFromCamera();
          if (image?.uri) setAvatarUri(image.uri);
        }
      },
      {
        text: 'Choose from Gallery',
        onPress: async () => {
          const image = await pickFromGallery();
          if (image?.uri) setAvatarUri(image.uri);
        }
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleScanned = ({ data }) => {
    if (!isScanned) {
      setIsScanned(true);
      setScannerVisible(false);
      Alert.alert('QR Scanned', data || 'Scan completed successfully.');
      setTimeout(() => setIsScanned(false), 500);
    }
  };

  const handleStoryPress = (story) => {
    setActiveStory(story);
    setStoryModalVisible(true);
  };

  const closeStoryModal = () => {
    setStoryModalVisible(false);
    setActiveStory(null);
  };

  const renderSectionHeader = (title, onSeeAll) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll ? (
        <TouchableOpacity style={styles.seeAllWrap} onPress={onSeeAll}>
          <Text style={styles.seeAllText}>See All</Text>
          <View style={styles.arrowCircle}><Icon name="arrow-right" size={10} color={COLORS.white} /></View>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topRow}>
          <View style={styles.leftTopRow}>
            <TouchableOpacity onPress={onAvatarPress} style={styles.avatarWrap}>
              <Image source={{ uri: avatarUri }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.activityBadge}><Text style={styles.activityText}>My Activity</Text></View>
          </View>

          <View style={styles.rightTopRow}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setScannerVisible(true)}>
              <Icon name="maximize" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Icon name="list" size={16} color={COLORS.primary} /></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Icon name="settings" size={16} color={COLORS.primary} /></TouchableOpacity>
          </View>
        </View>

        <Text style={styles.greeting}>Hello, Romina!</Text>

        <TouchableOpacity style={styles.announcementCard}>
          <View>
            <Text style={styles.announcementTitle}>Announcement</Text>
            <Text style={styles.announcementSub}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit luctus libero ac vulputate.</Text>
          </View>
          <View style={styles.arrowCircle}><Icon name="arrow-right" size={10} color={COLORS.white} /></View>
        </TouchableOpacity>

        <View style={styles.recentBlock}>
          <Text style={styles.recentTitle}>Recently viewed</Text>
          <View style={styles.recentRow}>
            {recentViewed.slice(0, 5).map((item, idx) => (
              <Image key={`recent-${idx}`} source={{ uri: item }} style={styles.recentAvatar} />
            ))}
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>My Orders</Text>
          <View style={styles.ordersWrap}>
            <View style={styles.ordersRow}>
              {orderTabs.map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  style={styles.orderChip}
                  onPress={() => setSelectedOrderTab(tab.key)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.orderChipText}>{tab.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={[
                styles.orderDot,
                selectedOrderTab === 'pay' && styles.orderDotPay,
                selectedOrderTab === 'receive' && styles.orderDotReceive,
                selectedOrderTab === 'review' && styles.orderDotReview
              ]}
            />
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Stories</Text>
          <FlatList
            horizontal
            data={stories}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesContent}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.storyCard} onPress={() => handleStoryPress(item)} activeOpacity={0.9}>
                <Image source={{ uri: item.image }} style={styles.storyImage} />
                {index === 2 && (
                  <View style={styles.playCircle}><Icon name="play" size={18} color={COLORS.white} /></View>
                )}
                {index === 0 && (
                  <View style={styles.storyBadge}><Text style={styles.storyBadgeText}>Live</Text></View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.sectionBlock}>
          {renderSectionHeader('New Items', () => navigation.navigate('Home', { screen: 'ProductSearch' }))}
          <FlatList
            horizontal
            data={homeProducts.slice(0, 5)}
            keyExtractor={(item) => `new-${item.id}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.newItemCard} onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: item } })}>
                <Image source={{ uri: item.image }} style={styles.newItemImage} />
                <Text style={styles.newItemDesc} numberOfLines={2}>Lorem ipsum dolor sit amet consectetur.</Text>
                <Text style={styles.newItemPrice}>${Number(item.price).toFixed(2)}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.sectionBlock}>
          {renderSectionHeader('Most Popular', () => navigation.navigate('Home', { screen: 'ProductSearch' }))}
          <FlatList
            horizontal
            data={homeProducts.slice(0, 5)}
            keyExtractor={(item) => `popular-${item.id}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.popularCard} onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: item } })}>
                <Image source={{ uri: item.image }} style={styles.popularImage} />
                <View style={styles.popularBottom}>
                  <Text style={styles.popularNumber}>1780</Text>
                  <Icon name="heart" size={12} color={COLORS.primary} />
                  <Text style={styles.popularType}>{['New', 'Sale', 'Hot'][index % 3]}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.sectionBlock}>
          {renderSectionHeader('Categories', () => navigation.navigate('Categories'))}
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard} onPress={() => navigation.navigate('Categories')}>
                <View style={styles.categoryMosaic}>
                  {category.images.map((imageUri, index) => (
                    <Image key={`${category.id}-${index}`} source={{ uri: imageUri }} style={styles.mosaicImage} />
                  ))}
                </View>
                <View style={styles.categoryFooter}>
                  <Text style={styles.categoryName}>{category.title}</Text>
                  <View style={styles.categoryCount}><Text style={styles.categoryCountText}>{category.count}</Text></View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Flash Sale</Text>
            <View style={styles.flashTimerRow}>
              <Icon name="clock" size={12} color={COLORS.primary} />
              <View style={styles.flashTimerChip}><Text style={styles.flashTimerChipText}>00</Text></View>
              <View style={styles.flashTimerChip}><Text style={styles.flashTimerChipText}>36</Text></View>
              <View style={styles.flashTimerChip}><Text style={styles.flashTimerChipText}>58</Text></View>
            </View>
          </View>
          <View style={styles.flashGrid}>
            {[...FLASH_SALE_ITEMS, ...FLASH_SALE_ITEMS].slice(0, 6).map((item, index) => (
              <TouchableOpacity key={`${item.id}-${index}`} style={styles.flashCard} onPress={() => navigation.navigate('Home', { screen: 'FlashSaleDetail' })}>
                <Image source={{ uri: `https://loremflickr.com/300/300/fashion,sale?lock=${1970 + index}` }} style={styles.flashImage} />
                <View style={styles.flashDiscount}><Text style={styles.flashDiscountText}>-20%</Text></View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Top Products</Text>
          <FlatList
            horizontal
            data={topProducts}
            keyExtractor={(item, idx) => `top-${idx}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.topProductCircle} />}
          />
        </View>

        <View style={[styles.sectionBlock, styles.lastSection]}>
          <View style={styles.justHeaderRow}>
            <Text style={styles.sectionTitle}>Just For You</Text>
            <Icon name="star" size={12} color={COLORS.primary} />
          </View>
          <View style={styles.justGrid}>
            {homeProducts.slice(0, 6).map((item, index) => (
              <TouchableOpacity key={`just-${item.id}-${index}`} style={styles.justCard} onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: item } })}>
                <Image source={{ uri: `https://loremflickr.com/450/450/fashion,style?lock=${1980 + index}` }} style={styles.justImage} />
                <Text style={styles.justDesc} numberOfLines={2}>Lorem ipsum dolor sit amet consectetur</Text>
                <Text style={styles.justPrice}>$17,00</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {scannerVisible && (
        <Modal visible={scannerVisible} animationType="slide" onRequestClose={() => setScannerVisible(false)}>
          <SafeAreaView style={styles.scannerContainer}>
            <View style={styles.scannerHeader}>
              <TouchableOpacity onPress={() => setScannerVisible(false)}>
                <Icon name="arrow-left" size={22} color={COLORS.white} />
              </TouchableOpacity>
              <Text style={styles.scannerTitle}>Scan QR Code</Text>
              <View style={{ width: 22 }} />
            </View>

            {cameraPermission === false ? (
              <View style={styles.permissionWrap}>
                <Text style={styles.permissionText}>Camera permission is required to scan QR code.</Text>
                <TouchableOpacity style={styles.permissionBtn} onPress={() => setScannerVisible(false)}>
                  <Text style={styles.permissionBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            ) : cameraPermission === null ? (
              <View style={styles.permissionWrap}>
                <Text style={styles.permissionText}>Requesting camera permission...</Text>
              </View>
            ) : (
              <Camera
                style={styles.scannerCamera}
                type={Camera.Constants.Type.back}
                onBarCodeScanned={isScanned ? undefined : handleScanned}
                barCodeScannerSettings={{ barCodeTypes: [Camera.Constants.BarCodeType.qr] }}
              >
                <View style={styles.scanOverlay}>
                  <View style={styles.scanFrame} />
                  <Text style={styles.scanHint}>Point the camera at a QR code</Text>
                </View>
              </Camera>
            )}
          </SafeAreaView>
        </Modal>
      )}

      <Modal visible={storyModalVisible} transparent animationType="fade" onRequestClose={closeStoryModal}>
        <View style={styles.storyModalOverlay}>
          <TouchableOpacity style={styles.storyModalBackdrop} activeOpacity={1} onPress={closeStoryModal} />
          <View style={styles.storyModalCard}>
            {activeStory ? <Image source={{ uri: activeStory.image }} style={styles.storyModalImage} /> : null}
            <View style={styles.storyModalTopRow}>
              <View style={styles.storyModalBadge}><Text style={styles.storyModalBadgeText}>{activeStory?.title || 'Story'}</Text></View>
              <TouchableOpacity style={styles.storyModalClose} onPress={closeStoryModal}>
                <Icon name="x" size={16} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  scrollContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.xxlarge
  },
  topRow: {
    marginTop: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftTopRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  activityBadge: {
    marginLeft: SIZES.small,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: FONTS.medium
  },
  rightTopRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconButton: {
    marginLeft: SIZES.small,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FB'
  },
  greeting: {
    marginTop: SIZES.medium,
    fontSize: 34,
    lineHeight: 38,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  announcementCard: {
    marginTop: SIZES.small,
    backgroundColor: '#F2F2F4',
    borderRadius: SIZES.radius.medium,
    padding: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  announcementTitle: {
    fontSize: 13,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: 2
  },
  announcementSub: {
    width: 220,
    fontSize: 10,
    lineHeight: 13,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionBlock: {
    marginTop: SIZES.medium
  },
  recentBlock: {
    marginTop: SIZES.medium
  },
  recentTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold,
    marginBottom: 12
  },
  recentListContent: {
    paddingRight: 6
  },
  recentRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small
  },
  sectionTitle: {
    fontSize: 28,
    lineHeight: 30,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  seeAllWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  seeAllText: {
    marginRight: 6,
    fontSize: 12,
    color: COLORS.text.primary,
    fontFamily: FONTS.medium
  },
  recentAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  ordersWrap: {
    position: 'relative',
    marginTop: 6
  },
  ordersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderChip: {
    width: '31.8%',
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  orderChipText: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: FONTS.medium
  },
  orderDot: {
    position: 'absolute',
    top: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.success
  },
  orderDotPay: {
    left: '11%'
  },
  orderDotReceive: {
    left: '45%'
  },
  orderDotReview: {
    left: '79%'
  },
  storiesContent: {
    paddingRight: SIZES.medium
  },
  storyCard: {
    width: 98,
    height: 160,
    borderRadius: 9,
    marginRight: 5,
    overflow: 'hidden',
    position: 'relative'
  },
  storyImage: {
    width: '100%',
    height: '100%'
  },
  playCircle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -18,
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  storyBadge: {
    position: 'absolute',
    left: 6,
    top: 6,
    backgroundColor: COLORS.success,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  storyBadgeText: {
    color: COLORS.white,
    fontSize: 13,
    lineHeight: 14,
    fontFamily: FONTS.bold
  },
  newItemCard: {
    width: 86,
    marginRight: SIZES.small
  },
  newItemImage: {
    width: '100%',
    height: 86,
    borderRadius: SIZES.radius.small,
    marginBottom: 4
  },
  newItemDesc: {
    fontSize: 9,
    lineHeight: 12,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular,
    marginBottom: 3
  },
  newItemPrice: {
    fontSize: 11,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  popularCard: {
    width: 78,
    marginRight: SIZES.small,
    borderRadius: SIZES.radius.small,
    backgroundColor: '#F5F5F6',
    padding: 4
  },
  popularImage: {
    width: '100%',
    height: 60,
    borderRadius: SIZES.radius.small
  },
  popularBottom: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  popularNumber: {
    fontSize: 10,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  popularType: {
    fontSize: 10,
    color: COLORS.text.secondary,
    fontFamily: FONTS.medium
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  categoryCard: {
    width: '48.5%',
    borderRadius: SIZES.radius.small,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.small,
    padding: 4
  },
  categoryMosaic: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  mosaicImage: {
    width: '49%',
    aspectRatio: 1,
    borderRadius: 6,
    marginBottom: 4
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryName: {
    fontSize: 12,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  categoryCount: {
    minWidth: 30,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6
  },
  categoryCountText: {
    fontSize: 10,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  flashTimerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flashTimerChip: {
    minWidth: 22,
    height: 18,
    borderRadius: 4,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    paddingHorizontal: 4
  },
  flashTimerChipText: {
    fontSize: 10,
    color: COLORS.primary,
    fontFamily: FONTS.bold
  },
  flashGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  flashCard: {
    width: '32%',
    aspectRatio: 1,
    borderRadius: SIZES.radius.small,
    overflow: 'hidden',
    marginBottom: 4,
    position: 'relative'
  },
  flashImage: {
    width: '100%',
    height: '100%'
  },
  flashDiscount: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.error,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  flashDiscountText: {
    fontSize: 9,
    color: COLORS.white,
    fontFamily: FONTS.bold
  },
  topProductCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  justHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  justGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  justCard: {
    width: '48.5%',
    marginBottom: SIZES.small
  },
  justImage: {
    width: '100%',
    height: 96,
    borderRadius: SIZES.radius.small,
    marginBottom: 4
  },
  justDesc: {
    fontSize: 9,
    lineHeight: 12,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular
  },
  justPrice: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  lastSection: {
    marginBottom: SIZES.large
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: COLORS.black
  },
  scannerHeader: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scannerTitle: {
    color: COLORS.white,
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold
  },
  scannerCamera: {
    flex: 1
  },
  scanOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scanFrame: {
    width: 220,
    height: 220,
    borderColor: COLORS.white,
    borderWidth: 2,
    borderRadius: SIZES.radius.medium
  },
  scanHint: {
    marginTop: SIZES.medium,
    color: COLORS.white,
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium
  },
  permissionWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.xlarge
  },
  permissionText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    marginBottom: SIZES.large
  },
  permissionBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.medium,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.small
  },
  permissionBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.medium
  },
  storyModalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center'
  },
  storyModalBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  storyModalCard: {
    width: '86%',
    height: '72%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: COLORS.surface
  },
  storyModalImage: {
    width: '100%',
    height: '100%'
  },
  storyModalTopRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  storyModalBadge: {
    backgroundColor: COLORS.success,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  storyModalBadgeText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 12
  },
  storyModalClose: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
