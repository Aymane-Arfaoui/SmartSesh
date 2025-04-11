import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { colors, typography, spacing, borderRadius, accessibility, animation } from '../constants/theme';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
  testID,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? colors.disabled.background : colors.primary,
          borderColor: 'transparent',
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? colors.disabled.background : colors.secondary,
          borderColor: 'transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? colors.disabled.border : colors.primary,
          borderWidth: 1,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        };
      default:
        return {
          backgroundColor: disabled ? colors.disabled.background : colors.primary,
          borderColor: 'transparent',
        };
    }
  };

  const getSizeStyles = () => {
    const baseHeight = {
      small: 32,
      medium: 40,
      large: 48,
    }[size];

    return {
      minHeight: baseHeight,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
    };
  };

  const getTextColor = () => {
    if (disabled) return colors.disabled.text;
    
    switch (variant) {
      case 'outline':
        return colors.primary;
      case 'ghost':
        return colors.primary;
      default:
        return colors.textInverse;
    }
  };

  const getTextSize = () => {
    return {
      small: typography.fontSize.sm,
      medium: typography.fontSize.md,
      large: typography.fontSize.lg,
    }[size];
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
      testID={testID}
      hitSlop={{
        top: spacing.xs,
        bottom: spacing.xs,
        left: spacing.xs,
        right: spacing.xs,
      }}
    >
      {loading ? (
        <ActivityIndicator 
          color={getTextColor()} 
          size={getTextSize()}
          style={styles.loader}
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: getTextSize(),
              opacity: disabled ? 0.7 : 1,
            },
            textStyle,
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minWidth: accessibility.minimumTouchTarget,
    ...Platform.select({
      ios: {
        shadowColor: colors.textDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  text: {
    fontFamily: typography.fontFamily.medium,
    textAlign: 'center',
    letterSpacing: typography.letterSpacing.normal,
  },
  loader: {
    marginRight: spacing.xs,
  },
}); 