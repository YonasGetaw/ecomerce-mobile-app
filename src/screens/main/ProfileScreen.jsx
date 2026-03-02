import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image as RNImage,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Modal,
  Alert
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Camera } from 'expo-camera';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { PRODUCTS, FLASH_SALE_ITEMS } from '../../data/MockData';
import { useImagePicker } from '../../hooks/useImagePicker';

const PROFILE_IMAGE_BLUR = 30;
const PROFILE_IMAGE_OVERLAY = 'rgba(0,0,0,0.102)';
const SAMPLE_PROFILE_IMAGES = [
  require('../../../assets/images/sample/profile-1.jpg'),
  require('../../../assets/images/sample/profile-2.jpg'),
  require('../../../assets/images/sample/profile-3.jpg'),
  require('../../../assets/images/sample/profile-4.jpg'),
  require('../../../assets/images/sample/profile-5.jpg'),
  require('../../../assets/images/sample/profile-6.jpg')
];

function BlurredImage({ source, style }) {
  return (
    <View style={[style, styles.blurredImageWrap]}>
      <RNImage source={source} style={styles.blurredImage} blurRadius={PROFILE_IMAGE_BLUR} />
      <View pointerEvents="none" style={styles.blurredImageOverlay} />
    </View>
  );
}

export default function ProfileScreen({ navigation }) {
  const { pickFromCamera, pickFromGallery } = useImagePicker();

  const [avatarUri, setAvatarUri] = useState(SAMPLE_PROFILE_IMAGES[0]);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [selectedOrderTab, setSelectedOrderTab] = useState('receive');
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [storyStep, setStoryStep] = useState(0);

  const orderTabs = [
    { key: 'pay', label: 'To Pay', image: SAMPLE_PROFILE_IMAGES[0] },
    { key: 'receive', label: 'To Recieve', image: SAMPLE_PROFILE_IMAGES[1] },
    { key: 'review', label: 'To Review', image: SAMPLE_PROFILE_IMAGES[2] }
  ];

  const recentViewed = [
    SAMPLE_PROFILE_IMAGES[0],
    SAMPLE_PROFILE_IMAGES[1],
    SAMPLE_PROFILE_IMAGES[2],
    SAMPLE_PROFILE_IMAGES[3],
    SAMPLE_PROFILE_IMAGES[4]
  ];

  const stories = [
    { id: '1', title: 'Live', image: SAMPLE_PROFILE_IMAGES[0] },
    { id: '2', title: 'New', image: SAMPLE_PROFILE_IMAGES[1] },
    { id: '3', title: 'Top', image: SAMPLE_PROFILE_IMAGES[2] },
    { id: '4', title: 'Hot', image: SAMPLE_PROFILE_IMAGES[3] }
  ];

  const productImages = [
    SAMPLE_PROFILE_IMAGES[0],
    SAMPLE_PROFILE_IMAGES[1],
    SAMPLE_PROFILE_IMAGES[2],
    SAMPLE_PROFILE_IMAGES[3],
    SAMPLE_PROFILE_IMAGES[4],
    SAMPLE_PROFILE_IMAGES[5]
  ];

  const categories = [
    {
      id: '1',
      title: 'Clothing',
      count: 109,
      images: [
        SAMPLE_PROFILE_IMAGES[0],
        SAMPLE_PROFILE_IMAGES[1],
        SAMPLE_PROFILE_IMAGES[2],
        SAMPLE_PROFILE_IMAGES[3]
      ]
    },
    {
      id: '2',
      title: 'Shoes',
      count: 530,
      images: [
        SAMPLE_PROFILE_IMAGES[1],
        SAMPLE_PROFILE_IMAGES[2],
        SAMPLE_PROFILE_IMAGES[3],
        SAMPLE_PROFILE_IMAGES[4]
      ]
    },
    {
      id: '3',
      title: 'Bags',
      count: 87,
      images: [
        SAMPLE_PROFILE_IMAGES[2],
        SAMPLE_PROFILE_IMAGES[3],
        SAMPLE_PROFILE_IMAGES[4],
        SAMPLE_PROFILE_IMAGES[5]
      ]
    },
    {
      id: '4',
      title: 'Lingerie',
      count: 218,
      images: [
        SAMPLE_PROFILE_IMAGES[3],
        SAMPLE_PROFILE_IMAGES[4],
        SAMPLE_PROFILE_IMAGES[5],
        SAMPLE_PROFILE_IMAGES[0]
      ]
    }
  ];

  const topProducts = [
    SAMPLE_PROFILE_IMAGES[1],
    SAMPLE_PROFILE_IMAGES[2],
    SAMPLE_PROFILE_IMAGES[3],
    SAMPLE_PROFILE_IMAGES[4],
    SAMPLE_PROFILE_IMAGES[5]
  ];

  const justForYouItems = [
    { id: 'j1', image: SAMPLE_PROFILE_IMAGES[0], description: 'Lorem ipsum dolor sit amet consectetur', price: '$17,00' },
    { id: 'j2', image: SAMPLE_PROFILE_IMAGES[1], description: 'Lorem ipsum dolor sit amet consectetur', price: '$17,00' },
    { id: 'j3', image: SAMPLE_PROFILE_IMAGES[2], description: 'Lorem ipsum dolor sit amet consectetur', price: '$17,00' },
    { id: 'j4', image: SAMPLE_PROFILE_IMAGES[3], description: 'Lorem ipsum dolor sit amet consectetur', price: '$17,00' },
    { id: 'j5', image: SAMPLE_PROFILE_IMAGES[4], description: 'Lorem ipsum dolor sit amet consectetur', price: '$17,00' },
    { id: 'j6', image: SAMPLE_PROFILE_IMAGES[5], description: 'Lorem ipsum dolor sit amet consectetur', price: '$17,00' }
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
    setStoryStep(0);
    setStoryModalVisible(true);
  };

  const openLivePage = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Home',
        params: { screen: 'FlashSaleDetail' }
      })
    );

    navigation.navigate('Home', { screen: 'FlashSaleDetail' });
  };

  const closeStoryModal = () => {
    setStoryModalVisible(false);
    setActiveStory(null);
    setStoryStep(0);
  };

  const openStoryProductStep = () => {
    setStoryStep(1);
  };

  const handleStoryShopPress = () => {
    setStoryModalVisible(false);
    setActiveStory(null);
    setStoryStep(0);

    setTimeout(() => {
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Home',
          params: { screen: 'ProductSearch' }
        })
      );

      navigation.navigate('Home', { screen: 'ProductSearch' });
    }, 50);
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
              <BlurredImage source={typeof avatarUri === 'string' ? { uri: avatarUri } : avatarUri} style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.activityBadge}><Text style={styles.activityText}>My Activity</Text></View>
          </View>

          <View style={styles.rightTopRow}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setScannerVisible(true)}>
              <Icon name="maximize" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Icon name="list" size={16} color={COLORS.primary} /></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
              <Icon name="settings" size={16} color={COLORS.primary} />
            </TouchableOpacity>
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
              <BlurredImage key={`recent-${idx}`} source={item} style={styles.recentAvatar} />
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
                  <BlurredImage source={tab.image} style={styles.orderChipImage} />
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
              <TouchableOpacity
                style={styles.storyCard}
                onPress={() => (index === 0 ? openLivePage() : handleStoryPress(item))}
                activeOpacity={0.9}
              >
                <BlurredImage source={item.image} style={styles.storyImage} />
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
          <View style={styles.newItemsHeader}>
            <Text style={styles.newItemsTitle}>New Items</Text>
            <TouchableOpacity style={styles.newItemsSeeAllWrap} onPress={() => navigation.navigate('Home', { screen: 'ProductSearch' })}>
              <Text style={styles.newItemsSeeAllText}>See All</Text>
              <View style={styles.newItemsArrowCircle}><Icon name="arrow-right" size={12} color={COLORS.white} /></View>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={homeProducts.slice(0, 5)}
            keyExtractor={(item) => `new-${item.id}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newItemsListContent}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.newItemCard} onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: item } })}>
                <BlurredImage source={item.image} style={styles.newItemImage} />
                <Text style={styles.newItemDesc} numberOfLines={2}>Lorem ipsum dolor sit amet consectetur.</Text>
                <Text style={styles.newItemPrice}>${Number(item.price).toFixed(2).replace('.', ',')}</Text>
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
                <BlurredImage source={item.image} style={styles.popularImage} />
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
                    <BlurredImage key={`${category.id}-${index}`} source={imageUri} style={styles.mosaicImage} />
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
                <BlurredImage source={SAMPLE_PROFILE_IMAGES[index % SAMPLE_PROFILE_IMAGES.length]} style={styles.flashImage} />
                <View style={styles.flashDiscount}><Text style={styles.flashDiscountText}>-20%</Text></View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Top Products</Text>
          <View style={styles.topProductsRow}>
            {topProducts.slice(0, 5).map((item, idx) => (
              <BlurredImage key={`top-${idx}`} source={item} style={styles.topProductCircle} />
            ))}
          </View>
        </View>

        <View style={[styles.sectionBlock, styles.lastSection]}>
          <View style={styles.justHeaderRow}>
            <Text style={styles.sectionTitle}>Just For You</Text>
            <Icon name="star" size={12} color={COLORS.primary} />
          </View>
          <View style={styles.justGrid}>
            {justForYouItems.map((item, index) => (
              <TouchableOpacity key={item.id} style={styles.justCard} onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: homeProducts[index % homeProducts.length] } })}>
                <View style={styles.justImageWrap}>
                  <RNImage source={item.image} style={styles.justImage} />
                </View>
                <Text style={styles.justDesc} numberOfLines={2}>{item.description}</Text>
                <Text style={styles.justPrice}>{item.price}</Text>
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

      <Modal visible={storyModalVisible} animationType="slide" onRequestClose={closeStoryModal}>
        <SafeAreaView style={styles.storyFlowScreen}>
          <View style={styles.storyFlowHeader}>
            <Text style={styles.storyFlowTitle}>{storyStep === 0 ? '20 Story + Dots' : '22 Story + Product Style 01'}</Text>
            <TouchableOpacity style={styles.storyFlowClose} onPress={closeStoryModal}>
              <Icon name="x" size={18} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>

          {storyStep === 0 ? (
            <View style={styles.storyFlowCard}>
              <TouchableOpacity activeOpacity={0.95} style={styles.storyFlowImageWrap} onPress={openStoryProductStep}>
                {activeStory ? <BlurredImage source={activeStory.image} style={styles.storyFlowImage} /> : null}
                <TouchableOpacity style={[styles.storyFlowDot, styles.storyFlowDotLeft]} onPress={openStoryProductStep} />
                <TouchableOpacity style={[styles.storyFlowDot, styles.storyFlowDotRight]} onPress={openStoryProductStep} />
              </TouchableOpacity>
              <View style={styles.storyFlowPagination}>
                {[0, 1, 2, 3, 4, 5].map((dot) => (
                  <View key={`story-step1-dot-${dot}`} style={[styles.storyFlowPageDot, dot === 2 && styles.storyFlowPageDotActive]} />
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.storyFlowCard}>
              <View style={styles.storyFlowProductImageWrap}>
                <BlurredImage source={SAMPLE_PROFILE_IMAGES[5]} style={styles.storyFlowProductImage} />
              </View>
              <View style={styles.storyFlowProductRow}>
                <Text style={styles.storyFlowProductText}>Lorem ipsum dolor sit amet,{`\n`}consectetur adipiscing elit.</Text>
                <TouchableOpacity style={styles.storyFlowShopBtn} onPress={handleStoryShopPress}>
                  <Text style={styles.storyFlowShopText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.storyFlowPagination}>
                {[0, 1, 2, 3, 4, 5].map((dot) => (
                  <View key={`story-step2-dot-${dot}`} style={[styles.storyFlowPageDot, dot === 2 && styles.storyFlowPageDotActive]} />
                ))}
              </View>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blurredImageWrap: {
    overflow: 'hidden'
  },
  blurredImage: {
    width: '100%',
    height: '100%'
  },
  blurredImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: PROFILE_IMAGE_OVERLAY
  },
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
    fontSize: 24,
    lineHeight: 26,
    color: '#202020',
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
  newItemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  newItemsTitle: {
    fontSize: 24,
    lineHeight: 26,
    color: '#202020',
    fontFamily: FONTS.bold
  },
  newItemsSeeAllWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  newItemsSeeAllText: {
    marginRight: 8,
    fontSize: 14,
    color: COLORS.text.primary,
    fontFamily: FONTS.semiBold
  },
  newItemsArrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  newItemsListContent: {
    paddingRight: 10
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6
  },
  orderChipImage: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 5,
    borderWidth: 1,
    borderColor: COLORS.white
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
    width: 142,
    marginRight: 12
  },
  newItemImage: {
    width: '100%',
    height: 124,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#F1F1F1'
  },
  newItemDesc: {
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular,
    marginBottom: 6
  },
  newItemPrice: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  popularCard: {
    width: 92,
    marginRight: SIZES.small,
    borderRadius: SIZES.radius.small,
    backgroundColor: '#F5F5F6',
    padding: 5
  },
  popularImage: {
    width: '100%',
    height: 88,
    borderRadius: SIZES.radius.small
  },
  popularBottom: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  popularNumber: {
    fontSize: 12,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  popularType: {
    fontSize: 12,
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
  topProductsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6
  },
  topProductCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: '#ECECEC',
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
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
    marginBottom: 12
  },
  justImageWrap: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8
  },
  justImage: {
    width: '100%',
    height: 164
  },
  justDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular
  },
  justPrice: {
    marginTop: 6,
    fontSize: 16,
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
  storyFlowScreen: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 14
  },
  storyFlowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  storyFlowTitle: {
    fontSize: 18,
    color: '#BCBCBC',
    fontFamily: FONTS.bold
  },
  storyFlowClose: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  storyFlowCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10
  },
  storyFlowImageWrap: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#1EA5FF',
    position: 'relative'
  },
  storyFlowImage: {
    width: '100%',
    height: '100%'
  },
  storyFlowDot: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.white
  },
  storyFlowDotLeft: {
    left: '22%',
    top: '46%'
  },
  storyFlowDotRight: {
    right: '30%',
    top: '65%'
  },
  storyFlowProductImageWrap: {
    height: '78%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.warningLight,
    marginBottom: 10
  },
  storyFlowProductImage: {
    width: '100%',
    height: '100%'
  },
  storyFlowProductRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  storyFlowProductText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text.primary,
    fontFamily: FONTS.regular,
    flex: 1,
    marginRight: 10
  },
  storyFlowShopBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 10
  },
  storyFlowShopText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: 16
  },
  storyFlowPagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6
  },
  storyFlowPageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#BDD1F4',
    marginHorizontal: 5
  },
  storyFlowPageDotActive: {
    width: 34,
    borderRadius: 8,
    backgroundColor: COLORS.primary
  },
  storyModalBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
