import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { FirebaseTest } from '../../src/test/FirebaseTest';

export default function CameraScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Camera</ThemedText>
      <ThemedText>Scan your receipts here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
