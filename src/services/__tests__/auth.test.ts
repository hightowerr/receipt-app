// src/services/__tests__/auth.test.ts
import {FirebaseAuthService} from "../auth";
import {FirebaseUser, AuthError} from "../../types/firebase";

// Mock React Native Firebase
const mockFirebaseAuth = {
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  currentUser: null as any,
  onAuthStateChanged: jest.fn(),
};

jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: () => mockFirebaseAuth,
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
      mockFirebaseAuth.createUserWithEmailAndPassword.mockResolvedValue({
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
      const authError = {
        code: "auth/invalid-email",
        message: "Invalid email",
      };
      mockFirebaseAuth.createUserWithEmailAndPassword.mockRejectedValue(
        authError
      );

      await expect(
        FirebaseAuthService.signUp("invalid-email", "password123")
      ).rejects.toEqual(authError);
    });
  });

  describe("signIn", () => {
    it("should sign in with valid credentials", async () => {
      mockFirebaseAuth.signInWithEmailAndPassword.mockResolvedValue({
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
      const authError = {
        code: "auth/wrong-password",
        message: "Wrong password",
      };
      mockFirebaseAuth.signInWithEmailAndPassword.mockRejectedValue(authError);

      await expect(
        FirebaseAuthService.signIn("test@example.com", "wrongpassword")
      ).rejects.toEqual(authError);
    });
  });

  describe("getCurrentUser", () => {
    it("should return null when no user is signed in", () => {
      mockFirebaseAuth.currentUser = null;

      const result = FirebaseAuthService.getCurrentUser();
      expect(result).toBeNull();
    });

    it("should return user when signed in", () => {
      mockFirebaseAuth.currentUser = mockUser;

      const result = FirebaseAuthService.getCurrentUser();
      expect(result).toEqual({
        uid: mockUser.uid,
        email: mockUser.email,
        displayName: mockUser.displayName,
        emailVerified: mockUser.emailVerified,
      });
      mockFirebaseAuth.currentUser = null;
    });
  });
});
