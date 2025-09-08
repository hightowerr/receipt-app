# Implementation: Camera Screen Enhancement - Receipt Positioning Guide

_From: prd-camera-enhancement.md | Generated: 9/6/2025_

## High-Level Objective

Enhance the existing camera screen with a visual positioning guide to improve user experience and indirectly improve OCR accuracy by encouraging better-framed receipt photos.

## Mid-Level Objectives

- Create a reusable `PositioningGuide` component that renders a semi-transparent rectangular overlay
- Integrate the positioning guide into the existing camera screen without disrupting current functionality
- Ensure the guide is visible and properly styled in both light and dark themes
- Implement comprehensive test coverage for the new component and its integration
- Maintain consistency with existing themed components and design patterns

## Implementation Notes

- **Technical Details:** Simple overlay component using absolute positioning, leveraging existing ThemedView for consistency
- **Dependencies:** Existing ThemedView component, React Native StyleSheet, current camera screen structure
- **Standards:** Follow existing component patterns, use TypeScript interfaces, maintain test coverage
- **Constraints:** Must not interfere with image capture functionality, should be purely visual without logic

## Context

### Starting State

- **Relevant Files:**
  - `app/(tabs)/index.tsx` - Current camera screen with image picker functionality
  - `components/ThemedView.tsx` - Existing themed component for consistent styling
  - `components/Button.tsx` - Existing button component used in camera screen
- **Current Architecture:** Camera screen uses expo-image-picker with upload functionality, themed components for UI consistency

### Target State

- **Expected Files:**
  - `components/PositioningGuide.tsx` - New positioning guide component
  - `app/(tabs)/index.tsx` - Enhanced camera screen with positioning guide
  - `components/__tests__/PositioningGuide.test.tsx` - Unit tests for new component
- **Target Architecture:** Camera screen enhanced with overlay guide component, maintaining existing functionality

## Low-Level Tasks

> Ordered implementation steps to fulfill Mid-Level Objectives

1. **Create PositioningGuide Component**

   - **Action:** Create File
   - **Target:** `components/PositioningGuide.tsx`
   - **Details:** Create a new component that renders a semi-transparent rectangular overlay. It should be a simple, stateless component that uses `ThemedView` for consistency.
   - **Code:**

     ```typescript
     // components/PositioningGuide.tsx
     import React from "react";
     import {StyleSheet, View, ViewProps} from "react-native";
     import {ThemedView} from "./ThemedView";

     interface PositioningGuideProps extends ViewProps {
       visible?: boolean;
     }

     export function PositioningGuide({
       visible = true,
       style,
       ...rest
     }: PositioningGuideProps) {
       if (!visible) {
         return null;
       }

       return (
         <View style={[styles.container, style]} {...rest}>
           <ThemedView style={styles.guide} />
         </View>
       );
     }

     const styles = StyleSheet.create({
       container: {
         ...StyleSheet.absoluteFillObject,
         justifyContent: "center",
         alignItems: "center",
       },
       guide: {
         width: "90%",
         height: "60%",
         borderWidth: 2,
         borderColor: "rgba(255, 255, 255, 0.7)",
         borderRadius: 10,
         backgroundColor: "transparent",
       },
     });
     ```

   - **Tests:** Unit tests will be created in a subsequent task.

2. **Create Unit Tests for PositioningGuide**

   - **Action:** Create File
   - **Target:** `components/__tests__/PositioningGuide.test.tsx`
   - **Details:** Create unit tests to ensure the `PositioningGuide` component renders correctly and handles the `visible` prop as expected.
   - **Code:**

     ```typescript
     // components/__tests__/PositioningGuide.test.tsx
     import React from "react";
     import {render} from "@testing-library/react-native";
     import {PositioningGuide} from "../PositioningGuide";

     describe("PositioningGuide", () => {
       it("renders correctly when visible", () => {
         const {getByTestId} = render(
           <PositioningGuide testID="positioning-guide" />
         );
         const guide = getByTestId("positioning-guide");
         expect(guide).toBeTruthy();
       });

       it("does not render when not visible", () => {
         const {queryByTestId} = render(
           <PositioningGuide visible={false} testID="positioning-guide" />
         );
         const guide = queryByTestId("positioning-guide");
         expect(guide).toBeNull();
       });
     });
     ```

   - **Tests:** Run `npm test components/__tests__/PositioningGuide.test.tsx` to verify the tests pass.

3. **Integrate PositioningGuide into CameraScreen**

   - **Action:** Update File
   - **Target:** `app/(tabs)/index.tsx`
   - **Details:** Import and render the `PositioningGuide` component in the `CameraScreen`.
   - **Code:**

     ```diff
     // app/(tabs)/index.tsx
     import React, {useState} from "react";
     import {StyleSheet, Alert} from "react-native";
     import * as ImagePicker from "expo-image-picker";
     import {ThemedText} from "../../components/ThemedText";
     import {ThemedView} from "../../components/ThemedView";
     import {Button} from "../../components/Button";
     import {useAuth} from "../../src/hooks/useAuth";
     import {FirebaseStorageService} from "../../src/services/storage";
     import {UploadProgress} from "../../src/types/firebase";
     +import {PositioningGuide} from "../../components/PositioningGuide";

     export default function CameraScreen() {
       const {user} = useAuth();
       const [uploading, setUploading] = useState(false);
       const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(
         null
       );

       // ... (rest of the component)

       return (
         <ThemedView style={styles.container}>
           <ThemedText type="title">Camera</ThemedText>
           <ThemedText>Scan your receipts here</ThemedText>

           {uploadProgress && (
             <ThemedView style={styles.progressContainer}>
               <ThemedText>Uploading: {uploadProgress.percentage}%</ThemedText>
             </ThemedView>
           )}

           <Button
             title={uploading ? "Uploading..." : "Take Photo"}
             onPress={captureImage}
             disabled={uploading}
             style={styles.button}
           />

           <Button
             title="Select from Gallery"
             onPress={selectFromGallery}
             disabled={uploading}
             style={styles.button}
           />
     +      <PositioningGuide />
         </ThemedView>
       );
     }

     const styles = StyleSheet.create({
       container: {
         flex: 1,
         alignItems: "center",
         justifyContent: "center",
         padding: 20,
       },
       progressContainer: {
         marginVertical: 20,
         padding: 10,
         backgroundColor: "#f0f0f0",
         borderRadius: 5,
       },
       button: {
         marginVertical: 10,
         width: "80%",
       },
     });
     ```

   - **Tests:** Manual testing by running the app and verifying the guide is visible on the camera screen.

## File Structure & Testing

**Implementation Files:**

- `components/PositioningGuide.tsx` - The new positioning guide component.
- `app/(tabs)/index.tsx` - The camera screen, updated to include the positioning guide.

**Test Files:**

- `components/__tests__/PositioningGuide.test.tsx` - Unit tests for the new component.

**Test Commands:**

- `npm test` - Run all tests
- `npx jest components/__tests__/PositioningGuide.test.tsx` - Run specific test

## Acceptance Criteria

- A semi-transparent rectangular guide is visible over the camera view.
- The guide is visible in both light and dark modes.
- The guide does not interfere with the existing camera functionality.
- All tests for the `PositioningGuide` component pass.

---

_Auto-generated specification. Updated: 9/6/2025_
