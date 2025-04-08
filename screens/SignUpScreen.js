import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, typography, spacing } from '../constants/theme';

export const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUp = () => {
    // Mock sign up logic
    console.log('Sign up attempt with:', formData);
    navigation.navigate('Home');
  };

  const handleGoogleSignUp = () => {
    // Mock Google sign up
    console.log('Google sign up attempt');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join SmartSesh today</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <Input
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Password"
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
            placeholder="Create a password"
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange('confirmPassword', value)}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Button
            title="Sign Up"
            onPress={handleSignUp}
            style={styles.signUpButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Continue with Google"
            variant="outline"
            onPress={handleGoogleSignUp}
            style={styles.googleButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.textLight,
  },
  form: {
    marginTop: spacing.md,
  },
  signUpButton: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: colors.textLight,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
  },
  googleButton: {
    marginBottom: spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  loginText: {
    color: colors.textLight,
    fontSize: typography.fontSize.sm,
  },
  loginLink: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
  },
}); 