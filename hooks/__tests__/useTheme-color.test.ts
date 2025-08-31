/* eslint-env jest */
import { renderHook } from '@testing-library/react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '../useThemeColor';

jest.mock('@/hooks/useColorScheme');

describe('useThemeColor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns light color when theme is light', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
    const { result } = renderHook(() => useThemeColor({}, 'text'));
    expect(result.current).toBe('#000000');
  });

  it('returns dark color when theme is dark', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    const { result } = renderHook(() => useThemeColor({}, 'text'));
    expect(result.current).toBe('#FFFFFF');
  });

  it('uses override color when provided', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
    const { result } = renderHook(() =>
      useThemeColor({ light: '#custom', dark: '#custom-dark' }, 'text')
    );
    expect(result.current).toBe('#custom');
  });
});
