export const colors = {
  // Primary colors
  primary: '#4A90E2',
  primaryLight: '#6BA7E8',
  primaryDark: '#2B6CB0',
  
  // Secondary colors
  secondary: '#FF6B6B',
  secondaryLight: '#FF8E8E',
  secondaryDark: '#E64A4A',
  
  // Background colors
  background: '#FFFFFF',
  backgroundDark: '#F5F5F5',
  cardBackground: '#FFFFFF',
  
  // Text colors
  text: '#333333',
  textLight: '#666666',
  textDark: '#000000',
  textInverse: '#FFFFFF',
  
  // Status colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',
  
  // Border colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  
  // Calendar colors
  calendar: {
    math: '#FF6B6B',
    science: '#4CAF50',
    history: '#2196F3',
    english: '#9C27B0',
    other: '#FFC107',
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
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Dark mode colors
export const darkColors = {
  ...colors,
  background: '#121212',
  backgroundDark: '#1E1E1E',
  cardBackground: '#1E1E1E',
  text: '#FFFFFF',
  textLight: '#B0B0B0',
  textDark: '#FFFFFF',
  border: '#333333',
  borderLight: '#444444',
};
