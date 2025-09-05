# Implementation: React Native Firebase Integration

_From: prd-react-native-firebase-integration.md | Generated: January 5, 2025_

## High-Level Objective

Enable authenticated users to upload receipt images from React Native app to Firebase Storage, triggering existing OCR processing pipeline with real-time status updates and comprehensive error handling.

## Mid-Level Objectives

- **Firebase SDK Integration**: Install and configure React Native Firebase packages with existing project settings
- **Authentication System**: Implement complete auth flow (sign-up, sign-in, sign-out, session persistence)
- **Image Upload Pipeline**: Camera/gallery selection → validation → Firebase Storage upload with metadata
- **Real-time Status Tracking**: Firestore listeners for upload progress and OCR processing status
- **Comprehensive Error Handling**: Network, permissions, storage, and validation error scenarios
- **Service Layer Enhancement**: Extend existing services with React Native Firebase methods
- **Testing Coverage**: Unit, integration, and E2E tests for all Firebase functionality

## Implementation Notes

- **Technical Details**: React Native Firebase SDK, Expo ImagePicker, Firestore real-time listeners, Firebase Authentication
- **Dependencies**: @react-native-firebase/app, /auth, /firestore, /storage, expo-image-picker
- **Standards**: TypeScript interfaces, existing themed components, TDD approach
- **Constraints**: Expo compatibility, existing Firebase project integration, 95% upload success rate

## Context

### Starting State

- **Relevant Files:**
  - `src/config/firebase.config.ts` - Web Firebase SDK configuration
  - `src/services/firebase.ts` - Basic Firestore service with Receipt interface
  - `app/(tabs)/index.tsx` - Camera screen placeholder with themed components
  - `functions/src/index.ts` - OCR processing Cloud Function (fully implemented)
- **Current Architecture:** React Native UI with Expo Router, Express.js testing server, Firebase backend

### Target State

- **Expected Files:**
  - `src/services/auth.ts` - Firebase Authentication service
  - `src/services/storage.ts` - Firebase Storage upload service
  - `app/auth/sign-in.tsx` - Authentication sign-in screen
  - `app/auth/sign-up.tsx` - Authentication sign-up screen
  - `app/(tabs)/index.tsx` - Updated camera screen with upload functionality
  - `src/hooks/useAuth.ts` - Authentication state management hook
  - `src/types/firebase.ts` - Firebase-specific TypeScript interfaces
- **Target Architecture:** Full Firebase integration with authentication, storage, and real-time updates

## Low-Level Tasks

> Ordered implementation steps to fulfill Mid-Level Objectives

1. **Install React Native Firebase Core Package**
   - **Action:** Manual Package Installation
   - **Target:** Project root directory, `app.json`
   - **Details:** Install @react-native-firebase/app and configure Expo plugins for Firebase integration
   - **Manual Steps:**
     1. Open terminal in project root
     2. Run: `npx expo install @react-native-firebase/app`
     3. Add Firebase plugin to `app.json` plugins array
     4. Restart Expo development server
   - **Code:**

   ```json
   // Update app.json - add to plugins array:
   [
     "@react-native-firebase/app",
     {
       "android": {
         "googleServicesFile": "./google-services.json"
       },
       "ios": {
         "googleServicesFile": "./GoogleService-Info.plist"
       }
     }
   ]
   ```

   - **Tests:** Unit test to verify Firebase app initialization without errors

2. **Install Firebase Authentication Package**
   - **Action:** Manual Package Installation
   - **Target:** Project root directory
   - **Details:** Install @react-native-firebase/auth for authentication services
   - **Manual Steps:**
     1. Run: `npx expo install @react-native-firebase/auth`
     2. Verify installation in package.json
     3. Restart development server
   - **Code:**

   ```bash
   npx expo install @react-native-firebase/auth
   ```

   - **Tests:** Import test to ensure auth package loads correctly

3. **Install Firebase Storage and Firestore Packages**
   - **Action:** Manual Package Installation
   - **Target:** Project root directory
   - **Details:** Install @react-native-firebase/storage and @react-native-firebase/firestore
   - **Manual Steps:**
     1. Run: `npx expo install @react-native-firebase/storage @react-native-firebase/firestore`
     2. Verify both packages in package.json
     3. Test import statements in existing files
   - **Code:**

   ```bash
   npx expo install @react-native-firebase/storage @react-native-firebase/firestore
   ```

   - **Tests:** Import tests for both storage and firestore packages

4. **Install Expo ImagePicker for Camera Integration**
   - **Action:** Manual Package Installation
   - **Target:** Project root directory
   - **Details:** Install expo-image-picker for camera and gallery functionality
   - **Manual Steps:**
     1. Run: `npx expo install expo-image-picker`
     2. Add permissions to app.json for camera and media library
   - **Code:**

   ```json
   // Add to app.json
   {
     "expo": {
       "permissions": ["CAMERA", "MEDIA_LIBRARY"]
     }
   }
   ```

   - **Tests:** Test ImagePicker import and permission checking

5. **Create Firebase TypeScript Interfaces**
   - **Action:** Create File
   - **Target:** `src/types/firebase.ts`
   - **Details:** Define TypeScript interfaces for Firebase operations, user data, and upload metadata
   - **Code:**

   ```typescript
   // src/types/firebase.ts
   export interface FirebaseUser {
     uid: string;
     email: string | null;
     displayName: string | null;
     emailVerified: boolean;
   }

   export interface UploadMetadata {
     docId: string;
     uid: string;
     timestamp: number;
     fileName: string;
     fileSize: number;
   }

   export interface UploadProgress {
     bytesTransferred: number;
     totalBytes: number;
     percentage: number;
   }

   export interface ProcessingStatus {
     id: string;
     status: "uploading" | "processing" | "done" | "error";
     textRaw?: string;
     errorMessage?: string;
     createdAt: any; // Firestore Timestamp
     updatedAt: any; // Firestore Timestamp
   }

   export interface AuthError {
     code: string;
     message: string;
   }

   export interface StorageError {
     code: string;
     message: string;
   }
   ```

   - **Tests:** TypeScript compilation test for interface definitions

6. **Update Firebase Configuration for React Native**
   - **Action:** Update File
   - **Target:** `src/config/firebase.config.ts`
   - **Details:** Extend existing configuration to support React Native Firebase packages
   - **Code:**

   ```typescript
   // src/config/firebase.config.ts
   import {initializeApp} from "firebase/app";
   import {
     getFirestore,
     connectFirestoreEmulator,
     initializeFirestore,
   } from "firebase/firestore";
   import {
     getAuth,
     connectAuthEmulator,
     initializeAuth,
     browserLocalPersistence,
   } from "firebase/auth";

   // React Native Firebase imports
   import auth from "@react-native-firebase/auth";
   import firestore from "@react-native-firebase/firestore";
   import storage from "@react-native-firebase/storage";

   const firebaseConfig = {
     apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
     storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
   };

   // Web Firebase (existing)
   const app = initializeApp(firebaseConfig);
   export const webAuth = initializeAuth(app, {
     persistence: browserLocalPersistence,
   });
   export const webDb = getFirestore(app);

   // React Native Firebase (new)
   export const rnAuth = auth;
   export const rnFirestore = firestore;
   export const rnStorage = storage;

   // Connect to emulators in development
   if (__DEV__) {
     // Uncomment when using Firebase emulators
     // connectAuthEmulator(webAuth, 'http://localhost:9099');
     // connectFirestoreEmulator(webDb, 'localhost', 8080);
   }

   export default app;
   ```

   - **Tests:** Test both web and React Native Firebase initialization

7. **Create Firebase Authentication Service**
   - **Action:** Create File
   - **Target:** `src/services/auth.ts`
   - **Details:** Implement complete authentication service with sign-up, sign-in, sign-out, and state management
   - **Code:**

   ```typescript
   // src/services/auth.ts
   import {rnAuth} from "../config/firebase.config";
   import {FirebaseUser, AuthError} from "../types/firebase";

   export class FirebaseAuthService {
     /**
      * Sign up with email and password
      */
     static async signUp(
       email: string,
       password: string
     ): Promise<FirebaseUser> {
       try {
         const userCredential = await rnAuth().createUserWithEmailAndPassword(
           email,
           password
         );
         return {
           uid: userCredential.user.uid,
           email: userCredential.user.email,
           displayName: userCredential.user.displayName,
           emailVerified: userCredential.user.emailVerified,
         };
       } catch (error: any) {
         throw {
           code: error.code,
           message: error.message,
         } as AuthError;
       }
     }

     /**
      * Sign in with email and password
      */
     static async signIn(
       email: string,
       password: string
     ): Promise<FirebaseUser> {
       try {
         const userCredential = await rnAuth().signInWithEmailAndPassword(
           email,
           password
         );
         return {
           uid: userCredential.user.uid,
           email: userCredential.user.email,
           displayName: userCredential.user.displayName,
           emailVerified: userCredential.user.emailVerified,
         };
       } catch (error: any) {
         throw {
           code: error.code,
           message: error.message,
         } as AuthError;
       }
     }

     /**
      * Sign out current user
      */
     static async signOut(): Promise<void> {
       try {
         await rnAuth().signOut();
       } catch (error: any) {
         throw {
           code: error.code,
           message: error.message,
         } as AuthError;
       }
     }

     /**
      * Get current authenticated user
      */
     static getCurrentUser(): FirebaseUser | null {
       const user = rnAuth().currentUser;
       if (!user) return null;

       return {
         uid: user.uid,
         email: user.email,
         displayName: user.displayName,
         emailVerified: user.emailVerified,
       };
     }

     /**
      * Listen to authentication state changes
      */
     static onAuthStateChanged(
       callback: (user: FirebaseUser | null) => void
     ): () => void {
       return rnAuth().onAuthStateChanged((user) => {
         if (user) {
           callback({
             uid: user.uid,
             email: user.email,
             displayName: user.displayName,
             emailVerified: user.emailVerified,
           });
         } else {
           callback(null);
         }
       });
     }
   }
   ```

   - **Tests:** Unit tests for all authentication methods, error handling, and state management

8. **Create Firebase Storage Upload Service**
   - **Action:** Create File
   - **Target:** `src/services/storage.ts`
   - **Details:** Implement image upload service with progress tracking, validation, and metadata
   - **Code:**

   ```typescript
   // src/services/storage.ts
   import {rnStorage, rnFirestore} from "../config/firebase.config";
   import {
     UploadMetadata,
     UploadProgress,
     StorageError,
   } from "../types/firebase";

   export class FirebaseStorageService {
     /**
      * Validate image file before upload
      */
     static validateImageFile(uri: string, fileSize: number): boolean {
       const maxSize = 10 * 1024 * 1024; // 10MB limit
       const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

       // Check file size
       if (fileSize > maxSize) {
         throw new Error("File size exceeds 10MB limit");
       }

       // Basic file type check (more validation in upload)
       const extension = uri.toLowerCase().split(".").pop();
       const validExtensions = ["jpg", "jpeg", "png"];

       if (!extension || !validExtensions.includes(extension)) {
         throw new Error(
           "Invalid file type. Only JPEG and PNG images are supported"
         );
       }

       return true;
     }

     /**
      * Generate upload metadata for Cloud Function trigger
      */
     static generateUploadMetadata(
       userId: string,
       fileName: string,
       fileSize: number
     ): UploadMetadata {
       const docId = rnFirestore().collection("receipts").doc().id;

       return {
         docId,
         uid: userId,
         timestamp: Date.now(),
         fileName,
         fileSize,
       };
     }

     /**
      * Upload image to Firebase Storage with progress tracking
      */
     static async uploadImage(
       imageUri: string,
       metadata: UploadMetadata,
       onProgress: (progress: UploadProgress) => void
     ): Promise<string> {
       try {
         // Validate file first
         this.validateImageFile(imageUri, metadata.fileSize);

         // Create storage reference in receipts folder
         const fileName = `${metadata.uid}_${metadata.timestamp}_${metadata.fileName}`;
         const storageRef = rnStorage().ref(`receipts/${fileName}`);

         // Create Firestore document for tracking
         await rnFirestore().collection("receipts").doc(metadata.docId).set({
           uid: metadata.uid,
           status: "uploading",
           fileName: metadata.fileName,
           createdAt: rnFirestore.FieldValue.serverTimestamp(),
           updatedAt: rnFirestore.FieldValue.serverTimestamp(),
         });

         // Start upload with progress tracking
         const uploadTask = storageRef.putFile(imageUri, {
           customMetadata: {
             docId: metadata.docId,
             uid: metadata.uid,
           },
         });

         // Track upload progress
         uploadTask.on("state_changed", (snapshot) => {
           const progress: UploadProgress = {
             bytesTransferred: snapshot.bytesTransferred,
             totalBytes: snapshot.totalBytes,
             percentage: Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
             ),
           };
           onProgress(progress);
         });

         // Wait for upload completion
         await uploadTask;

         // Get download URL
         const downloadURL = await storageRef.getDownloadURL();

         // Update Firestore document
         await rnFirestore().collection("receipts").doc(metadata.docId).update({
           status: "uploaded",
           downloadURL,
           updatedAt: rnFirestore.FieldValue.serverTimestamp(),
         });

         return downloadURL;
       } catch (error: any) {
         // Update Firestore with error
         await rnFirestore().collection("receipts").doc(metadata.docId).update({
           status: "error",
           errorMessage: error.message,
           updatedAt: rnFirestore.FieldValue.serverTimestamp(),
         });

         throw {
           code: error.code || "storage/unknown",
           message: error.message || "Upload failed",
         } as StorageError;
       }
     }

     /**
      * Listen to processing status changes
      */
     static onProcessingStatusChanged(
       docId: string,
       callback: (status: any) => void
     ): () => void {
       return rnFirestore()
         .collection("receipts")
         .doc(docId)
         .onSnapshot((doc) => {
           if (doc.exists) {
             callback(doc.data());
           }
         });
     }
   }
   ```

   - **Tests:** Unit tests for validation, upload progress, error handling, and Firestore integration

9. **Create Authentication State Hook**
   - **Action:** Create File
   - **Target:** `src/hooks/useAuth.ts`
   - **Details:** Custom React hook for managing authentication state across the app
   - **Code:**

   ```typescript
   // src/hooks/useAuth.ts
   import {useState, useEffect} from "react";
   import {FirebaseUser} from "../types/firebase";
   import {FirebaseAuthService} from "../services/auth";

   export function useAuth() {
     const [user, setUser] = useState<FirebaseUser | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
       const unsubscribe = FirebaseAuthService.onAuthStateChanged(
         (authUser) => {
           setUser(authUser);
           setLoading(false);
         }
       );

       return unsubscribe;
     }, []);

     const signUp = async (email: string, password: string) => {
       try {
         setError(null);
         setLoading(true);
         const user = await FirebaseAuthService.signUp(email, password);
         setUser(user);
       } catch (err: any) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };

     const signIn = async (email: string, password: string) => {
       try {
         setError(null);
         setLoading(true);
         const user = await FirebaseAuthService.signIn(email, password);
         setUser(user);
       } catch (err: any) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };

     const signOut = async () => {
       try {
         setError(null);
         await FirebaseAuthService.signOut();
         setUser(null);
       } catch (err: any) {
         setError(err.message);
       }
     };

     return {
       user,
       loading,
       error,
       signUp,
       signIn,
       signOut,
       isAuthenticated: !!user,
     };
   }
   ```

   - **Tests:** Hook testing for authentication state changes and error handling

10. **Create Authentication Sign-In Screen**
    - **Action:** Create File
    - **Target:** `app/auth/sign-in.tsx`
    - **Details:** Sign-in screen with email/password form using themed components
    - **Manual Steps:**
      1. Create `app/auth/` directory
      2. Create sign-in screen with form validation
      3. Integrate with useAuth hook
    - **Code:**

    ```typescript
    // app/auth/sign-in.tsx
    import React, { useState } from 'react';
    import { StyleSheet, TextInput, Alert } from 'react-native';
    import { ThemedText } from '../../components/ThemedText';
    import { ThemedView } from '../../components/ThemedView';
    import { Button } from '../../components/Button';
    import { useAuth } from '../../src/hooks/useAuth';
    import { router } from 'expo-router';

    export default function SignInScreen() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const { signIn, loading, error } = useAuth();

      const handleSignIn = async () => {
        if (!email.trim() || !password.trim()) {
          Alert.alert('Error', 'Please enter both email and password');
          return;
        }

        await signIn(email, password);

        if (!error) {
          router.replace('/(tabs)');
        }
      };

      const goToSignUp = () => {
        router.push('/auth/sign-up');
      };

      return (
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Sign In
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />

          {error && (
            <ThemedText style={styles.error}>
              {error}
            </ThemedText>
          )}

          <Button
            title={loading ? 'Signing In...' : 'Sign In'}
            onPress={handleSignIn}
            disabled={loading}
          />

          <Button
            title="Create Account"
            onPress={goToSignUp}
            style={styles.secondaryButton}
          />
        </ThemedView>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      },
      title: {
        textAlign: 'center',
        marginBottom: 30,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
      },
      error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
      },
      secondaryButton: {
        marginTop: 15,
        backgroundColor: 'transparent',
      },
    });
    ```

    - **Tests:** Component tests for form validation, authentication flow, and navigation

11. **Create Authentication Sign-Up Screen**
    - **Action:** Create File
    - **Target:** `app/auth/sign-up.tsx`
    - **Details:** Sign-up screen with email/password form and validation
    - **Code:**

    ```typescript
    // app/auth/sign-up.tsx
    import React, { useState } from 'react';
    import { StyleSheet, TextInput, Alert } from 'react-native';
    import { ThemedText } from '../../components/ThemedText';
    import { ThemedView } from '../../components/ThemedView';
    import { Button } from '../../components/Button';
    import { useAuth } from '../../src/hooks/useAuth';
    import { router } from 'expo-router';

    export default function SignUpScreen() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const { signUp, loading, error } = useAuth();

      const validateForm = () => {
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
          Alert.alert('Error', 'Please fill in all fields');
          return false;
        }

        if (password !== confirmPassword) {
          Alert.alert('Error', 'Passwords do not match');
          return false;
        }

        if (password.length < 6) {
          Alert.alert('Error', 'Password must be at least 6 characters');
          return false;
        }

        return true;
      };

      const handleSignUp = async () => {
        if (!validateForm()) return;

        await signUp(email, password);

        if (!error) {
          router.replace('/(tabs)');
        }
      };

      const goToSignIn = () => {
        router.push('/auth/sign-in');
      };

      return (
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Create Account
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {error && (
            <ThemedText style={styles.error}>
              {error}
            </ThemedText>
          )}

          <Button
            title={loading ? 'Creating Account...' : 'Create Account'}
            onPress={handleSignUp}
            disabled={loading}
          />

          <Button
            title="Already have an account? Sign In"
            onPress={goToSignIn}
            style={styles.secondaryButton}
          />
        </ThemedView>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      },
      title: {
        textAlign: 'center',
        marginBottom: 30,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
      },
      error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
      },
      secondaryButton: {
        marginTop: 15,
        backgroundColor: 'transparent',
      },
    });
    ```

    - **Tests:** Component tests for form validation, password confirmation, and error handling

12. **Create Authentication Layout**
    - **Action:** Create File
    - **Target:** `app/auth/_layout.tsx`
    - **Details:** Layout for authentication screens with proper navigation setup
    - **Code:**

    ```typescript
    // app/auth/_layout.tsx
    import { Stack } from 'expo-router';

    export default function AuthLayout() {
      return (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="sign-up" />
        </Stack>
      );
    }
    ```

    - **Tests:** Navigation tests for auth screens

13. **Update Root Layout with Authentication Guard**
    - **Action:** Update File
    - **Target:** `app/_layout.tsx`
    - **Details:** Add authentication guard to redirect unauthenticated users
    - **Code:**

    ```typescript
    // app/_layout.tsx - Add to existing layout
    import { useAuth } from '../src/hooks/useAuth';
    import { router } from 'expo-router';
    import { useEffect } from 'react';

    // Add inside the root layout component:
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.replace('/auth/sign-in');
        } else {
          router.replace('/(tabs)');
        }
      }
    }, [user, loading]);

    if (loading) {
      return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      );
    }
    ```

    - **Tests:** Authentication guard tests for proper redirection

14. **Update Camera Screen with Image Upload Functionality**
    - **Action:** Update File
    - **Target:** `app/(tabs)/index.tsx`
    - **Details:** Add camera capture, gallery selection, and Firebase upload functionality
    - **Code:**

    ```typescript
    // app/(tabs)/index.tsx
    import React, { useState } from 'react';
    import { StyleSheet, Alert } from 'react-native';
    import * as ImagePicker from 'expo-image-picker';
    import { ThemedText } from '../../components/ThemedText';
    import { ThemedView } from '../../components/ThemedView';
    import { Button } from '../../components/Button';
    import { useAuth } from '../../src/hooks/useAuth';
    import { FirebaseStorageService } from '../../src/services/storage';
    import { UploadProgress } from '../../src/types/firebase';

    export default function CameraScreen() {
      const { user } = useAuth();
      const [uploading, setUploading] = useState(false);
      const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);

      const requestPermissions = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraPermission.status !== 'granted' || mediaLibraryPermission.status !== 'granted') {
          Alert.alert(
            'Permissions Required',
            'Camera and photo library permissions are required to upload receipts.',
            [{ text: 'OK' }]
          );
          return false;
        }

        return true;
      };

      const captureImage = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
          await uploadImage(result.assets[0]);
        }
      };

      const selectFromGallery = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
          await uploadImage(result.assets[0]);
        }
      };

      const uploadImage = async (asset: ImagePicker.ImagePickerAsset) => {
        if (!user) {
          Alert.alert('Error', 'You must be signed in to upload images');
          return;
        }

        try {
          setUploading(true);
          setUploadProgress({ bytesTransferred: 0, totalBytes: 0, percentage: 0 });

          const metadata = FirebaseStorageService.generateUploadMetadata(
            user.uid,
            asset.fileName || 'receipt.jpg',
            asset.fileSize || 0
          );

          const downloadURL = await FirebaseStorageService.uploadImage(
            asset.uri,
            metadata,
            (progress) => setUploadProgress(progress)
          );

          Alert.alert('Success', 'Receipt uploaded successfully! OCR processing started.');

          // Listen for processing status updates
          const unsubscribe = FirebaseStorageService.onProcessingStatusChanged(
            metadata.docId,
            (status) => {
              console.log('Processing status:', status);
              if (status.status === 'done') {
                Alert.alert('Processing Complete', 'Your receipt has been processed!');
                unsubscribe();
              }
            }
          );

        } catch (error: any) {
          Alert.alert('Upload Error', error.message);
        } finally {
          setUploading(false);
          setUploadProgress(null);
        }
      };

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
            title={uploading ? 'Uploading...' : 'Take Photo'}
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
        </ThemedView>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      progressContainer: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
      },
      button: {
        marginVertical: 10,
        width: '80%',
      },
    });
    ```

    - **Tests:** Component tests for image selection, upload flow, progress tracking, and error handling

15. **Create Authentication Tests**
    - **Action:** Create File
    - **Target:** `src/services/__tests__/auth.test.ts`
    - **Details:** Comprehensive unit tests for Firebase authentication service
    - **Manual Steps:**
      1. Create `src/services/__tests__/` directory
      2. Install Firebase testing utilities if needed
      3. Create mock Firebase auth instance
    - **Code:**

    ```typescript
    // src/services/__tests__/auth.test.ts
    import {FirebaseAuthService} from "../auth";
    import {FirebaseUser, AuthError} from "../../types/firebase";

    // Mock React Native Firebase
    jest.mock("@react-native-firebase/auth", () => ({
      __esModule: true,
      default: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(),
        signInWithEmailAndPassword: jest.fn(),
        signOut: jest.fn(),
        currentUser: null,
        onAuthStateChanged: jest.fn(),
      })),
    }));

    describe("FirebaseAuthService", () => {
      const mockUser = {
        uid: "test-uid",
        email: "test@example.com",
        displayName: "Test User",
        emailVerified: false,
      };

      beforeEach(() => {
        jest.clearAllMocks();
      });

      describe("signUp", () => {
        it("should create user with valid email and password", async () => {
          const mockAuth = require("@react-native-firebase/auth").default();
          mockAuth.createUserWithEmailAndPassword.mockResolvedValueOnce({
            user: mockUser,
          });

          const result = await FirebaseAuthService.signUp(
            "test@example.com",
            "password123"
          );

          expect(result).toEqual({
            uid: mockUser.uid,
            email: mockUser.email,
            displayName: mockUser.displayName,
            emailVerified: mockUser.emailVerified,
          });
        });

        it("should throw AuthError on invalid credentials", async () => {
          const mockAuth = require("@react-native-firebase/auth").default();
          const authError = {
            code: "auth/invalid-email",
            message: "Invalid email",
          };
          mockAuth.createUserWithEmailAndPassword.mockRejectedValueOnce(
            authError
          );

          await expect(
            FirebaseAuthService.signUp("invalid-email", "password123")
          ).rejects.toEqual(authError);
        });
      });

      describe("signIn", () => {
        it("should sign in with valid credentials", async () => {
          const mockAuth = require("@react-native-firebase/auth").default();
          mockAuth.signInWithEmailAndPassword.mockResolvedValueOnce({
            user: mockUser,
          });

          const result = await FirebaseAuthService.signIn(
            "test@example.com",
            "password123"
          );

          expect(result).toEqual({
            uid: mockUser.uid,
            email: mockUser.email,
            displayName: mockUser.displayName,
            emailVerified: mockUser.emailVerified,
          });
        });

        it("should throw AuthError with wrong password", async () => {
          const mockAuth = require("@react-native-firebase/auth").default();
          const authError = {
            code: "auth/wrong-password",
            message: "Wrong password",
          };
          mockAuth.signInWithEmailAndPassword.mockRejectedValueOnce(authError);

          await expect(
            FirebaseAuthService.signIn("test@example.com", "wrongpassword")
          ).rejects.toEqual(authError);
        });
      });

      describe("getCurrentUser", () => {
        it("should return null when no user is signed in", () => {
          const mockAuth = require("@react-native-firebase/auth").default();
          mockAuth.currentUser = null;

          const result = FirebaseAuthService.getCurrentUser();
          expect(result).toBeNull();
        });

        it("should return user when signed in", () => {
          const mockAuth = require("@react-native-firebase/auth").default();
          mockAuth.currentUser = mockUser;

          const result = FirebaseAuthService.getCurrentUser();
          expect(result).toEqual({
            uid: mockUser.uid,
            email: mockUser.email,
            displayName: mockUser.displayName,
            emailVerified: mockUser.emailVerified,
          });
        });
      });
    });
    ```

    - **Tests:** Authentication service unit tests with mocked Firebase

16. **Create Storage Service Tests**
    - **Action:** Create File
    - **Target:** `src/services/__tests__/storage.test.ts`
    - **Details:** Unit tests for Firebase Storage service with upload validation
    - **Code:**

    ```typescript
    // src/services/__tests__/storage.test.ts
    import {FirebaseStorageService} from "../storage";

    jest.mock("@react-native-firebase/storage");
    jest.mock("@react-native-firebase/firestore");

    describe("FirebaseStorageService", () => {
      describe("validateImageFile", () => {
        it("should validate correct image files", () => {
          expect(() =>
            FirebaseStorageService.validateImageFile(
              "test.jpg",
              5 * 1024 * 1024
            )
          ).not.toThrow();
        });

        it("should reject files larger than 10MB", () => {
          expect(() =>
            FirebaseStorageService.validateImageFile(
              "test.jpg",
              15 * 1024 * 1024
            )
          ).toThrow("File size exceeds 10MB limit");
        });

        it("should reject non-image files", () => {
          expect(() =>
            FirebaseStorageService.validateImageFile("document.pdf", 1024)
          ).toThrow(
            "Invalid file type. Only JPEG and PNG images are supported"
          );
        });
      });

      describe("generateUploadMetadata", () => {
        it("should generate valid metadata", () => {
          const metadata = FirebaseStorageService.generateUploadMetadata(
            "user123",
            "receipt.jpg",
            1024
          );

          expect(metadata).toMatchObject({
            uid: "user123",
            fileName: "receipt.jpg",
            fileSize: 1024,
          });
          expect(metadata.docId).toBeDefined();
          expect(metadata.timestamp).toBeGreaterThan(0);
        });
      });
    });
    ```

    - **Tests:** Storage validation and metadata generation tests

17. **Create Hook Tests**
    - **Action:** Create File
    - **Target:** `src/hooks/__tests__/useAuth.test.ts`
    - **Details:** React hook tests for authentication state management
    - **Code:**

    ```typescript
    // src/hooks/__tests__/useAuth.test.ts
    import {renderHook, act} from "@testing-library/react-hooks";
    import {useAuth} from "../useAuth";
    import {FirebaseAuthService} from "../../services/auth";

    jest.mock("../../services/auth");

    describe("useAuth", () => {
      const mockFirebaseAuthService = FirebaseAuthService as jest.Mocked<
        typeof FirebaseAuthService
      >;

      beforeEach(() => {
        jest.clearAllMocks();
        mockFirebaseAuthService.onAuthStateChanged.mockReturnValue(() => {});
      });

      it("should initialize with loading state", () => {
        const {result} = renderHook(() => useAuth());

        expect(result.current.loading).toBe(true);
        expect(result.current.user).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
      });

      it("should sign up user successfully", async () => {
        const mockUser = {
          uid: "123",
          email: "test@example.com",
          displayName: null,
          emailVerified: false,
        };
        mockFirebaseAuthService.signUp.mockResolvedValueOnce(mockUser);

        const {result} = renderHook(() => useAuth());

        await act(async () => {
          await result.current.signUp("test@example.com", "password123");
        });

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.error).toBeNull();
      });

      it("should handle sign up error", async () => {
        mockFirebaseAuthService.signUp.mockRejectedValueOnce({
          message: "Email already exists",
        });

        const {result} = renderHook(() => useAuth());

        await act(async () => {
          await result.current.signUp("existing@example.com", "password123");
        });

        expect(result.current.error).toBe("Email already exists");
        expect(result.current.user).toBeNull();
      });
    });
    ```

    - **Tests:** Hook testing for authentication state changes

18. **Create Integration Tests**
    - **Action:** Create File
    - **Target:** `__tests__/integration/firebase-auth-flow.test.tsx`
    - **Details:** End-to-end integration tests for authentication flow
    - **Code:**

    ```typescript
    // __tests__/integration/firebase-auth-flow.test.tsx
    import React from 'react';
    import { render, fireEvent, waitFor } from '@testing-library/react-native';
    import SignInScreen from '../../app/auth/sign-in';

    jest.mock('expo-router', () => ({
      router: {
        replace: jest.fn(),
        push: jest.fn(),
      },
    }));

    describe('Authentication Flow Integration', () => {
      it('should complete sign-in flow successfully', async () => {
        const { getByPlaceholderText, getByText } = render(<SignInScreen />);

        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const signInButton = getByText('Sign In');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(signInButton);

        await waitFor(() => {
          expect(signInButton).toHaveTextContent('Signing In...');
        });
      });

      it('should show error for invalid credentials', async () => {
        const { getByPlaceholderText, getByText } = render(<SignInScreen />);

        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const signInButton = getByText('Sign In');

        fireEvent.changeText(emailInput, 'invalid@example.com');
        fireEvent.changeText(passwordInput, 'wrongpassword');
        fireEvent.press(signInButton);

        // Test would verify error display
      });
    });
    ```

    - **Tests:** Integration tests for complete authentication workflows

19. **Create End-to-End Test Scenarios**
    - **Action:** Create File
    - **Target:** `__tests__/e2e/receipt-upload-flow.test.tsx`
    - **Details:** Complete user journey tests from authentication to receipt processing
    - **Code:**

    ```typescript
    // __tests__/e2e/receipt-upload-flow.test.tsx
    import React from 'react';
    import { render, fireEvent, waitFor } from '@testing-library/react-native';
    import * as ImagePicker from 'expo-image-picker';
    import CameraScreen from '../../app/(tabs)/index';

    jest.mock('expo-image-picker');
    jest.mock('../../src/hooks/useAuth');
    jest.mock('../../src/services/storage');

    describe('Receipt Upload E2E Flow', () => {
      const mockUser = { uid: 'test-user', email: 'test@example.com', displayName: null, emailVerified: false };

      beforeEach(() => {
        require('../../src/hooks/useAuth').useAuth.mockReturnValue({
          user: mockUser,
          loading: false,
          isAuthenticated: true,
        });
      });

      it('should complete camera capture and upload flow', async () => {
        const mockImagePicker = ImagePicker as jest.Mocked<typeof ImagePicker>;
        mockImagePicker.requestCameraPermissionsAsync.mockResolvedValue({ status: 'granted' });
        mockImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({ status: 'granted' });
        mockImagePicker.launchCameraAsync.mockResolvedValue({
          canceled: false,
          assets: [{
            uri: 'file://test-image.jpg',
            fileName: 'receipt.jpg',
            fileSize: 1024,
          }],
        });

        const { getByText } = render(<CameraScreen />);
        const takePhotoButton = getByText('Take Photo');

        fireEvent.press(takePhotoButton);

        await waitFor(() => {
          expect(takePhotoButton).toHaveTextContent('Uploading...');
        });
      });

      it('should handle permission denial gracefully', async () => {
        const mockImagePicker = ImagePicker as jest.Mocked<typeof ImagePicker>;
        mockImagePicker.requestCameraPermissionsAsync.mockResolvedValue({ status: 'denied' });

        const { getByText } = render(<CameraScreen />);
        const takePhotoButton = getByText('Take Photo');

        fireEvent.press(takePhotoButton);

        // Test should verify permission error alert
      });
    });
    ```

    - **Tests:** E2E tests for complete upload workflow

20. **Create Firebase Console Configuration Guide**
    - **Action:** Create File
    - **Target:** `docs/firebase-setup.md`
    - **Details:** Step-by-step Firebase console configuration guide
    - **Manual Steps:**
      1. Create `docs/` directory
      2. Document Firebase console setup steps
      3. Include security rules and authentication settings
    - **Code:**

    ````markdown
    # Firebase Console Setup Guide

    ## Prerequisites

    - Firebase project created (`receipt-app-46ca7`)
    - Firebase CLI installed and authenticated

    ## Authentication Setup

    ### 1. Enable Email/Password Authentication

    1. Go to Firebase Console → Authentication → Sign-in method
    2. Enable "Email/Password" provider
    3. Save configuration

    ### 2. Configure Authorized Domains

    1. In Authentication → Settings → Authorized domains
    2. Add your Expo development domains if needed

    ## Firestore Database Rules

    ```javascript
    // Firestore Security Rules
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /receipts/{receiptId} {
          allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
          allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
        }
      }
    }
    ```
    ````

    ## Firebase Storage Rules

    ```javascript
    // Storage Security Rules
    rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
        match /receipts/{allPaths=**} {
          allow read, write: if request.auth != null;
        }
      }
    }
    ```

    ## Manual Configuration Steps

    ### 1. Download Configuration Files
    1. Go to Project Settings → General
    2. Download `google-services.json` (Android)
    3. Download `GoogleService-Info.plist` (iOS)
    4. Place files in project root directory

    ### 2. Environment Variables Setup

    Create `.env.local` with:

    ```
    EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
    EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=sender-id
    EXPO_PUBLIC_FIREBASE_APP_ID=app-id
    ```

    ### 3. Verify Cloud Functions

    Ensure existing OCR Cloud Function is deployed and accessible.

    ```

    - **Tests:** Manual verification checklist for Firebase configuration
    ```

## File Structure & Testing

**Implementation Files:**

- `src/types/firebase.ts` - TypeScript interfaces for Firebase operations
- `src/services/auth.ts` - Firebase Authentication service
- `src/services/storage.ts` - Firebase Storage service with upload functionality
- `src/hooks/useAuth.ts` - Authentication state management hook
- `app/auth/sign-in.tsx` - Sign-in screen component
- `app/auth/sign-up.tsx` - Sign-up screen component
- `app/auth/_layout.tsx` - Authentication layout
- `app/(tabs)/index.tsx` - Updated camera screen with upload functionality

**Test Files:**

- `src/services/__tests__/auth.test.ts` - Authentication service unit tests
- `src/services/__tests__/storage.test.ts` - Storage service unit tests
- `src/hooks/__tests__/useAuth.test.ts` - Authentication hook tests
- `__tests__/integration/firebase-auth-flow.test.tsx` - Authentication integration tests
- `__tests__/e2e/receipt-upload-flow.test.tsx` - End-to-end upload flow tests

**Test Commands:**

- `npm test` - Run all tests
- `npx jest src/services/__tests__/` - Run service tests only
- `npx jest src/hooks/__tests__/` - Run hook tests only
- `npx jest __tests__/integration/` - Run integration tests
- `npx jest __tests__/e2e/` - Run E2E tests

## Acceptance Criteria

### Authentication Acceptance Criteria

- ✅ New users can create accounts with email/password authentication
- ✅ Existing users can sign in with persistent sessions across app restarts
- ✅ Users can sign out and return to authentication screen
- ✅ Unauthenticated users are automatically redirected to sign-in screen

### Upload Functionality Acceptance Criteria

- ✅ Authenticated users can capture photos using device camera
- ✅ Users can select images from device gallery
- ✅ Images upload to Firebase Storage with proper metadata for Cloud Function triggers
- ✅ Upload progress is displayed in real-time during file transfer

### Real-time Updates Acceptance Criteria

- ✅ Upload progress updates reflect actual Firebase Storage transfer progress
- ✅ OCR processing status changes are received via Firestore listeners
- ✅ Users see completion notification when OCR processing finishes
- ✅ Multiple concurrent uploads maintain separate status tracking

### Error Handling Acceptance Criteria

- ✅ Network failures display clear error messages with retry options
- ✅ Camera/gallery permission denials provide user guidance
- ✅ File size limit errors include specific guidance about supported sizes
- ✅ Invalid file type selections show immediate feedback about supported formats

---

_Auto-generated implementation specification. Updated: January 5, 2025_
