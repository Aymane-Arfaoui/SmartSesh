import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/theme';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? colors.primaryLight : colors.primary,
          borderColor: 'transparent',
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? colors.secondaryLight : colors.secondary,
          borderColor: 'transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? colors.border : colors.primary,
          borderWidth: 1,
        };
      default:
        return {
          backgroundColor: disabled ? colors.primaryLight : colors.primary,
          borderColor: 'transparent',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.sm,
        };
      case 'large':
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
        };
      default:
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
        };
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') {
      return disabled ? colors.textLight : colors.primary;
    }
    return colors.textInverse;
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
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: size === 'small' ? typography.fontSize.sm : typography.fontSize.md,
            },
            textStyle,
          ]}
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
  },
  text: {
    fontFamily: typography.fontFamily.medium,
    textAlign: 'center',
  },
}); 