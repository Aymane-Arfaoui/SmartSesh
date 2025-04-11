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

// Mock data for upcoming sessions
const mockSessions = [
  {
    id: '1',
    title: 'Calculus Study Group',
    course: 'Math',
    date: 'Today, 3:00 PM',
    location: 'Library Room 203',
    members: 5,
  },
  {
    id: '2',
    title: 'Physics Lab Review',
    course: 'Science',
    date: 'Tomorrow, 2:00 PM',
    location: 'Science Building Room 101',
    members: 3,
  },
  {
    id: '3',
    title: 'History Essay Workshop',
    course: 'History',
    date: 'Friday, 4:00 PM',
    location: 'Humanities Building Room 305',
    members: 4,
  },
];

export const HomeScreen = () => {
  return (
    <ScreenWrapper showBackButton={false}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>SmartSesh</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>Alex!</Text>
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

          {mockSessions.map((session) => (
            <Card
              key={session.id}
              title={session.title}
              subtitle={session.date}
              description={`${session.location} • ${session.members} members`}
              courseType={session.course}
              onPress={() => router.push(`/session/${session.id}`)}
              footer={
                <View style={styles.cardFooter}>
                  <Button
                    title="Join Session"
                    size="small"
                    onPress={() => router.push(`/session/${session.id}/join`)}
                  />
                </View>
              }
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => router.push('/create-session')}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="add-circle" size={28} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>Create Session</Text>
              <Text style={styles.quickActionSubtext}>Start a new study group</Text>
            </TouchableOpacity>

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
        </View>
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
    paddingHorizontal: spacing.lg,
  },
  titleContainer: {
    marginBottom: spacing.xl,
  },
  appTitle: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  divider: {
    height: 3,
    width: 40,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  welcomeContainer: {
    marginTop: spacing.lg,
  },
  welcomeText: {
    fontSize: typography.fontSize.lg,
    color: colors.textLight,
    fontFamily: typography.fontFamily.medium,
  },
  nameText: {
    fontSize: typography.fontSize.xxl,
    color: colors.textDark,
    fontFamily: typography.fontFamily.bold,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    color: colors.textDark,
    fontFamily: typography.fontFamily.bold,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    marginRight: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    borderRadius: spacing.lg,
    padding: spacing.lg,
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
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...Platform.select({
      ios: {
        ...shadows.sm,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  quickActionText: {
    fontSize: typography.fontSize.md,
    color: colors.textDark,
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  quickActionSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
}); 