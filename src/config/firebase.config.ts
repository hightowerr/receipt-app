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
