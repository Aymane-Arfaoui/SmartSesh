import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function GroupDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return (
    <View>
      <Text>Group ID: {id}</Text>
    </View>
  );
} 