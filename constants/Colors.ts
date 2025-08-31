/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryLight = '#007AFF';
const primaryDark = '#0A84FF';

export const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: primaryLight,
    icon: '#8E8E93',
    tabIconDefault: '#8E8E93',
    tabIconSelected: primaryLight,
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: primaryDark,
    icon: '#8E8E93',
    tabIconDefault: '#8E8E93',
    tabIconSelected: primaryDark,
  },
};
