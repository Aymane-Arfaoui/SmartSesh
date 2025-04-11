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
import { Calendar } from 'react-native-calendars';
import { getSessionsForDate, getAllSessions } from '../data/mockSessions';

export const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [currentWeek, setCurrentWeek] = useState(0);

  const getEventsForDate = (date) => {
    return getSessionsForDate(date);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const weekday = date.toLocaleString('default', { weekday: 'short' });
    return { day, month, weekday };
  };

  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + (currentWeek * 7));
    
    // Adjust to start from Monday
    const dayOfWeek = startDate.getDay();
    const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startDate.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getWeekRange = () => {
    const dates = getWeekDates();
    const startDate = dates[0];
    const endDate = dates[6];
    
    const startMonth = startDate.toLocaleString('default', { month: 'short' });
    const endMonth = endDate.toLocaleString('default', { month: 'short' });
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()} - ${endDate.getDate()}`;
    } else {
      return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}`;
    }
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
        subtitle={`${event.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} • ${event.location}`}
        description={`${event.course} • ${event.members} members`}
        onPress={() => router.push(`/session/${event.id}`)}
      />
    ));
  };

  const renderDateScroller = () => {
    const dates = getWeekDates();
    
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateScroller}
        contentContainerStyle={styles.dateScrollerContent}
      >
        {dates.map((date, index) => {
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
        })}
      </ScrollView>
    );
  };

  const handleWeekChange = (direction) => {
    setCurrentWeek(prev => prev + direction);
  };

  const getMarkedDates = () => {
    const marked = {};
    const allSessions = getAllSessions();
    
    allSessions.forEach(session => {
      const dateStr = session.date.toISOString().split('T')[0];
      marked[dateStr] = {
        marked: true,
        dotColor: colors.primary,
      };
    });
    
    marked[selectedDate.toISOString().split('T')[0]] = {
      selected: true,
      marked: marked[selectedDate.toISOString().split('T')[0]]?.marked,
      dotColor: colors.primary,
    };
    
    return marked;
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

        {viewMode === 'week' ? (
          <>
            <View style={styles.weekNavigation}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handleWeekChange(-1)}
              >
                <Ionicons name="chevron-back" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.weekText}>
                {getWeekRange()}
              </Text>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handleWeekChange(1)}
              >
                <Ionicons name="chevron-forward" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
            {renderDateScroller()}
          </>
        ) : (
          <View style={styles.calendarContainer}>
            <Calendar
              current={selectedDate.toISOString().split('T')[0]}
              onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
              markedDates={getMarkedDates()}
              theme={{
                backgroundColor: colors.background,
                calendarBackground: colors.background,
                textSectionTitleColor: colors.textDark,
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: colors.textInverse,
                todayTextColor: colors.primary,
                dayTextColor: colors.textDark,
                textDisabledColor: colors.textLight,
                dotColor: colors.primary,
                selectedDotColor: colors.textInverse,
                monthTextColor: colors.textDark,
                arrowColor: colors.primary,
                textMonthFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 18,
              }}
            />
          </View>
        )}

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
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  navButton: {
    padding: spacing.sm,
  },
  weekText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    color: colors.textDark,
  },
  dateScroller: {
    marginBottom: spacing.xl,
  },
  dateScrollerContent: {
    paddingHorizontal: spacing.md,
  },
  calendarContainer: {
    marginBottom: spacing.xl,
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

export default CalendarScreen; 