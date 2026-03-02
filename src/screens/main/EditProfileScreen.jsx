import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/Colors';
import { useImagePicker } from '../../hooks/useImagePicker';
import { useAuth } from '../../Context/AuthContext';

const FALLBACK_AVATAR = require('../../../assets/images/sample/profile-1.jpg');

export default function EditProfileScreen({ navigation }) {
  const { user, updateUserProfile } = useAuth();
  const { pickFromCamera, pickFromGallery } = useImagePicker();

  const initialName = useMemo(() => user?.name || 'Romina', [user?.name]);
  const initialEmail = useMemo(() => user?.email || 'gmail@example.com', [user?.email]);
  const initialPassword = useMemo(() => user?.password || '..........', [user?.password]);
  const initialAvatar = useMemo(() => user?.avatar || FALLBACK_AVATAR, [user?.avatar]);

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(initialName);
    setEmail(initialEmail);
    setPassword(initialPassword);
    setAvatar(initialAvatar);
  }, [initialName, initialEmail, initialPassword, initialAvatar]);

  const avatarSource = typeof avatar === 'string' ? { uri: avatar } : avatar;

  const onPickPhoto = () => {
    Alert.alert('Change Photo', 'Choose image source', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const image = await pickFromCamera();
          if (image?.uri) setAvatar(image.uri);
        }
      },
      {
        text: 'Choose from Gallery',
        onPress: async () => {
          const image = await pickFromGallery();
          if (image?.uri) setAvatar(image.uri);
        }
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const onSave = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Required', 'Please fill name, email and password.');
      return;
    }

    setSaving(true);
    const result = await updateUserProfile({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      avatar
    });
    setSaving(false);

    if (result?.success) {
      Alert.alert('Success', 'Profile updated successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
      return;
    }

    Alert.alert('Error', result?.error || 'Could not save profile.');
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
      <Text style={styles.subtitle}>Your Profile</Text>

      <View style={styles.avatarWrap}>
        <Image source={avatarSource} style={styles.avatar} />
        <TouchableOpacity style={styles.editDot} onPress={onPickPhoto}>
          <Icon name="edit-2" size={10} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#8E8E93"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#8E8E93"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#8E8E93"
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveButton} onPress={onSave} disabled={saving}>
          <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.medium
  },
  topBar: {
    marginTop: SIZES.small,
    marginBottom: 10
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 34,
    lineHeight: 36,
    fontFamily: FONTS.bold,
    color: '#202020'
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
    color: '#202020',
    fontFamily: FONTS.medium
  },
  avatarWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    overflow: 'visible',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#D6F1EE',
    justifyContent: 'center'
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 44
  },
  editDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white
  },
  input: {
    height: 42,
    borderRadius: 8,
    backgroundColor: '#EEF1F9',
    paddingHorizontal: 12,
    marginBottom: 8,
    color: '#202020',
    fontSize: 14,
    fontFamily: FONTS.regular
  },
  bottomBar: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  saveButton: {
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: FONTS.medium
  }
});
