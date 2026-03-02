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
  Alert,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Camera } from 'expo-camera';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { PRODUCTS, FLASH_SALE_ITEMS } from '../../data/MockData';
import { useImagePicker } from '../../hooks/useImagePicker';

export default function ProfileScreen({ navigation }) {
  const { pickFromCamera, pickFromGallery } = useImagePicker();

  const [avatarUri, setAvatarUri] = useState('https://loremflickr.com/300/300/woman,portrait?lock=1201');
  const [scannerVisible, setScannerVisible] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const profileUser = {
    name: 'Romina',
    activity: 'My Activity'
  };

  const recentAvatars = [
    'https://loremflickr.com/200/200/fashion,woman?lock=1202',
    'https://loremflickr.com/200/200/style,girl?lock=1203',
    'https://loremflickr.com/200/200/portrait,woman?lock=1204',
    'https://loremflickr.com/200/200/face,model?lock=1205',
    'https://loremflickr.com/200/200/photo,woman?lock=1206'
  ];

  const stories = [
    { id: 's1', title: 'Live', image: 'https://loremflickr.com/300/360/woman,blue?lock=1210' },
    { id: 's2', title: 'New', image: 'https://loremflickr.com/300/360/fashion,pink?lock=1211' },
    { id: 's3', title: 'Best', image: 'https://loremflickr.com/300/360/model,dress?lock=1212' }
  ];

  const categoryTiles = [
    { id: 'c1', title: 'Clothing', image: 'https://loremflickr.com/260/200/clothes,fashion?lock=1215' },
    { id: 'c2', title: 'Shoes', image: 'https://loremflickr.com/260/200/shoes,sneakers?lock=1216' },
    { id: 'c3', title: 'Bags', image: 'https://loremflickr.com/260/200/bag,shopping?lock=1217' },
    { id: 'c4', title: 'Lingerie', image: 'https://loremflickr.com/260/200/lingerie,woman?lock=1218' }
  ];

  const topProducts = [
    'https://loremflickr.com/160/160/watch,luxury?lock=1220',
    'https://loremflickr.com/160/160/sunglasses,style?lock=1221',
    'https://loremflickr.com/160/160/shoes,product?lock=1222',
    'https://loremflickr.com/160/160/perfume,bottle?lock=1223',
    'https://loremflickr.com/160/160/bag,accessory?lock=1224'
  ];

  const profileProducts = useMemo(
    () => PRODUCTS.map((item, index) => ({
      ...item,
      image: `https://loremflickr.com/500/500/fashion,product?lock=${1230 + index}`
    })),
    []
  );

  useEffect(() => {
    const requestPermission = async () => {
      if (scannerVisible) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(status === 'granted');
      }
    };

    requestPermission();
  }, [scannerVisible]);

  const openImagePicker = () => {
    Alert.alert('Profile Image', 'Update your profile image', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const result = await pickFromCamera();
          if (result?.uri) setAvatarUri(result.uri);
        }
      },
      {
        text: 'Choose from Gallery',
        onPress: async () => {
          const result = await pickFromGallery();
          if (result?.uri) setAvatarUri(result.uri);
        }
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleScanResult = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      setScannerVisible(false);
      Alert.alert('QR Scanned', data || 'QR code scanned successfully.');
      setTimeout(() => setScanned(false), 400);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={openImagePicker} activeOpacity={0.85}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <View style={styles.avatarEditDot}>
            <Icon name="camera" size={10} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        <View style={styles.activityPill}>
          <Text style={styles.activityPillText}>{profileUser.activity}</Text>
        </View>
      </View>

      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => setScannerVisible(true)}>
          <Icon name="maximize" size={18} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="bell" size={18} color={COLORS.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="menu" size={18} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSectionHeader = (title, onSeeAll) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity style={styles.seeAllWrap} onPress={onSeeAll}>
        <Text style={styles.seeAllText}>See All</Text>
        <View style={styles.smallArrowCircle}>
          <Icon name="arrow-right" size={11} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {renderHeader()}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.greetingText}>Hello, {profileUser.name}!</Text>

        <TouchableOpacity style={styles.announcementRow}>
          <Text style={styles.announcementText}>Announcement</Text>
          <View style={styles.smallArrowCircle}>
            <Icon name="arrow-right" size={11} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Recently viewed</Text>
          <FlatList
            horizontal
            data={recentAvatars}
            keyExtractor={(item, index) => `recent-avatar-${index}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.recentAvatar} />}
          />
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>My Orders</Text>
          <View style={styles.orderPillsRow}>
            <TouchableOpacity style={styles.orderPill}><Text style={styles.orderPillText}>To Pay</Text></TouchableOpacity>
            <TouchableOpacity style={styles.orderPill}><Text style={styles.orderPillText}>To Receive</Text></TouchableOpacity>
            <TouchableOpacity style={styles.orderPill}><Text style={styles.orderPillText}>To Review</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Stories</Text>
          <FlatList
            horizontal
            data={stories}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.storyCard}>
                <Image source={{ uri: item.image }} style={styles.storyImage} />
                <Text style={styles.storyText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.sectionBlock}>
          {renderSectionHeader('New Items', () => navigation.navigate('Home', { screen: 'ProductSearch' }))}
          <FlatList
            horizontal
            data={profileProducts.slice(0, 5)}
            keyExtractor={(item) => `new-${item.id}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.newItemCard}
                onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: item } })}
              >
                <Image source={{ uri: item.image }} style={styles.newItemImage} />
                <Text style={styles.productPriceSmall}>${Number(item.price).toFixed(2)}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.sectionBlock}>
          {renderSectionHeader('Most Popular', () => navigation.navigate('Home', { screen: 'ProductSearch' }))}
          <FlatList
            horizontal
            data={profileProducts.slice(0, 4)}
            keyExtractor={(item) => `popular-${item.id}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.popularCard} onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: item } })}>
                <Image source={{ uri: item.image }} style={styles.popularImage} />
                <View style={styles.popularMetaRow}>
                  <Text style={styles.popularPrice}>1780</Text>
                  <Icon name="heart" size={16} color={COLORS.primary} />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.sectionBlock}>
          {renderSectionHeader('Categories', () => navigation.navigate('Categories'))}
          <View style={styles.categoriesGrid}>
            {categoryTiles.map((tile) => (
              <TouchableOpacity key={tile.id} style={styles.categoryTile} onPress={() => navigation.navigate('Categories')}>
                <Image source={{ uri: tile.image }} style={styles.categoryTileImage} />
                <Text style={styles.categoryTileText}>{tile.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Flash Sale</Text>
            <View style={styles.flashTimerWrap}>
              <Icon name="clock" size={12} color={COLORS.primary} />
              <Text style={styles.flashTimerText}>00 24 58</Text>
            </View>
          </View>

          <View style={styles.flashGrid}>
            {[...FLASH_SALE_ITEMS, ...FLASH_SALE_ITEMS].slice(0, 6).map((item, index) => (
              <TouchableOpacity key={`${item.id}-${index}`} style={styles.flashCard} onPress={() => navigation.navigate('Home', { screen: 'FlashSaleDetail' })}>
                <Image source={{ uri: `https://loremflickr.com/280/280/fashion,sale?lock=${1260 + index}` }} style={styles.flashImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Top Products</Text>
          <FlatList
            horizontal
            data={topProducts}
            keyExtractor={(item, index) => `top-${index}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.topProductCircle} />}
          />
        </View>

        <View style={[styles.sectionBlock, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <View style={styles.justHeader}>
              <Text style={styles.sectionTitle}>Just For You</Text>
              <Icon name="star" size={12} color={COLORS.primary} />
            </View>
          </View>

          <View style={styles.justGrid}>
            {profileProducts.slice(0, 6).map((item, index) => (
              <TouchableOpacity
                key={`just-${item.id}-${index}`}
                style={styles.justCard}
                onPress={() => navigation.navigate('Home', { screen: 'ProductDetail', params: { product: item } })}
              >
                <Image source={{ uri: `https://loremflickr.com/420/420/fashion,woman?lock=${1280 + index}` }} style={styles.justImage} />
                <Text style={styles.justDesc} numberOfLines={2}>Lorem ipsum dolor sit amet consectetur.</Text>
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
                onBarCodeScanned={scanned ? undefined : handleScanResult}
                barCodeScannerSettings={{
                  barCodeTypes: [Camera.Constants.BarCodeType.qr]
                }}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.medium,
    paddingTop: SIZES.small,
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17
  },
  avatarEditDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    right: -1,
    bottom: -1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityPill: {
    marginLeft: SIZES.small,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.round,
    paddingHorizontal: SIZES.small,
    paddingVertical: 4
  },
  activityPillText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: 10
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconBtn: {
    marginLeft: SIZES.small
  },
  scrollContent: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.large
  },
  greetingText: {
    marginTop: SIZES.small,
    fontSize: 32,
    lineHeight: 34,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold
  },
  announcementRow: {
    marginTop: SIZES.small,
    marginBottom: SIZES.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  announcementText: {
    fontSize: 10,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular
  },
  smallArrowCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionBlock: {
    marginBottom: SIZES.medium
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small
  },
  sectionTitle: {
    fontSize: FONTS.sizes.large,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold,
    marginBottom: SIZES.small
  },
  seeAllWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  seeAllText: {
    fontSize: 10,
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    marginRight: 4
  },
  recentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: SIZES.small
  },
  orderPillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderPill: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    borderRadius: SIZES.radius.small,
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
    marginRight: 6
  },
  orderPillText: {
    fontSize: 10,
    color: COLORS.primary,
    fontFamily: FONTS.medium
  },
  storyCard: {
    width: 76,
    marginRight: SIZES.small
  },
  storyImage: {
    width: 76,
    height: 102,
    borderRadius: SIZES.radius.small,
    marginBottom: 3
  },
  storyText: {
    fontSize: 10,
    color: COLORS.text.primary,
    fontFamily: FONTS.medium,
    textAlign: 'center'
  },
  newItemCard: {
    width: 60,
    marginRight: SIZES.small
  },
  newItemImage: {
    width: 60,
    height: 72,
    borderRadius: SIZES.radius.small
  },
  productPriceSmall: {
    marginTop: 4,
    fontSize: 10,
    color: COLORS.text.primary,
    fontFamily: FONTS.medium
  },
  popularCard: {
    width: 70,
    marginRight: SIZES.small,
    backgroundColor: '#F4F4F4',
    borderRadius: SIZES.radius.small,
    padding: 4
  },
  popularImage: {
    width: '100%',
    height: 62,
    borderRadius: SIZES.radius.small
  },
  popularMetaRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  popularPrice: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  categoryTile: {
    width: '48.5%',
    marginBottom: SIZES.small
  },
  categoryTileImage: {
    width: '100%',
    height: 74,
    borderRadius: SIZES.radius.small
  },
  categoryTileText: {
    marginTop: 2,
    fontSize: 10,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary
  },
  flashTimerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: SIZES.radius.small,
    paddingHorizontal: 6,
    height: 20
  },
  flashTimerText: {
    marginLeft: 4,
    color: COLORS.primary,
    fontSize: 10,
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
    marginBottom: 4,
    borderRadius: SIZES.radius.small,
    overflow: 'hidden'
  },
  flashImage: {
    width: '100%',
    height: '100%'
  },
  topProductCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 6
  },
  justHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  lastSection: {
    marginBottom: SIZES.xxlarge
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
    height: 92,
    borderRadius: SIZES.radius.small,
    marginBottom: 3
  },
  justDesc: {
    fontSize: 10,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    lineHeight: 13
  },
  justPrice: {
    marginTop: 3,
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
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
  }
});
