import {FirebaseAuthService} from "../auth";
import {rnAuth} from "../../config/firebase.config";
import {AuthError} from "../../types/firebase";

// Create mocks for the individual Firebase auth functions
const mockCreateUserWithEmailAndPassword = jest.fn();
const mockSignInWithEmailAndPassword = jest.fn();
const mockSignOut = jest.fn();
const mockOnAuthStateChanged = jest.fn();

// Define a single mock auth object that will be returned by rnAuth
const mockAuth = {
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  signOut: mockSignOut,
  onAuthStateChanged: mockOnAuthStateChanged,
  currentUser: null,
};

// Mock the firebase.config module to return our single mockAuth object
jest.mock("../../config/firebase.config", () => ({
  rnAuth: jest.fn(() => mockAuth),
}));

describe("FirebaseAuthService", () => {
  const mockUser = {
    uid: "123",
    email: "test@example.com",
    displayName: "Test User",
    emailVerified: true,
  };

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  describe("signUp", () => {
    it("should sign up a user successfully", async () => {
      mockCreateUserWithEmailAndPassword.mockResolvedValue({
        user: mockUser,
      });
      const user = await FirebaseAuthService.signUp(
        "test@example.com",
        "password"
      );
      expect(user).toEqual(mockUser);
    });

    it("should throw an error on sign up failure", async () => {
      const mockError: AuthError = {
        code: "auth/error",
        message: "An error occurred",
      };
      mockCreateUserWithEmailAndPassword.mockRejectedValue(mockError);
      await expect(
        FirebaseAuthService.signUp("test@example.com", "password")
      ).rejects.toEqual(mockError);
    });
  });

  describe("signIn", () => {
    it("should sign in a user successfully", async () => {
      mockSignInWithEmailAndPassword.mockResolvedValue({
        user: mockUser,
      });
      const user = await FirebaseAuthService.signIn(
        "test@example.com",
        "password"
      );
      expect(user).toEqual(mockUser);
    });

    it("should throw an error on sign in failure", async () => {
      const mockError: AuthError = {
        code: "auth/error",
        message: "An error occurred",
      };
      mockSignInWithEmailAndPassword.mockRejectedValue(mockError);
      await expect(
        FirebaseAuthService.signIn("test@example.com", "password")
      ).rejects.toEqual(mockError);
    });
  });

  describe("signOut", () => {
    it("should sign out a user successfully", async () => {
      mockSignOut.mockResolvedValue(undefined);
      await expect(FirebaseAuthService.signOut()).resolves.not.toThrow();
    });

    it("should throw an error on sign out failure", async () => {
      const mockError: AuthError = {
        code: "auth/error",
        message: "An error occurred",
      };
      mockSignOut.mockRejectedValue(mockError);
      await expect(FirebaseAuthService.signOut()).rejects.toEqual(mockError);
    });
  });

  describe("getCurrentUser", () => {
    it("should return the current user if authenticated", () => {
      // Temporarily set the currentUser on our mockAuth object
      Object.defineProperty(mockAuth, "currentUser", {
        value: mockUser,
        writable: true,
      });
      const user = FirebaseAuthService.getCurrentUser();
      expect(user).toEqual(mockUser);
    });

    it("should return null if not authenticated", () => {
      Object.defineProperty(mockAuth, "currentUser", {
        value: null,
        writable: true,
      });
      const user = FirebaseAuthService.getCurrentUser();
      expect(user).toBeNull();
    });
  });

  describe("onAuthStateChanged", () => {
    it("should call the callback with the user when auth state changes", () => {
      const callback = jest.fn();
      mockOnAuthStateChanged.mockImplementation((cb) => {
        cb(mockUser);
        return jest.fn(); // Return an unsubscribe function
      });
      FirebaseAuthService.onAuthStateChanged(callback);
      expect(callback).toHaveBeenCalledWith(mockUser);
    });

    it("should call the callback with null when user signs out", () => {
      const callback = jest.fn();
      mockOnAuthStateChanged.mockImplementation((cb) => {
        cb(null);
        return jest.fn();
      });
      FirebaseAuthService.onAuthStateChanged(callback);
      expect(callback).toHaveBeenCalledWith(null);
    });
  });
});
