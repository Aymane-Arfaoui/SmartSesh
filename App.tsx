import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { colors, darkColors } from './constants/theme';
import { Slot } from 'expo-router';

export default function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const theme = isDarkMode ? darkColors : colors;

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Slot />
    </>
  );
} 