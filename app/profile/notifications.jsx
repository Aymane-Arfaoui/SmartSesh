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

export default function NotificationsScreen() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    sessionReminders: true,
    newMessages: true,
    groupUpdates: true,
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <ScreenWrapper title="Notifications">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingText}>Push Notifications</Text>
                <Text style={styles.settingDescription}>Receive push notifications on your device</Text>
              </View>
              <Switch
                value={settings.pushNotifications}
                onValueChange={() => handleToggle('pushNotifications')}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingText}>Email Notifications</Text>
                <Text style={styles.settingDescription}>Receive email notifications</Text>
              </View>
              <Switch
                value={settings.emailNotifications}
                onValueChange={() => handleToggle('emailNotifications')}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Study Sessions</Text>
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingText}>Session Reminders</Text>
                <Text style={styles.settingDescription}>Get reminders before your study sessions</Text>
              </View>
              <Switch
                value={settings.sessionReminders}
                onValueChange={() => handleToggle('sessionReminders')}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingText}>New Messages</Text>
                <Text style={styles.settingDescription}>Get notified about new messages in your sessions</Text>
              </View>
              <Switch
                value={settings.newMessages}
                onValueChange={() => handleToggle('newMessages')}
                trackColor={{ false: colors.borderLight, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingText}>Group Updates</Text>
                <Text style={styles.settingDescription}>Get notified about changes to your study groups</Text>
              </View>
              <Switch
                value={settings.groupUpdates}
                onValueChange={() => handleToggle('groupUpdates')}
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