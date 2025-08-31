/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemedText } from '../ThemedText';

describe('ThemedText', () => {
  it('renders correctly with default props', () => {
    render(<ThemedText>Test Text</ThemedText>);
    expect(screen.getByText('Test Text')).toBeTruthy();
  });

  it('applies title style correctly', () => {
    render(<ThemedText type="title">Title Text</ThemedText>);
    const element = screen.getByText('Title Text');

    // Check if the element has the expected style
    const styles = element.props.style;
    const flattenedStyles = Array.isArray(styles) ? styles : [styles];

    const hasExpectedStyle = flattenedStyles.some((style) => style && style.fontSize === 32);

    expect(hasExpectedStyle).toBeTruthy();
  });

  it('applies custom testID', () => {
    render(<ThemedText testID="custom-text">Custom Text</ThemedText>);
    expect(screen.getByTestId('custom-text')).toBeTruthy();
  });
});
