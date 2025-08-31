import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ThemedView } from './ThemedView';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return <ThemedView style={[styles.card, style]}>{children}</ThemedView>;
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 8,
  },
});
