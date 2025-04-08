import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card } from '../components/Card';
import { colors, typography, spacing } from '../constants/theme';
import { router } from 'expo-router';
import { ScreenWrapper } from '../components/ScreenWrapper';

// Mock data for calendar events
const mockEvents = [
  {
    id: '1',
    title: 'Calculus Study Group',
    course: 'Math',
    date: '2024-04-10',
    time: '15:00',
    location: 'Library Room 203',
    members: 5,
  },
  {
    id: '2',
    title: 'Physics Lab Review',
    course: 'Science',
    date: '2024-04-11',
    time: '14:00',
    location: 'Science Building 101',
    members: 3,
  },
  {
    id: '3',
    title: 'History Essay Workshop',
    course: 'History',
    date: '2024-04-12',
    time: '16:00',
    location: 'Humanities Building 305',
    members: 4,
  },
];

export const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'

  const getEventsForDate = (date) => {
    // In a real app, filter events based on the selected date
    return mockEvents;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderDayEvents = () => {
    const events = getEventsForDate(selectedDate);
    if (events.length === 0) {
      return (
        <Text style={styles.noEvents}>
          No study sessions scheduled for this day
        </Text>
      );
    }

    return events.map((event) => (
      <Card
        key={event.id}
        title={event.title}
        subtitle={`${event.time} • ${event.location}`}
        description={`${event.course} • ${event.members} members`}
        onPress={() => router.push(`/session/${event.id}`)}
      />
    ));
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Calendar</Text>

        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'week' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('week')}
          >
            <Text
              style={[
                styles.toggleText,
                viewMode === 'week' && styles.toggleTextActive,
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'month' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('month')}
          >
            <Text
              style={[
                styles.toggleText,
                viewMode === 'month' && styles.toggleTextActive,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroller}
        >
          {/* This would be dynamically generated based on viewMode */}
          {[...Array(7)].map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateItem,
                  selectedDate.toDateString() === date.toDateString() &&
                    styles.dateItemActive,
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={styles.dateText}>{formatDate(date)}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.eventsList}>{renderDayEvents()}</View>
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
  viewToggle: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
    backgroundColor: colors.backgroundDark,
    borderRadius: spacing.lg,
    padding: spacing.xs,
    shadowColor: colors.textDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: spacing.md,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  toggleText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
  },
  toggleTextActive: {
    color: colors.textInverse,
    fontFamily: typography.fontFamily.bold,
  },
  dateScroller: {
    marginBottom: spacing.xl,
  },
  dateItem: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginRight: spacing.sm,
    borderRadius: spacing.lg,
    backgroundColor: colors.backgroundDark,
    shadowColor: colors.textDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dateItemActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  dateText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
  },
  dateTextActive: {
    color: colors.textInverse,
    fontFamily: typography.fontFamily.bold,
  },
  eventsList: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  noEvents: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    marginTop: spacing.xxl,
  },
}); 