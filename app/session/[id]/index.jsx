import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { colors, typography, spacing } from '../../../constants/theme';

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams();

  // In a real app, you would fetch the session details using the id
  const session = {
    id,
    title: 'Calculus Study Group',
    course: 'Math',
    date: 'Today, 3:00 PM',
    location: 'Library Room 203',
    members: 5,
    description: 'Join us for a comprehensive review of calculus concepts and problem-solving techniques.',
  };

  return (
    <ScreenWrapper title="Session Details">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{session.title}</Text>
          <Text style={styles.subtitle}>{session.date}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.sectionText}>{session.location}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{session.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Participants</Text>
          <Text style={styles.sectionText}>{session.members} members</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  sectionText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    lineHeight: typography.lineHeight.md,
  },
}); 