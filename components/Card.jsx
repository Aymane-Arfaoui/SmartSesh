import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, accessibility } from '../constants/theme';

export const Card = ({
  title,
  subtitle,
  description,
  onPress,
  style,
  children,
  footer,
  courseType,
  accessibilityLabel,
  accessibilityHint,
  testID,
}) => {
  const getCourseColor = () => {
    if (!courseType) return colors.primary;
    return colors.calendar[courseType.toLowerCase()] || colors.primary;
  };

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole={onPress ? 'button' : 'none'}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      testID={testID}
    >
      <View style={styles.content}>
        {title && (
          <View style={styles.header}>
            <Text 
              style={styles.title}
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              {title}
            </Text>
            {courseType && (
              <View 
                style={[styles.courseBadge, { backgroundColor: getCourseColor() }]}
                accessibilityLabel={`Course type: ${courseType}`}
                accessibilityRole="text"
              >
                <Text style={styles.courseText}>{courseType}</Text>
              </View>
            )}
          </View>
        )}
        {subtitle && (
          <Text 
            style={styles.subtitle}
            numberOfLines={1}
            accessibilityRole="text"
          >
            {subtitle}
          </Text>
        )}
        {description && (
          <Text 
            style={styles.description}
            numberOfLines={2}
            accessibilityRole="text"
          >
            {description}
          </Text>
        )}
        {children}
      </View>
      {footer && (
        <View 
          style={styles.footer}
          accessibilityRole="none"
        >
          {footer}
        </View>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    ...Platform.select({
      ios: {
        ...shadows.md,
      },
      android: {
        elevation: 4,
      },
    }),
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    flex: 1,
    lineHeight: typography.lineHeight.lg,
    letterSpacing: typography.letterSpacing.tight,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: typography.lineHeight.md,
  },
  description: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.textLight,
    lineHeight: typography.lineHeight.sm,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    padding: spacing.md,
    backgroundColor: colors.backgroundDark,
  },
  courseBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    minWidth: 60,
    alignItems: 'center',
  },
  courseText: {
    color: colors.textInverse,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    letterSpacing: typography.letterSpacing.wide,
  },
}); 