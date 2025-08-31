/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemedView } from '../ThemedView';
import { Text } from 'react-native';

describe('ThemedView', () => {
  it('renders children correctly', () => {
    render(
      <ThemedView testID="themed-view">
        <Text>Child Content</Text>
      </ThemedView>
    );

    expect(screen.getByTestId('themed-view')).toBeTruthy();
    expect(screen.getByText('Child Content')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { padding: 20 };
    render(
      <ThemedView style={customStyle} testID="styled-view">
        <Text>Styled Content</Text>
      </ThemedView>
    );

    const view = screen.getByTestId('styled-view');
    const styles = view.props.style;
    const flattenedStyles = Array.isArray(styles) ? styles : [styles];

    const hasPadding = flattenedStyles.some((style) => style && style.padding === 20);

    expect(hasPadding).toBeTruthy();
  });
});
