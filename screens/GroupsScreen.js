import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { colors, typography, spacing } from '../constants/theme';
import { router } from 'expo-router';
import { ScreenWrapper } from '../components/ScreenWrapper';

// Mock data for study groups
const mockGroups = [
  {
    id: '1',
    title: 'Calculus Study Group',
    course: 'Math',
    members: 12,
    description: 'Weekly study sessions for Calculus I',
  },
  {
    id: '2',
    title: 'Physics Lab Prep',
    course: 'Science',
    members: 8,
    description: 'Preparation for weekly physics lab experiments',
  },
  {
    id: '3',
    title: 'Literature Discussion',
    course: 'English',
    members: 15,
    description: 'Book club and literature analysis group',
  },
];

export const GroupsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = mockGroups.filter(
    (group) =>
      group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Study Groups</Text>

        <Input
          placeholder="Search groups..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        <View style={styles.groupsList}>
          {filteredGroups.map((group) => (
            <Card
              key={group.id}
              title={group.title}
              subtitle={`${group.course} • ${group.members} members`}
              description={group.description}
              onPress={() => router.push(`/group/${group.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.xl,
  },
  searchInput: {
    marginBottom: spacing.xl,
    backgroundColor: colors.backgroundDark,
    borderRadius: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  groupsList: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  emptyStateText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
    textAlign: 'center',
  },
}); 