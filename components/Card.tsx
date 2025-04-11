import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  onPress?: () => void;
  style?: ViewStyle;
  children?: ReactNode;
  footer?: ReactNode;
  courseType?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  onPress,
  style,
  children,
  footer,
  courseType,
}) => {
  const getCourseColor = (): string => {
    if (!courseType) return colors.primary;
    return colors.calendar[courseType.toLowerCase()] || colors.primary;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {title && (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {courseType && (
              <View style={[styles.courseBadge, { backgroundColor: getCourseColor() }]}>
                <Text style={styles.courseText}>{courseType}</Text>
              </View>
            )}
          </View>
        )}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
        {children}
      </View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    ...shadows.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    flex: 1,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    marginBottom: spacing.xs,
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
  },
  courseBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  courseText: {
    color: colors.textInverse,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
  },
}); 