import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Switch,
} from 'react-native';
import { colors, typography, spacing, shadows } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScreenWrapper } from '../components/ScreenWrapper';

export const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = (value) => {
    setIsDarkMode(value);
    // Here you would typically update the app's theme state
    // This would be handled by a theme context/provider
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Alex</Text>
              <Text style={styles.email}>alex@example.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.settingsList}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/profile/edit')}
            >
              <View style={styles.settingContent}>
                <Ionicons name="person-outline" size={24} color={colors.textDark} />
                <Text style={styles.settingText}>Edit Profile</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/profile/notifications')}
            >
              <View style={styles.settingContent}>
                <Ionicons name="notifications-outline" size={24} color={colors.textDark} />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/profile/privacy')}
            >
              <View style={styles.settingContent}>
                <Ionicons name="lock-closed-outline" size={24} color={colors.textDark} />
                <Text style={styles.settingText}>Privacy</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingsList}>
            {/* <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Ionicons name="moon-outline" size={24} color={colors.textDark} />
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View> */}

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/profile/language')}
            >
              <View style={styles.settingContent}>
                <Ionicons name="language-outline" size={24} color={colors.textDark} />
                <Text style={styles.settingText}>Language</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    ...Platform.select({
      ios: {
        ...shadows.sm,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.textLight,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  settingsList: {
    backgroundColor: colors.background,
    borderRadius: spacing.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        ...shadows.sm,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    width: '100%',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.textDark,
  },
  logoutButton: {
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.error,
    borderRadius: spacing.lg,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        ...shadows.sm,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  logoutText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.bold,
    color: colors.textInverse,
  },
});

export default ProfileScreen; 