import { View, Text, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { colors, typography, spacing } from '../../../constants/theme';

export default function JoinSessionScreen() {
  const { id } = useLocalSearchParams();

  const handleJoinSession = () => {
    // In a real app, you would make an API call to join the session
    Alert.alert(
      'Success',
      'You have successfully joined the session!',
      [
        {
          text: 'OK',
          onPress: () => router.push('/home'),
        },
      ]
    );
  };

  return (
    <ScreenWrapper title="Join Session">
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Join Study Session</Text>
          <Text style={styles.description}>
            Are you sure you want to join this study session? You'll be able to participate in the discussion and collaborate with other students.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Join Session"
            onPress={handleJoinSession}
            size="large"
          />
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => router.back()}
            style={styles.cancelButton}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    textAlign: 'center',
    lineHeight: typography.lineHeight.md,
  },
  footer: {
    marginTop: spacing.xl,
  },
  cancelButton: {
    marginTop: spacing.md,
  },
}); 