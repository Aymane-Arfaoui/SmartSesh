import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { colors, typography, spacing, shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function EditProfileScreen() {
  const [name, setName] = useState('Alex');
  const [email, setEmail] = useState('alex@example.com');
  const [bio, setBio] = useState('');

  const handleSave = () => {
    // Here you would typically save the profile changes
    router.back();
  };

  return (
    <ScreenWrapper title="Edit Profile">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="camera" size={20} color={colors.textInverse} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <Input
            label="Bio"
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
          />
        </View>

        <Button
          title="Save Changes"
          onPress={handleSave}
          style={styles.saveButton}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.md,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        ...shadows.sm,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  form: {
    gap: spacing.md,
  },
  saveButton: {
    marginTop: spacing.xl,
  },
}); 