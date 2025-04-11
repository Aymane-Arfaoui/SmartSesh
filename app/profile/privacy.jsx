import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { colors, typography, spacing, shadows } from '../../constants/theme';
import { ScreenWrapper } from '../../components/ScreenWrapper';

export default function PrivacyScreen() {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showJoinedSessions: true,
    allowMessages: true,
    showLocation: true,
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <ScreenWrapper title="Privacy">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Visibility</Text>
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingText}>Show Email</Text>
                <Text style={styles.settingDescription}>Allow other users to see your email address</Text>
              </View>
              <Switch
                value={settings.showEmail}
                onValueChange={() => handleToggle('showEmail')}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingText}>Show Joined Sessions</Text>
                <Text style={styles.settingDescription}>Display sessions you've joined on your profile</Text>
              </View>
              <Switch
                value={settings.showJoinedSessions}
                onValueChange={() => handleToggle('showJoinedSessions')}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication</Text>
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingText}>Allow Messages</Text>
                <Text style={styles.settingDescription}>Let other users send you messages</Text>
              </View>
              <Switch
                value={settings.allowMessages}
                onValueChange={() => handleToggle('allowMessages')}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingText}>Show Location</Text>
                <Text style={styles.settingDescription}>Display your location in study sessions</Text>
              </View>
              <Switch
                value={settings.showLocation}
                onValueChange={() => handleToggle('showLocation')}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.md,
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
  },
  settingContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textLight,
  },
}); 