export const colors = {
  // Primary colors with improved contrast
  primary: '#2563EB', // Enhanced contrast ratio
  primaryLight: '#60A5FA',
  primaryDark: '#1E40AF',
  
  // Secondary colors with improved contrast
  secondary: '#DC2626', // Enhanced contrast ratio
  secondaryLight: '#F87171',
  secondaryDark: '#B91C1C',
  
  // Background colors
  background: '#FFFFFF',
  backgroundDark: '#F8FAFC',
  cardBackground: '#FFFFFF',
  
  // Text colors with WCAG compliance
  text: '#1F2937', // Enhanced contrast
  textLight: '#4B5563',
  textDark: '#111827',
  textInverse: '#FFFFFF',
  
  // Status colors with improved visibility
  success: '#059669',
  error: '#DC2626',
  warning: '#D97706',
  info: '#2563EB',
  
  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Calendar colors with improved contrast
  calendar: {
    math: '#DC2626',
    science: '#059669',
    history: '#2563EB',
    english: '#7C3AED',
    other: '#D97706',
  },

  // Focus states
  focus: {
    primary: '#2563EB',
    secondary: '#DC2626',
  },

  // Hover states
  hover: {
    primary: '#1D4ED8',
    secondary: '#B91C1C',
  },

  // Disabled states
  disabled: {
    background: '#F3F4F6',
    text: '#9CA3AF',
    border: '#D1D5DB',
  }
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  xs: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.0,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Dark mode colors with improved contrast
export const darkColors = {
  ...colors,
  background: '#111827',
  backgroundDark: '#1F2937',
  cardBackground: '#1F2937',
  text: '#F9FAFB',
  textLight: '#D1D5DB',
  textDark: '#FFFFFF',
  border: '#374151',
  borderLight: '#4B5563',
  disabled: {
    background: '#374151',
    text: '#6B7280',
    border: '#4B5563',
  }
};

// Accessibility settings
export const accessibility = {
  minimumTouchTarget: 44, // Minimum touch target size in pixels
  focusRing: {
    width: 2,
    color: colors.focus.primary,
    offset: 2,
  },
  reducedMotion: {
    duration: 200,
  },
};

// Animation durations
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Z-index values
export const zIndex = {
  base: 0,
  dropdown: 1000,
  modal: 2000,
  toast: 3000,
};
