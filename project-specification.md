# Receipt App - Project Configuration Specification

## Project Overview

This is a hybrid receipt scanning and management application featuring both a React Native mobile app and an Express.js web testing interface. The project combines modern React Native development using Expo and TypeScript with a serverless backend infrastructure powered by Firebase Cloud Functions and Google Cloud Vision API for automated OCR processing. The dual-architecture approach enables rapid backend testing via web interface while maintaining full mobile app development capabilities.

## Framework & Technology Stack

### Core Framework

- **Mobile Framework**: [Expo](https://expo.dev/) - React Native development platform
- **UI Framework**: [React Native](https://reactnative.dev/) - Cross-platform mobile UI
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing system
- **Navigation**: [React Navigation](https://reactnavigation.org/) - Tab-based navigation
- **Cloud Functions**: [Firebase Functions](https://firebase.google.com/docs/functions) - Serverless backend
- **OCR Service**: [Google Cloud Vision API](https://cloud.google.com/vision) - Text detection and extraction
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) - Document database
- **Storage**: [Firebase Storage](https://firebase.google.com/docs/storage) - File storage and hosting

### Development Environment

- **Package Manager**: npm/bun (multi-runtime support)
- **Build System**: Expo CLI (mobile) + TypeScript Compiler (functions) + Express.js (web testing)
- **Runtime**: React Native (mobile) + Node.js 22 (backend functions) + Express.js (web testing)
- **Deploy Target**: Expo build system + Firebase Functions + Google App Engine (web testing)

## Project Structure & Architecture

### Directory Structure

```
receipt-app/
├── app/                     # React Native application (Expo Router)
│   ├── _layout.tsx          # Root layout component
│   ├── +not-found.tsx       # 404 error page
│   ├── index.tsx            # App entry point
│   └── (tabs)/              # Tab-based navigation
│       ├── _layout.tsx      # Tab layout configuration
│       ├── index.tsx        # Camera screen (main functionality)
│       ├── history.tsx      # Receipt history screen
│       └── review.tsx       # Receipt review screen
├── components/              # Reusable React Native components
│   ├── ui/                  # UI primitives (IconSymbol, TabBarBackground)
│   ├── ThemedText.tsx       # Themed text component
│   ├── ThemedView.tsx       # Themed view component
│   ├── Button.tsx           # Custom button component
│   ├── Card.tsx             # Card component
│   └── __tests__/           # Component tests
├── constants/               # App constants and configuration
│   └── Colors.ts            # Theme colors for light/dark mode
├── hooks/                   # Custom React hooks
│   ├── useColorScheme.ts    # Color scheme detection
│   ├── useThemeColor.ts     # Theme color management
│   └── __tests__/           # Hook tests
├── assets/                  # Static assets (images, fonts)
│   ├── images/              # App icons, splash screens
│   └── fonts/               # Custom fonts (SpaceMono)
├── public/                  # Web testing interface
│   └── index.html           # HTML upload interface with drag & drop
├── server.js                # Express.js server for web testing
├── functions/               # Firebase Cloud Functions (serverless backend)
│   ├── src/
│   │   └── index.ts         # OCR processing function with Vision API
│   ├── package.json         # Functions dependencies (separate from main)
│   ├── tsconfig.json        # Functions TypeScript config
│   └── lib/                 # Compiled JavaScript output
├── src/                     # Shared services and configuration
│   ├── config/              # Firebase client configuration
│   │   └── firebase.config.ts # Firebase SDK initialization
│   ├── services/            # Service layer implementations
│   │   ├── firebase.ts      # Firestore operations
│   │   └── ocr.ts           # OCR service interface (stub)
│   ├── types/               # TypeScript type definitions
│   ├── test/                # Integration tests
│   │   └── FirebaseTest.tsx # Firebase connection test component
│   └── utils/               # Utility functions
├── __tests__/               # Global test configuration
├── scripts/                 # Build and deployment scripts
├── firebase.json            # Firebase project configuration
├── .firebaserc             # Firebase project settings (receipt-app-46ca7)
├── app.json                # Expo configuration
├── package.json            # Main project dependencies (Express.js)
├── app.yaml                # Google App Engine configuration
└── [Config files]          # ESLint, Prettier, TypeScript, Jest configs
```

### Key Components

- **React Native App**: Mobile-first interface with Expo Router navigation
- **Themed Components**: Consistent UI with light/dark mode support
- **Tab Navigation**: Camera, Review, and History screens
- **Cloud Function**: Automated OCR processing triggered by file uploads
- **Vision API Integration**: Google Cloud Vision for text extraction from receipt images
- **Firestore Database**: Stores processing results and metadata
- **Firebase Storage**: Handles image uploads with automatic triggers

## React Native Mobile Design

### Styling Approach

- **Theme System**: Built-in light/dark mode support with `useColorScheme` and `useThemeColor` hooks
- **Design Language**: Clean, native mobile interface following platform guidelines
- **Color Scheme**: Adaptive theming defined in `constants/Colors.ts`
- **Typography**: Themed text components with multiple variants (title, subtitle, link, etc.)
- **Platform Specific**: iOS and Android optimizations with platform-specific components

### User Experience

- **Navigation**: Tab-based navigation with Camera, Review, and History screens
- **Camera Integration**: Planned receipt capture functionality
- **Native Performance**: Optimized for mobile with React Native performance benefits
- **Accessibility**: Built-in accessibility support through React Native components

## Platform Support

### iOS

- **Tablet Support**: Yes (supportsTablet: true in app.json)
- **UI Adaptations**: Custom tab bar background with blur effect
- **Native Features**: Haptic feedback, native navigation patterns

### Android

- **Adaptive Icons**: Configured for dynamic theming
- **Edge-to-Edge**: Modern Android UI with edge-to-edge display
- **Material Design**: Native Android components and interactions

### Web (via Expo)

- **Bundler**: Metro bundler with static output
- **Progressive Web App**: Web deployment capability through Expo
- **Cross-Platform**: Same codebase runs on web browsers

### Backend Infrastructure

- **Firebase Functions**: Auto-scaling serverless backend
- **Google Cloud Vision**: Enterprise-grade OCR processing
- **Firebase Storage**: Secure file storage with automatic triggers

## Configuration Files

### app.json (Expo Configuration)

- **Framework**: Expo SDK configuration
- **Orientation**: Portrait mode for mobile receipt scanning
- **Icon & Splash**: Custom branding with adaptive icons
- **Plugins**: Expo Router, Splash Screen, Font loading
- **Platform Settings**: iOS tablet support, Android edge-to-edge
- **New Architecture**: Enabled for performance improvements
- **Typed Routes**: TypeScript route generation enabled

### Main package.json

- **Scripts**: Multi-runtime server scripts (`start`, `dev`, `bun-start`)
- **Dependencies**: Express.js for web testing interface
- **Development**: Minimal setup focused on backend testing and deployment

### functions/package.json

- **Scripts**:
  - `build`: Compile TypeScript functions (`tsc`)
  - `serve`: Local Firebase emulator for testing
  - `deploy`: Deploy functions to Firebase
  - `lint`: ESLint with TypeScript support
- **Dependencies**: Firebase Admin SDK, Google Cloud Vision API

### firebase.json

- **Functions Configuration**: Defines build and deployment settings
- **Predeploy Hooks**: Automatic linting and building before deployment
- **Regional Deployment**: Europe-west1 for GDPR compliance

### tsconfig.json

- **Base**: Extends Expo's TypeScript configuration
- **Strict Mode**: Enabled for type safety
- **Path Aliases**: `@/*` for clean imports
- **React Native**: Optimized for React Native development

### .firebaserc

- **Project Binding**: Links to Firebase project (`receipt-app-46ca7`)
- **Environment Management**: Production/development separation

## Dependencies & Libraries

### Main Project (Express.js Server)

- **express**: Web application framework for Node.js
- **Node.js/Bun**: Multi-runtime support for different development preferences
- **Static File Serving**: Built-in Express.js static file serving for web interface

### React Native & Expo (Mobile App)

- **Framework**: Managed by Expo CLI and app.json configuration
- **expo-router**: File-based routing system
- **expo-splash-screen**: Splash screen management
- **expo-font**: Custom font loading
- **react-native**: Cross-platform mobile app framework (via Expo)
- **TypeScript**: Type safety configured via tsconfig.json

### UI & Theming (Mobile)

- **Themed Components**: Custom ThemedText, ThemedView components
- **Color System**: Adaptive light/dark mode support
- **Platform Components**: iOS/Android specific UI optimizations
- **Custom Fonts**: SpaceMono font integration

### Cloud Functions & Backend

- **firebase-admin**: Firebase Admin SDK for server-side operations
- **firebase-functions**: Cloud Functions runtime and triggers
- **@google-cloud/vision**: Google Cloud Vision API client library
- **typescript**: Type safety for functions development

### Development Tools

- **@typescript-eslint/eslint-plugin**: TypeScript-specific ESLint rules
- **eslint-config-expo**: Expo-optimized ESLint configuration
- **prettier**: Code formatting
- **jest**: Testing framework with React Native support
- **@testing-library/react-native**: Component testing utilities
- **react-test-renderer**: Used for snapshot testing and rendering components in test environments.
- **@types/jest**: TypeScript type definitions for Jest.
- **react-native-worklets**: Babel plugin for Reanimated.

### Cloud Services

- **Firebase Firestore**: NoSQL document database
- **Firebase Storage**: File storage with automatic triggers
- **Google Cloud Vision API**: Enterprise OCR processing
- **Firebase Authentication**: User authentication (planned)

## Service Integration

The project has fully implemented cloud services for OCR processing and data management.

### Firebase Integration

- **Status**: ✅ Fully Implemented
- **Components**:
  - **Firestore**: Stores receipt metadata, processing status, and OCR results
  - **Storage**: Handles image uploads with automatic function triggers
  - **Admin SDK**: Server-side operations for functions
- **Features**: Real-time status updates, error handling, timestamp tracking

### Google Cloud Vision OCR Service

- **Status**: ✅ Fully Implemented
- **Integration**: `functions/src/index.ts` - `onReceiptImageUpload` function
- **Features**:
  - Automatic text detection from uploaded images
  - Processes images in `receipts/` folder only
  - Updates Firestore with OCR results in real-time
  - Error handling and status tracking
- **API**: Google Cloud Vision `textDetection` method for full-page OCR

### Storage Triggers

- **Status**: ✅ Fully Implemented
- **Trigger**: Firebase Storage object finalized events
- **Processing Flow**:
  1. Image uploaded to `receipts/` folder in Firebase Storage
  2. Cloud Function automatically triggered
  3. Vision API processes image for text
  4. Results stored in Firestore with status updates

## Current Implementation Status

The core OCR functionality is fully implemented, with some features planned for future enhancement.

### ✅ Completed Features

- **Firebase Cloud Functions**: Fully implemented OCR processing with Google Cloud Vision API
- **Storage Triggers**: Automatic processing when images uploaded to `receipts/` folder
- **Database Operations**: Firestore integration for storing OCR results and metadata
- **Error Handling**: Comprehensive error handling with status tracking in Firestore
- **Serverless Architecture**: Auto-scaling Firebase Functions v2 with regional deployment
- **React Native App Structure**: Expo Router navigation with themed UI components
- **Express.js Testing Server**: Web interface for rapid backend testing
- **Multi-Runtime Support**: Node.js and Bun development environment
- **Firebase Configuration**: Client and server-side Firebase configurations ready
- **Comprehensive Testing Environment**: Jest and React Native Testing Library are fully configured for unit and component testing.
- **User Authentication**: Full Firebase Authentication implementation with email/password sign-up, sign-in, and session management.
- **Mobile Image Upload**: Robust image upload service with progress tracking, file validation, and real-time status updates in Firestore.

### 🚧 Partially Implemented Features

- **Web Upload Interface**: HTML drag-and-drop exists but lacks Firebase Storage integration
- **Camera Functionality**: Tab navigation and UI screens exist, camera integration planned
- **Real-time Data Flow**: Backend processes and stores data, frontend needs connection

### 📋 Planned Features

- **Camera Capture**: Native camera integration for receipt photography
- **Image Processing**: Mobile image optimization before upload
- **Receipt Management**: Mobile interface for viewing, editing, and organizing receipts
- **Data Parsing**: Structured data extraction from OCR text (amounts, dates, vendors)
- **Offline Support**: Local storage with sync when online
- **Push Notifications**: Processing status updates via notifications
- **Export Features**: Share receipts via native mobile sharing

## Summary

This project combines a modern React Native mobile application with a sophisticated serverless backend infrastructure. The current implementation features:

**✅ Working Core Features:**

- React Native mobile app with Expo Router navigation
- Tab-based interface (Camera, Review, History screens)
- Themed UI components with light/dark mode support
- Automated OCR processing using Google Cloud Vision API
- Firebase Cloud Functions for serverless processing
- Firestore database for storing results and metadata
- Comprehensive error handling and status tracking in backend

**🏗️ Architecture Strengths:**

- Native mobile performance with React Native
- Cross-platform compatibility (iOS, Android, Web via Expo)
- Scalable serverless backend with Firebase Functions
- Enterprise-grade OCR with Google Cloud Vision
- Real-time database updates with Firestore
- Type-safe development with TypeScript
- Modern development tooling and CI/CD pipeline

**🎯 Ready for Enhancement:**
The mobile app foundation is complete and the backend OCR infrastructure is fully operational. The next phase involves connecting the mobile interface to the backend services, implementing camera functionality, and building out the receipt management features.

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

### Comprehensive Testing Framework Setup

- **Issue**: The project lacked a testing framework, making it difficult to verify component behavior, prevent regressions, and ensure code quality.
- **Resolution**: Integrated Jest and React Native Testing Library to establish a comprehensive testing environment.
- **Details**:
  - **Jest**: Configured as the primary testing framework.
  - **React Native Testing Library**: Added for rendering components and simulating user interactions in a test environment.
  - **Test Scripts**: Added npm scripts (`test`, `test:watch`, `test:coverage`, `test:ci`) to streamline the testing process.
  - **CI Integration**: The `test:ci` script is used in the GitHub Actions workflow to run tests automatically.
- **Benefit**: This setup enables developers to write unit and integration tests for components and hooks, ensuring that new features are reliable and that existing functionality is not broken by new changes. It significantly improves the overall quality and stability of the codebase.

### Jest Environment Configuration for React Native

- **Issue**: Setting up a stable Jest environment for a React Native project with Expo, TypeScript, and various native modules proved to be a complex task. The initial setup was plagued by a persistent `TypeError: Object.defineProperty called on non-object` error originating from the `jest-expo` preset, as well as numerous "module not found" errors for mocked dependencies.
- **Resolution**: A multi-step approach was taken to diagnose and resolve the issues, resulting in a stable and reliable testing environment.
- **Details**:
  - **Dependency Alignment**: The core issue was a version mismatch between the Expo SDK (`~52.0.0`) and `jest-expo` (`^53.0.9`). Aligning these versions was the first critical step.
  - **Missing Dependencies**: The `jest.setup.js` file contained mocks for several modules that were not installed as dependencies. This was resolved by installing `expo-haptics`, `@react-native-community/datetimepicker`, `react-native-gesture-handler`, `react-native-reanimated`, and `@react-native-async-storage/async-storage`.
  - **Babel Configuration**: The `babel.config.js` was updated to use the modern `react-native-worklets/plugin` for Reanimated, and the preset order was corrected to ensure TypeScript is processed before the Expo preset.
  - **Testing Library Setup**: `@testing-library/react-native`, `react-test-renderer`, and `@types/jest` were installed to support the test files. Peer dependency conflicts were resolved using the `--legacy-peer-deps` flag.
  - **Test-Specific Fixes**: A failing Firebase test was corrected by using `jest.isolateModules` to ensure a fresh module import for each test, preventing mock bleed-over.
- **Benefit**: This robust testing environment now allows developers to write and run tests with confidence, ensuring the stability and quality of the codebase. The detailed setup in `jest.setup.js` provides a solid foundation for future test development.

### Hybrid Architecture: React Native Frontend with Serverless Backend

- **Issue**: Building a mobile receipt scanning app required balancing native mobile capabilities with powerful cloud processing, while maintaining development efficiency and scalability.
- **Resolution**: Implemented a hybrid architecture combining React Native mobile frontend with Firebase serverless backend.
- **Details**:
  - **Mobile-First Design**: Maintained React Native with Expo for native mobile performance and cross-platform compatibility
  - **Serverless Backend**: Implemented Firebase Cloud Functions for auto-scaling OCR processing
  - **Cloud Integration**: Full Google Cloud Platform integration with Vision API, Firestore, and Storage
  - **Deployment Strategy**: Expo build system for mobile apps + Firebase Functions for backend services
  - **Development Tools**: Express.js server for development/testing alongside main React Native app
- **Benefits**:
  - Native mobile performance with cross-platform reach
  - Enterprise-grade scalability with serverless architecture
  - Simplified development with Expo tooling
  - Cost-effective pay-per-use model for OCR processing
  - Future-ready for app store deployment

### Google Cloud Vision API Integration and Storage Triggers

- **Issue**: Implementing real-time OCR processing required complex coordination between file uploads, processing triggers, and result storage.
- **Resolution**: Designed an elegant serverless workflow using Firebase Storage triggers and Google Cloud Vision API.
- **Technical Implementation**:
  - **Storage Organization**: Structured uploads in `receipts/` folder with metadata linking
  - **Automatic Triggers**: Firebase Functions v2 with `onObjectFinalized` for immediate processing
  - **Bucket Isolation**: Function bound to specific bucket (`receipt-app-46ca7.appspot.com`) for security
  - **Error Handling**: Comprehensive error capture with status tracking in Firestore
  - **Metadata Linking**: Upload metadata connects images to Firestore documents and user IDs
- **Benefits**: Zero-maintenance OCR processing with automatic scaling, comprehensive error handling, and real-time status updates

### Multi-Runtime Development Environment

- **Issue**: Different developers prefer different JavaScript runtimes (Node.js vs Bun), and the project needed flexibility for various deployment scenarios.
- **Resolution**: Implemented multi-runtime support with optimized scripts for both Node.js and Bun.
- **Implementation**:
  - **Dual Package Managers**: Support for both npm and Bun package management
  - **Runtime Scripts**: `start` (Node.js), `dev` (Bun with watch), `bun-start` (Bun production)
  - **Development Optimization**: Bun watch mode for faster development iterations
  - **Production Flexibility**: Node.js for production deployments, Bun for development speed
- **Benefit**: Developers can use their preferred runtime while maintaining consistent behavior across environments

### Firebase Project Configuration and Security

- **Issue**: Setting up Firebase with proper security, regional deployment, and service integration required careful configuration management.
- **Resolution**: Implemented comprehensive Firebase configuration with security best practices.
- **Configuration Details**:
  - **Regional Deployment**: Functions deployed to `europe-west1` for GDPR compliance and performance
  - **Service Account Management**: Proper IAM roles for Vision API and Firestore access
  - **Bucket Security**: Functions bound to specific buckets with folder-level processing restrictions
  - **Environment Management**: `.firebaserc` for project aliases and environment separation
- **Security Features**: Metadata-based access control, folder-based processing restrictions, and comprehensive error logging

### Expo Router Implementation and File-Based Routing

- **Issue**: Traditional React Navigation setup can become complex with nested navigators and requires manual route configuration, making it difficult to scale and maintain as the app grows.
- **Resolution**: Implemented Expo Router for file-based routing, providing a Next.js-like development experience for React Native.
- **Technical Implementation**:
  - **File-Based Routes**: Routes automatically generated from file structure in `app/` directory
  - **Tab Navigation**: Implemented `(tabs)` group for bottom tab navigation
  - **Layout System**: Root layout (`_layout.tsx`) with nested tab layout
  - **TypeScript Integration**: Typed routes enabled for compile-time route validation
  - **Screen Organization**: Clear separation of Camera, Review, and History functionality
- **Benefits**: Simplified routing management, better developer experience, automatic route typing, and easier refactoring

### Development Infrastructure with Multiple Deployment Targets

- **Issue**: The project required support for mobile development (React Native), web testing, and serverless backend deployment, each with different tooling and deployment requirements.
- **Resolution**: Established a multi-target development infrastructure supporting all deployment scenarios.
- **Implementation Details**:
  - **Mobile Development**: Expo CLI with React Native for iOS/Android development
  - **Web Testing**: Express.js server with static HTML for rapid backend testing
  - **Functions Development**: Separate TypeScript environment for Firebase Functions
  - **Build Systems**: Metro bundler for mobile, tsc for functions, simple static serving for web
  - **Environment Management**: Separate package.json files and configurations for each target
- **Benefits**: Developers can test backends quickly via web interface while building the full mobile experience, enabling rapid iteration and comprehensive testing

### Firebase SDK Integration Strategy

- **Issue**: React Native Firebase integration requires careful setup of native dependencies and configuration, with potential conflicts between different Firebase services.
- **Resolution**: Designed a phased integration approach starting with backend services, then gradually connecting React Native frontend.
- **Phased Approach**:
- **Phase 1**: Backend-only Firebase (Functions, Storage, Firestore) - ✅ Complete
- **Phase 2**: React Native Firebase SDK integration - ✅ Complete
- **Phase 3**: Real-time data synchronization - � Planned
  - **Configuration Strategy**: Separate Firebase configurations for functions vs. client-side usage
- **Benefits**: Reduced complexity during initial development, working backend services immediately available for testing, clear upgrade path for full integration

### Web Testing Interface Integration

- **Issue**: Testing Firebase Cloud Functions and OCR processing during development was slow and cumbersome without a proper testing interface, requiring manual Firebase console interactions or complex testing setups.
- **Resolution**: Implemented a dedicated Express.js web server with HTML interface for rapid backend testing and development.
- **Technical Implementation**:
  - **Express.js Server**: Simple Node.js server (`server.js`) serving static HTML files
  - **HTML Upload Interface**: Drag-and-drop file upload with intuitive user interface (`public/index.html`)
  - **Multi-Runtime Scripts**: Support for both Node.js (`npm start`) and Bun (`npm run dev`) execution
  - **Static File Serving**: Built-in Express.js static file serving for web assets
  - **Health Checks**: Google App Engine compatible health check endpoints
  - **Development Workflow**: Parallel development of mobile app and backend services
- **Benefits**: Developers can quickly test OCR workflows, upload sample receipts, verify Firebase Functions, and debug processing flows without mobile app dependencies. This significantly speeds up backend development and troubleshooting cycles.

### Client-Side Firebase Services Implementation

- **Issue**: The mobile app lacked the client-side services needed to interact with Firebase for authentication and storage, which is a critical step in connecting the frontend to the backend.
- **Resolution**: Implemented two dedicated services, `FirebaseAuthService` and `FirebaseStorageService`, to handle all client-side Firebase interactions.
- **Details**:
  - **`FirebaseAuthService`**: Provides comprehensive authentication features, including email/password sign-up, sign-in, sign-out, and real-time auth state tracking. This service encapsulates all authentication logic, making it easy to manage user sessions.
  - **`FirebaseStorageService`**: Manages image uploads to Firebase Storage with support for file validation, metadata generation, and progress tracking. It also integrates with Firestore to create and update tracking documents, ensuring a seamless and reliable upload process.
- **Benefit**: These services provide a clean, reusable, and testable interface for interacting with Firebase, establishing a solid foundation for building out the remaining client-side features.

### Common Pitfalls and Best Practices

#### Firebase Functions Development

- Always bind functions to specific buckets to prevent unexpected triggers
- Use Firebase Functions v2 for better performance and regional deployment options
- Include comprehensive error handling with Firestore status updates
- Test functions locally using Firebase emulators before deployment

#### Google Cloud Vision Integration

- Ensure proper IAM roles are configured for Vision API access
- Use `gs://` URIs for optimal performance with Vision API
- Implement retry logic for transient Vision API errors
- Consider Vision API quotas and rate limiting for high-volume applications

#### React Native Development Best Practices

- Use Expo Router file-based routing for scalable navigation architecture
- Implement themed components (`ThemedText`, `ThemedView`) for consistent dark/light mode support
- Leverage platform-specific code with `Platform.select()` for optimal native experience
- Use TypeScript interfaces for props and state to catch errors early
- Test on both iOS and Android simulators regularly during development

#### Mobile-Backend Integration Patterns

- Implement Firebase SDK integration gradually (backend-first, then client integration)
- Use Firebase Storage with automatic Cloud Function triggers for seamless processing
- Structure Firestore collections with user-based security rules in mind
- Implement offline-first data patterns for mobile reliability
- Use React Native's AsyncStorage for local state persistence

#### Expo Development Workflow

- Use Expo development build for testing native features before production
- Leverage Expo's web target for rapid prototyping and testing
- Configure app.json carefully for proper iOS/Android platform settings
- Use Expo's TypeScript integration for full type safety across the stack
- Take advantage of Expo's automatic code signing and build processes

#### Jest and React Native Testing

- **Dependency Alignment**: Always ensure that the `jest-expo` version aligns with the Expo SDK version to prevent compatibility issues.
- **Comprehensive Mocks**: Maintain a thorough `jest.setup.js` file with mocks for all native modules and external services to ensure a stable and predictable test environment.
- **Peer Dependencies**: When installing testing libraries, be mindful of peer dependency conflicts. Use the `--legacy-peer-deps` flag with npm if necessary to resolve them, especially for development dependencies.
- **Module Isolation**: When testing modules with side effects (like Firebase initialization), use `jest.isolateModules` to ensure a fresh import for each test, preventing mock bleed-over and ensuring test independence.
- **Babel Configuration**: Use the `react-native-worklets/plugin` for Reanimated and ensure that the Babel preset order is correct to avoid transformation errors.
