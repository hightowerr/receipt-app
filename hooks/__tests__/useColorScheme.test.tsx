/* eslint-env jest */
import { renderHook } from '@testing-library/react-native';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useColorScheme } from '../useColorScheme';

jest.mock('react-native', () => ({
  useColorScheme: jest.fn(),
}));

describe('useColorScheme', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns light theme when system is light', () => {
    (useRNColorScheme as jest.Mock).mockReturnValue('light');
    const { result } = renderHook(() => useColorScheme());
    expect(result.current).toBe('light');
  });

  it('returns dark theme when system is dark', () => {
    (useRNColorScheme as jest.Mock).mockReturnValue('dark');
    const { result } = renderHook(() => useColorScheme());
    expect(result.current).toBe('dark');
  });

  it('defaults to light theme when system returns null', () => {
    (useRNColorScheme as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useColorScheme());
    expect(result.current).toBe('light');
  });
});
