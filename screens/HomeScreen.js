import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { colors, typography, spacing, shadows } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { getUpcomingSessions, isSessionJoined, joinSession } from '../data/mockSessions';

export const HomeScreen = () => {
  const upcomingSessions = getUpcomingSessions();

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sessionDate = new Date(date);

    if (sessionDate.toDateString() === today.toDateString()) {
      return `Today, ${sessionDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    } else if (sessionDate.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${sessionDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    } else {
      return sessionDate.toLocaleString('en-US', {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    }
  };

  return (
    <ScreenWrapper showBackButton={false}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.titleContainerStack}>
              <Text style={styles.appTitle}>SmartSesh</Text>
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => router.push('/profile')}
              >
                <Ionicons name="settings-outline" size={24} color={colors.textDark} />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
          </View>
          <View style={styles.headerButtons}>

            <TouchableOpacity
              style={styles.createButton}
              onPress={() => router.push('/create-session')}
            >
              <View style={styles.createButtonContent}>
                <Ionicons name="add-circle" size={24} color={colors.textInverse} />
                <Text style={styles.createButtonText}>Create Session</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => router.push('/calendar')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {upcomingSessions.map((session) => (
            <Card
              key={session.id}
              title={session.title}
              subtitle={formatDate(session.date)}
              description={
                isSessionJoined(session.id)
                  ? `${session.location}\nAlex (You) and ${session.members - 1} others`
                  : `${session.location}\n${session.members} members`
              }
              courseType={session.course}
              onPress={() => router.push(`/session/${session.id}`)}
              footer={
                <View style={styles.cardFooter}>
                  {isSessionJoined(session.id) ? (
                    <Button
                      title="Joined"
                      size="small"
                      disabled={true}
                      style={styles.joinedButton}
                    />
                  ) : (
                    <Button
                      title="Join Session"
                      size="small"
                      onPress={() => {
                        joinSession(session.id);
                        router.push(`/session/${session.id}/join`);
                      }}
                    />
                  )}
                </View>
              }
            />
          ))}
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => router.push('/groups')}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="search" size={28} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>Find Groups</Text>
              <Text style={styles.quickActionSubtext}>Join existing sessions</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: spacing.xl,
  },
  titleContainer: {
    marginBottom: spacing.md,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: "space-between",
    // gap: spacing.xl,
  },
  titleContainerStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    gap: spacing.xl,
  },
  appTitle: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
  },
  divider: {
    height: 4,
    width: 40,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
    borderRadius: 2,
  },
  welcomeContainer: {
    marginBottom: spacing.lg,
  },
  welcomeText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    color: colors.textLight,
  },
  nameText: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
  },
  createButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.lg,
    padding: spacing.md,
    ...Platform.select({
      ios: {
        ...shadows.sm,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  createButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.textInverse,
    marginLeft: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
    marginRight: spacing.xs,
  },
  cardFooter: {
    marginTop: spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  quickAction: {
    width: '100%',
    padding: spacing.md,
    backgroundColor: colors.backgroundDark,
    borderRadius: spacing.lg,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        ...shadows.sm,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  quickActionSubtext: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.textLight,
  },
  joinedButton: {
    backgroundColor: colors.textLight,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-end",
    gap: spacing.xl,
  },
  settingsButton: {
    padding: spacing.sm,
  },
}); 