// src/services/auth.ts
import {rnAuth} from "../config/firebase.config";
import {FirebaseUser, AuthError} from "../types/firebase";

export class FirebaseAuthService {
  /**
   * Sign up with email and password
   */
  static async signUp(email: string, password: string): Promise<FirebaseUser> {
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
  static async signIn(email: string, password: string): Promise<FirebaseUser> {
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
