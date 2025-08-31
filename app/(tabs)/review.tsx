import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function ReviewScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Review screen</ThemedText>
      <ThemedText>Review your receipts here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
