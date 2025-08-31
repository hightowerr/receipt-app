# Receipt App - Project Configuration Specification

## Project Overview

This is a mobile application for receipt scanning and management built using Expo and React Native. The project is set up with TypeScript and follows modern React Native development practices with file-based routing through Expo Router.

## Framework & Technology Stack

### Core Framework

- **Framework**: [Expo](https://expo.dev/) (v53.0.22)
- **UI Framework**: [React Native](https://reactnative.dev/) (v0.79.6)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.8.3)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (v5.1.5) with file-based routing
- **Navigation**: [React Navigation](https://reactnavigation.org/) (v7.x) with Bottom Tabs

### Development Environment

- **Package Manager**: npm
- **Build System**: Expo CLI
- **Entry Point**: expo-router/entry

## Project Structure & Architecture

### Directory Structure

```
receipt-app/
├── app/                    # Main application code (file-based routing)
│   ├── _layout.tsx         # Root layout
│   ├── +not-found.tsx      # 404 page
│   └── (tabs)/             # Tab-based navigation
│       ├── _layout.tsx     # Tab layout configuration
│       ├── index.tsx       # Camera tab (previously Home)
│       ├── history.tsx     # History tab
│       └── review.tsx      # Receipt review tab
├── assets/                 # Static assets
│   ├── fonts/              # Custom fonts
│   └── images/             # Images and icons
├── components/             # Reusable UI components
│   ├── ui/                 # UI primitives
│   └── [Component].tsx     # Individual components
├── constants/              # App constants
│   └── Colors.ts           # Theme colors
├── hooks/                  # Custom React hooks
├── scripts/                # Utility scripts
└── [Config files]          # Configuration files
```

### Key Components

- **Themed Components**: `ThemedText`, `ThemedView` for consistent styling
- **Navigation**: Tab-based navigation with haptic feedback
- **UI Elements**: Custom components like `ParallaxScrollView`, `Collapsible`, etc.
- **Icons**: Uses Expo Vector Icons and custom IconSymbol components

## Styling & Theming

### Theme System

- **Color Scheme**: Supports both light and dark modes
- **Theme Hook**: `useColorScheme` and `useThemeColor` for theme-aware components
- **Colors**: Defined in `constants/Colors.ts`
- **Typography**: Defined styles in `ThemedText` component with multiple text types:
  - default
  - title
  - subtitle
  - defaultSemiBold
  - link

### UI Components

- **Custom Components**: Themed components that automatically adapt to the current color scheme
- **Platform Specific**: Some components have platform-specific implementations (iOS/Android)
- **Haptic Feedback**: Integrated with tab navigation

## Mobile Platform Support

### iOS

- **Tablet Support**: Yes (supportsTablet: true)
- **UI Adaptations**: Custom tab bar background with blur effect

### Android

- **Adaptive Icons**: Configured
- **Edge-to-Edge**: Enabled for modern Android UI
- **Background Color**: White

### Web

- **Bundler**: Metro
- **Output**: Static
- **Favicon**: Configured

## Configuration Files

### package.json

- **Scripts**:
  - `start`: Launch Expo development server
  - `reset-project`: Reset project to a clean state
  - `android`, `ios`, `web`: Platform-specific launchers
  - `lint`: Run ESLint
  - `format`: Format code with Prettier
  - `type-check`: Run TypeScript compiler to check for type errors
  - `lint:fix`: Automatically fix linting issues

### app.json (Expo Configuration)

- **Orientation**: Portrait
- **User Interface**: Automatic (adapts to system theme)
- **New Architecture**: Enabled
- **Splash Screen**: Customized
- **Plugins**: Expo Router, Expo Splash Screen
- **Experiments**: Typed routes enabled

### tsconfig.json

- **Base**: Extends Expo's base TypeScript configuration
- **Strict Mode**: Enabled
- **Path Aliases**: `@/*` for root-relative imports
- **Includes**: TypeScript and TypeScript React files

### eslint.config.js

- **Configuration**: Uses Expo's ESLint configuration
- **Ignores**: dist directory

## Dependencies & Libraries

### UI & Navigation

- **@expo/vector-icons**: Icon library
- **@react-navigation/bottom-tabs**: Tab navigation
- **@react-navigation/native**: Core navigation
- **expo-blur**: Blur effects
- **expo-image**: Enhanced image component
- **react-native-gesture-handler**: Touch handling
- **react-native-reanimated**: Animations
- **react-native-safe-area-context**: Safe area management
- **react-native-screens**: Screen management

### Device Features

- **expo-haptics**: Haptic feedback
- **expo-linking**: Deep linking
- **expo-status-bar**: Status bar management
- **expo-system-ui**: System UI integration
- **expo-web-browser**: Web browser integration
- **expo-constants**: App constants
- **expo-font**: Font management
- **expo-splash-screen**: Splash screen

### Development Tools

- **@babel/core**: JavaScript compiler
- **typescript**: TypeScript language
- **eslint**: Code linting
- **eslint-config-expo**: Expo-specific linting rules
- **prettier**: Code formatter
- **eslint-config-prettier**: ESLint config for Prettier
- **eslint-plugin-prettier**: ESLint plugin for Prettier

## Missing/Unimplemented Components

Based on the project name "receipt-app" but current configuration, the following components are **NOT YET IMPLEMENTED**:

### Receipt Scanning Functionality

- **Status**: Not implemented
- **Expected**: Camera integration, image processing
- **Current**: No camera or image processing libraries detected

### OCR/AI Integration

- **Status**: Not implemented
- **Expected**: OCR libraries, ML Kit, or similar
- **Current**: No OCR or AI dependencies found

### State Management

- **Status**: Not configured
- **Expected**: Redux, Zustand, or React Context
- **Current**: No state management libraries detected

### Data Storage

- **Status**: Not implemented
- **Expected**: AsyncStorage, SQLite, or Firestore
- **Current**: No database or storage dependencies found

### Authentication

- **Status**: Not implemented
- **Expected**: Authentication libraries or services
- **Current**: No auth libraries detected

### Form Handling & Validation

- **Status**: Not implemented
- **Expected**: Form libraries like Formik or React Hook Form
- **Current**: No form validation libraries found

### API Integration

- **Status**: Not configured
- **Expected**: Fetch utilities, Axios, or similar
- **Current**: No API client libraries detected

## Summary

This project is a well-structured Expo/React Native application with TypeScript that follows modern development practices. It has a solid foundation with:

- Expo framework with the new architecture enabled
- TypeScript for type safety
- File-based routing with Expo Router
- Tab-based navigation
- Theming support (light/dark mode)
- Custom UI components

However, it currently lacks the actual receipt scanning functionality and related features like:

- Camera integration
- OCR/image processing
- Data storage
- State management
- Authentication
- API integration

The project appears to be in the initial setup phase with a solid foundation ready for feature implementation.

## Development Notes & Resolved Issues

### Code Quality & Formatting

- **Issue**: Inconsistent code formatting and style across the project.
- **Resolution**: Integrated Prettier for automated code formatting and added ESLint rules to enforce it.
- **Details**: The project now includes Prettier with ESLint integration to ensure a consistent code style. New scripts (`format`, `lint:fix`) have been added to `package.json` to automate the process. This helps maintain a clean and readable codebase.

### Splash Screen Management

- **Issue**: The splash screen would sometimes disappear before all assets were loaded, leading to a jarring user experience.
- **Resolution**: Implemented manual splash screen control using `expo-splash-screen`.
- **Details**: The root layout (`app/_layout.tsx`) now prevents the splash screen from auto-hiding and only hides it once the necessary fonts and assets are loaded. This ensures a smooth and professional app launch.

### Navigation Overhaul for Core Functionality

- **Issue**: The initial tab navigation (Home, Explore) did not align with the app's purpose as a receipt scanner.
- **Resolution**: Redesigned the tab bar to include "Camera", "Review", and "History" tabs.
- **Details**: The navigation has been restructured to better reflect the core user flow of a receipt app: capturing a receipt (Camera), reviewing it (Review), and viewing past receipts (History). This provides a more intuitive and purpose-driven user experience.

### TypeScript Integration

- **Issue**: TypeScript type errors in the root layout component.
- **Resolution**: Added proper interface for test props in `app/_layout.tsx`.
- **Details**: The root layout component had TypeScript errors due to missing type definitions. We added a proper interface for the `TestProps` and ensured the `testFunction` was properly typed.

### Common Pitfalls

- When working with Expo Router, remember that file names directly correspond to routes.
- The `app/(tabs)/_layout.tsx` file is the single source of truth for the tab bar configuration.
- Custom components should use the `ThemedText` and `ThemedView` wrappers for consistent styling.
- Platform-specific code should be wrapped in `Platform.select()` for proper cross-platform support.
