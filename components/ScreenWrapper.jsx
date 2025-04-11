import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, accessibility } from '../constants/theme';
import { router } from 'expo-router';

export const ScreenWrapper = ({ 
  children, 
  showBackButton = true, 
  title,
  headerRight,
  onBackPress,
  style,
  contentStyle,
  keyboardAvoiding = true,
  statusBarStyle = 'dark-content',
}) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const Wrapper = keyboardAvoiding ? KeyboardAvoidingView : View;
  const wrapperProps = keyboardAvoiding ? {
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
    keyboardVerticalOffset: Platform.OS === 'ios' ? 0 : 20,
  } : {};

  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <StatusBar barStyle={statusBarStyle} />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              accessibilityLabel="Go back"
              accessibilityRole="button"
              accessibilityHint="Navigates to the previous screen"
              hitSlop={{
                top: spacing.xs,
                bottom: spacing.xs,
                left: spacing.xs,
                right: spacing.xs,
              }}
            >
              <Ionicons name="chevron-back" size={28} color={colors.primary} />
            </TouchableOpacity>
          )}
          {title && (
            <Text 
              style={styles.title}
              numberOfLines={1}
              accessibilityRole="header"
            >
              {title}
            </Text>
          )}
        </View>
        {headerRight && (
          <View style={styles.headerRight}>
            {headerRight}
          </View>
        )}
      </View>
      <Wrapper 
        style={[styles.container, contentStyle]} 
        {...wrapperProps}
      >
        {children}
      </Wrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minHeight: accessibility.minimumTouchTarget + spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
    marginLeft: -spacing.xs,
    borderRadius: spacing.md,
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
  title: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginLeft: spacing.sm,
    flex: 1,
  },
}); 