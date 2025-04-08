import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, typography, spacing } from '../constants/theme';
import { router } from 'expo-router';
import { ScreenWrapper } from '../components/ScreenWrapper';

// Mock data for friends
const mockFriends = [
  { id: '1', name: 'Sarah Johnson', selected: false },
  { id: '2', name: 'Michael Chen', selected: false },
  { id: '3', name: 'Emily Rodriguez', selected: false },
  { id: '4', name: 'David Kim', selected: false },
  { id: '5', name: 'Jessica Lee', selected: false },
];

export const CreateSessionScreen = () => {
  const [formData, setFormData] = useState({
    course: '',
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });
  const [friends, setFriends] = useState(mockFriends);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFriendSelection = (friendId) => {
    setFriends(prevFriends =>
      prevFriends.map(friend =>
        friend.id === friendId
          ? { ...friend, selected: !friend.selected }
          : friend
      )
    );
  };

  const handleCreateSession = () => {
    console.log('Creating session with:', formData);
    router.back();
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Create New Session</Text>
        
        <View style={styles.form}>
          <Input
            label="Course"
            value={formData.course}
            onChangeText={(value) => handleChange('course', value)}
            placeholder="Enter course name"
          />

          <Input
            label="Session Title"
            value={formData.title}
            onChangeText={(value) => handleChange('title', value)}
            placeholder="Enter session title"
          />

          <Input
            label="Description"
            value={formData.description}
            onChangeText={(value) => handleChange('description', value)}
            placeholder="Describe your study session"
            multiline
            numberOfLines={4}
          />

          <Input
            label="Date"
            value={formData.date}
            onChangeText={(value) => handleChange('date', value)}
            placeholder="Select date"
          />

          <Input
            label="Time"
            value={formData.time}
            onChangeText={(value) => handleChange('time', value)}
            placeholder="Select time"
          />

          <Input
            label="Location"
            value={formData.location}
            onChangeText={(value) => handleChange('location', value)}
            placeholder="Enter location"
          />

          <Button
            title="Create Session"
            onPress={handleCreateSession}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.lg,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  button: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
}); 