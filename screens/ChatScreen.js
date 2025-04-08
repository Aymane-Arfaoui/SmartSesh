import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, typography, spacing } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

// Mock data for messages
const mockMessages = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    message: 'Hey everyone! Who\'s ready for the calculus exam tomorrow?',
    timestamp: '10:30 AM',
    isCurrentUser: false,
  },
  {
    id: '2',
    sender: 'You',
    message: 'I\'ve been studying all week! Does anyone want to go over the practice problems together?',
    timestamp: '10:32 AM',
    isCurrentUser: true,
  },
  {
    id: '3',
    sender: 'Michael Chen',
    message: 'I\'m down! I\'m in the library right now if anyone wants to join.',
    timestamp: '10:35 AM',
    isCurrentUser: false,
  },
  {
    id: '4',
    sender: 'Emily Rodriguez',
    message: 'I\'ll be there in 15 minutes. Save me a spot!',
    timestamp: '10:36 AM',
    isCurrentUser: false,
  },
];

export const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // Mock sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.groupName}>Calculus Study Group</Text>
        <Text style={styles.memberCount}>4 members</Text>
      </View>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {mockMessages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.isCurrentUser && styles.currentUserMessage,
            ]}
          >
            {!msg.isCurrentUser && (
              <Text style={styles.senderName}>{msg.sender}</Text>
            )}
            <View
              style={[
                styles.messageBubble,
                msg.isCurrentUser && styles.currentUserBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.isCurrentUser && styles.currentUserText,
                ]}
              >
                {msg.message}
              </Text>
              <Text
                style={[
                  styles.timestamp,
                  msg.isCurrentUser && styles.currentUserTimestamp,
                ]}
              >
                {msg.timestamp}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={colors.textLight}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Ionicons
            name="send"
            size={24}
            color={message.trim() ? colors.primary : colors.textLight}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  groupName: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
  },
  memberCount: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.lg,
  },
  messageContainer: {
    marginBottom: spacing.md,
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
  },
  senderName: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  messageBubble: {
    backgroundColor: colors.backgroundDark,
    padding: spacing.md,
    borderRadius: spacing.lg,
    borderTopLeftRadius: spacing.xs,
  },
  currentUserBubble: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.xs,
  },
  messageText: {
    fontSize: typography.fontSize.md,
    color: colors.text,
    fontFamily: typography.fontFamily.regular,
  },
  currentUserText: {
    color: colors.textInverse,
  },
  timestamp: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },
  currentUserTimestamp: {
    color: colors.textInverse,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    borderRadius: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text,
    maxHeight: 100,
  },
  sendButton: {
    padding: spacing.sm,
  },
}); 