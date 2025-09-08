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
