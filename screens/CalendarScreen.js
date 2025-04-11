import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Card } from '../components/Card';
import { colors, typography, spacing, shadows } from '../constants/theme';
import { router } from 'expo-router';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';

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
  const [viewMode, setViewMode] = useState('week');

  const getEventsForDate = (date) => {
    return mockEvents.filter(event => event.date === date.toISOString().split('T')[0]);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const weekday = date.toLocaleString('default', { weekday: 'short' });
    return { day, month, weekday };
  };

  const renderDayEvents = () => {
    const events = getEventsForDate(selectedDate);
    if (events.length === 0) {
      return (
        <View style={styles.noEventsContainer}>
          <Ionicons name="calendar-outline" size={48} color={colors.textLight} />
          <Text style={styles.noEventsText}>No study sessions scheduled</Text>
          <Text style={styles.noEventsSubtext}>for this day</Text>
        </View>
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

  const renderDateScroller = () => {
    return [...Array(7)].map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const formattedDate = formatDate(date);
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const hasEvents = getEventsForDate(date).length > 0;

      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.dateItem,
            isSelected && styles.dateItemActive,
            hasEvents && styles.dateItemHasEvents,
          ]}
          onPress={() => setSelectedDate(date)}
          activeOpacity={0.7}
        >
          <Text style={[styles.weekdayText, isSelected && styles.weekdayTextActive]}>
            {formattedDate.weekday}
          </Text>
          <Text style={[styles.dayText, isSelected && styles.dayTextActive]}>
            {formattedDate.day}
          </Text>
          <Text style={[styles.monthText, isSelected && styles.monthTextActive]}>
            {formattedDate.month}
          </Text>
          {hasEvents && <View style={styles.eventIndicator} />}
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Calendar</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/create-session')}
          >
            <Ionicons name="add" size={24} color={colors.textInverse} />
          </TouchableOpacity>
        </View>

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
          contentContainerStyle={styles.dateScrollerContent}
        >
          {renderDateScroller()}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
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
  viewToggle: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
    backgroundColor: colors.backgroundDark,
    borderRadius: spacing.lg,
    padding: spacing.xs,
    ...Platform.select({
      ios: {
        ...shadows.sm,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: spacing.md,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
    ...Platform.select({
      ios: {
        ...shadows.sm,
      },
      android: {
        elevation: 3,
      },
    }),
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
  dateScrollerContent: {
    paddingHorizontal: spacing.md,
  },
  dateItem: {
    width: 70,
    paddingVertical: spacing.md,
    marginRight: spacing.sm,
    borderRadius: spacing.lg,
    backgroundColor: colors.backgroundDark,
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
  dateItemActive: {
    backgroundColor: colors.primary,
    ...Platform.select({
      ios: {
        ...shadows.md,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  dateItemHasEvents: {
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  weekdayText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  weekdayTextActive: {
    color: colors.textInverse,
  },
  dayText: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  dayTextActive: {
    color: colors.textInverse,
  },
  monthText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
  },
  monthTextActive: {
    color: colors.textInverse,
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
  },
  eventsList: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  noEventsText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    color: colors.textDark,
    marginTop: spacing.md,
  },
  noEventsSubtext: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
}); 