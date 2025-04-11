import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, accessibility } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  multiline,
  numberOfLines,
  style,
  inputStyle,
  required,
  helperText,
  success,
  onClear,
  accessibilityLabel: customAccessibilityLabel,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getBorderColor = () => {
    if (error) return colors.error;
    if (success) return colors.success;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  const getAccessibilityLabel = () => {
    let labelText = customAccessibilityLabel || label || placeholder;
    if (required) labelText += ', required';
    if (error) labelText += `, ${error}`;
    if (success) labelText += ', valid input';
    return labelText;
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}
      <View style={[styles.inputContainer, { borderColor: getBorderColor() }]}>
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          secureTextEntry={secureTextEntry && !showPassword}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={getAccessibilityLabel()}
          accessibilityRole="text"
          accessibilityState={{ 
            disabled: props.editable === false,
            error: !!error,
          }}
          {...props}
        />
        {(value && onClear) && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClear}
            accessibilityLabel="Clear input"
            accessibilityRole="button"
          >
            <Ionicons name="close-circle" size={20} color={colors.textLight} />
          </TouchableOpacity>
        )}
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
            accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            accessibilityRole="button"
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={20} 
              color={colors.textLight} 
            />
          </TouchableOpacity>
        )}
      </View>
      {(error || helperText) && (
        <View style={styles.feedbackContainer}>
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color={colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          {helperText && !error && (
            <Text style={styles.helperText}>{helperText}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontFamily: typography.fontFamily.medium,
  },
  required: {
    color: colors.error,
    marginLeft: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.textDark,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  input: {
    flex: 1,
    padding: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text,
    fontFamily: typography.fontFamily.regular,
    minHeight: accessibility.minimumTouchTarget,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  clearButton: {
    padding: spacing.xs,
  },
  eyeButton: {
    padding: spacing.xs,
  },
  feedbackContainer: {
    marginTop: spacing.xs,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.xs,
    marginLeft: spacing.xs,
    fontFamily: typography.fontFamily.regular,
  },
  helperText: {
    color: colors.textLight,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
  },
}); 