/* eslint-env jest */
import {initializeApp} from "firebase/app";

// Mock Firebase services
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  Timestamp: {
    now: jest.fn(),
  },
  orderBy: jest.fn(),
}));

describe("Firebase Initialization", () => {
  beforeEach(() => {
    // Reset mocks before each test
    (initializeApp as jest.Mock).mockClear();

    // Mock the global variables
    (global as any).__app_id = "test-app-id";
    (global as any).__firebase_config = JSON.stringify({
      apiKey: "test-api-key",
      authDomain: "test-auth-domain",
      projectId: "test-project-id",
      storageBucket: "test-storage-bucket",
      messagingSenderId: "test-messaging-sender-id",
      appId: "test-app-id",
    });
  });

  it("should initialize Firebase without errors", () => {
    jest.isolateModules(() => {
      // Dynamically import the module to use the mocked globals
      require("../firebase");

      // Verify that initializeApp was called
      expect(initializeApp).toHaveBeenCalled();
    });
  });

  it("should initialize Firebase with the correct configuration", () => {
    jest.isolateModules(() => {
      // Dynamically import the module to use the mocked globals
      require("../firebase");

      // Verify that initializeApp was called with the correct config
      expect(initializeApp).toHaveBeenCalledWith(
        JSON.parse((global as any).__firebase_config)
      );
    });
  });
});
