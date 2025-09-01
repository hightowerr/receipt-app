# Receipt App - Project Configuration Specification

## Project Overview

This is a mobile application for receipt scanning and management built using Expo and React Native. The project is set up with TypeScript and follows modern React Native development practices with file-based routing through Expo Router.

## Framework & Technology Stack

### Core Framework

- **Framework**: [Expo](https://expo.dev/)
- **UI Framework**: [React Native](https://reactnative.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) with file-based routing
- **Navigation**: [React Navigation](https://reactnavigation.org/) with Bottom Tabs

### Development Environment

- **Package Manager**: npm
- **Build System**: Expo CLI
- **Entry Point**: expo-router/entry

## Project Structure & Architecture

### Directory Structure

```
receipt-app/
├── app/                     # Main application code (file-based routing)
│   ├── _layout.tsx          # Root layout
│   ├── +not-found.tsx       # 404 page
│   └── (tabs)/              # Tab-based navigation
│       ├── _layout.tsx      # Tab layout configuration
│       ├── index.tsx        # Camera tab (previously Home)
│       ├── history.tsx      # History tab
│       └── review.tsx       # Receipt review tab
├── assets/                  # Static assets
│   ├── fonts/               # Custom fonts
│   └── images/              # Images and icons
├── components/              # Reusable UI components
│   ├── ui/                  # UI primitives
│   └── [Component].tsx      # Individual components
├── constants/               # App constants
│   └── Colors.ts            # Theme colors
├── hooks/                   # Custom React hooks
├── scripts/                 # Utility scripts
├── src/                     # Source code for services, config, etc.
│   ├── config/              # Firebase configuration
│   ├── services/            # External services (Firebase, OCR)
│   └── types/               # TypeScript type definitions
└── [Config files]           # Configuration files
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
  - `format:check`: Check for formatting issues
  - `check-all`: Run all checks (type-check, lint, format)
  - `fix-all`: Automatically fix all issues (format, lint)
  - `prepare`: Set up Husky pre-commit hooks
  - `test`: Placeholder for future tests

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

### eslint.config.mjs

- **Configuration**: Custom ESLint configuration extending Expo's base config.
- **Rules**: Includes specific rules for TypeScript, React/React Native, and general code quality.
- **Ignores**: `node_modules`, `.expo`, `dist`, `build`, and config files.

### .prettierrc.json

- **Configuration**: Defines the code formatting rules for the project, ensuring a consistent code style.

### .vscode/extensions.json

- **Recommendations**: Recommends VS Code extensions for ESLint, Prettier, Expo, and TypeScript to improve the development experience.

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
- **husky**: Git hooks manager
- **lint-staged**: Run linters on staged files

## Service Integration

The project includes placeholder services for key functionalities, indicating planned integrations.

### Firebase Integration (`src/services/firebase.ts`)

- **Status**: Planned (stubbed)
- **Details**: The service file includes placeholder functions for Firebase initialization and Firestore operations (`addReceipt`, `getReceipts`). This indicates that Firebase is the intended backend for data storage.

### OCR Service (`src/services/ocr.ts`)

- **Status**: Planned (stubbed)
- **Details**: A placeholder OCR service exists with a method for text extraction. The implementation is pending, with comments suggesting Google Vision or Azure Computer Vision as potential solutions.

## Partially Implemented / To-Do Components

While the foundational UI is in place, several core features are in a planned or stubbed state.

### Receipt Scanning Functionality

- **Status**: Not implemented
- **Expected**: Camera integration, image processing.
- **Current**: No camera or image processing libraries are integrated yet.

### OCR/AI Integration

- **Status**: Planned (stubbed)
- **Expected**: Integration with a cloud-based OCR service.
- **Current**: `src/services/ocr.ts` exists but lacks a concrete implementation.

### State Management

- **Status**: Not configured
- **Expected**: A global state management solution like Redux, Zustand, or React Context for managing application-wide state.
- **Current**: No state management libraries have been integrated.

### Data Storage

- **Status**: Planned (stubbed)
- **Expected**: Cloud-based storage using Firestore.
- **Current**: `src/services/firebase.ts` is set up with placeholder functions for Firestore operations.

### Authentication

- **Status**: Not implemented
- **Expected**: User authentication to secure access to receipt data.
- **Current**: No authentication libraries or services have been integrated.

### Form Handling & Validation

- **Status**: Not implemented
- **Expected**: Libraries like Formik or React Hook Form for managing user input and validation.
- **Current**: No form handling libraries are present.

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

### Automated Code Quality with Pre-commit Hooks

- **Issue**: Manual running of linters and formatters is error-prone and can lead to inconsistent code quality in the repository.
- **Resolution**: Implemented pre-commit hooks using Husky and lint-staged to automate code formatting and linting.
- **Details**: The project is now configured to automatically run Prettier and ESLint on staged files before each commit. This ensures that all code pushed to the repository adheres to the defined code style and quality standards, preventing inconsistencies and improving the overall health of the codebase.

### Enhanced Development Environment

- **Issue**: New developers might not have the necessary tools or a consistent setup, leading to a difficult onboarding process.
- **Resolution**: Added recommended VS Code extensions and a more detailed ESLint configuration.
- **Details**: The `.vscode/extensions.json` file now suggests essential extensions for the project, and the `eslint.config.mjs` file provides a more robust set of rules for code quality. This helps new developers get up to speed quickly and maintain a consistent development environment.

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

### CI/CD Pipeline Setup for Expo Project

- **Issue**: Setting up a CI/CD pipeline for an Expo project presented challenges, especially with build environment configuration and dependency caching.
- **Resolution**: Created a GitHub Actions workflow (`.github/workflows/ci.yml`) that automates checks for linting, formatting, and type safety.
- **Details**: The workflow uses a specific Node.js version, caches npm dependencies to speed up subsequent runs, and runs `npm ci` for clean installs. It then executes `check-all` to ensure code quality before merging. This setup prevents regressions and maintains a high-quality codebase.

### Refactoring for Scalability and Maintainability

- **Issue**: The initial project structure mixed application logic with UI components, making it difficult to scale and maintain. Key functionalities like service integrations and configurations were not clearly separated.
- **Resolution**: Introduced a `src` directory to centralize application logic, services, and configurations, separating them from the UI-focused `app` and `components` directories.
- **Details**:
  - **`src/config`**: Holds configuration files, such as Firebase settings, to keep them isolated and manageable.
  - **`src/services`**: Contains modules for external services like Firebase and OCR, promoting a clear separation of concerns.
  - **`src/types`**: Centralizes TypeScript type definitions, improving reusability and type safety across the application.
- **Benefit**: This refactoring establishes a more scalable and maintainable architecture, making it easier to develop and test new features without impacting the UI layer. It also aligns the project with best practices for structuring modern applications.

### Common Pitfalls

- When working with Expo Router, remember that file names directly correspond to routes.
- The `app/(tabs)/_layout.tsx` file is the single source of truth for the tab bar configuration.
- Custom components should use the `ThemedText` and `ThemedView` wrappers for consistent styling.
- Platform-specific code should be wrapped in `Platform.select()` for proper cross-platform support.
